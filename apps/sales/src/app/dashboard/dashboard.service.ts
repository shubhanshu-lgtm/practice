import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In, IsNull, Brackets } from 'typeorm';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { Proposal, PROPOSAL_STATUS } from '../../../../../libs/database/src/entities/proposal.entity';
import { ProposalItem } from '../../../../../libs/database/src/entities/proposal-item.entity';
import { LeadService, SERVICE_STATUS } from '../../../../../libs/database/src/entities/lead-service.entity';
import { PROJECT_STATUS, LEAD_STATUS } from '../../../../../libs/constants/salesConstants';


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

  async getDashboardCounts() {
    // 1. Total Client = Count of active leads (Matches Client List API)
    const totalClient = await this.leadRepo.count({
      where: { isActive: true }
    });

    // 2. Completed Lead = Count of Closure List (ProposalAcceptance)
    const completedLead = await this.acceptanceRepo.count();

    // 3. Pending Leads = Service List Count + Proposal List Count
    // Service List Count (Unique Lead + Batch pairs in LeadService not in any non-dropped Proposal)
    const serviceListItems = await this.leadServiceRepo.createQueryBuilder('ls')
      .innerJoin('ls.lead', 'lead')
      .leftJoin(ProposalItem, 'pi', 'pi.leadServiceId = ls.id')
      .leftJoin(Proposal, 'p', 'p.id = pi.proposalId AND p.status != :droppedProposalStatus', { droppedProposalStatus: PROPOSAL_STATUS.DROPPED })
      .where('lead.isActive = :isActive', { isActive: true })
      .andWhere('ls.status != :droppedStatus', { droppedStatus: SERVICE_STATUS.DROPPED })
      .andWhere('p.id IS NULL')
      .select('ls.leadId, ls.assignmentGroupId')
      .groupBy('ls.leadId, ls.assignmentGroupId')
      .getRawMany();

    const proposalListCount = await this.proposalRepo.count({
      where: {
        status: Not(In([PROPOSAL_STATUS.DROPPED])),
        lead: { isActive: true }
      }
    });

    const pendingClients = serviceListItems.length + proposalListCount;

    // 4. Drop Leads = Count of leads in the dropped list (Matches Dropped List API)
    const dropClientsCount = await this.leadRepo.createQueryBuilder('lead')
      .leftJoin('lead.leadServices', 'ls')
      .leftJoin('lead.proposals', 'p')
      .where(new Brackets(qb => {
        qb.where('lead.status = :leadLostStatus', { leadLostStatus: LEAD_STATUS.LOST })
          .orWhere('p.status = :proposalDroppedStatus', { proposalDroppedStatus: PROPOSAL_STATUS.DROPPED })
          .orWhere('ls.status = :serviceDroppedStatus', { serviceDroppedStatus: SERVICE_STATUS.DROPPED });
      }))
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
