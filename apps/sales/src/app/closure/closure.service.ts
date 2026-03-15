import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { Proposal, PROPOSAL_STATUS } from '../../../../../libs/database/src/entities/proposal.entity';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { LEAD_STATUS, PROJECT_STATUS } from '../../../../../libs/constants/salesConstants';
import { CreateClosureDto, UpdateClosureDto } from '../../../../../libs/dtos/sales/create-closure.dto';

@Injectable()
export class ClosureService {
  constructor(
    @InjectRepository(ProposalAcceptance)
    private acceptanceRepo: Repository<ProposalAcceptance>,
    private dataSource: DataSource
  ) {}

  private async generateProjectCode(manager: EntityManager): Promise<string> {
    const year = new Date().getFullYear();
    const count = await manager.createQueryBuilder(Project, 'project')
      .select('COUNT(project.id)', 'count')
      .where('project.projectCode LIKE :projectCode', { projectCode: `PRJ/${year}%` })
      .getRawOne();

    const countVal = count ? Number(count.count) : 0;
    const seq = String(countVal + 1).padStart(3, '0');
    return `PRJ/${year}/${seq}`;
  }

  async acceptProposal(dto: CreateClosureDto): Promise<ProposalAcceptance> {
    return this.dataSource.transaction(async (manager) => {
      const proposal = await manager.findOne(Proposal, {
        where: { id: Number(dto.proposalId) },
        relations: [
          'lead',
          'lead.customer',
          'items',
          'items.leadService',
          'items.leadService.service',
          'items.leadService.service.department'
        ]
      });

      if (!proposal) throw new NotFoundException('Proposal not found');
      if (proposal.status === PROPOSAL_STATUS.APPROVED) {
        throw new BadRequestException('Proposal already accepted');
      }

      const existing = await manager.findOne(ProposalAcceptance, {
        where: { proposalId: Number(dto.proposalId) }
      });
      if (existing) throw new BadRequestException('Closure already exists for this proposal');

      const acceptance = manager.create(ProposalAcceptance, {
        proposalId: Number(dto.proposalId),
        leadId: Number(proposal.leadId),
        awardDate: dto.awardDate,
        poNumber: dto.poNumber,
        poFileUrl: dto.poFileUrl,
        billingNameSameAsCustomer: dto.billingNameSameAsCustomer,
        billToCompanyName: dto.billToCompanyName || proposal.lead?.customer?.name,
        billToAddress: dto.billToAddress,
        gstNumber: dto.gstNumber,
        gstType: dto.gstType,
        billingEmailIds: dto.billingEmailIds,
        billingContactPerson: dto.billingContactPerson,
        raisedFromEntity: dto.raisedFromEntity,
        invoiceServices: dto.invoiceServices,
        department: dto.department,
        notes: dto.notes
      });
      const savedAcceptance = await manager.save(ProposalAcceptance, acceptance);

      proposal.status = PROPOSAL_STATUS.APPROVED;
      await manager.save(Proposal, proposal);

      const lead = proposal.lead;
      if (lead) {
        lead.status = LEAD_STATUS.AWARDED;
        await manager.save(Lead, lead);
      }

      const departmentIds = new Set<number>();
      for (const item of proposal.items) {
        const service = item.leadService?.service;
        const department = service?.department;

        if (department && !departmentIds.has(Number(department.id))) {
          departmentIds.add(Number(department.id));
          const projectCode = await this.generateProjectCode(manager);

          const project = manager.create(Project, {
            projectCode,
            name: `${service.name} Project - ${lead?.enquiryId || lead?.id}`,
            department,
            departmentId: Number(department.id),
            lead,
            leadId: lead?.id,
            proposal,
            proposalId: proposal.id,
            startDate: dto.awardDate,
            status: PROJECT_STATUS.PENDING
          });
          await manager.save(Project, project);
        }
      }

      const result = await manager.findOne(ProposalAcceptance, {
        where: { id: savedAcceptance.id },
        relations: [
          'proposal',
          'proposal.items',
          'proposal.paymentTerms',
          'lead',
          'lead.customer',
          'lead.customer.contacts'
        ]
      });

      return result ?? savedAcceptance;
    });
  }

  async getClosures(query?: {
    leadId?: number;
    page?: number;
    limit?: number;
  }): Promise<{ data: ProposalAcceptance[]; total: number; page: number; limit: number }> {
    const page = query?.page || 1;
    const limit = query?.limit || 20;

    const qb = this.acceptanceRepo.createQueryBuilder('closure')
      .leftJoinAndSelect('closure.proposal', 'proposal')
      .leftJoinAndSelect('closure.lead', 'lead')
      .leftJoinAndSelect('lead.customer', 'customer')
      .orderBy('closure.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (query?.leadId) {
      qb.where('closure.leadId = :leadId', { leadId: query.leadId });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async getClosure(id: number): Promise<ProposalAcceptance> {
    const closure = await this.acceptanceRepo.findOne({
      where: { id },
      relations: [
        'proposal',
        'proposal.items',
        'proposal.paymentTerms',
        'lead',
        'lead.customer',
        'lead.customer.contacts'
      ]
    });
    if (!closure) throw new NotFoundException('Closure not found');
    return closure;
  }

  async updateClosure(id: number, dto: UpdateClosureDto): Promise<ProposalAcceptance> {
    const closure = await this.acceptanceRepo.findOne({ where: { id } });
    if (!closure) throw new NotFoundException('Closure not found');

    Object.assign(closure, dto);
    await this.acceptanceRepo.save(closure);
    return this.getClosure(id);
  }

  async deleteClosure(id: number): Promise<void> {
    const closure = await this.acceptanceRepo.findOne({ where: { id } });
    if (!closure) throw new NotFoundException('Closure not found');
    await this.acceptanceRepo.delete(id);
  }
}
