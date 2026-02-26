import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, FindOptionsWhere } from 'typeorm';
import { Proposal, PROPOSAL_STATUS } from '../../../../../libs/database/src/entities/proposal.entity';
import { ProposalItem } from '../../../../../libs/database/src/entities/proposal-item.entity';
import { ProposalPaymentTerm } from '../../../../../libs/database/src/entities/proposal-payment-term.entity';
import { CreateProposalDto, UpdateProposalDto } from '../../../../../libs/dtos/sales/create-proposal.dto';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepo: Repository<Proposal>,
    @InjectRepository(Lead)
    private leadRepo: Repository<Lead>,
    private dataSource: DataSource
  ) {}

  async createProposal(dto: CreateProposalDto): Promise<Proposal> {
    return this.dataSource.transaction(async (manager) => {
      const lead = await manager.findOne(Lead, { where: { id: Number(dto.leadId) } });
      if (!lead) throw new NotFoundException('Lead not found');

      // Generate Reference
      const count = await manager.count(Proposal, { where: { leadId: Number(dto.leadId) } });
      const seq = String(count + 1).padStart(2, '0');
      const reference = `PROP/${lead.enquiryId}/${seq}`;

      const proposal = manager.create(Proposal, {
        leadId: Number(dto.leadId),
        proposalReference: reference,
        proposalDate: dto.proposalDate,
        validUntil: dto.validUntil,
        submittedBy: dto.submittedBy,
        subject: dto.subject,
        introduction: dto.introduction,
        termsAndConditions: dto.termsAndConditions,
        status: PROPOSAL_STATUS.DRAFT
      });

      // Calculate totals
      let totalAmount = 0;
      let taxAmount = 0;

      const items: ProposalItem[] = [];

      for (const itemDto of dto.items) {
        const item = new ProposalItem();
        item.leadServiceId = itemDto.leadServiceId;
        item.description = itemDto.description;
        item.amount = itemDto.amount;
        item.currency = itemDto.currency;
        item.discount = itemDto.discount || 0;
        item.taxPercentage = itemDto.taxPercentage || 0;

        // Calculations
        const discountAmount = (item.amount * item.discount) / 100;
        const taxableAmount = item.amount - discountAmount;
        const itemTax = (taxableAmount * item.taxPercentage) / 100;
        item.netAmount = taxableAmount + itemTax;

        totalAmount += taxableAmount;
        taxAmount += itemTax;

        // Payment Terms
        item.paymentTerms = itemDto.paymentTerms.map(termDto => {
          const term = new ProposalPaymentTerm();
          term.milestoneName = termDto.milestoneName;
          term.percentage = termDto.percentage;
          term.triggerEvent = termDto.triggerEvent;
          term.amount = (item.netAmount * term.percentage) / 100;
          return term;
        });

        items.push(item);
      }

      proposal.items = items;
      proposal.totalAmount = totalAmount;
      proposal.taxAmount = taxAmount;
      proposal.grandTotal = totalAmount + taxAmount;
      // Assume currency from first item or default
      if (items.length > 0) {
        proposal.currency = items[0].currency;
      }

      return await manager.save(Proposal, proposal);
    });
  }

  async getProposal(id: number): Promise<Proposal> {
    return this.proposalRepo.findOne({
      where: { id },
      relations: ['items', 'items.paymentTerms', 'lead', 'items.leadService', 'items.leadService.service']
    });
  }

  async getProposals(query?: { leadId?: number; status?: PROPOSAL_STATUS }): Promise<Proposal[]> {
    const where: FindOptionsWhere<Proposal> = {};
    if (query?.leadId) where.leadId = query.leadId;
    if (query?.status) where.status = query.status;

    return this.proposalRepo.find({
      where,
      relations: ['lead'],
      order: { createdAt: 'DESC' }
    });
  }

  async updateProposal(id: number, dto: UpdateProposalDto): Promise<Proposal> {
    return this.dataSource.transaction(async (manager) => {
      const proposal = await manager.findOne(Proposal, {
        where: { id },
        relations: ['items', 'items.paymentTerms']
      });

      if (!proposal) throw new NotFoundException('Proposal not found');

      const { items: itemDtos, ...otherData } = dto;

      // Update basic fields
      Object.assign(proposal, otherData);

      if (itemDtos) {
        // Remove old items (cascade should handle it, but let's be explicit if needed)
        await manager.delete(ProposalItem, { proposalId: id });

        let totalAmount = 0;
        let taxAmount = 0;
        const items: ProposalItem[] = [];

        for (const itemDto of itemDtos) {
          const item = new ProposalItem();
          item.leadServiceId = itemDto.leadServiceId;
          item.description = itemDto.description;
          item.amount = itemDto.amount;
          item.currency = itemDto.currency;
          item.discount = itemDto.discount || 0;
          item.taxPercentage = itemDto.taxPercentage || 0;

          const discountAmount = (item.amount * item.discount) / 100;
          const taxableAmount = item.amount - discountAmount;
          const itemTax = (taxableAmount * item.taxPercentage) / 100;
          item.netAmount = taxableAmount + itemTax;

          totalAmount += taxableAmount;
          taxAmount += itemTax;

          item.paymentTerms = itemDto.paymentTerms.map(termDto => {
            const term = new ProposalPaymentTerm();
            term.milestoneName = termDto.milestoneName;
            term.percentage = termDto.percentage;
            term.triggerEvent = termDto.triggerEvent;
            term.amount = (item.netAmount * term.percentage) / 100;
            return term;
          });

          items.push(item);
        }

        proposal.items = items;
        proposal.totalAmount = totalAmount;
        proposal.taxAmount = taxAmount;
        proposal.grandTotal = totalAmount + taxAmount;
        if (items.length > 0) proposal.currency = items[0].currency;
      }

      return await manager.save(Proposal, proposal);
    });
  }

  async deleteProposal(id: number): Promise<void> {
    const result = await this.proposalRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Proposal not found');
    }
  }
}
