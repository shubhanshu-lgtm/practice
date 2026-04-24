import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { Proposal, PROPOSAL_STATUS } from '../../../../../libs/database/src/entities/proposal.entity';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { Department } from '../../../../../libs/database/src/entities/department.entity';
import { LEAD_STATUS, PROJECT_STATUS, CLOSURE_STATUS } from '../../../../../libs/constants/salesConstants';
import { AssignDepartmentsDto, AssignToAccountDto, CreateClosureDto, UpdateClosureDto } from '../../../../../libs/dtos/sales/create-closure.dto';
import { S3FileService } from '../../../../../libs/S3-Service/s3File.service';

@Injectable()
export class ClosureService {
  constructor(
    @InjectRepository(ProposalAcceptance)
    private acceptanceRepo: Repository<ProposalAcceptance>,
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
    private dataSource: DataSource,
    private s3Service: S3FileService
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

  async uploadProposalFiles(proposalId: number, files: any[]): Promise<any[]> {
    const proposal = await this.dataSource.manager.findOne(Proposal, {
      where: { id: proposalId },
      relations: ['lead', 'lead.customer']
    });

    if (!proposal) {
      throw new NotFoundException('Proposal not found');
    }

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
      uploadResults.push(uploadResult);
    }

    return uploadResults;
  }

  async acceptProposal(dto: CreateClosureDto): Promise<ProposalAcceptance> {
    return this.dataSource.transaction(async (manager) => {
      // Handle poFileUrl (singular) from frontend for backward compatibility
      const poFileUrls = dto.poFileUrls || (dto as any).poFileUrl;
      if (poFileUrls && !Array.isArray(poFileUrls)) {
        dto.poFileUrls = [poFileUrls];
      } else if (Array.isArray(poFileUrls)) {
        dto.poFileUrls = poFileUrls;
      }

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

      const existing = await manager.findOne(ProposalAcceptance, {
        where: { proposalId: Number(dto.proposalId) }
      });

      // If a closure record already exists, we update it (Upsert behavior)
      if (existing) {
        Object.assign(existing, {
          awardDate: dto.awardDate,
          poNumber: dto.poNumber,
          poFileUrls: dto.poFileUrls,
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
          notes: dto.notes,
          assignmentGroupId: proposal.assignmentGroupId || null,
        });
        return await manager.save(ProposalAcceptance, existing);
      }

      // If no closure exists, we proceed with creation even if proposal status is already APPROVED
      // (This handles cases where the status was updated but the closure record is missing)
      if (dto.poFileUrls && dto.poFileUrls.length > 5) {
        throw new BadRequestException('Maximum 5 PO files are allowed');
      }

      const acceptance = manager.create(ProposalAcceptance, {
        proposalId: Number(dto.proposalId),
        leadId: Number(proposal.leadId),
        awardDate: dto.awardDate,
        poNumber: dto.poNumber,
        poFileUrls: dto.poFileUrls,
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
        closureStatus: CLOSURE_STATUS.PENDING,
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

      const assignmentMap = new Map<number, { teamId?: number; assignedToUserId?: number }>();
      if (dto.departmentAssignments && dto.departmentAssignments.length > 0) {
        for (const assignment of dto.departmentAssignments) {
          assignmentMap.set(assignment.departmentId, {
            teamId: assignment.teamId,
            assignedToUserId: assignment.assignedToUserId
          });
        }
      }

      const departmentIds = new Set<number>();
      for (const item of proposal.items) {
        const service = item.leadService?.service;
        const department = service?.department;

        if (department && !departmentIds.has(Number(department.id))) {
          departmentIds.add(Number(department.id));
          const projectCode = await this.generateProjectCode(manager);

          const overrides = assignmentMap.get(Number(department.id));

          const project = manager.create(Project, {
            projectCode,
            name: `${service.name} Project - ${lead?.enquiryId || lead?.id}`,
            department,
            departmentId: Number(department.id),
            teamId: overrides?.teamId || null,
            assignedToUserId: overrides?.assignedToUserId || null,
            lead,
            leadId: lead?.id,
            proposal,
            proposalId: proposal.id,
            closureId: savedAcceptance.id,
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
          'proposal.items.leadService',
          'proposal.items.leadService.service',
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
      .leftJoinAndSelect('proposal.items', 'proposalItems')
      .leftJoinAndSelect('proposalItems.leadService', 'leadService')
      .leftJoinAndSelect('leadService.service', 'service')
      .leftJoinAndSelect('proposal.paymentTerms', 'paymentTerms')
      .leftJoinAndSelect('closure.lead', 'lead')
      .leftJoinAndSelect('closure.accountDepartment', 'accountDepartment')
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
        'proposal.items.leadService',
        'proposal.items.leadService.service',
        'proposal.paymentTerms',
        'lead',
        'lead.customer',
        'lead.customer.contacts',
        'accountDepartment'
      ]
    });
    if (!closure) throw new NotFoundException('Closure not found');
    return closure;
  }

  async updateClosure(id: number, dto: UpdateClosureDto): Promise<ProposalAcceptance> {
    const closure = await this.acceptanceRepo.findOne({ where: { id } });
    if (!closure) throw new NotFoundException('Closure not found');

    if (dto.poFileUrls && dto.poFileUrls.length > 5) {
      throw new BadRequestException('Maximum 5 PO files are allowed');
    }

    Object.assign(closure, dto);
    await this.acceptanceRepo.save(closure);
    return this.getClosure(id);
  }

  async deleteClosure(id: number): Promise<void> {
    const closure = await this.acceptanceRepo.findOne({ where: { id } });
    if (!closure) throw new NotFoundException('Closure not found');
    await this.acceptanceRepo.delete(id);
  }

  async assignDepartmentsToProjects(
    closureId: number,
    dto: AssignDepartmentsDto
  ): Promise<{ created: Project[]; skipped: number[] }> {
    const closure = await this.acceptanceRepo.findOne({
      where: { id: closureId },
      relations: ['lead', 'proposal']
    });
    if (!closure) throw new NotFoundException('Closure not found');

    const departments = await this.departmentRepo.find({
      where: { id: In(dto.departmentIds) }
    });

    if (departments.length === 0) {
      throw new BadRequestException('No valid departments found for the provided IDs');
    }

    const foundIds = new Set(departments.map((d) => d.id));
    const missingIds = dto.departmentIds.filter((id) => !foundIds.has(id));
    if (missingIds.length > 0) {
      throw new BadRequestException(`Departments not found: ${missingIds.join(', ')}`);
    }

    const assignmentMap = new Map<number, { teamId?: number; assignedToUserId?: number }>();
    if (dto.teamAssignments && dto.teamAssignments.length > 0) {
      for (const assignment of dto.teamAssignments) {
        assignmentMap.set(assignment.departmentId, {
          teamId: assignment.teamId,
          assignedToUserId: assignment.assignedToUserId
        });
      }
    }

    const existingProjects = await this.projectRepo.find({
      where: { closureId, department: { id: In(dto.departmentIds) } },
      relations: ['department']
    });
    const alreadyAssignedDeptIds = new Set(existingProjects.map((p) => p.departmentId));

    const created: Project[] = [];
    const skipped: number[] = [];

    for (const department of departments) {
      if (alreadyAssignedDeptIds.has(department.id)) {
        skipped.push(department.id);
        continue;
      }

      const projectCode = await this.generateProjectCode(this.dataSource.manager);
      const overrides = assignmentMap.get(department.id);

      const project = this.projectRepo.create({
        projectCode,
        name: `${department.name} Project - ${closure.lead?.enquiryId || closure.leadId}`,
        departmentId: department.id,
        department,
        leadId: closure.leadId,
        proposalId: closure.proposalId,
        closureId,
        teamId: overrides?.teamId || null,
        assignedToUserId: overrides?.assignedToUserId || null,
        startDate: closure.awardDate,
        status: PROJECT_STATUS.PENDING
      });

      const saved = await this.projectRepo.save(project);
      created.push(saved);
    }

    if (created.length > 0) {
      closure.closureStatus = CLOSURE_STATUS.ASSIGNED;
      await this.acceptanceRepo.save(closure);
    }

    return { created, skipped };
  }

  async getClosureDepartments(closureId: number): Promise<{
    projects: Project[];
    departments: { id: number; name: string; code: string; projectId: number; teamId: number; status: string }[];
  }> {
    const closure = await this.acceptanceRepo.findOne({ where: { id: closureId } });
    if (!closure) throw new NotFoundException('Closure not found');

    const projects = await this.projectRepo.find({
      where: { closureId },
      relations: ['department', 'team', 'assignedToUser'],
      order: { createdAt: 'ASC' }
    });

    const departments = projects.map((p) => ({
      id: p.department?.id,
      name: p.department?.name,
      code: p.department?.code,
      projectId: p.id,
      projectCode: p.projectCode,
      teamId: p.teamId,
      teamName: (p.team as any)?.name || null,
      assignedToUserId: p.assignedToUserId,
      status: p.status
    }));

    return { projects, departments };
  }

  async assignToAccount(id: number, dto: AssignToAccountDto): Promise<ProposalAcceptance> {
    const closure = await this.acceptanceRepo.findOne({ where: { id } });
    if (!closure) throw new NotFoundException('Closure not found');

    closure.accountDepartmentId = dto.accountDepartmentId;
    if (dto.billFromEntity !== undefined) {
      closure.raisedFromEntity = dto.billFromEntity;
    }
    if (dto.notes !== undefined) {
      closure.notes = dto.notes;
    }

    await this.acceptanceRepo.save(closure);

    return this.acceptanceRepo.findOne({
      where: { id },
      relations: [
        'proposal',
        'proposal.items',
        'proposal.items.leadService',
        'proposal.items.leadService.service',
        'proposal.paymentTerms',
        'lead',
        'lead.customer',
        'lead.customer.contacts',
        'accountDepartment'
      ]
    });
  }
}
