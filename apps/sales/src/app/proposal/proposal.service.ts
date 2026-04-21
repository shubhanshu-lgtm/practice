import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In, EntityManager } from 'typeorm';
import { Proposal, PROPOSAL_STATUS, PROPOSAL_DIVISION, SUBMITTED_BY } from '../../../../../libs/database/src/entities/proposal.entity';
import { ProposalItem } from '../../../../../libs/database/src/entities/proposal-item.entity';
import { ProposalPaymentTerm } from '../../../../../libs/database/src/entities/proposal-payment-term.entity';
import {
  CreateProposalDto,
  CreateProposalItemDto,
  UpdateProposalDto,
  UpdateProposalStatusDto
} from '../../../../../libs/dtos/sales/create-proposal.dto';
//import { CreateProposalWithServicesDto } from '../../../../../libs/dtos/sales/create-proposal-with-services.dto';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadService } from '../../../../../libs/database/src/entities/lead-service.entity';
//import PDFDocument from 'pdfkit';
import { ProposalFile } from '../../../../../libs/database/src/entities/proposal-file.entity';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { ProposalReportService } from './proposal-report.service';
import { PdfTemplateService } from '../../../../../libs/templates/pdf-template.service';
import { S3FileService } from '../../../../../libs/S3-Service/s3File.service';
import * as path from 'path';
import * as fs from 'fs';
import { SERVICE_STATUS } from '../../../../../libs/constants/serviceConstants';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { USER_GROUP } from '../../../../../libs/constants/autenticationConstants/userContants';
//import * as os from 'os';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepo: Repository<Proposal>,
    @InjectRepository(Lead)
    private leadRepo: Repository<Lead>,
    @InjectRepository(ProposalFile)
    private proposalFileRepo: Repository<ProposalFile>,
    private dataSource: DataSource,
    private proposalReportService: ProposalReportService,
    private pdfTemplateService: PdfTemplateService,
    private s3Service: S3FileService,
  ) {}

  private async buildProposalDraft(dto: CreateProposalDto, lead?: Lead): Promise<{
    draft: Partial<Proposal>;
    items: ProposalItem[];
    totals: { subTotal: number; totalDiscount: number; totalTaxAmount: number; grandTotal: number; };
  }> {
    // Ensure the lead record is available (with service assignments) for draft generation.
    if (!lead) {
      const isNumeric = !isNaN(Number(dto.leadId));
      const where = isNumeric ? { id: Number(dto.leadId) } : { enquiryId: dto.leadId as string };
      lead = await this.leadRepo.findOne({
        where,
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
        where: { leadId: lead.id },
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

      if (!leadService) {
        const availableIds = leadServices?.map(ls => ls.id) || [];
        throw new BadRequestException(
          `Service with ID ${itemDto.leadServiceId} is not assigned to this lead (Lead ID: ${lead.id}). ` +
          `Assigned Service IDs for this lead are: ${availableIds.join(', ')}`
        );
      }

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

    // Use the assignmentGroupId from the DTO if provided, otherwise resolve it from services
    const assignmentGroupId = dto.assignmentGroupId || this.resolveAssignmentGroupIdFromLeadServices(
      leadServices,
      itemsDto.map((item) => item.leadServiceId)
    );

    const draft: Partial<Proposal> = {
      leadId: lead.id,
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
      assignmentGroupId,
    };

    return { draft, items: itemEntities, totals: { subTotal, totalDiscount, totalTaxAmount, grandTotal } };
  }

  async createProposal(dto: CreateProposalDto): Promise<Proposal> {
    return this.dataSource.transaction(async (manager) => {
      const isNumeric = !isNaN(Number(dto.leadId));
      const where = isNumeric ? { id: Number(dto.leadId) } : { enquiryId: dto.leadId as string };
      const lead = await manager.findOne(Lead, { where });
      if (!lead) throw new NotFoundException('Lead not found');

      // --- Fresh Proposal Creation ---
      // We always create a new proposal record on POST. This allows users to generate 
      // separate proposals for different services in the same batch at different times.
      // If a user wants to add services to an existing draft, they should use the PATCH endpoint.
      
      const count = await manager.count(Proposal, { where: { leadId: lead.id } });
      const seq = String(count + 1).padStart(2, '0');
      const reference = `PROP/${lead.enquiryId || 'UNKNOWN'}/${seq}`;

      const { draft, items } = await this.buildProposalDraft(dto, lead);

      const proposal = manager.create(Proposal, {
        ...draft,
        leadId: lead.id,
        proposalReference: reference,
        version: 1, // Fresh proposals start at version 1
        status: PROPOSAL_STATUS.DRAFT,
        items,
      });

      const saved = await manager.save(Proposal, proposal);

      for (const item of saved.items) {
        const itemDto = dto.items.find(i => i.leadServiceId === item.leadServiceId);
        if (itemDto && itemDto.paymentTerms && itemDto.paymentTerms.length > 0) {
          const totalPct = itemDto.paymentTerms.reduce((s, t) => s + t.percentage, 0);
          if (Math.abs(totalPct - 100) > 0.01) {
            throw new BadRequestException(`Payment term percentages for service ${item.serviceName} must sum to 100`);
          }

          const terms: ProposalPaymentTerm[] = itemDto.paymentTerms.map(t =>
            manager.create(ProposalPaymentTerm, {
              proposalId: saved.id,
              proposalItemId: item.id,
              milestoneName: t.milestoneName,
              percentage: t.percentage,
              triggerEvent: t.triggerEvent,
              amount: (item.netAmount * t.percentage) / 100
            })
          );
          await manager.save(ProposalPaymentTerm, terms);
        }
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
    const pdfBuffer = await this.generatePdfFromTemplate(proposal.id);
    
    // Upload to S3 with structured path
    const year = new Date().getFullYear().toString();
    const companyName = proposal.lead?.customer?.name || 'Unknown_Company';
    const fileName = `${proposal.proposalReference.replace(/\//g, '_')}.pdf`;
    
    const uploadResult = await this.s3Service.uploadProposalPdf(
      pdfBuffer,
      fileName,
      year,
      companyName
    );

    // Create proposal file record
    const proposalFile = this.proposalFileRepo.create({
      proposalId: proposal.id,
      fileUrl: uploadResult.viewUrl,
      fileName: fileName
    });
    await this.proposalFileRepo.save(proposalFile);

    return {
      proposal,
      pdfUrl: uploadResult.viewUrl,
      pdfBase64: pdfBuffer.toString('base64'),
    };
  }


  //  async createProposalWithPdf(dto: CreateProposalDto) {
  //   const proposal = await this.createProposal(dto);
  //   const templateData = this.getTemplateDataForProposal(proposal);
  //   const pdfBuffer = await this.generatePdfFromTemplate(proposal.id);
  //   return {
  //     proposal,
  //     templateData,
  //     pdfBase64: pdfBuffer.toString('base64'),
  //   };
  // }

  async createProposalWithPdfBuffer(dto: CreateProposalDto): Promise<{ proposal: Proposal; pdfBuffer: Buffer; }> {
    const proposal = await this.createProposal(dto);
    const pdfBuffer = await this.generatePdfFromTemplate(proposal.id);

   // Upload to S3 with structured path
    const year = new Date().getFullYear().toString();
    const companyName = proposal.lead?.customer?.name || 'Unknown_Company';
    const fileName = `${proposal.proposalReference.replace(/\//g, '_')}.pdf`;

    const uploadResult = await this.s3Service.uploadProposalPdf(
      pdfBuffer,
      fileName,
      year,
      companyName
    );

    // Create proposal file record
    const proposalFile = this.proposalFileRepo.create({
      proposalId: proposal.id,
      fileUrl: uploadResult.viewUrl,
      fileName: fileName
    });
    await this.proposalFileRepo.save(proposalFile);

    return { proposal, pdfBuffer };
  }

  // async createProposalWithServices(dto: CreateProposalWithServicesDto): Promise<Proposal> {
  //   // Transform service assignments into proposal items
  //   const lead = await this.leadRepo.findOne({
  //     where: { id: Number(dto.leadId) },
  //     relations: ['leadServices', 'leadServices.service', 'customer', 'customer.contacts', 'customer.addresses']
  //   });

  //   if (!lead) throw new NotFoundException('Lead not found');

  //   const items: CreateProposalItemDto[] = (dto.services || []).map((service) => {
  //     const leadService = lead.leadServices?.find(ls => ls.service?.id === service.serviceId);
  //     if (!leadService) {
  //       throw new BadRequestException(`Service with id ${service.serviceId} is not assigned to the lead`);
  //     }

  //     const description = service.description || (leadService.deliverables ? leadService.deliverables.join(', ') : '');

  //     return {
  //       leadServiceId: leadService.id,
  //       serviceName: leadService.service?.name || '',
  //       serviceType: leadService.service?.category || '',
  //       description,
  //       startDate: leadService.startDate,
  //       endDate: leadService.endDate,
  //       amount: service.amount ?? 0,
  //       currency: 'INR',
  //       discount: 0,
  //       taxPercentage: 0
  //     };
  //   });

  //   const { services: _services, ...baseDto } = dto as any;

  //   return this.createProposal({
  //     ...baseDto,
  //     items,
  //   });
  // }

  async getProposal(id: number): Promise<Proposal> {
    const proposal = await this.proposalRepo.findOne({
      where: { 
        id,
        lead: { isActive: true }
      },
      relations: [
        'items',
        'items.leadService',
        'items.leadService.service',
        'paymentTerms',
        'files',
        'lead',
        'lead.contacts',
        'lead.addresses',
        'lead.customer',
        'lead.customer.contacts',
        'lead.customer.addresses'
      ]
    });
    if (!proposal) throw new NotFoundException('Proposal not found');
    return proposal;
  }

  async uploadProposalFiles(proposalId: number, files: any[]): Promise<any[]> {
    const proposal = await this.getProposal(proposalId);
    const companyName = proposal.lead?.customer?.name || 'Unknown_Company';
    const year = new Date().getFullYear().toString();

    const uploadResults = [];
    for (const file of files) {
      const uploadResult = await this.s3Service.uploadProposalPdf(
        file.buffer,
        file.originalname,
        year,
        companyName
      );
      
      // Create a document record for each file
      const doc = this.proposalFileRepo.create({
        proposalId,
        fileUrl: uploadResult.viewUrl,
        fileName: file.originalname
      });
      await this.proposalFileRepo.save(doc);
      
      uploadResults.push(uploadResult);
    }

    return uploadResults;
  }

  async uploadSignature(file: any): Promise<any> {
    return this.s3Service.uploadSignature(file.buffer, file.originalname);
  }

  async uploadAuditorFile(file: any): Promise<any> {
    return this.s3Service.uploadAuditorFile(file.buffer, file.originalname);
  }

  async getProposals(
    query?: {
      leadId?: string | number;
      assignmentGroupId?: string;
      status?: PROPOSAL_STATUS;
      search?: string;
      page?: number;
      limit?: number;
    },
    actor?: User
  ): Promise<{ data: Proposal[]; total: number; page: number; limit: number }> {
    const page = query?.page || 1;
    const limit = query?.limit || 20;

    const isAdmin = actor && [USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN, USER_GROUP.AUDIT_TEAM,
      USER_GROUP.VAPT_TEAM, USER_GROUP.ISO_TEAM, USER_GROUP.IT_SUPPORT, USER_GROUP.MANAGER, USER_GROUP.TEAM_LEAD,
      USER_GROUP.USER, USER_GROUP.GRC_TEAM
    ].includes(actor.user_group);

    const qb = this.proposalRepo.createQueryBuilder('proposal')
      .leftJoinAndSelect('proposal.lead', 'lead')
      .leftJoinAndSelect('lead.customer', 'customer')
      .leftJoinAndSelect('lead.contacts', 'leadContacts')
      .leftJoinAndSelect('lead.addresses', 'leadAddresses')
      .leftJoinAndSelect('customer.contacts', 'customerContacts')
      .leftJoinAndSelect('customer.addresses', 'customerAddresses')
      .leftJoinAndSelect('proposal.paymentTerms', 'paymentTerms')
      .leftJoinAndSelect('proposal.files', 'files')
      .leftJoinAndSelect('proposal.items', 'items')
      .leftJoinAndSelect('items.leadService', 'leadService')
      .leftJoinAndSelect('leadService.service', 'service')
      .leftJoin(ProposalAcceptance, 'closure', 'closure.proposalId = proposal.id')
      .where('lead.isActive = :isActive', { isActive: true })
      .andWhere('proposal.status != :droppedStatus', { droppedStatus: PROPOSAL_STATUS.DROPPED })
      .andWhere('closure.id IS NULL');

    if (!isAdmin && actor?.id) {
      qb.andWhere('lead.createdBy = :actorId', { actorId: actor.id });
    }

    if (query?.leadId) {
      const isNumeric = !isNaN(Number(query.leadId));
      if (isNumeric) {
        qb.andWhere('proposal.leadId = :leadId', { leadId: Number(query.leadId) });
      } else {
        qb.andWhere('lead.enquiryId = :enquiryId', { enquiryId: query.leadId });
      }
    }

    if (query?.assignmentGroupId) {
      qb.andWhere('proposal.assignmentGroupId = :assignmentGroupId', { assignmentGroupId: query.assignmentGroupId });
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

  async getProposalVersions(query?: {
    leadId?: string | number;
    assignmentGroupId?: string;
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
      .leftJoinAndSelect('proposal.files', 'files')
      .leftJoinAndSelect('proposal.items', 'items')
      .leftJoinAndSelect('items.leadService', 'leadService')
      .leftJoinAndSelect('leadService.service', 'service')
      .where('lead.isActive = :isActive', { isActive: true });

    if (query?.leadId) {
      const isNumeric = !isNaN(Number(query.leadId));
      if (isNumeric) {
        qb.andWhere('proposal.leadId = :leadId', { leadId: Number(query.leadId) });
      } else {
        qb.andWhere('lead.enquiryId = :enquiryId', { enquiryId: query.leadId });
      }
    }

    if (query?.assignmentGroupId) {
      qb.andWhere('proposal.assignmentGroupId = :assignmentGroupId', { assignmentGroupId: query.assignmentGroupId });
    }

    if (query?.status) {
      qb.andWhere('proposal.status = :status', { status: query.status });
    }

    if (query?.search) {
      const search = `%${query.search}%`;
      qb.andWhere('(proposal.proposalReference LIKE :search OR customer.name LIKE :search OR lead.enquiryId LIKE :search)', { search });
    }

    qb.orderBy('proposal.version', 'DESC')
      .addOrderBy('proposal.updatedAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async getLeadServiceStatuses(leadId: string | number): Promise<{
    available: LeadService[];
    proposed: Array<LeadService & { proposalId: number; proposalReference: string; proposalStatus: string }>;
    closed: Array<LeadService & { proposalId: number; proposalReference: string; closureId?: number }>;
  }> {
    const isNumeric = !isNaN(Number(leadId));
    const whereLead = isNumeric ? { id: Number(leadId) } : { enquiryId: leadId as string };
    const lead = await this.leadRepo.findOne({ where: whereLead });
    if (!lead) throw new NotFoundException('Lead not found');

    const leadServices = await this.dataSource.getRepository(LeadService).find({
      where: { leadId: lead.id },
      relations: ['service'],
    });

    const proposals = await this.proposalRepo.find({
      where: { leadId: lead.id },
      relations: ['items'],
      order: { id: 'DESC' },
    });

    const closureMap = new Map<number, number>();
    if (proposals.some(p => p.status === PROPOSAL_STATUS.APPROVED)) {
      const approvedIds = proposals
        .filter(p => p.status === PROPOSAL_STATUS.APPROVED)
        .map(p => p.id);
      const closures = await this.dataSource
        .getRepository(ProposalAcceptance)
        .find({ where: { proposalId: In(approvedIds) } });
      for (const c of closures) {
        closureMap.set(Number(c.proposalId), Number(c.id));
      }
    }

    const serviceStatusMap = new Map<number, {
      proposalId: number;
      proposalReference: string;
      proposalStatus: string;
      closureId?: number;
    }>();

    for (const proposal of proposals) {
      for (const item of proposal.items || []) {
        if (!serviceStatusMap.has(item.leadServiceId)) {
          const closureId = closureMap.get(proposal.id);
          serviceStatusMap.set(item.leadServiceId, {
            proposalId: proposal.id,
            proposalReference: proposal.proposalReference,
            proposalStatus: proposal.status,
            closureId,
          });
        }
      }
    }

    const available: LeadService[] = [];
    const proposed: Array<LeadService & { proposalId: number; proposalReference: string; proposalStatus: string }> = [];
    const closed: Array<LeadService & { proposalId: number; proposalReference: string; closureId?: number }> = [];

    for (const ls of leadServices) {
      const info = serviceStatusMap.get(ls.id);
      if (!info) {
        available.push(ls);
      } else if (info.proposalStatus === PROPOSAL_STATUS.APPROVED) {
        closed.push({ ...ls, proposalId: info.proposalId, proposalReference: info.proposalReference, closureId: info.closureId });
      } else if (info.proposalStatus !== PROPOSAL_STATUS.DROPPED) {
        proposed.push({ ...ls, proposalId: info.proposalId, proposalReference: info.proposalReference, proposalStatus: info.proposalStatus });
      }
    }

    return { available, proposed, closed };
  }

  async updateProposal(id: number, dto: UpdateProposalDto): Promise<Proposal> {
    return this.dataSource.transaction(async (manager) => {
      // 1. Fetch the existing proposal (to be archived as REVISED)
      const oldProposal = await manager.findOne(Proposal, {
        where: { id },
        relations: ['items', 'paymentTerms', 'files']
      });
      if (!oldProposal) throw new NotFoundException('Proposal not found');

      // 2. Mark old proposal as REVISED
      oldProposal.status = PROPOSAL_STATUS.REVISED;
      await manager.save(Proposal, oldProposal);

      // 3. Prepare data for the NEW proposal version
      const { items: itemDtos, leadId, ...otherData } = dto;
      
      // Resolve numeric leadId
      let resolvedLeadId = oldProposal.leadId;
      if (leadId) {
        const isNumeric = !isNaN(Number(leadId));
        const whereLead = isNumeric ? { id: Number(leadId) } : { enquiryId: leadId as string };
        const lead = await manager.findOne(Lead, { where: whereLead });
        if (!lead) throw new NotFoundException('Lead not found');
        resolvedLeadId = lead.id;
      }

      // Create NEW proposal instance (cloning fields from old one + updates from DTO)
      const newProposal = manager.create(Proposal, {
        ...oldProposal,
        id: undefined, // Ensure a new record is created
        ...otherData,
        leadId: resolvedLeadId,
        version: (oldProposal.version || 1) + 1,
        status: PROPOSAL_STATUS.DRAFT, // New versions start as Draft or keep status? Usually Draft for revision
        createdAt: undefined,
        updatedAt: undefined,
      });

      // Save the new proposal first to get an ID
      const savedProposal = await manager.save(Proposal, newProposal);

      // 4. Handle Items and Payment Terms for the NEW version
      const itemsToProcess = itemDtos || oldProposal.items?.map(item => ({
        leadServiceId: item.leadServiceId,
        serviceName: item.serviceName,
        serviceType: item.serviceType,
        description: item.description,
        startDate: item.startDate,
        endDate: item.endDate,
        amount: item.amount,
        currency: item.currency,
        discount: item.discount,
        taxPercentage: item.taxPercentage,
        paymentTerms: oldProposal.paymentTerms
          ?.filter(pt => pt.proposalItemId === item.id)
          .map(pt => ({
            milestoneName: pt.milestoneName,
            percentage: pt.percentage,
            triggerEvent: pt.triggerEvent
          }))
      }));

      if (itemsToProcess) {
        let subTotal = 0;
        let totalDiscount = 0;
        let totalTaxAmount = 0;
        const savedItems: ProposalItem[] = [];

        for (const itemDto of itemsToProcess) {
          const leadService = await manager.findOne(LeadService, {
            where: { id: itemDto.leadServiceId, leadId: resolvedLeadId },
            relations: ['service'],
          });

          if (!leadService) {
            throw new BadRequestException(`Service with ID ${itemDto.leadServiceId} is not assigned to the lead.`);
          }

          const item = manager.create(ProposalItem, {
            proposalId: savedProposal.id,
            leadServiceId: itemDto.leadServiceId,
            serviceName: itemDto.serviceName || leadService?.service?.name || '',
            serviceType: itemDto.serviceType || leadService?.service?.category || '',
            description: itemDto.description || (leadService?.deliverables ? leadService.deliverables.join(', ') : ''),
            startDate: itemDto.startDate || leadService?.startDate,
            endDate: itemDto.endDate || leadService?.endDate,
            amount: itemDto.amount,
            currency: itemDto.currency || 'INR',
            discount: itemDto.discount !== undefined ? itemDto.discount : 0,
            taxPercentage: itemDto.taxPercentage !== undefined ? itemDto.taxPercentage : 0
          });

          const discountAmt = (item.amount * item.discount) / 100;
          const taxableAmt = item.amount - discountAmt;
          const taxAmt = (taxableAmt * item.taxPercentage) / 100;

          item.discountAmount = discountAmt;
          item.taxableAmount = taxableAmt;
          item.taxAmount = taxAmt;
          item.netAmount = taxableAmt + taxAmt;

          const savedItem = await manager.save(ProposalItem, item);
          savedItems.push(savedItem);

          subTotal += Number(savedItem.amount);
          totalDiscount += discountAmt;
          totalTaxAmount += taxAmt;
        }

        // Save payment terms for the new items
        for (const item of savedItems) {
          const itemDto = itemsToProcess.find(i => i.leadServiceId === item.leadServiceId);
          if (itemDto && itemDto.paymentTerms && itemDto.paymentTerms.length > 0) {
            const terms: ProposalPaymentTerm[] = itemDto.paymentTerms.map(t =>
              manager.create(ProposalPaymentTerm, {
                proposalId: savedProposal.id,
                proposalItemId: item.id,
                milestoneName: t.milestoneName,
                percentage: t.percentage,
                triggerEvent: t.triggerEvent,
                amount: (item.netAmount * t.percentage) / 100
              })
            );
            await manager.save(ProposalPaymentTerm, terms);
          }
        }

        // Update totals on the new proposal
        savedProposal.subTotal = subTotal;
        savedProposal.totalDiscount = totalDiscount;
        savedProposal.totalTaxAmount = totalTaxAmount;
        savedProposal.grandTotal = subTotal - totalDiscount + totalTaxAmount;
        if (savedItems.length > 0) savedProposal.currency = savedItems[0].currency;
        savedProposal.division = this.deriveDivisionFromLeadServices(savedItems);
        
        if (!dto.assignmentGroupId) {
          savedProposal.assignmentGroupId = await this.resolveProposalAssignmentGroupId(manager, savedItems.map(i => i.leadServiceId));
        }

        await manager.save(Proposal, savedProposal);
      }

      // 5. Clone existing files to the new proposal version
      if (oldProposal.files && oldProposal.files.length > 0) {
        const newFiles = oldProposal.files.map(f => manager.create(ProposalFile, {
          proposalId: savedProposal.id,
          fileName: f.fileName,
          fileUrl: f.fileUrl
        }));
        await manager.save(ProposalFile, newFiles);
      }

      return this.getProposal(savedProposal.id);
    });
  }

  async updateStatus(id: number, dto: UpdateProposalStatusDto): Promise<Proposal> {
    const proposal = await this.proposalRepo.findOne({ 
      where: { id },
      relations: ['items']
    });
    if (!proposal) throw new NotFoundException('Proposal not found');

    if (proposal.status === PROPOSAL_STATUS.APPROVED) {
      throw new BadRequestException('Approved proposals cannot be modified');
    }

    proposal.status = dto.status;
    if (dto.notes) proposal.notes = dto.notes;

    // If status is DROPPED, also mark all associated lead services as DROPPED
    if (dto.status === PROPOSAL_STATUS.DROPPED) {
      const leadServiceIds = proposal.items?.map(item => item.leadServiceId).filter(Boolean);
      if (leadServiceIds && leadServiceIds.length > 0) {
        await this.dataSource.getRepository(LeadService).update(
          { id: In(leadServiceIds) },
          { status: SERVICE_STATUS.DROPPED }
        );
      }
    }

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
          timeline: item.leadService?.timeline || item.leadService?.service?.description || 'N/A',
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

  private resolveAssignmentGroupIdFromLeadServices(leadServices: LeadService[], leadServiceIds: number[]): string | null {
    const assignmentGroupIds = leadServiceIds
      .map(id => leadServices.find(ls => ls.id === id)?.assignmentGroupId)
      .filter((id): id is string => Boolean(id));
    const uniqueGroups = [...new Set(assignmentGroupIds)];
    return uniqueGroups.length === 1 ? uniqueGroups[0] : null;
  }

  private async resolveProposalAssignmentGroupId(manager: EntityManager, leadServiceIds: number[]): Promise<string | null> {
    if (!leadServiceIds || leadServiceIds.length === 0) {
      return null;
    }
    const uniqueServiceIds = [...new Set(leadServiceIds)];
    const leadServices = await manager.find(LeadService, { where: { id: In(uniqueServiceIds) } });
    const groupIds = leadServices
      .map(ls => ls.assignmentGroupId)
      .filter((id): id is string => Boolean(id));
    const uniqueGroups = [...new Set(groupIds)];
    return uniqueGroups.length === 1 ? uniqueGroups[0] : null;
  }

  private getTemplatePath(proposal: Proposal): string {
    const primaryAddress = proposal.lead?.customer?.addresses?.find(a => a.isPrimary) || proposal.lead?.customer?.addresses?.[0];
    const rawCountry = primaryAddress?.country;
    const customerCountry = rawCountry ? rawCountry.toString().trim().toUpperCase() : '';
    
    // Normalize common country representations
    const isIndia = ['INDIA', 'IND', 'IN'].includes(customerCountry);

    // Use the stored division from the entity.
    const isCertification = proposal.division === PROPOSAL_DIVISION.CERTIFICATION_DIVISION;

    let templateName = '';

    if (isIndia) {
      if (isCertification) {
        templateName = 'India Certification Divison Proposal.pdf';
      } else {
        // GRC, VAPT, or any other division for India
        templateName = 'India GRC Proposal.pdf';
      }
    } else {
      // For any other country (e.g. USA)
      if (isCertification) {
        templateName = 'USA Certification Divison Proposal.pdf';
      } else {
        // GRC, VAPT, or any other division for other countries
        templateName = 'USA GRC PROPOSAL.pdf';
      }
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
      serviceName: item.serviceName || item.leadService?.service?.name || 'N/A',
      serviceType: item.serviceType || item.leadService?.service?.category || 'N/A',
      description: item.description,
      startDate: item.startDate ? this.formatDate(item.startDate) : null,
      endDate: item.endDate ? this.formatDate(item.endDate) : null,
      amount: this.formatCurrency(item.amount, item.currency),
      currency: item.currency,
      discount: `${Number(item.discount).toFixed(2)}%`,
      taxPercentage: `${Number(item.taxPercentage).toFixed(2)}%`,
      discountAmount: this.formatCurrency(item.discountAmount, item.currency),
      taxableAmount: this.formatCurrency(item.taxableAmount, item.currency),
      taxAmount: this.formatCurrency(item.taxAmount, item.currency),
      netAmount: this.formatCurrency(item.netAmount, item.currency),
      deliverables: item.leadService?.deliverables?.map(d => ({ deliverable: d })) || [],
      timeline: item.leadService?.timeline || item.leadService?.service?.description || 'N/A',
    }));

    const total_fee = this.formatCurrency(proposal.grandTotal, proposal.currency);

    const companyName = customer?.name || 'N/A';
    const companyLocation = primaryAddress ? 
      `${primaryAddress.addressLine1}${primaryAddress.addressLine2 ? ', ' + primaryAddress.addressLine2 : ''}, ${primaryAddress.city}, ${primaryAddress.state}, ${primaryAddress.country} - ${primaryAddress.postalCode}` : 
      'N/A';
    
    const headcount = customer?.headcount || 'N/A';
    const businessActivities = customer?.businessActivities || 'N/A';

    const scopeOfServices = items?.map(i => i.serviceName).filter(Boolean) || [];

    const proposalReference = proposal.proposalReference;
    const proposalDateFormatted = this.formatDate(proposal.proposalDate);

    const validityDays = proposal.validUntil 
      ? Math.ceil((new Date(proposal.validUntil).getTime() - new Date(proposal.proposalDate).getTime()) / (1000 * 60 * 60 * 24))
      : 30;

    return {
      // Direct field requirements
      division: proposal.division,
      subject: proposal.subject,
      submittedTo: companyName,
      proposalNo: proposalReference,
      proposalId: proposalReference,
      submittedBy: proposal.submittedBy,
      proposalDate: proposalDateFormatted,
      currency: proposal.currency,

      // Scoping
      scoping: {
        locations_and_headcounts: companyLocation,
        headcount: headcount,
        businessActivities: businessActivities,
        scopeOfServices: scopeOfServices.join(', '),
      },

      // Project Deliverables & timelines (A.3)
      project_deliverables: items?.map(i => ({
        service: i.serviceName,
        deliverables: i.deliverables
      })),
      timelines: items?.map(i => ({
        service: i.serviceName,
        timeline: i.timeline
      })),

      // Table data
      items: items,

      // Auth & Summary
      prepared_by_name: createdBy?.name || proposal.submittedBy || 'N/A',
      prepared_by_email: createdBy?.email || 'info@intercert.com',
      validity_days: validityDays,
      subtotal: this.formatCurrency(proposal.subTotal, proposal.currency),
      total_discount: this.formatCurrency(proposal.totalDiscount, proposal.currency),
      total_tax: this.formatCurrency(proposal.totalTaxAmount, proposal.currency),
      grand_total: total_fee,
      
      // Kept for older template compatibility
      customer: {
        name: companyName,
        location: companyLocation,
        headcount: headcount,
        business_activities: businessActivities,
        contact: primaryContact?.name || 'CEO',
      },
    };
  }
}
