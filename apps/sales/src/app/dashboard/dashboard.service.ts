import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In, IsNull, Brackets, FindOptionsWhere } from 'typeorm';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { Proposal, PROPOSAL_STATUS } from '../../../../../libs/database/src/entities/proposal.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LeadService, SERVICE_STATUS } from '../../../../../libs/database/src/entities/lead-service.entity';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { PROJECT_STATUS, LEAD_STATUS } from '../../../../../libs/constants/salesConstants';
import { USER_GROUP } from '../../../../../libs/constants/autenticationConstants/userContants';


@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
    @InjectRepository(ProposalAcceptance)
    private readonly acceptanceRepo: Repository<ProposalAcceptance>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Proposal)
    private readonly proposalRepo: Repository<Proposal>,
    @InjectRepository(LeadService)
    private readonly leadServiceRepo: Repository<LeadService>,
  ) {}

  async getDashboardCounts(actor?: User) {
    const isAdmin = actor && [USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN, USER_GROUP.AUDIT_TEAM,
      USER_GROUP.VAPT_TEAM,USER_GROUP.ISO_TEAM, USER_GROUP.IT_SUPPORT,USER_GROUP.MANAGER, USER_GROUP.TEAM_LEAD,
      USER_GROUP.USER,USER_GROUP.GRC_TEAM
    ].includes(actor.user_group);

    // 1. Total Client = Count of active leads (Matches Client List API)
    const leadWhere: FindOptionsWhere<Lead> = { isActive: true };
    if (!isAdmin && actor?.id) {
      leadWhere.createdBy = { id: actor.id };
    }
    const totalClient = await this.leadRepo.count({
      where: leadWhere
    });

    // 2. Completed Lead = Count of Closure List (ProposalAcceptance)
    const completedLeadQuery = this.acceptanceRepo.createQueryBuilder('acceptance')
      .innerJoin('acceptance.lead', 'lead');
    
    if (!isAdmin && actor?.id) {
      completedLeadQuery.andWhere('lead.createdBy = :actorId', { actorId: actor.id });
    }
    const completedLead = await completedLeadQuery.getCount();

    // 3. Pending Leads = Service List Count + Proposal List Count
    // Service List Count (Unique Lead + Batch pairs in LeadService not in any non-dropped Proposal)
    const serviceListQuery = this.leadServiceRepo.createQueryBuilder('ls')
      .innerJoin('ls.lead', 'lead')
      .where('lead.isActive = :isActive', { isActive: true })
      .andWhere('ls.status != :droppedStatus', { droppedStatus: SERVICE_STATUS.DROPPED })
      .andWhere(`NOT EXISTS (
        SELECT 1 FROM proposal_item pi 
        INNER JOIN proposal p ON p.id = pi.proposalId 
        WHERE pi.leadServiceId = ls.id 
        AND p.status != :droppedProposalStatus
      )`, { droppedProposalStatus: PROPOSAL_STATUS.DROPPED });

    if (!isAdmin && actor?.id) {
      serviceListQuery.andWhere('lead.createdBy = :actorId', { actorId: actor.id });
    }

    const serviceListItems = await serviceListQuery
      .select('ls.leadId, ls.assignmentGroupId')
      .groupBy('ls.leadId, ls.assignmentGroupId')
      .getRawMany();

    const proposalListQuery = this.proposalRepo.createQueryBuilder('p')
      .innerJoin('p.lead', 'lead')
      .leftJoin(ProposalAcceptance, 'closure', 'closure.proposalId = p.id')
      .where('lead.isActive = :isActive', { isActive: true })
      .andWhere('p.status NOT IN (:...excludedStatuses)', { excludedStatuses: [PROPOSAL_STATUS.DROPPED, PROPOSAL_STATUS.REVISED] })
      .andWhere('closure.id IS NULL');

    if (!isAdmin && actor?.id) {
      proposalListQuery.andWhere('lead.createdBy = :actorId', { actorId: actor.id });
    }

    const proposalListCount = await proposalListQuery.getCount();

    const pendingClients = serviceListItems.length + proposalListCount;
    const assignedServiceList = serviceListItems.length;
    const proposalList = proposalListCount;

    // 4. Drop Leads = Count of leads in the dropped list (Matches Dropped List API)
    const dropClientsQuery = this.leadRepo.createQueryBuilder('lead')
      .leftJoin('lead.leadServices', 'ls')
      .where(new Brackets(qb => {
        qb.where('lead.status = :leadLostStatus', { leadLostStatus: LEAD_STATUS.LOST })
          .orWhere('ls.status = :serviceDroppedStatus', { serviceDroppedStatus: SERVICE_STATUS.DROPPED });
      }));

    if (!isAdmin && actor?.id) {
      dropClientsQuery.andWhere('lead.createdBy = :actorId', { actorId: actor.id });
    }

    const dropClientsCount = await dropClientsQuery
      .select('COUNT(DISTINCT lead.id)', 'count')
      .getRawOne();

    const dropClients = parseInt(dropClientsCount?.count || '0', 10);

    // 5. Pending Actions = 0 (Static for now)
    const pendingActions = 0;

    // 6. Pending to send invoices to A/C = 0 (Static for now)
    const pendingInvoices = 0;

    // --- Dynamic Sales Report (Last 6 Months) ---
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const salesData = await this.acceptanceRepo
      .createQueryBuilder('acceptance')
      .innerJoin('acceptance.proposal', 'proposal')
      .select("DATE_FORMAT(acceptance.awardDate, '%Y-%m')", 'monthKey')
      .addSelect('SUM(proposal.grandTotal)', 'total')
      .where('acceptance.awardDate >= :startDate', { startDate: sixMonthsAgo })
      .groupBy('monthKey')
      .orderBy('monthKey', 'ASC')
      .getRawMany();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const salesReport = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - i));
      const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const found = salesData.find((s) => s.monthKey === monthStr);
      salesReport.push({
        month: months[d.getMonth()],
        value: found ? Number(found.total) : 0,
      });
    }

    // --- Overall Progress Metrics ---
    const totalProjects = await this.projectRepo.count();
    const completedProjectsCount = await this.projectRepo.count({
      where: { status: PROJECT_STATUS.COMPLETED },
    });
    const completedPercentage = totalProjects > 0 ? (completedProjectsCount / totalProjects) * 100 : 0;

    const distributedCount = await this.leadServiceRepo.count({
      where: { department: Not(IsNull()) },
    });

    const returnCount = await this.proposalRepo.count({
      where: { status: In([PROPOSAL_STATUS.REJECTED, PROPOSAL_STATUS.REVISED, PROPOSAL_STATUS.EXPIRED]) },
    });

    // Recently Added Enquiries
    const recentEnquiries = await this.leadRepo.find({
      where: { isDraft: false },
      relations: ['customer', 'customer.contacts', 'customer.addresses'],
      order: { createdAt: 'DESC' },
      take: 5,
    });

    return {
      totalClient,
      completedLead,
      pendingClients,
      assignedServiceList,
      proposalList,
      dropClients,
      pendingActions,
      pendingInvoices,
      overallProgress: {
        completedPercentage: Math.round(completedPercentage),
        sales: completedLead,
        distributed: distributedCount,
        return: returnCount,
      },
      recentEnquiries: recentEnquiries.map((lead) => ({
        enquiryId: lead.enquiryId,
        companyName: lead.customer?.name || 'N/A',
        created: lead.createdAt,
        status: lead.status,
        contacts: lead.customer?.contacts || [],
        addresses: lead.customer?.addresses || [],
      })),
      salesReport,
    };
  }
}
