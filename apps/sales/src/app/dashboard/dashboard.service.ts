import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In, IsNull } from 'typeorm';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { Proposal, PROPOSAL_STATUS } from '../../../../../libs/database/src/entities/proposal.entity';
import { LeadService } from '../../../../../libs/database/src/entities/lead-service.entity';
import { LEAD_STATUS, PROJECT_STATUS } from '../../../../../libs/constants/salesConstants';

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
    // 1. Total Enquiry (Total lead List)
    const totalEnquiry = await this.leadRepo.count({
      where: { isDraft: false, isActive: true },
    });

    // 2. Total Client (closer list)
    const totalClient = await this.acceptanceRepo.count();

    // 3. Pending = Total Lead list - closer list
    const pendingClients = totalEnquiry - totalClient;

    // 4. Drop client = that client has been dropped
    const dropClients = await this.leadRepo.count({
      where: { status: LEAD_STATUS.LOST, isDraft: false, isActive: true },
    });

    // 5. Pending to send invoice = That closer has not been assigned to Dept till now
    const pendingInvoices = await this.acceptanceRepo.count({
      where: [
        { department: IsNull() },
        { department: '' }
      ],
    });

    // 6. Pending to initiate project (Projects in PENDING status)
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

    // --- Overall Progress Metrics (Dynamically Calculated) ---
    const totalProjects = await this.projectRepo.count();
    const completedProjectsCount = await this.projectRepo.count({
      where: { status: PROJECT_STATUS.COMPLETED },
    });
    const completedPercentage = totalProjects > 0 ? (completedProjectsCount / totalProjects) * 100 : 0;

    const salesCount = totalClient; // Use totalClient as the sales count (accepted proposals)

    const distributedCount = await this.leadServiceRepo.count({
      where: { department: Not(IsNull()) }, // Count services assigned to a department
    });

    const returnCount = await this.proposalRepo.count({
      where: { status: In([PROPOSAL_STATUS.REJECTED, PROPOSAL_STATUS.REVISED, PROPOSAL_STATUS.EXPIRED]) },
    });

    // 7. Recently Added Enquiries
    const recentEnquiries = await this.leadRepo.find({
      where: { isDraft: false, isActive: true },
      relations: ['customer'],
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
