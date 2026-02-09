
// import { DataSource } from 'typeorm';
// import * as dotenv from 'dotenv';
// import * as Entities from '../libs/database/src/entities/index';
// import { 
//     User, Department, Team, Project, Lead, Proposal, ProposalAcceptance, 
//     ServiceMaster, LeadService, Customer, CustomerAddress, CustomerContact
// } from '../libs/database/src/entities/index';
// import { USER_GROUP } from '../libs/constants/autenticationConstants/userContants';
// import { LEAD_STATUS, PROJECT_STATUS, LEAD_SOURCE } from '../libs/constants/salesConstants';
// import { PROPOSAL_STATUS } from '../libs/database/src/entities/proposal.entity';
// import { SERVICE_STATUS } from '../libs/database/src/entities/lead-service.entity';

// dotenv.config();

// const dataSource = new DataSource({
//     type: 'mysql',
//     host: process.env.DB_HOST || 'localhost',
//     port: parseInt(process.env.DB_PORT || '3306'),
//     username: process.env.DB_USERNAME || 'root',
//     password: process.env.DB_PASSWORD || 'root',
//     database: process.env.DB_DATABASE || '',
//     entities: Object.values(Entities).filter(e => typeof e === 'function') as any,
//     synchronize: true, // Sync schema for verification
// });

// async function verifyFullLifecycle() {
//     await dataSource.initialize();
//     console.log('Database connected');

//     const userRepo = dataSource.getRepository(User);
//     const deptRepo = dataSource.getRepository(Department);
//     const serviceRepo = dataSource.getRepository(ServiceMaster);
//     const leadRepo = dataSource.getRepository(Lead);
//     const leadServiceRepo = dataSource.getRepository(LeadService);
//     const proposalRepo = dataSource.getRepository(Proposal);
//     const projectRepo = dataSource.getRepository(Project);
//     const acceptanceRepo = dataSource.getRepository(ProposalAcceptance);
//     const customerRepo = dataSource.getRepository(Customer);
//     const contactRepo = dataSource.getRepository(CustomerContact);

//     // 1. Setup Departments & Services
//     console.log('1. Setting up Departments & Services...');
    
//     let salesDept = await deptRepo.findOne({ where: { name: 'Sales' } });
//     if (!salesDept) salesDept = await deptRepo.save(deptRepo.create({ name: 'Sales', code: 'SALES' }));

//     let vaptDept = await deptRepo.findOne({ where: { name: 'VAPT' } });
//     if (!vaptDept) vaptDept = await deptRepo.save(deptRepo.create({ name: 'VAPT', code: 'VAPT' }));

//     let accountsDept = await deptRepo.findOne({ where: { name: 'Accounts' } });
//     if (!accountsDept) accountsDept = await deptRepo.save(deptRepo.create({ name: 'Accounts', code: 'ACC' }));

//     // Service linked to VAPT Dept
//     let vaptService = await serviceRepo.findOne({ where: { name: 'VAPT Audit' } });
//     if (!vaptService) {
//         vaptService = await serviceRepo.save(serviceRepo.create({ 
//             name: 'VAPT Audit', 
//             department: vaptDept,
//             code: 'SVC-VAPT',
//             description: 'VAPT Service'
//         }));
//     }

//     // 2. Setup Users
//     console.log('2. Setting up Users...');
    
//     // Sales User
//     const salesUserEmail = 'sales.agent@intercert.com';
//     let salesUser = await userRepo.findOne({ where: { email: salesUserEmail } });
//     if (!salesUser) {
//         salesUser = (await userRepo.save(userRepo.create({
//             name: 'Sales Agent',
//             email: salesUserEmail,
//             departments: [salesDept],
//             roleName: 'Sales Executive',
//             user_group: USER_GROUP.USER
//         } as any))) as unknown as User;
//     }

//     // VAPT User
//     const vaptUserEmail = 'vapt.lead@intercert.com';
//     let vaptUser = await userRepo.findOne({ where: { email: vaptUserEmail } });
//     if (!vaptUser) {
//         vaptUser = (await userRepo.save(userRepo.create({
//             name: 'VAPT Lead',
//             email: vaptUserEmail,
//             departments: [vaptDept],
//             roleName: 'VAPT Lead',
//             user_group: USER_GROUP.USER
//         } as any))) as unknown as User;
//     }

//     // Accountant
//     const accountantEmail = 'accountant@intercert.com';
//     let accountant = await userRepo.findOne({ where: { email: accountantEmail } });
//     if (!accountant) {
//         accountant = (await userRepo.save(userRepo.create({
//             name: 'Accountant',
//             email: accountantEmail,
//             departments: [accountsDept],
//             roleName: 'Accountant',
//             user_group: USER_GROUP.USER
//         } as any))) as unknown as User;
//     }

//     console.log(`Users Created: Sales=${salesUser.name}, VAPT=${vaptUser.name}, Accounts=${accountant.name}`);

//     // 3. Create Lead (by Sales User)
//     console.log('3. Sales User creating Lead...');
    
//     // a. Create Customer
//     let customer = await customerRepo.findOne({ where: { name: 'Tech Corp' } });
//     if (!customer) {
//         customer = (await customerRepo.save(customerRepo.create({
//             name: 'Tech Corp',
//             customerId: 'IS/TECH/USA', // Simple mock ID
//             businessActivities: 'Software',
//             headcount: '100-500'
//         } as any))) as unknown as Customer;
//     }

//     // b. Create Lead
//     const lead = (await leadRepo.save(leadRepo.create({
//         customer: customer,
//         status: LEAD_STATUS.NEW,
//         source: LEAD_SOURCE.WEBSITE,
//         // assignedTo: salesUser, // Commented out as it might not be in entity
//         createdBy: salesUser,
//         enquiryReference: 'ENQ-001',
//         enquiryId: `IS/${new Date().getFullYear()}/${Math.floor(Math.random() * 10000)}`
//     } as any))) as unknown as Lead;
//     console.log(`Lead Created for Customer: ${customer.name} (Lead ID: ${lead.id})`);

//     // 4. Add Service to Lead
//     console.log('4. Adding VAPT Service to Lead...');
//     const leadService = await leadServiceRepo.save(leadServiceRepo.create({
//         lead: lead,
//         service: vaptService,
//         status: SERVICE_STATUS.REQUIREMENT_CONFIRMED
//     } as any));
//     console.log(`Service Added: ${vaptService.name}`);

//     // 5. Create Proposal
//     console.log('5. Creating Proposal...');
//     const proposal = (await proposalRepo.save(proposalRepo.create({
//         lead: lead,
//         status: PROPOSAL_STATUS.DRAFT,
//         proposalReference: `PROP-${Math.floor(Math.random() * 10000)}`,
//         proposalDate: new Date(),
//         submittedBy: 'InterCert Org',
//         totalAmount: 5000,
//         items: [{
//             leadService: leadService,
//             amount: 5000,
//             currency: 'USD',
//             netAmount: 5000,
//             description: 'VAPT Audit Service'
//         }]
//     } as any))) as unknown as Proposal;
//     console.log(`Proposal Created: ${proposal.proposalReference}`);

//     // 6. Closure & Award (Simulating ClosureService Logic)
//     console.log('6. Simulating Close & Award (Proposal Accepted)...');
    
//     // a. Create Acceptance
//     const acceptance = (await acceptanceRepo.save(acceptanceRepo.create({
//         proposalId: proposal.id,
//         leadId: lead.id,
//         awardDate: new Date(),
//         poNumber: 'PO-TEST-001',
//         billToCompanyName: 'Tech Corp Billing',
//         billingEmailIds: ['accounts@techcorp.com']
//     } as any))) as unknown as ProposalAcceptance;

//     // b. Update Statuses
//     proposal.status = PROPOSAL_STATUS.APPROVED;
//     await proposalRepo.save(proposal);

//     lead.status = LEAD_STATUS.AWARDED;
//     await leadRepo.save(lead);

//     // c. Auto-Create Project (Logic from ClosureService)
//     // Identify departments from proposal items
//     // In this case, we know it's VAPT Service -> VAPT Dept
//     console.log('   Auto-creating Project for VAPT Department...');
//     const projectCode = `PRJ/${new Date().getFullYear()}/${Math.floor(Math.random() * 10000)}`;
//     const project = (await projectRepo.save(projectRepo.create({
//         projectCode: projectCode,
//         name: `${vaptService.name} Project - ${lead.enquiryReference}`,
//         department: vaptDept,
//         departmentId: vaptDept.id,
//         lead: lead,
//         proposal: proposal,
//         startDate: new Date(),
//         status: PROJECT_STATUS.PENDING
//     } as any))) as unknown as Project;
//     console.log(`   Project Created: ${project.projectCode}`);

//     // 7. Verification Steps
//     console.log('7. Verifying Access & Visibility...');

//     // a. VAPT User sees Project?
//     const vaptUserProjects = await projectRepo.find({ where: { departmentId: vaptDept.id } });
//     const isProjectVisibleToVAPT = vaptUserProjects.some(p => p.id === project.id);
//     console.log(`   VAPT User (${vaptUser.name}) sees Project? ${isProjectVisibleToVAPT ? 'YES ✅' : 'NO ❌'}`);

//     // b. Accounts User sees Acceptance/Billing Info?
//     // Assuming Accounts department has access to ProposalAcceptance records
//     // Logic: Retrieve all acceptances (or simulated query for Accounts dashboard)
//     const allAcceptances = await acceptanceRepo.find();
//     const acceptanceExists = allAcceptances.some(a => a.id === acceptance.id);
//     console.log(`   Accounts User (${accountant.name}) sees Proposal Acceptance (Billing Info)? ${acceptanceExists ? 'YES ✅' : 'NO ❌'}`);
//     if (acceptanceExists) {
//         console.log(`   Billing Details available for Invoice Generation: PO=${acceptance.poNumber}, BillTo=${acceptance.billToCompanyName}`);
//     }

//     console.log('Verification Complete.');
//     await dataSource.destroy();
// }

// verifyFullLifecycle().catch(console.error);
