import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Proposal, PROPOSAL_STATUS, PROPOSAL_DIVISION, SUBMITTED_BY } from '../../../../../libs/database/src/entities/proposal.entity';
import { ProposalItem } from '../../../../../libs/database/src/entities/proposal-item.entity';
import { ProposalPaymentTerm } from '../../../../../libs/database/src/entities/proposal-payment-term.entity';
import {
  CreateProposalDto,
  CreateProposalItemDto,
  UpdateProposalDto,
  UpdateProposalStatusDto
} from '../../../../../libs/dtos/sales/create-proposal.dto';
import { CreateProposalWithServicesDto } from '../../../../../libs/dtos/sales/create-proposal-with-services.dto';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadService } from '../../../../../libs/database/src/entities/lead-service.entity';
import PDFDocument from 'pdfkit';
import { ProposalReportService } from './proposal-report.service';
import { PdfTemplateService } from '../../../../../libs/templates/pdf-template.service';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepo: Repository<Proposal>,
    @InjectRepository(Lead)
    private leadRepo: Repository<Lead>,
    private dataSource: DataSource,
    private proposalReportService: ProposalReportService,
    private pdfTemplateService: PdfTemplateService,
  ) {}

  private async buildProposalDraft(dto: CreateProposalDto, lead?: Lead): Promise<{
    draft: Partial<Proposal>;
    items: ProposalItem[];
    totals: { subTotal: number; totalDiscount: number; totalTaxAmount: number; grandTotal: number; };
  }> {
    // Ensure the lead record is available (with service assignments) for draft generation.
    if (!lead) {
      lead = await this.leadRepo.findOne({
        where: { id: Number(dto.leadId) },
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'leadServices', 'leadServices.service'],
      });
    }

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    // Ensure services are loaded; in some cases the relation is not populated even when the lead has services.
    let leadServices = lead.leadServices;
    if (!leadServices || leadServices.length === 0) {
      leadServices = await this.dataSource.getRepository(LeadService).find({
        where: { lead: { id: lead.id } },
        relations: ['service'],
      });
    }

    const proposalDate = dto.proposalDate ? new Date(dto.proposalDate) : new Date();

    const itemsDto = dto.items;
    if (!itemsDto || itemsDto.length === 0) {
      throw new BadRequestException('Items are required');
    }

    const subject = (dto.subject?.trim() ||
      `Proposal for ${itemsDto.map(i => i.serviceName || '').filter(Boolean).join(', ')}` ||
      'Proposal');

    const submittedBy = dto.submittedBy ?? SUBMITTED_BY.INTERCERT_NOIDA;

    const itemEntities: ProposalItem[] = [];
    let subTotal = 0;
    let totalDiscount = 0;
    let totalTaxAmount = 0;

    for (const itemDto of itemsDto) {
      const leadService = leadServices?.find((ls) => ls.id === itemDto.leadServiceId);

      const item = new ProposalItem();
      item.leadServiceId = itemDto.leadServiceId;
      item.serviceName = itemDto.serviceName || leadService?.service?.name || '';
      item.serviceType = itemDto.serviceType || leadService?.service?.category || '';
      item.description = itemDto.description || (leadService?.deliverables ? leadService.deliverables.join(', ') : leadService?.service?.description || '');
      item.startDate = itemDto.startDate || leadService?.startDate;
      item.endDate = itemDto.endDate || leadService?.endDate;
      item.amount = itemDto.amount;
      item.currency = itemDto.currency;
      item.discount = itemDto.discount ?? 0;
      item.taxPercentage = itemDto.taxPercentage ?? 0;

      const discountAmt = (item.amount * item.discount) / 100;
      const taxableAmt = item.amount - discountAmt;
      const taxAmt = (taxableAmt * item.taxPercentage) / 100;

      item.discountAmount = discountAmt;
      item.taxableAmount = taxableAmt;
      item.taxAmount = taxAmt;
      item.netAmount = taxableAmt + taxAmt;

      subTotal += item.amount;
      totalDiscount += discountAmt;
      totalTaxAmount += taxAmt;
      itemEntities.push(item);
    }

    const grandTotal = subTotal - totalDiscount + totalTaxAmount;

    const draft: Partial<Proposal> = {
      leadId: Number(dto.leadId),
      proposalDate,
      validUntil: dto.validUntil,
      submittedBy,
      division: dto.division || this.deriveDivisionFromLeadServices(itemEntities),
      subject,
      introduction: dto.introduction,
      termsAndConditions: dto.termsAndConditions,
      notes: dto.notes,
      currency: itemEntities.length > 0 ? itemEntities[0].currency : 'INR',
      subTotal,
      totalDiscount,
      totalTaxAmount,
      grandTotal,
    };

    return { draft, items: itemEntities, totals: { subTotal, totalDiscount, totalTaxAmount, grandTotal } };
  }

  async createProposal(dto: CreateProposalDto): Promise<Proposal> {
    return this.dataSource.transaction(async (manager) => {
      const lead = await manager.findOne(Lead, { where: { id: Number(dto.leadId) } });
      if (!lead) throw new NotFoundException('Lead not found');

      const count = await manager.count(Proposal, { where: { leadId: Number(dto.leadId) } });
      const seq = String(count + 1).padStart(2, '0');
      const reference = `PROP/${lead.enquiryId || 'UNKNOWN'}/${seq}`;

      const { draft, items } = await this.buildProposalDraft(dto, lead);

      const proposal = manager.create(Proposal, {
        ...draft,
        leadId: Number(dto.leadId),
        proposalReference: reference,
        version: count + 1,
        status: PROPOSAL_STATUS.DRAFT,
        items,
      });

      const saved = await manager.save(Proposal, proposal);

      if (dto.paymentTerms && dto.paymentTerms.length > 0) {
        const totalPct = dto.paymentTerms.reduce((s, t) => s + t.percentage, 0);
        if (Math.abs(totalPct - 100) > 0.01) {
          throw new BadRequestException('Payment term percentages must sum to 100');
        }

        const terms: ProposalPaymentTerm[] = dto.paymentTerms.map(t =>
          manager.create(ProposalPaymentTerm, {
            proposalId: saved.id,
            milestoneName: t.milestoneName,
            percentage: t.percentage,
            triggerEvent: t.triggerEvent,
            amount: (saved.grandTotal * t.percentage) / 100
          })
        );
        await manager.save(ProposalPaymentTerm, terms);
        saved.paymentTerms = terms;
      }

      const result = await manager.findOne(Proposal, {
        where: { id: saved.id },
        relations: [
          'items',
          'items.leadService',
          'items.leadService.service',
          'paymentTerms',
          'lead',
          'lead.customer',
          'lead.customer.contacts',
          'lead.customer.addresses'
        ]
      });

      return result ?? saved;
    });
  }

  getTemplateDataForProposal(proposal: Proposal) {
    return this.prepareTemplateData(proposal);
  }

  async getPdfMeta(id: number) {
    const proposal = await this.getProposal(id);
    const templateData = this.getTemplateDataForProposal(proposal);

    return {
      templateData,
      downloadUrl: `/proposals/${id}/pdf`,
    };
  }

  async getTemplateTagsForProposal(id: number) {
    const proposal = await this.getProposal(id);
    const templatePath = this.getTemplatePath(proposal);

    const tags = await this.pdfTemplateService.extractDocxTemplateTags(templatePath);
    return {
      templatePath,
      tags,
    };
  }

  async previewProposal(dto: CreateProposalDto) {
    const { draft, items, totals } = await this.buildProposalDraft(dto);
    return { draft, items, totals };
  }

  async createProposalWithPdf(dto: CreateProposalDto) {
    const proposal = await this.createProposal(dto);
    const templateData = this.getTemplateDataForProposal(proposal);
    const pdfBuffer = await this.generatePdfFromTemplate(proposal.id);
    return {
      proposal,
      templateData,
      pdfBase64: pdfBuffer.toString('base64'),
    };
  }

  async createProposalWithPdfBuffer(dto: CreateProposalDto): Promise<{ proposal: Proposal; pdfBuffer: Buffer; }> {
    const proposal = await this.createProposal(dto);
    const pdfBuffer = await this.generatePdfFromTemplate(proposal.id);
    return { proposal, pdfBuffer };
  }

  async createProposalWithServices(dto: CreateProposalWithServicesDto): Promise<Proposal> {
    // Transform service assignments into proposal items
    const lead = await this.leadRepo.findOne({
      where: { id: Number(dto.leadId) },
      relations: ['leadServices', 'leadServices.service', 'customer', 'customer.contacts', 'customer.addresses']
    });

    if (!lead) throw new NotFoundException('Lead not found');

    const items: CreateProposalItemDto[] = (dto.services || []).map((service) => {
      const leadService = lead.leadServices?.find(ls => ls.service?.id === service.serviceId);
      if (!leadService) {
        throw new BadRequestException(`Service with id ${service.serviceId} is not assigned to the lead`);
      }

      const description = service.description || (leadService.deliverables ? leadService.deliverables.join(', ') : '');

      return {
        leadServiceId: leadService.id,
        serviceName: leadService.service?.name || '',
        serviceType: leadService.service?.category || '',
        description,
        startDate: leadService.startDate,
        endDate: leadService.endDate,
        amount: service.amount ?? 0,
        currency: 'INR',
        discount: 0,
        taxPercentage: 0
      };
    });

    const { services: _services, ...baseDto } = dto as any;

    return this.createProposal({
      ...baseDto,
      items,
    });
  }

  async getProposal(id: number): Promise<Proposal> {
    const proposal = await this.proposalRepo.findOne({
      where: { id },
      relations: [
        'items',
        'items.leadService',
        'items.leadService.service',
        'paymentTerms',
        'lead',
        'lead.customer',
        'lead.customer.contacts',
        'lead.customer.addresses'
      ]
    });
    if (!proposal) throw new NotFoundException('Proposal not found');
    return proposal;
  }

  async getProposals(query?: {
    leadId?: number;
    status?: PROPOSAL_STATUS;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Proposal[]; total: number; page: number; limit: number }> {
    const page = query?.page || 1;
    const limit = query?.limit || 20;

    const qb = this.proposalRepo.createQueryBuilder('proposal')
      .leftJoinAndSelect('proposal.lead', 'lead')
      .leftJoinAndSelect('lead.customer', 'customer')
      .leftJoinAndSelect('proposal.paymentTerms', 'paymentTerms')
      .leftJoinAndSelect('proposal.items', 'items');

    if (query?.leadId) {
      qb.andWhere('proposal.leadId = :leadId', { leadId: query.leadId });
    }

    if (query?.status) {
      qb.andWhere('proposal.status = :status', { status: query.status });
    }

    if (query?.search) {
      const search = `%${query.search}%`;
      qb.andWhere('(proposal.proposalReference LIKE :search OR customer.name LIKE :search OR lead.enquiryId LIKE :search)', { search });
    }

    qb.orderBy('proposal.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async updateProposal(id: number, dto: UpdateProposalDto): Promise<Proposal> {
    return this.dataSource.transaction(async (manager) => {
      const proposal = await manager.findOne(Proposal, {
        where: { id },
        relations: ['items', 'paymentTerms']
      });
      if (!proposal) throw new NotFoundException('Proposal not found');

      const { items: itemDtos, paymentTerms: termDtos, ...otherData } = dto;
      Object.assign(proposal, otherData);

      if (itemDtos) {
        await manager.delete(ProposalItem, { proposalId: id });

        let subTotal = 0;
        let totalDiscount = 0;
        let totalTaxAmount = 0;
        const items: ProposalItem[] = [];

        for (const itemDto of itemDtos) {
          const leadService = await manager.findOne(LeadService, {
            where: { id: itemDto.leadServiceId },
            relations: ['service'],
          });

          const item = manager.create(ProposalItem, {
            leadServiceId: itemDto.leadServiceId,
            serviceName: itemDto.serviceName,
            serviceType: itemDto.serviceType,
            description: itemDto.description || (leadService?.deliverables ? leadService.deliverables.join(', ') : ''),
            startDate: itemDto.startDate || leadService?.startDate,
            endDate: itemDto.endDate || leadService?.endDate,
            amount: itemDto.amount,
            currency: itemDto.currency,
            discount: itemDto.discount || 0,
            taxPercentage: itemDto.taxPercentage || 0
          });

          item.leadService = leadService;

          const discountAmt = (item.amount * item.discount) / 100;
          const taxableAmt = item.amount - discountAmt;
          const taxAmt = (taxableAmt * item.taxPercentage) / 100;

          item.discountAmount = discountAmt;
          item.taxableAmount = taxableAmt;
          item.taxAmount = taxAmt;
          item.netAmount = taxableAmt + taxAmt;

          subTotal += item.amount;
          totalDiscount += discountAmt;
          totalTaxAmount += taxAmt;
          items.push(item);
        }

        proposal.items = items;
        proposal.subTotal = subTotal;
        proposal.totalDiscount = totalDiscount;
        proposal.totalTaxAmount = totalTaxAmount;
        proposal.grandTotal = subTotal - totalDiscount + totalTaxAmount;
        if (items.length > 0) proposal.currency = items[0].currency;

        if (!dto.division) {
          proposal.division = this.deriveDivisionFromLeadServices(items);
        }
      }

      await manager.save(Proposal, proposal);

      if (termDtos) {
        await manager.delete(ProposalPaymentTerm, { proposalId: id });
        const totalPct = termDtos.reduce((s, t) => s + t.percentage, 0);
        if (Math.abs(totalPct - 100) > 0.01) {
          throw new BadRequestException('Payment term percentages must sum to 100');
        }
        const terms = termDtos.map(t =>
          manager.create(ProposalPaymentTerm, {
            proposalId: id,
            milestoneName: t.milestoneName,
            percentage: t.percentage,
            triggerEvent: t.triggerEvent,
            amount: (proposal.grandTotal * t.percentage) / 100
          })
        );
        await manager.save(ProposalPaymentTerm, terms);
      }

      return this.getProposal(id);
    });
  }

  async updateStatus(id: number, dto: UpdateProposalStatusDto): Promise<Proposal> {
    const proposal = await this.proposalRepo.findOne({ where: { id } });
    if (!proposal) throw new NotFoundException('Proposal not found');

    if (proposal.status === PROPOSAL_STATUS.APPROVED) {
      throw new BadRequestException('Approved proposals cannot be modified');
    }

    proposal.status = dto.status;
    if (dto.notes) proposal.notes = dto.notes;
    await this.proposalRepo.save(proposal);
    return this.getProposal(id);
  }

  async deleteProposal(id: number): Promise<void> {
    const proposal = await this.proposalRepo.findOne({ where: { id } });
    if (!proposal) throw new NotFoundException('Proposal not found');
    if (proposal.status === PROPOSAL_STATUS.APPROVED) {
      throw new BadRequestException('Approved proposals cannot be deleted');
    }
    await this.proposalRepo.delete(id);
  }



  async generateProposalPdf(id: number): Promise<Buffer> {
    const proposal = await this.proposalRepo.findOne({
      where: { id },
      relations: [
        'items',
        'items.leadService',
        'items.leadService.service',
        'lead',
        'lead.customer',
        'lead.customer.addresses',
        'lead.customer.contacts',
        'lead.createdBy',
        'paymentTerms',
      ],
    });

    if (!proposal) throw new NotFoundException('Proposal not found');

    const customer = proposal.lead?.customer;
    const primaryAddress =
      customer?.addresses?.find((a) => a.isPrimary) || customer?.addresses?.[0];
    const primaryContact =
      customer?.contacts?.find((c) => c.isPrimary) || customer?.contacts?.[0];
    const createdBy = proposal.lead?.createdBy;

    const data = {
      proposal: {
        proposalReference: proposal.proposalReference,
        proposalDate: proposal.proposalDate,
        validUntil: proposal.validUntil,
        submittedBy: proposal.submittedBy,
        subject: proposal.subject,
        division: proposal.division,
        currency: proposal.currency,
        totalAmount: Number(proposal.subTotal),
        taxAmount: Number(proposal.totalTaxAmount),
        grandTotal: Number(proposal.grandTotal),
        status: proposal.status,
        termsAndConditions: proposal.termsAndConditions,
        introduction: proposal.introduction,
      },
      lead: {
        enquiryId: proposal.lead?.enquiryId,
        customerName: customer?.name,
        customerAddress: primaryAddress
          ? [primaryAddress.addressLine1, primaryAddress.addressLine2]
              .filter(Boolean)
              .join(', ')
          : '',
        customerCity: primaryAddress?.city,
        customerState: primaryAddress?.state,
        customerCountry: primaryAddress?.country,
        headcount: customer?.headcount,
        businessActivities: customer?.businessActivities,
        contactPerson: primaryContact?.name,
        contactEmail: primaryContact?.email,
        contactPhone: primaryContact?.phoneNo,
      },
      items:
        proposal.items?.map((item) => ({
          serviceName:
            item.serviceName || item.leadService?.service?.name || '',
          description: item.description,
          deliverables: item.leadService?.deliverables || [],
          timeline: null,
          amount: Number(item.amount),
          currency: item.currency,
          discount: Number(item.discount),
          taxPercentage: Number(item.taxPercentage),
          netAmount: Number(item.netAmount),
        })) || [],
      paymentTerms:
        proposal.paymentTerms?.map((term) => ({
          milestoneName: term.milestoneName,
          percentage: Number(term.percentage),
          triggerEvent: term.triggerEvent,
          amount: Number(term.amount),
        })) || [],
      auth: {
        preparedBy: createdBy?.name || proposal.submittedBy || 'N/A',
        preparedByEmail: createdBy?.email || '',
        preparedByDesignation: createdBy?.roleName || '',
        preparedBySign: null,
        submittedByEntity: proposal.submittedBy || 'INTERCERT',
      },
    };

    return this.proposalReportService.generateProposalReport(data);
  }

  async generatePdfFromTemplate(id: number): Promise<Buffer> {
    const proposal = await this.getProposal(id);

    // 1. Select the correct template
    const templatePath = this.getTemplatePath(proposal);

    if (!fs.existsSync(templatePath)) {
      throw new NotFoundException(`Proposal template not found at ${templatePath}`);
    }

    // 2. Prepare data for the template
    const data = this.prepareTemplateData(proposal);

    // 3. Fill the PDF template
    return this.pdfTemplateService.fillProposalPdf(templatePath, data);
  }

  private deriveDivisionFromLeadServices(items: ProposalItem[]): PROPOSAL_DIVISION {
    const categories = items
      .map((item) => (item.leadService?.service?.category || item.serviceType || '').toString().trim().toUpperCase())
      .filter(Boolean);

    if (categories.some((c) => c.includes('GRC'))) {
      return PROPOSAL_DIVISION.GRC_DIVISION;
    }
    if (categories.some((c) => c.includes('VAPT'))) {
      return PROPOSAL_DIVISION.VAPT_DIVISION;
    }
    return PROPOSAL_DIVISION.CERTIFICATION_DIVISION;
  }

  private getTemplatePath(proposal: Proposal): string {
    const rawCountry = proposal.lead?.customer?.addresses?.[0]?.country;
    const customerCountry = rawCountry ? rawCountry.toString().trim().toUpperCase() : '';
    
    // Normalize common country representations
    const isIndia = ['INDIA', 'IND', 'IN'].includes(customerCountry);
    const isUSA = ['USA', 'US', 'UNITED STATES', 'UNITED STATES OF AMERICA'].includes(customerCountry);

    // Use the stored division from the entity.
    const isGrc = proposal.division === PROPOSAL_DIVISION.GRC_DIVISION;
    const isVapt = proposal.division === PROPOSAL_DIVISION.VAPT_DIVISION;

    let templateName = '';

    if (isIndia) {
      if (isGrc) {
        templateName = 'India GRC Proposal.pdf';
      } else if (isVapt) {
        // Handle VAPT for India if a specific template exists, otherwise default
        templateName = 'India GRC Proposal.pdf'; // Assuming GRC template for now as no VAPT specific one was listed
      } else {
        templateName = 'India Certification Divison Proposal.pdf';
      }
    } else if (isUSA) {
      if (isGrc) {
        templateName = 'USA GRC PROPOSAL.pdf';
      } else if (isVapt) {
        templateName = 'USA GRC PROPOSAL.pdf'; // Same as above
      } else {
        templateName = 'USA Certification Divison Proposal.pdf';
      }
    } else {
      // Default to India Certification if country doesn't match
      templateName = 'India Certification Divison Proposal.pdf';
    }

    return path.join(process.cwd(), 'libs', 'templates', 'Proposal', templateName);
  }

  private formatDate(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return String(date);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return String(date);
    }
  }

  private formatCurrency(amount: number, currency: string): string {
    const symbols: Record<string, string> = { INR: '₹', USD: '$', EUR: '€', ZAR: 'R' };
    const symbol = symbols[currency] || `${currency} `;
    return `${symbol}${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  private prepareTemplateData(proposal: Proposal): any {
    const customer = proposal.lead?.customer;
    const primaryContact = customer?.contacts?.find((c: any) => c.isPrimary) || customer?.contacts?.[0];
    const primaryAddress = customer?.addresses?.find((a) => a.isPrimary) || customer?.addresses?.[0];
    const createdBy = proposal.lead?.createdBy;

    const items = proposal.items?.map((item, index) => ({
      index: index + 1,
      service_name: item.serviceName || item.leadService?.service?.name || 'N/A',
      description: item.description,
      deliverables: item.leadService?.deliverables?.map(d => ({ deliverable: d })) || [],
      timeline: item.startDate || item.endDate ?
        `${this.formatDate(item.startDate)} - ${this.formatDate(item.endDate)}` :
        '3-4 Weeks',
      fee: this.formatCurrency(item.netAmount, item.currency),
    }));

    const total_fee = this.formatCurrency(proposal.grandTotal, proposal.currency);

    const companyName = customer?.name || 'N/A';
    const companyLocation = [primaryAddress?.city, primaryAddress?.state, primaryAddress?.country]
      .filter(Boolean)
      .join(', ');
    const headcount = customer?.headcount || 'N/A';
    const businessActivities = customer?.businessActivities || 'N/A';

    const scopeOfServices = items?.map(i => i.service_name).filter(Boolean) || [];

    const timelines = items?.map(i => ({
      service: i.service_name,
      timeline: i.timeline,
    }));

    const proposalReference = proposal.proposalReference;
    const proposalDateFormatted = this.formatDate(proposal.proposalDate);

    const validityDays = proposal.validUntil 
      ? Math.ceil((new Date(proposal.validUntil).getTime() - new Date(proposal.proposalDate).getTime()) / (1000 * 60 * 60 * 24))
      : 30;

    return {
      // Flat keys (kept for older templates)
      proposal_no: proposalReference,
      proposal_ref: proposalReference,
      proposal_reference: proposalReference,
      proposalNumber: proposalReference,
      proposal_number: proposalReference,
      proposal_date: proposalDateFormatted,
      dated: proposalDateFormatted,
      proposal_date_formatted: proposalDateFormatted,
      subject: proposal.subject,
      title: proposal.subject,
      division: proposal.division,
      submitted_by: proposal.submittedBy || 'INTERCERT',
      submittedBy: proposal.submittedBy || 'INTERCERT',
      prepared_by_name: createdBy?.name || proposal.submittedBy || 'N/A',
      prepared_by_email: createdBy?.email || 'info@intercert.com',

      // Structured objects (for templates using nested tags)
      proposal: {
        reference: proposalReference,
        number: proposalReference,
        date: proposalDateFormatted,
        subject: proposal.subject,
        division: proposal.division,
        submitted_by: proposal.submittedBy || 'INTERCERT',
        prepared_by_name: createdBy?.name || proposal.submittedBy || 'N/A',
        prepared_by_email: createdBy?.email || 'info@intercert.com',
        subtotal: this.formatCurrency(proposal.subTotal, proposal.currency),
        total_discount: this.formatCurrency(proposal.totalDiscount, proposal.currency),
        total_tax: this.formatCurrency(proposal.totalTaxAmount, proposal.currency),
        total_fee: total_fee,
        grand_total: total_fee,
      },

      customer: {
        name: companyName,
        location: companyLocation,
        headcount: headcount,
        business_activities: businessActivities,
        contact: primaryContact?.name || 'CEO',
      },

      // Scopes and Fees
      company_name: companyName,
      customer_name: companyName,
      company_location: companyLocation,
      customer_location: [primaryAddress?.city, primaryAddress?.country].filter(Boolean).join(', '),
      company_headcount: headcount,
      customer_headcount: headcount,
      business_activities: businessActivities,

      scope_of_services: scopeOfServices,
      scope_of_services_text: scopeOfServices.join(', '),
      timelines,
      services: items,

      total_fee: total_fee,
      subtotal: this.formatCurrency(proposal.subTotal, proposal.currency),
      total_discount: this.formatCurrency(proposal.totalDiscount, proposal.currency),
      total_tax: this.formatCurrency(proposal.totalTaxAmount, proposal.currency),

      fee_total: total_fee,
      total_amount: total_fee,
      grand_total: total_fee,
      total_amount_in_words: total_fee,
    };
  }
}
