import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { Proposal, PROPOSAL_STATUS } from '../../../../../libs/database/src/entities/proposal.entity';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { LEAD_STATUS, PROJECT_STATUS } from '../../../../../libs/constants/salesConstants';
import { CreateClosureDto } from '../../../../../libs/dtos/sales/create-closure.dto';

@Injectable()
export class ClosureService {
  constructor(
    private dataSource: DataSource
  ) {}

  private async generateProjectCode(manager: EntityManager): Promise<string> {
    const year = new Date().getFullYear();
    const count = await manager.createQueryBuilder(Project, 'project')
      .select('COUNT(project.id)', 'count')
      .where('project.projectCode LIKE :projectCode', { projectCode: `PRJ/${year}%` })
      .getRawOne();
    
    // Parse count safely
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

      // Create Acceptance
      const acceptance = manager.create(ProposalAcceptance, {
        proposalId: Number(dto.proposalId),
        leadId: Number(proposal.leadId),
        awardDate: dto.awardDate,
        poNumber: dto.poNumber,
        poFileUrl: dto.poFileUrl,
        billingNameSameAsCustomer: dto.billingNameSameAsCustomer,
        billToCompanyName: dto.billToCompanyName,
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

      // Update Proposal Status
      proposal.status = PROPOSAL_STATUS.APPROVED;
      await manager.save(Proposal, proposal);

      // Update Lead Status
      const lead = proposal.lead;
      if (lead) {
        lead.status = LEAD_STATUS.AWARDED;
        await manager.save(Lead, lead);
      }

      // Auto Create Project Record(s) based on Departments
      const createdProjects: Project[] = [];
      const departmentIds = new Set<number>();

      for (const item of proposal.items) {
        const service = item.leadService?.service;
        const department = service?.department;

        if (department && !departmentIds.has(Number(department.id))) {
          departmentIds.add(Number(department.id));

          const projectCode = await this.generateProjectCode(manager);
          
          const project = manager.create(Project, {
            projectCode: projectCode,
            name: `${service.name} Project - ${lead.enquiryReference || lead.id}`,
            department: department,
            departmentId: Number(department.id),
            lead: lead,
            leadId: lead.id,
            proposal: proposal,
            proposalId: proposal.id,
            startDate: dto.awardDate,
            status: PROJECT_STATUS.PENDING
          });

          const savedProject = await manager.save(Project, project);
          createdProjects.push(savedProject);
        }
      }

      return savedAcceptance;
    });
  }
}
