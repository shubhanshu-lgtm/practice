import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In, IsNull } from 'typeorm';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { Proposal, PROPOSAL_STATUS } from '../../../../../libs/database/src/entities/proposal.entity';
import { LeadService } from '../../../../../libs/database/src/entities/lead-service.entity';
import { LEAD_STATUS, PROJECT_STATUS } from '../../../../../libs/constants/salesConstants';

import { SERVICE_STATUS } from '../../../../../libs/database/src/entities/lead-service.entity';

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
    // 1. Total Client = Count of /api/leads/list (Active leads with at least one non-dropped service)
    const totalClientQb = this.leadRepo.createQueryBuilder('lead')
      .where('lead.isActive = :isActive', { isActive: true })
      .andWhere('lead.status != :lostStatus', { lostStatus: LEAD_STATUS.LOST });

    // Only count leads that have at least one service that is NOT dropped
    totalClientQb.andWhere(qb => {
      const subQuery = qb.subQuery()
        .select('1')
        .from(LeadService, 'ls')
        .where('ls.leadId = lead.id')
        .andWhere('ls.status != :droppedStatus', { droppedStatus: SERVICE_STATUS.DROPPED })
        .getQuery();
      return `EXISTS ${subQuery}`;
    });

    const totalClient = await totalClientQb.getCount();

    // 2. Completed Lead = Count of /api/closures (Accepted proposals)
    const completedLead = await this.acceptanceRepo.count();

    // 3. Pending Leads = Service List Count + Proposal List Count
    // Service List Count: Count of unique Lead + Batch pairs in assigned services
    const assignedServicesCountRaw = await this.leadServiceRepo.createQueryBuilder('ls')
      .select('COUNT(DISTINCT CONCAT(ls.leadId, "_", ls.assignmentGroupId))', 'count')
      .where('ls.status != :droppedStatus', { droppedStatus: SERVICE_STATUS.DROPPED })
      .getRawOne();
    
    // Proposal List Count: Excluding Approved and Dropped
    const activeProposalsCount = await this.proposalRepo.count({
      where: { 
        status: Not(In([PROPOSAL_STATUS.APPROVED, PROPOSAL_STATUS.DROPPED]))
      }
    });

    const pendingClients = Number(assignedServicesCountRaw?.count || 0) + activeProposalsCount;

    // 4. Drop Leads = Count of /api/leads/dropped-list (isActive = false)
    const dropClients = await this.leadRepo.count({
      where: { isActive: false },
    });

    // 5. Total Enquiry (Keep original logic for total lead count)
    const totalEnquiry = await this.leadRepo.count({
      where: { isDraft: false },
    });

    // 6. Static fields for now
    const pendingInvoices = 0; 
    const pendingActions = 0;  

    // 7. Pending Projects (Projects in PENDING status)
    const pendingProjects = await this.projectRepo.count({
      where: { status: PROJECT_STATUS.PENDING },
    });

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

    const salesCount = completedLead; 

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
      totalEnquiry,
      pendingClients,
      dropClients,
      pendingInvoices,
      pendingProjects,
      pendingActions,
      completedLead, // Adding explicitly as requested
      overallProgress: {
        completedPercentage: Math.round(completedPercentage),
        sales: salesCount,
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
