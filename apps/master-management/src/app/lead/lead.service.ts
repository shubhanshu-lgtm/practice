import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository, IsNull, FindOptionsWhere, Not, Brackets, In } from 'typeorm';
import { Customer } from '../../../../../libs/database/src/entities/customer.entity';
import { CustomerAddress } from '../../../../../libs/database/src/entities/customerAddress.entity';
import { CustomerContact } from '../../../../../libs/database/src/entities/customerContact.entity';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadContact } from '../../../../../libs/database/src/entities/lead-contact.entity';
import { LeadAddress } from '../../../../../libs/database/src/entities/lead-address.entity';
import { LeadService as LeadServiceEntity } from '../../../../../libs/database/src/entities/lead-service.entity';
import { LeadFollowUp } from '../../../../../libs/database/src/entities/lead-followup.entity';
import { AuditLog } from '../../../../../libs/database/src/entities/audit-log.entity';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { ServiceMaster } from '../../../../../libs/database/src/entities/service-master.entity';
import { ServiceDeliverable } from '../../../../../libs/database/src/entities/service-deliverable.entity';
import { PermissionManager } from '../../../../../libs/database/src/entities/permissionManager.entity';
import { Department } from '../../../../../libs/database/src/entities/department.entity';
import { ProposalItem } from '../../../../../libs/database/src/entities/proposal-item.entity';
import { Proposal } from '../../../../../libs/database/src/entities/proposal.entity';
import { PROPOSAL_STATUS } from '../../../../../libs/constants/salesConstants';
import { S3FileService } from '../../../../../libs/S3-Service/s3File.service';
import { CreateLeadDto, UpdateLeadDto, CreateServiceDto, UpdateServiceDto, CreatePermissionDto, GetPermissionDto, CreateDeliverableDto, UpdateDeliverableDto, GetServicesFilterDto, CreateLeadFollowUpDto, UpdateLeadFollowUpDto, GetLeadFollowUpsDto, GetAssignedServicesFilterDto, DropLeadDto, RollbackLeadDto } from '../../../../../libs/dtos/master_management/lead.dto';
import { LEAD_SOURCE, LEAD_STATUS } from '../../../../../libs/constants/salesConstants';
import { USER_GROUP } from '../../../../../libs/constants/autenticationConstants/userContants';
import { SERVICE_TYPE, SERVICE_ACCESS_LEVEL, CATEGORY_TYPE, SERVICE_STATUS } from '../../../../../libs/constants/serviceConstants';
import { IPagination, IPaginationObject } from '../../../../../libs/interfaces/commonTypes/custom.interface';
import { paginate } from '../../../../../libs/utils/basicUtils';

interface ServiceAssignment {
  serviceId: number;
  description?: string;
  timeline: string;
  deliverables?: string[];
  remarks?: string;
  ownerId?: number;
  departmentId?: number;
  status?: SERVICE_STATUS;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class LeadService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(LeadContact)
    private readonly leadContactRepository: Repository<LeadContact>,
    @InjectRepository(LeadAddress)
    private readonly leadAddressRepository: Repository<LeadAddress>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(CustomerAddress)
    private readonly addressRepository: Repository<CustomerAddress>,
    @InjectRepository(CustomerContact)
    private readonly contactRepository: Repository<CustomerContact>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ServiceMaster)
    private readonly serviceRepository: Repository<ServiceMaster>,
    @InjectRepository(LeadServiceEntity)
    private readonly leadServiceEntityRepository: Repository<LeadServiceEntity>,
    @InjectRepository(LeadFollowUp)
    private readonly followUpRepository: Repository<LeadFollowUp>,
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
    @InjectRepository(PermissionManager)
    private readonly permissionRepository: Repository<PermissionManager>,
    @InjectRepository(ServiceDeliverable)
    private readonly deliverableRepository: Repository<ServiceDeliverable>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(ProposalItem)
    private readonly proposalItemRepository: Repository<ProposalItem>,
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
    private readonly s3Service: S3FileService,
  ) {}

  // private buildServiceTree(services: ServiceMaster[]) {
  //   type ServiceTreeNode = ServiceMaster & { children: ServiceTreeNode[] };
  //   const nodes = new Map<number, ServiceTreeNode>();
  //   for (const s of services) {
  //     nodes.set(s.id, { ...s, children: [] });
  //   }
  //   const roots: ServiceTreeNode[] = [];
  //   for (const node of nodes.values()) {
  //     const parentId = node.parentId;
  //     if (parentId && nodes.has(parentId)) {
  //       nodes.get(parentId).children.push(node);
  //     } else {
  //       roots.push(node);
  //     }
  //   }
  //   return roots;
  // }

  private deduplicateDeliverables(service: ServiceMaster): ServiceMaster {
    if (service?.deliverables?.length) {
      const seen = new Set<string>();
      service.deliverables = service.deliverables
        .sort((a, b) => a.id - b.id)
        .filter(d => {
          const key = `${d.serviceId}::${d.name}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
    }
    return service;
  }

  private async generateEnquiryId(companyName: string): Promise<string> {
    const today = new Date();
    
    // 1. Clean the company name: remove common suffixes and non-alphanumeric chars
    const cleanedName = (companyName || 'UNK')
      .replace(/(?:pvt ltd|private limited|ltd|limited|inc|corp|llp)/gi, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .trim()
      .toUpperCase();

    // 2. Find similar companies to determine differentiation length
    // We start by looking for names that share the first 4 characters
    const initialPrefix = cleanedName.substring(0, 4);
    const similarCustomers = await this.customerRepository.find({
      where: { name: Like(`${initialPrefix}%`) },
      select: ['name']
    });

    // Default prefix length is 4 (or less if name is shorter)
    let requiredLength = Math.min(cleanedName.length, 4);
    
    // Compare with each similar company to find the first point of difference
    for (const customer of similarCustomers) {
      const otherCleaned = customer.name
        .replace(/(?:pvt ltd|private limited|ltd|limited|inc|corp|llp)/gi, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .trim()
        .toUpperCase();

      // Skip if it's the exact same company name (cleaned)
      if (otherCleaned === cleanedName) continue;

      let i = 0;
      // Find the first index where characters differ
      while (i < cleanedName.length && i < otherCleaned.length && cleanedName[i] === otherCleaned[i]) {
        i++;
      }
      // The prefix needs to include the differing character
      requiredLength = Math.max(requiredLength, i + 1);
    }

    // Ensure we don't exceed the cleaned name's length
    const prefix = cleanedName.substring(0, Math.min(cleanedName.length, requiredLength));
    
    const yyyy = today.getFullYear().toString();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');   

    return `${prefix}${yyyy}${mm}${dd}${hh}${min}${ss}`;
  }

  private generateCustomerId(companyName: string, country: string): string {
    const comp = companyName.substring(0, 4).toUpperCase().replace(/\s/g, '');
    const cnt = country.substring(0, 3).toUpperCase();
    return `IS/${comp}/${cnt}`;
  }

  private generateAssignmentGroupId(): string {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
    const randomSegment = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `BATCH-${dateStr}-${randomSegment}`;
  }

  private async generateUniqueCustomerId(companyName: string, country: string, excludeCustomerId?: number): Promise<string> {
    const base = this.generateCustomerId(companyName, country);
    const existing = await this.customerRepository.find({
      where: excludeCustomerId
        ? { customerId: Like(`${base}%`), id: Not(excludeCustomerId) }
        : { customerId: Like(`${base}%`) }
    });
    if (existing.length === 0) return base;

    let maxSuffix = 0;
    for (const c of existing) {
      if (c.customerId === base) {
        maxSuffix = Math.max(maxSuffix, 1);
        continue;
      }
      if (c.customerId.startsWith(`${base}/`)) {
        const suffix = Number(c.customerId.split('/').pop());
        if (!Number.isNaN(suffix)) {
          maxSuffix = Math.max(maxSuffix, suffix);
        }
      }
    }
    return `${base}/${maxSuffix + 1}`;
  }

  async createLead(payload: CreateLeadDto, userId?: number): Promise<any> {
    try {
      // Validate meta based on source
      this.validateLeadSourceMeta(payload);

      const companyName = payload.customer?.name || (payload.customerId ? (await this.customerRepository.findOne({ where: { id: payload.customerId } }))?.name : 'UNK') || 'UNK';
      const enquiryId = await this.generateEnquiryId(companyName);
      
      let customer: Customer | null = null;
      if (payload.customerId) {
        customer = await this.customerRepository.findOne({ where: { id: payload.customerId } });
        if (!customer) {
          throw new BadRequestException(`Customer with ID ${payload.customerId} not found`);
        }
      } else if (payload.customer) {
        const existingCustomer = await this.customerRepository.findOne({
          where: { name: payload.customer.name }
        });
        
        if (existingCustomer) {
          customer = existingCustomer;
          // Update customer if info provided
          if (payload.customer.businessActivities) {
            customer.businessActivities = payload.customer.businessActivities;
          }
          if (payload.customer.headcount) {
            customer.headcount = payload.customer.headcount;
          }
          await this.customerRepository.save(customer);
        } else {
          const primaryAddress = payload.addresses?.find(addr => addr.isPrimary) || payload.addresses?.[0];
          const country = primaryAddress?.country || 'IND';
          const customerId = await this.generateUniqueCustomerId(payload.customer.name || 'UNK', country);
          
          const newCustomer = this.customerRepository.create({
            ...payload.customer,
            customerId
          });
          customer = await this.customerRepository.save(newCustomer);
          
          if (!customer || !customer.id) {
            throw new BadRequestException('Failed to create customer');
          }
          
          if (payload.addresses && payload.addresses.length > 0) {
            const addresses = payload.addresses.map(addr => 
              this.addressRepository.create({ ...addr, customer: customer as Customer })
            );
            await this.addressRepository.save(addresses);
          }
        }
        
        if (payload.contacts && payload.contacts.length > 0) {
          const contacts = payload.contacts.map((contact) =>
            this.contactRepository.create({
              ...contact,
              customer: customer as Customer,
            }),
          );
          await this.contactRepository.save(contacts);
        }
      } else {
        throw new BadRequestException('Either customerId or customer data must be provided');
      }

      let createdBy: User | null = null;
      const createdById = userId || payload.createdBy;
      if (createdById) {
        createdBy = await this.userRepository.findOne({ where: { id: createdById } });
      }

      let services: ServiceMaster[] = [];
      if (payload.serviceIds && payload.serviceIds.length > 0) {
        services = await this.serviceRepository.find({ where: { id: In(payload.serviceIds) } });
      }

      const lead = this.leadRepository.create({
        enquiryId,
        enquiryReference: payload.enquiryReference,
        source: payload.source as LEAD_SOURCE,
        sourceDescription: payload.sourceDescription,
        sourceDetail: payload.sourceDetail,
        meta: payload.meta,
        //status: (payload.status as LEAD_STATUS) || LEAD_STATUS.NEW,
        notes: payload.notes,
        isDraft: payload.isDraft || false,
        customer: customer as Customer,
        createdBy: createdBy as User,
      });

      const savedLead = await this.leadRepository.save(lead);

      if (payload.contacts && payload.contacts.length > 0) {
        const leadContacts = payload.contacts.map(contact =>
          this.leadContactRepository.create({
            ...contact,
            lead: savedLead,
            leadId: savedLead.id
          })
        );
        await this.leadContactRepository.save(leadContacts);
      }

      if (payload.addresses && payload.addresses.length > 0) {
        const leadAddresses = payload.addresses.map(addr => {
          const { addressType, ...rest } = addr;
          return this.leadAddressRepository.create({
            ...rest,
            addressType: addressType,
            lead: savedLead,
            leadId: savedLead.id
          });
        });
        await this.leadAddressRepository.save(leadAddresses);
      }

      if (services.length > 0) {
        const assignmentGroupId = this.generateAssignmentGroupId();
        const leadServices = services.map(service => 
          this.leadServiceEntityRepository.create({
            lead: savedLead,
            service: service,
            assignmentGroupId,
            timeline:service.timeline || 'TBD'// Default value for required field
          })
        );
        await this.leadServiceEntityRepository.save(leadServices);
      }
      
      const fullLead = await this.leadRepository.findOne({
        where: { id: savedLead.id },
          relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
    });

      if (!fullLead) {
        throw new BadRequestException('Lead not found after save');
      }

      return this.formatLeadServicesSummary(fullLead);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private validateLeadSourceMeta(payload: CreateLeadDto | UpdateLeadDto) {
    const { source, meta } = payload;

    if (source === LEAD_SOURCE.SOCIAL_MEDIA) {
      if (!meta?.platform) {
        throw new BadRequestException('Social Media Platform is required in meta');
      }
    }

    if (source === LEAD_SOURCE.DIRECT) {
      if (!meta?.spokePerson) {
        throw new BadRequestException('Spoke Person is required in meta for Direct source');
      }
    }

    if (source === LEAD_SOURCE.ASSOCIATES) {
      if (!meta?.associateName || !meta?.spokePerson) {
        throw new BadRequestException('Associate Name and Spoke Person are required in meta');
      }
    }

    if (source === LEAD_SOURCE.B2B) {
      if (!meta?.partner || !meta?.spokePerson) {
        throw new BadRequestException('B2B Partner and Spoke Person are required in meta');
      }
    }
  }

  async getLeads(actor?: User, pagination?: IPagination): Promise<IPaginationObject> {
    try {
      const page = pagination?.page ?? 1;
      const pageSize = pagination?.pageSize ?? 20;
      const { currentPage, limit, offset } = paginate(page, pageSize);

      const isAdmin = actor && [USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group);
      const where: FindOptionsWhere<Lead> = { isActive: true };
      if (!isAdmin && actor?.id) {
        where.createdBy = { id: actor.id };
      }

      const [leads, total] = await this.leadRepository.findAndCount({ 
        where,
          relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service'],        skip: offset,
        take: limit,
        order: { createdAt: 'DESC' }
      });

      const totalPages = Math.ceil(total / limit);

      return {
        docs: leads.map(lead => this.formatLeadServicesSummary(lead, false)),
        page: currentPage,
        limit: limit,
        totalDocs: total,
        totalPages: totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Fetch dropped leads (Status = LOST)
   */
  async getDroppedLeads(actor?: User, pagination?: IPagination): Promise<IPaginationObject> {
    try {
      const page = pagination?.page ?? 1;
      const pageSize = pagination?.pageSize ?? 20;
      const { currentPage, limit, offset } = paginate(page, pageSize);

      const isAdmin = actor && [USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group);
      
      const query = this.leadRepository.createQueryBuilder('lead')
        .leftJoinAndSelect('lead.customer', 'customer')
        .leftJoinAndSelect('customer.contacts', 'customerContacts')
        .leftJoinAndSelect('customer.addresses', 'customerAddresses')
        .leftJoinAndSelect('lead.createdBy', 'createdBy')
        .leftJoinAndSelect('lead.leadServices', 'leadServices')
        .leftJoinAndSelect('leadServices.service', 'service')
        .leftJoinAndSelect('lead.proposals', 'proposals')
        .where(new Brackets(qb => {
          qb.where('lead.status = :leadLostStatus', { leadLostStatus: LEAD_STATUS.LOST })
            .orWhere('proposals.status = :proposalDroppedStatus', { proposalDroppedStatus: PROPOSAL_STATUS.DROPPED });
        }));

      if (!isAdmin && actor?.id) {
        query.andWhere('createdBy.id = :actorId', { actorId: actor.id });
      }

      const [leads, total] = await query
        .orderBy('lead.createdAt', 'DESC')
        .skip(offset)
        .take(limit)
        .getManyAndCount();

      const totalPages = Math.ceil(total / limit);

      return {
        docs: leads.map(lead => this.formatLeadServicesSummary(lead)),
        page: currentPage,
        limit: limit,
        totalDocs: total,
        totalPages: totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async getServices(filter?: GetServicesFilterDto): Promise<IPaginationObject> {
    try {
      const { currentPage, limit, offset } = paginate(filter?.page ?? 1, filter?.pageSize ?? 20);

      const baseWhere: FindOptionsWhere<ServiceMaster> = { isActive: true };
      if (filter?.parentId !== undefined && filter.parentId !== null) {
        baseWhere.parentId = filter.parentId;
      } else if (filter?.rootOnly) {
        baseWhere.parentId = IsNull();
      }
      let where: FindOptionsWhere<ServiceMaster> | FindOptionsWhere<ServiceMaster>[];
      if (filter?.category) {
        where = [
          { ...baseWhere, category: filter.category },
          { ...baseWhere, name: filter.category },
          { ...baseWhere, code: filter.category },
        ];
      } else {
        where = baseWhere;
      }
      const relations = filter?.includeChildren
        ? ['parent', 'children', 'department', 'deliverables']
        : ['parent', 'department', 'deliverables'];
      
      let [services, total] = await this.serviceRepository.findAndCount({
        where,
        relations,
        order: { sortOrder: 'ASC', name: 'ASC' },
        skip: offset,
        take: limit
      });

      if (filter?.userGroup) {
        const group = filter.userGroup;
        services = services.filter(s => s.accessLevel === SERVICE_ACCESS_LEVEL.PUBLIC || (s.allowedUserGroups || []).includes(group));
        total = services.length;
      }

      const totalPages = Math.ceil(total / limit);

      return {
        docs: services.map(s => this.deduplicateDeliverables(s)),
        page: currentPage,
        limit: limit,
        totalDocs: total,
        totalPages: totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  private buildServiceTree(services: ServiceMaster[]) {
    type ServiceTreeNode = ServiceMaster & { children: ServiceTreeNode[] };
    const nodes = new Map<number, ServiceTreeNode>();
    for (const s of services) {
      nodes.set(s.id, { ...s, children: [] });
    }
    const tree: ServiceTreeNode[] = [];
    for (const s of services) {
      const node = nodes.get(s.id);
      if (node) {
        if (s.parentId && nodes.has(s.parentId)) {
          nodes.get(s.parentId)?.children.push(node);
        } else {
          tree.push(node);
        }
      }
    }
    return tree;
  }

  async getServicesTree(filter?: GetServicesFilterDto) {
    try {
      const baseWhere: FindOptionsWhere<ServiceMaster> = { isActive: true };
      let where: FindOptionsWhere<ServiceMaster> | FindOptionsWhere<ServiceMaster>[];
      if (filter?.category) {
        where = [
          { ...baseWhere, category: filter.category },
          { ...baseWhere, name: filter.category },
          { ...baseWhere, code: filter.category },
        ];
      } else {
        where = baseWhere;
      }
      const services = await this.serviceRepository.find({
        where,
        relations: ['parent'],
        order: { sortOrder: 'ASC', name: 'ASC' }
      });
      const filtered = filter?.userGroup
        ? services.filter(s => s.accessLevel === SERVICE_ACCESS_LEVEL.PUBLIC || (s.allowedUserGroups || []).includes(filter.userGroup as string))
        : services;
      return this.buildServiceTree(filtered);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async getServiceChildren(parentId: number) {
    try {
      const services = await this.serviceRepository.find({
        where: { parentId, isActive: true },
        relations: ['parent', 'department', 'deliverables'],
        order: { sortOrder: 'ASC', name: 'ASC' }
      });
      return services.map(s => this.deduplicateDeliverables(s));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addServiceCategory(payload: CreateServiceDto, type: CATEGORY_TYPE, file?: { originalname?: string; buffer?: Buffer }) {
    try {
      const categoryValue = payload.service_category || payload.category;
      if (!categoryValue || typeof categoryValue !== 'string') {
        throw new BadRequestException('service_category is required');
      }

      if (type === CATEGORY_TYPE.CATEGORY) {
        payload.parentId = undefined;
      }

      if (type === CATEGORY_TYPE.SUB_CATEGORY && !payload.parentId) {
        const parentCategory = await this.serviceRepository.findOne({
          where: [
            { name: categoryValue },
            { code: categoryValue },
            { category: categoryValue, parentId: IsNull() },
          ]
        });
        if (parentCategory) {
          payload.parentId = parentCategory.id;
        }
      }

      const trimmedName = payload.name?.trim();
      const trimmedCode = payload.code?.trim();

      // update payload with trimmed values
      payload.name = trimmedName;
      payload.code = trimmedCode;

      // allow creating sub-categories if parentId provided
      let logoUrl: string = payload.logo || '';
      if (file && file.buffer && file.originalname) {
        // upload to s3 and use returned view URL
        try {
          const uploadResult = await this.s3Service.uploadImage(file.buffer, file.originalname);
          // uploadImage returns an object with viewUrl/downloadUrl etc
          logoUrl = uploadResult.viewUrl || logoUrl;
        } catch (err) {
          // fail silently, we'll just fall back to original name
          console.warn('S3 upload failed for category logo', err.message || err);
        }
      }

      const servicePayload: CreateServiceDto = {
        ...payload,
        // keep any incoming parentId (may be undefined) so subcategory logic works
        parentId: payload.parentId,
        category: categoryValue,
        logo: logoUrl,
      };
      const created = await this.createService(servicePayload);
      const message = payload.parentId ? 'Service sub-category created successfully' : 'Service category created successfully';
      return { message, data: created };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Return list of root-level service categories along with their children.
   * Optional name filter will search against category/name/code on the root entries.
   */
  async getCategoryAllList(name?: string) {
    try {
      const qb = this.serviceRepository.createQueryBuilder('service')
        .where('service.parentId IS NULL');

      if (name) {
        // filter by category string, name or code
        qb.andWhere(
          '(service.category = :name OR service.name = :name OR service.code = :name)',
          { name },
        );
      }

      qb.leftJoinAndSelect('service.children', 'children')
        .orderBy('service.sortOrder', 'ASC')
        .addOrderBy('service.name', 'ASC');

      const categories = await qb.getMany();
      return categories;
        } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Fetch services by category type (Category or Sub-Category)
   * If type is Sub-Category and parentId or categoryName is provided, returns children of that specific parent.
   */
  async getServicesByCategory(type: CATEGORY_TYPE, parentId?: number, categoryName?: string) {
    try {
      const qb = this.serviceRepository.createQueryBuilder('service')
        .leftJoinAndSelect('service.parent', 'parent')
        .leftJoinAndSelect('service.department', 'department')
        .leftJoinAndSelect('service.deliverables', 'deliverables')
        .where('service.isActive = :isActive', { isActive: true });

      if (type === CATEGORY_TYPE.CATEGORY) {
        qb.andWhere('service.parentId IS NULL');
        if (categoryName) {
          qb.andWhere(new Brackets(pqb => {
            pqb.where('service.name LIKE :name', { name: `%${categoryName}%` })
               .orWhere('service.code LIKE :name', { name: `%${categoryName}%` })
               .orWhere('service.category LIKE :name', { name: `%${categoryName}%` });
          }));
        }
      } else if (type === CATEGORY_TYPE.SUB_CATEGORY) {
        if (parentId) {
          qb.andWhere('service.parentId = :parentId', { parentId });
        } else if (categoryName) {
          // Exact match for parent category to avoid "dirty" results
          qb.andWhere(new Brackets(pqb => {
            pqb.where('parent.name = :catName', { catName: categoryName })
               .orWhere('parent.code = :catName', { catName: categoryName })
               .orWhere('parent.category = :catName', { catName: categoryName });
          }));
          qb.andWhere('service.parentId IS NOT NULL');
        } else {
          qb.andWhere('service.parentId IS NOT NULL');
        }
      }

      qb.orderBy('service.sortOrder', 'ASC').addOrderBy('service.name', 'ASC');

      return await qb.getMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLeadById(id: string, actor?: User): Promise<any> {
    try {
      const isNumeric = !isNaN(Number(id));
      const where = isNumeric ? { id: Number(id) } : { enquiryId: id };

      const lead = await this.leadRepository.findOne({
        where,
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
      });

      if (!lead || !lead.isActive) {
        throw new NotFoundException('Lead not found');
      }

      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        if (!lead.createdBy || lead.createdBy.id !== actor.id) {
          throw new NotFoundException('Lead not found');
        }
      }

      return this.formatLeadServicesSummary(lead);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteLead(id: string, hard = false, actor?: User): Promise<void> {
    try {
      const isNumeric = !isNaN(Number(id));
      const where = isNumeric ? { id: Number(id) } : { enquiryId: id };

      const lead = await this.leadRepository.findOne({ where, relations: ['createdBy'] });
      if (!lead || !lead.isActive) {
        throw new NotFoundException('Lead not found');
      }
      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        if (!lead.createdBy || lead.createdBy.id !== actor.id) {
          throw new NotFoundException('Lead not found');
        }
      }

      if (hard) {
        // Manually delete lead services as they don't have cascade delete
        await this.leadServiceEntityRepository.delete({ lead: { id: lead.id } });
        await this.leadRepository.remove(lead);
      } else {
        lead.isActive = false;
        await this.leadRepository.save(lead);
      }
    } catch (error) { 
      throw new BadRequestException(error.message);
    }
  }

async dropLead(id: string, payload: DropLeadDto, actor?: User): Promise<Lead> {
    return await this.dataSource.transaction(async (manager) => {
      const isNumeric = !isNaN(Number(id));
      const where = isNumeric ? { id: Number(id) } : { enquiryId: id };

      const lead = await manager.findOne(Lead, { where, relations: ['createdBy'] });
      if (!lead || !lead.isActive) {
        throw new NotFoundException('Lead not found');
      }
      if (lead.status === LEAD_STATUS.LOST) {
        throw new BadRequestException('Lead is already dropped');
      }
      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        if (!lead.createdBy || lead.createdBy.id !== actor.id) {
          throw new NotFoundException('Lead not found');
        }
      }

      // Update all LeadServices to DROPPED
      await manager.update(LeadServiceEntity, { leadId: lead.id }, { 
        status: SERVICE_STATUS.DROPPED 
      });

      // Update all Proposals to REJECTED with drop reason
      const dropReasonNote = `[REJECTED DUE TO LEAD DROP] Lead Drop Reason: ${payload.reason}`;
      await manager.getRepository(Proposal).update({ 
        leadId: lead.id 
      }, { 
        status: PROPOSAL_STATUS.REJECTED as any,
        notes: payload.notes 
          ? `${dropReasonNote} | Additional Notes: ${payload.notes}`
          : dropReasonNote
      });

      // Update lead
      lead.status = LEAD_STATUS.LOST;
      lead.isActive = false;
      const droppedNote = `[DROPPED] Reason: ${payload.reason}`;
      lead.notes = payload.notes
        ? `${droppedNote} | Notes: ${payload.notes}`
        : droppedNote;
      const savedLead = await manager.save(lead);

      // Return full lead with relations
      return await manager.findOne(Lead, {
        where: { id: savedLead.id },
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
      }) as Lead;
    });
  }

async rollbackLead(id: string, payload: RollbackLeadDto, actor?: User): Promise<Lead> {
    return await this.dataSource.transaction(async (manager) => {
      const isNumeric = !isNaN(Number(id));
      const where = isNumeric ? { id: Number(id) } : { enquiryId: id };

      const lead = await manager.findOne(Lead, { where, relations: ['createdBy'] });
      if (!lead || lead.status !== LEAD_STATUS.LOST) {
        throw new BadRequestException('Lead must be in LOST status to rollback');
      }
      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        if (!lead.createdBy || lead.createdBy.id !== actor.id) {
          throw new NotFoundException('Lead not found');
        }
      }

      // Rollback LeadServices to REQUIREMENT_CONFIRMED
      await manager.update(LeadServiceEntity, { leadId: lead.id }, { 
        status: SERVICE_STATUS.REQUIREMENT_CONFIRMED 
      });

      // Rollback Proposals to DRAFT
      const rollbackNote = `[ROLLEDBACK] Rollback Reason: ${payload.reason}`;
      await manager.getRepository(Proposal).update({ 
        leadId: lead.id 
      }, { 
        status: PROPOSAL_STATUS.DRAFT as any,
        notes: payload.notes 
          ? `${rollbackNote} | Notes: ${payload.notes}`
          : rollbackNote
      });

      // Rollback lead
      lead.status = LEAD_STATUS.SERVICES;
      lead.isActive = true;
      const rollbackLeadNote = `[ROLLEDBACK from LOST] Reason: ${payload.reason}`;
      lead.notes = payload.notes 
        ? `${rollbackLeadNote} | Notes: ${payload.notes}`
        : rollbackLeadNote;
      const savedLead = await manager.save(lead);

      // Return full lead
      return await manager.findOne(Lead, {
        where: { id: savedLead.id },
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
      }) as Lead;
    });
  }



  async updateLead(id: string, payload: UpdateLeadDto, actor?: User): Promise<any> {
    try {
      const isNumeric = !isNaN(Number(id));
      const where = isNumeric ? { id: Number(id) } : { enquiryId: id };

      // Validate meta based on source if provided
      if (payload.source || payload.meta) {
        // Create a temporary object to validate against the logic
        const tempLead = await this.leadRepository.findOne({ where });
        const validationPayload = {
          source: payload.source || tempLead.source,
          meta: payload.meta || tempLead.meta
        } as CreateLeadDto;
        this.validateLeadSourceMeta(validationPayload);
      }

      const lead = await this.leadRepository.findOne({
        where,
        relations: ['leadServices', 'customer', 'customer.contacts', 'customer.addresses', 'createdBy']
      });
      if (!lead || !lead.isActive) {
        throw new NotFoundException('Lead not found');
      }
      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        if (!lead.createdBy || lead.createdBy.id !== actor.id) {
          throw new NotFoundException('Lead not found');
        }
      }

      if (!lead.createdBy && actor) {
        const createdByRef = new User();
        createdByRef.id = actor.id;
        lead.createdBy = createdByRef;
      }

      const { serviceIds, contacts, addresses, customer, ...updateData } = payload;

      if (customer && lead.customer) {
        const primaryAddress = addresses?.find(a => a.isPrimary) || addresses?.[0];
        const currentCountry = lead.customer.addresses?.[0]?.country || 'IND';
        const country = primaryAddress?.country || currentCountry;
        const name = customer.name || lead.customer.name;
        const currentBase = this.generateCustomerId(lead.customer.name, currentCountry);
        const nextBase = this.generateCustomerId(name, country);
        const nextCustomerId = nextBase === currentBase
          ? lead.customer.customerId
          : await this.generateUniqueCustomerId(name, country, lead.customer.id);
        Object.assign(lead.customer, {
          ...customer,
          customerId: nextCustomerId
        });
        await this.customerRepository.save(lead.customer);
      }

      if (contacts) {
        await this.contactRepository.delete({ customer: { id: lead.customer?.id } });
        await this.leadContactRepository.delete({ lead: { id: lead.id } });
        if (contacts.length > 0) {
          const customerContacts = contacts.map(contact =>
            this.contactRepository.create({
              ...contact,
              customer: lead.customer
            })
          );
          await this.contactRepository.save(customerContacts);
          const leadContacts = contacts.map(contact =>
            this.leadContactRepository.create({
              ...contact,
              lead: lead,
              leadId: lead.id
            })
          );
          await this.leadContactRepository.save(leadContacts);
        }
      }

      if (addresses) {
        await this.addressRepository.delete({ customer: { id: lead.customer?.id } });
        await this.leadAddressRepository.delete({ lead: { id: lead.id } });
        if (addresses.length > 0) {
          const customerAddresses = addresses.map(addr =>
            this.addressRepository.create({
              ...addr,
              customer: lead.customer
            })
          );
          await this.addressRepository.save(customerAddresses);
          const leadAddresses = addresses.map(addr => {
            const { addressType, ...rest } = addr;
            return this.leadAddressRepository.create({
              ...rest,
              addressType,
              lead: lead,
              leadId: lead.id
            });
          });
          await this.leadAddressRepository.save(leadAddresses);
        }
      }

      if (serviceIds) {
        // Remove existing lead services - strategy: delete all and recreate
        await this.leadServiceEntityRepository.delete({ lead: { id: lead.id } });
        
        const assignmentGroupId = this.generateAssignmentGroupId();
        const servicesToAssign = await this.serviceRepository.find({ where: { id: In(serviceIds) } });
        const leadServices = servicesToAssign.map(service => 
          this.leadServiceEntityRepository.create({
            lead: lead,
            service: service,
            assignmentGroupId,
            timeline: 'TBD' // Default value for required field
          })
        );
        await this.leadServiceEntityRepository.save(leadServices);
      }

      Object.assign(lead, updateData);

      await this.leadRepository.save(lead);
      const updatedLead = await this.leadRepository.findOne({
        where: { id: lead.id },
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
      });

      if (!updatedLead) {
        throw new BadRequestException('Lead not found after update');
      }

      return this.formatLeadServicesSummary(updatedLead);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchCustomers(name: string): Promise<Customer[]> {
    try {
      if (!name) {
        return [];
      }
      return await this.customerRepository.find({ where: { name: Like(`%${name}%`) }, order: { name: 'ASC' } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private formatCustomer(customer: Customer): any {
    return {
      id: customer.id,
      createdAt: customer.createdAt || null,
      customerId: customer.customerId || null,
      name: customer.name || null,
      businessActivities: customer.businessActivities || null,
      headcount: customer.headcount || null,
      designation: customer.designation || null,
      contacts: (customer.contacts || []).map(contact => ({
        id: contact.id,
        createdAt: contact.createdAt || null,
        name: contact.name || null,
        designation: contact.designation || null,
        email: contact.email || null,
        phoneNo: contact.phoneNo || null,
        countryCode: contact.countryCode || null,
        isPrimary: contact.isPrimary || false,
      })),
      addresses: (customer.addresses || []).map(address => ({
        id: address.id,
        createdAt: address.createdAt || null,
        addressLine1: address.addressLine1 || null,
        addressLine2: address.addressLine2 || null,
        city: address.city || null,
        state: address.state || null,
        country: address.country || null,
        postalCode: address.postalCode || null,
        addressType: address.addressType || null,
        isPrimary: address.isPrimary || false,
      })),
    };
  }

  private formatLeadServicesSummary(lead: Lead, includeServices = true): any {
    const summary: any = {
      id: lead.enquiryId || lead.id,
      company_name: lead.customer?.name || null,
      enquiryId: lead.enquiryId || null,
      enquiryReference: lead.enquiryReference || null,
      leadStatus: lead.status || null,
      quality: lead.quality || null,
      source: lead.source || null,
      sourceDetail: lead.sourceDetail || null,
      meta: lead.meta as Record<string, any> || null,
      sourceDescription: lead.sourceDescription || null,
      notes: lead.notes || null,
      isDraft: lead.isDraft,
      isActive: lead.isActive,
      customer: lead.customer ? this.formatCustomer(lead.customer) : null,
      createdAt: lead.createdAt || null,
      createdBy: lead.createdBy
        ? { id: lead.createdBy.id, name: lead.createdBy.name, email: lead.createdBy.email }
        : null,
    };

    if (includeServices) {
      summary.services = (lead.leadServices || []).map(ls => ({
        id: ls.id,
        assignmentGroupId: ls.assignmentGroupId || null,
        serviceId: ls.service?.id || null,
        service_name: ls.service?.category || ls.service?.parent?.name || ls.service?.parent?.category || ls.service?.name || null,
        sub_service_name: ls.service?.name || null,
        description: ls.description || ls.service?.description || null,
        timeline: ls.timeline,
        service_timeline: ls.service?.timeline || null,
        deliverables: ls.deliverables as string[] || [],
        status: ls.status || null,
        startDate: ls.startDate || null,
        endDate: ls.endDate || null,
        remarks: ls.remarks || null,
        owner: ls.owner ? { id: ls.owner.id, name: ls.owner.name, email: ls.owner.email } : null,
        department: ls.department ? { id: ls.department.id, name: ls.department.name } : null,
      }));
    }

    return summary;
  }

  async assignServices(leadId: string, serviceAssignments: ServiceAssignment[], actor?: User): Promise<any> {
    try {
      return await this.dataSource.transaction(async manager => {
        const isNumeric = !isNaN(Number(leadId));
        const where = isNumeric ? { id: Number(leadId) } : { enquiryId: leadId };

        const lead = await manager.findOne(Lead, {
          where,
          relations: ['createdBy', 'customer'],
        });

        if (!lead || !lead.isActive) {
          throw new NotFoundException('Lead not found');
        }

        // Generate new enquiry ID in the requested format if it's currently in the old format
        // or if it doesn't exist. This ensures the lead has the new "Senior Developer" recommended ID.
        if (!lead.enquiryId || lead.enquiryId.startsWith('IS/')) {
          lead.enquiryId = await this.generateEnquiryId(lead.customer?.name);
          await manager.save(lead);
        }

        if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
          if (!lead.createdBy || lead.createdBy.id !== actor.id) {
            throw new NotFoundException('Lead not found');
          }
        }

        // Fetch existing lead services to compare and merge
        const existingLeadServices = await manager.find(LeadServiceEntity, {
          where: { lead: { id: lead.id } },
          relations: ['owner', 'service', 'department'],
        });

        let targetLead = lead;
        let batchId: string | null = null;

        if (serviceAssignments && serviceAssignments.length > 0) {
          const uniqueServiceIds = [...new Set(serviceAssignments.map(sa => sa.serviceId))];
          const services = await manager.find(ServiceMaster, { where: { id: In(uniqueServiceIds) } });

          const foundServiceIds = services.map(s => s.id);
          const validAssignments = serviceAssignments.filter(sa => foundServiceIds.includes(sa.serviceId));

          if (validAssignments.length === 0) {
            throw new BadRequestException(`None of the provided service IDs exist: ${uniqueServiceIds.join(', ')}`);
          }

          const newAssignments = validAssignments.filter(assignment =>
            !existingLeadServices.some(existing => existing.serviceId === assignment.serviceId),
          );

          if (newAssignments.length === 0) {
            return this.formatLeadServicesSummary(lead);
          }

          const assignmentGroupId = this.generateAssignmentGroupId();
          batchId = assignmentGroupId;

          // Keep assignments on the same lead; do not create a duplicate lead record.
          // This avoids duplicate company rows in lead list and preserves follow-up/rollback/delete flows.

          const leadServicesToSave: LeadServiceEntity[] = [];

          for (const assignment of newAssignments) {
            const service = services.find(s => s.id === assignment.serviceId);

            const uniqueDeliverables = assignment.deliverables
              ? [...new Set(assignment.deliverables.map((d: string) => d.trim()).filter(Boolean))]
              : [];

            let owner = null;
            if (assignment.ownerId) {
              owner = await manager.findOne(User, { where: { id: assignment.ownerId } });
            } else if (actor) {
              owner = actor;
            }

            let department = null;
            if (assignment.departmentId) {
              department = await manager.findOne(Department, { where: { id: assignment.departmentId } });
            }

            const leadServiceData = {
              lead: targetLead,
              service,
              assignmentGroupId,
              description: assignment.description || service?.description || null,
              timeline: assignment.timeline,
              deliverables: uniqueDeliverables.length > 0 ? uniqueDeliverables : null,
              remarks: assignment.remarks || null,
              owner,
              department,
              status: assignment.status || SERVICE_STATUS.REQUIREMENT_CONFIRMED,
              startDate: assignment.startDate ? new Date(assignment.startDate) : null,
              endDate: assignment.endDate ? new Date(assignment.endDate) : null,
            };

            const leadService = manager.create(LeadServiceEntity, leadServiceData);
            leadServicesToSave.push(leadService);
          }

          await manager.save(leadServicesToSave);
        } else {
          return this.formatLeadServicesSummary(lead);
        }

        const fullLead = await manager.findOne(Lead, {
          where: { id: targetLead.id },
          relations: [
            'customer',
            'customer.contacts',
            'customer.addresses',
            'createdBy',
            'leadServices',
            'leadServices.service',
            'leadServices.service.parent',
            'leadServices.owner',
            'leadServices.department'
          ],
        });

        const summary = this.formatLeadServicesSummary(fullLead);
        return {
          ...summary,
          batchId,
        };
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllLeadsAssignedServices(actor?: User, pagination?: IPagination): Promise<IPaginationObject> {
    try {
      const page = pagination?.page ?? 1;
      const pageSize = pagination?.pageSize ?? 20;
      const { currentPage, limit, offset } = paginate(page, pageSize);

      let where: FindOptionsWhere<Lead> = { isActive: true };
      
      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        where = { isActive: true, createdBy: { id: actor.id } };
      }

      const [leads, total] = await this.leadRepository.findAndCount({
        where,
        relations: [
          'customer',
          'customer.contacts',
          'customer.addresses',
          'createdBy',
          'leadServices',
          'leadServices.service'
        ],
        order: { createdAt: 'DESC' },
        skip: offset,
        take: limit
      });

      const totalPages = Math.ceil(total / limit);

      return {
        docs: leads.map(lead => this.formatLeadServicesSummary(lead)),
        page: currentPage,
        limit: limit,
        totalDocs: total,
        totalPages: totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAssignedServicesList(filter: GetAssignedServicesFilterDto, actor?: User): Promise<IPaginationObject> {
    try {
      const page = filter?.page || 1;
      const pageSize = filter?.pageSize || 20;
      const { currentPage, limit, offset } = paginate(page, pageSize);

      const query = this.leadServiceEntityRepository.createQueryBuilder('ls')
        .leftJoinAndSelect('ls.lead', 'lead')
        .leftJoinAndSelect('lead.customer', 'customer')
        .leftJoinAndSelect('customer.contacts', 'contacts')
        .leftJoinAndSelect('customer.addresses', 'addresses')
        .leftJoinAndSelect('lead.createdBy', 'createdBy')
        .leftJoinAndSelect('ls.service', 'service')
        .leftJoinAndSelect('ls.owner', 'owner')
        .leftJoinAndSelect('ls.department', 'department')
        .leftJoin(ProposalItem, 'pi', 'pi.leadServiceId = ls.id')
        .leftJoin(Proposal, 'p', 'p.id = pi.proposalId AND p.status != :droppedProposalStatus', { droppedProposalStatus: PROPOSAL_STATUS.DROPPED })
        .where('lead.isActive = :isActive', { isActive: true })
        .andWhere('ls.status != :droppedStatus', { droppedStatus: SERVICE_STATUS.DROPPED })
        .andWhere('p.id IS NULL');

      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        query.andWhere('createdBy.id = :actorId', { actorId: actor.id });
      }

      if (filter?.leadId) {
        query.andWhere('lead.id = :leadId', { leadId: filter.leadId });
      }

      if (filter?.serviceId) {
        query.andWhere('service.id = :serviceId', { serviceId: filter.serviceId });
      }

      if (filter?.status) {
        query.andWhere('ls.status = :status', { status: filter.status });
      }

      if (filter?.category) {
        query.andWhere('service.category = :category', { category: filter.category });
      }

      if (filter?.assignmentGroupId) {
        query.andWhere('ls.assignmentGroupId = :assignmentGroupId', { assignmentGroupId: filter.assignmentGroupId });
      }

      query.orderBy('lead.createdAt', 'DESC').skip(offset).take(limit);

      const [assignments, total] = await query.getManyAndCount();
      const totalPages = Math.ceil(total / limit);

      const groupedMap = new Map<number, any>();
      for (const assignment of assignments) {
        const lead = assignment.lead;
        const leadId = lead?.id;

        if (!groupedMap.has(leadId)) {
          const leadMetadata = {
            id: lead.enquiryId || lead.id,
            company_name: lead.customer?.name || null,
            enquiryId: lead.enquiryId || null,
            enquiryReference: lead.enquiryReference || null,
            leadStatus: lead.status || null,
            quality: lead.quality || null,
            source: lead.source || null,
            sourceDetail: lead.sourceDetail || null,
            meta: lead.meta as Record<string, any> || null,
            sourceDescription: lead.sourceDescription || null,
            notes: lead.notes || null,
            isDraft: lead.isDraft,
            isActive: lead.isActive,
            customer: lead.customer ? this.formatCustomer(lead.customer) : null,
            createdAt: lead.createdAt || null,
            createdBy: lead.createdBy
              ? { id: lead.createdBy.id, name: lead.createdBy.name, email: lead.createdBy.email }
              : null,
            services: [],
            batchId: assignment.assignmentGroupId || null,
          };
          groupedMap.set(leadId, leadMetadata);
        }

        groupedMap.get(leadId).services.push({
          id: assignment.id,
          assignmentGroupId: assignment.assignmentGroupId || null,
          serviceId: assignment.service?.id || null,
          service_name: assignment.service?.category || assignment.service?.parent?.name || assignment.service?.parent?.category || assignment.service?.name || null,
          sub_service_name: assignment.service?.name || null,
          description: assignment.description || assignment.service?.description || null,
          timeline: assignment.timeline,
          service_timeline: assignment.service?.timeline || null,
          deliverables: assignment.deliverables || [],
          status: assignment.status || null,
          startDate: assignment.startDate || null,
          endDate: assignment.endDate || null,
          remarks: assignment.remarks || null,
          owner: assignment.owner
            ? { id: assignment.owner.id, name: assignment.owner.name, email: assignment.owner.email }
            : null,
          department: assignment.department
            ? { id: assignment.department.id, name: assignment.department.name }
            : null,
        });
      }

      const groupedDocs = Array.from(groupedMap.values());

      return {
        docs: groupedDocs,
        page: currentPage,
        limit,
        totalDocs: total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLeadAssignedServices(leadId: string, actor?: User) {
    try {
      const isNumeric = !isNaN(Number(leadId));
      const where = isNumeric ? { id: Number(leadId) } : { enquiryId: leadId };

      const lead = await this.leadRepository.findOne({ 
        where, 
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service', 'leadServices.owner', 'leadServices.department'] 
      });
      
      if (!lead || !lead.isActive) {
        throw new NotFoundException('Lead not found');
      }

      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        if (!lead.createdBy || lead.createdBy.id !== actor.id) {
          throw new NotFoundException('Lead not found');
        }
      }

      return this.formatLeadServicesSummary(lead);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

async updateLeadService(leadId: string, serviceId: number, assignment: ServiceAssignment, actor?: User): Promise<Lead> {
    try {
      const isNumeric = !isNaN(Number(leadId));
      const where = isNumeric ? { id: Number(leadId) } : { enquiryId: leadId };

      const lead = await this.leadRepository.findOne({ 
        where, 
        relations: ['leadServices', 'createdBy'] 
      });
      
      if (!lead || !lead.isActive) {
        throw new NotFoundException('Lead not found');
      }

      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        if (!lead.createdBy || lead.createdBy.id !== actor.id) {
          throw new NotFoundException('Lead not found');
        }
      }

      const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
      if (!service) {
        throw new BadRequestException(`Service with ID ${serviceId} not found`);
      }

      const leadService = await this.leadServiceEntityRepository.findOne({
        where: { lead: { id: lead.id }, service: { id: serviceId } }
      });

      if (!leadService) {
        throw new NotFoundException('Service not assigned to this lead');
      }

      if (assignment.description) {
        leadService.description = assignment.description;
      }

      if (assignment.timeline !== undefined) {
        leadService.timeline = assignment.timeline;
      }

      if (assignment.deliverables) {
        const uniqueDeliverables = [...new Set(
          assignment.deliverables.map((d: string) => d.trim()).filter((d: string) => d)
        )];
        leadService.deliverables = uniqueDeliverables.length > 0 ? uniqueDeliverables : null;
      }

      if (assignment.remarks !== undefined) {
        leadService.remarks = assignment.remarks;
      }

      if (assignment.ownerId) {
        const owner = await this.userRepository.findOne({ where: { id: assignment.ownerId } });
        if (owner) leadService.owner = owner;
      }

      if (assignment.departmentId) {
        const dept = await this.departmentRepository.findOne({ where: { id: assignment.departmentId } });
        if (dept) leadService.department = dept;
      }

      if (assignment.status) {
        leadService.status = assignment.status;
      }

      if (assignment.startDate) {
        leadService.startDate = new Date(assignment.startDate);
      }

      if (assignment.endDate) {
        leadService.endDate = new Date(assignment.endDate);
      }

      await this.leadServiceEntityRepository.save(leadService);

      return await this.leadRepository.findOne({ 
        where: { id: lead.id },
        relations: ['customer', 'createdBy', 'leadServices', 'leadServices.service', 'leadServices.owner', 'leadServices.department'] 
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeLeadService(leadId: string, serviceId: number, actor?: User): Promise<void> {
    try {
      const isNumeric = !isNaN(Number(leadId));
      const where = isNumeric ? { id: Number(leadId) } : { enquiryId: leadId };

      const lead = await this.leadRepository.findOne({ 
        where, 
        relations: ['createdBy'] 
      });
      
      if (!lead || !lead.isActive) {
        throw new NotFoundException('Lead not found');
      }

      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        if (!lead.createdBy || lead.createdBy.id !== actor.id) {
          throw new NotFoundException('Lead not found');
        }
      }

      const result = await this.leadServiceEntityRepository.delete({
        lead: { id: lead.id },
        service: { id: serviceId }
      });

      if (result.affected === 0) {
        throw new NotFoundException('Service not assigned to this lead');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createService(payload: CreateServiceDto): Promise<ServiceMaster> {
    try {
      const trimmedName = payload.name?.trim();
      const trimmedCode = payload.code?.trim();

      // duplicate check for name and code - relative to parent
      const existing = await this.serviceRepository.createQueryBuilder('service')
        .where('(LOWER(service.name) = LOWER(:name) OR LOWER(service.code) = LOWER(:code))', { 
          name: trimmedName, 
          code: trimmedCode 
        })
        .andWhere(payload.parentId ? 'service.parentId = :parentId' : 'service.parentId IS NULL', { 
          parentId: payload.parentId 
        })
        .getOne();

      if (existing) {
        const context = payload.parentId ? 'under this parent' : 'globally';
        throw new BadRequestException(`A service with name '${trimmedName}' or code '${trimmedCode}' already exists ${context}.`);
      }

      payload.name = trimmedName;
      payload.code = trimmedCode;

      let level = 0;
      let parent: ServiceMaster = null;
      let category: string = null;
      let type: SERVICE_TYPE = null;
      let accessLevel: SERVICE_ACCESS_LEVEL = SERVICE_ACCESS_LEVEL.PUBLIC;

      if (payload.parentId) {
        parent = await this.serviceRepository.findOne({ 
          where: { id: payload.parentId },
          relations: ['parent']
        });
        if (!parent) {
          throw new BadRequestException(`Parent service with ID ${payload.parentId} not found`);
        }
        level = parent.level + 1;
      }

      

      const categoryValue = payload.category || payload.service_category;
      if (categoryValue) {
        category = categoryValue;
      }

      if (payload.type) {
        const castType = payload.type as SERVICE_TYPE;
        if (!Object.values(SERVICE_TYPE).includes(castType)) {
          throw new BadRequestException(`Invalid service type: ${payload.type}`);
        }
        type = castType;
      }

      if (payload.accessLevel) {
        const castAccess = payload.accessLevel as SERVICE_ACCESS_LEVEL;
        if (!Object.values(SERVICE_ACCESS_LEVEL).includes(castAccess)) {
          throw new BadRequestException(`Invalid access level: ${payload.accessLevel}`);
        }
        accessLevel = castAccess;
      }

      const service = this.serviceRepository.create({
        ...payload,
        level,
        parent,
        category,
        type,
        accessLevel,
      });

      const savedService = await this.serviceRepository.save(service);

      const result = await this.serviceRepository.findOne({
        where: { id: savedService.id },
        relations: ['parent', 'department', 'deliverables']
      });
      return this.deduplicateDeliverables(result);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getServiceById(id: number): Promise<ServiceMaster> {
    try {
      const service = await this.serviceRepository.findOne({
        where: { id },
        relations: ['parent', 'children', 'department', 'deliverables']
      });
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      return this.deduplicateDeliverables(service);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateService(id: number, payload: UpdateServiceDto): Promise<ServiceMaster> {
    try {
      const service = await this.serviceRepository.findOne({ where: { id } });
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      if (payload.service_category && !payload.category) {
        payload.category = payload.service_category;
      }
      Object.assign(service, payload);
      return await this.serviceRepository.save(service);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteService(id: number, hard = false): Promise<void> {
    try {
      const service = await this.serviceRepository.findOne({ where: { id } });
      if (!service) {
        throw new NotFoundException('Service not found');
      }

      if (hard) {
        await this.serviceRepository.remove(service);
      } else {
        service.isActive = false;
        await this.serviceRepository.save(service);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createPermission(payload: CreatePermissionDto, actorId?: number): Promise<PermissionManager> {
    try {
      const permission = this.permissionRepository.create(payload);
      if (actorId) {
          const actor = new User();
          actor.id = actorId;
          permission.createdBy = actor;
      }
      return await this.permissionRepository.save(permission);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPermissions(payload: GetPermissionDto): Promise<PermissionManager[]> {
    try {
      console.log(`[GetPermissions] Received payload:`, JSON.stringify(payload));
      
      const queryBuilder = this.permissionRepository.createQueryBuilder('permission');
      
      if (payload?.roleName && payload.roleName !== 'undefined' && payload.roleName.trim() !== '') {
        queryBuilder.andWhere('permission.roleName LIKE :roleName', { roleName: `%${payload.roleName.trim()}%` });
      }
      
      if (payload?.user_group) {
        queryBuilder.andWhere('permission.user_group = :user_group', { user_group: payload.user_group });
      }
      
      console.log(`[GetPermissions] Executing query:`, queryBuilder.getSql());
      
      const permissions = await queryBuilder
        .orderBy('permission.id', 'DESC')
        .getMany();
      
      console.log(`[GetPermissions] Found ${permissions.length} records`);

      if (permissions.length === 0) {
          console.log(`[GetPermissions] No records found. Checking all records for debug...`);
          const all = await this.permissionRepository.find({ take: 5, order: { id: 'DESC' } });
          console.log(`[GetPermissions] Current records in DB:`, JSON.stringify(all.map(r => ({id: r.id, role: r.roleName, group: r.user_group}))));
      }

      return permissions;
    } catch (error) {
      console.error(`[GetPermissions] Error:`, error);
      throw new BadRequestException(error.message);
    }
  }

  async createDeliverable(payload: CreateDeliverableDto): Promise<ServiceDeliverable> {
    try {
      const service = await this.serviceRepository.findOne({ where: { id: payload.serviceId } });
      if (!service) {
        throw new NotFoundException(`Service with ID ${payload.serviceId} not found`);
      }

      const existing = await this.deliverableRepository.findOne({
        where: { serviceId: payload.serviceId, name: payload.name },
      });
      if (existing) {
        return existing;
      }

      const deliverable = this.deliverableRepository.create({
        ...payload,
        service,
        dueDate: payload.dueDate ? new Date(payload.dueDate) : null,
      });

      return await this.deliverableRepository.save(deliverable);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDeliverables(serviceId?: number): Promise<ServiceDeliverable[]> {
    try {
      const queryBuilder = this.deliverableRepository.createQueryBuilder('deliverable')
        .leftJoinAndSelect('deliverable.service', 'service')
        .where('deliverable.isActive = :isActive', { isActive: true });

      if (serviceId) {
        queryBuilder.andWhere('deliverable.serviceId = :serviceId', { serviceId });
      }

      return await queryBuilder
        .orderBy('deliverable.sortOrder', 'ASC')
        .addOrderBy('deliverable.createdAt', 'DESC')
        .getMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDeliverableById(id: number): Promise<ServiceDeliverable> {
    try {
      const deliverable = await this.deliverableRepository.findOne({
        where: { id },
        relations: ['service']
      });
      if (!deliverable) {
        throw new NotFoundException('Deliverable not found');
      }
      return deliverable;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateDeliverable(id: number, payload: UpdateDeliverableDto): Promise<ServiceDeliverable> {
    try {
      const deliverable = await this.deliverableRepository.findOne({ where: { id } });
      if (!deliverable) {
        throw new NotFoundException('Deliverable not found');
      }

      Object.assign(deliverable, {
        ...payload,
        dueDate: payload.dueDate ? new Date(payload.dueDate) : deliverable.dueDate,
      });

      return await this.deliverableRepository.save(deliverable);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteDeliverable(id: number, hard = false): Promise<void> {
    try {
      const deliverable = await this.deliverableRepository.findOne({ where: { id } });
      if (!deliverable) {
        throw new NotFoundException('Deliverable not found');
      }

      if (hard) {
        await this.deliverableRepository.remove(deliverable);
      } else {
        deliverable.isActive = false;
        await this.deliverableRepository.save(deliverable);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // --- lead follow-up methods ------------------------------------------------
  async createLeadFollowUp(leadId: string, payload: CreateLeadFollowUpDto, actor?: User): Promise<LeadFollowUp> {
    try {
      const isNumeric = !isNaN(Number(leadId));
      const where = isNumeric ? { id: Number(leadId) } : { enquiryId: leadId };

      const lead = await this.leadRepository.findOne({ where });
      if (!lead || !lead.isActive) {
        throw new NotFoundException('Lead not found');
      }
      const followUp = this.followUpRepository.create({
        ...payload,
        lead,
        leadId: lead.id,
        followUpDate: payload.followUpDate ? new Date(payload.followUpDate) : null,
        completedAt: payload.completedAt ? new Date(payload.completedAt) : null,
        createdBy: actor || null,
      });
      const saved = await this.followUpRepository.save(followUp);
      
      await this.auditLogRepository.save({
        action: 'CREATE',
        module: 'LeadFollowUp',
        entityId: String(saved.id),
        details: JSON.stringify(saved),
        performedBy: actor ? { id: actor.id } as User : null,
      });

      const result = await this.followUpRepository.findOne({
        where: { id: saved.id },
        relations: ['lead', 'createdBy', 'updatedBy']
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLeadFollowUps(
    leadId: string,
    filter?: GetLeadFollowUpsDto,
    pagination?: IPagination,
  ): Promise<IPaginationObject> {
    try {
      const isNumeric = !isNaN(Number(leadId));
      const where = isNumeric ? { id: Number(leadId) } : { enquiryId: leadId };

      const lead = await this.leadRepository.findOne({ where });
      if (!lead) {
        throw new NotFoundException('Lead not found');
      }

      const query = this.followUpRepository.createQueryBuilder('f')
        .leftJoinAndSelect('f.createdBy', 'createdBy')
        .leftJoinAndSelect('f.updatedBy', 'updatedBy')
        .where('f.leadId = :leadId', { leadId: lead.id })
        .andWhere('f.isActive = :isActive', { isActive: true });

      if (filter) {
        if (filter.type) {
          query.andWhere('f.type = :type', { type: filter.type });
        }
        if (filter.priority) {
          query.andWhere('f.priority = :priority', { priority: filter.priority });
        }
        if (filter.isCompleted !== undefined) {
          query.andWhere('f.isCompleted = :isCompleted', { isCompleted: filter.isCompleted });
        }
        if (filter.fromDate) {
          query.andWhere('f.followUpDate >= :fromDate', { fromDate: new Date(filter.fromDate) });
        }
        if (filter.toDate) {
          query.andWhere('f.followUpDate <= :toDate', { toDate: new Date(filter.toDate) });
        }
      }

      // pagination
      let page = 1;
      let pageSize = 20;
      if (pagination) {
        page = pagination.page;
        pageSize = pagination.pageSize;
        query.skip((page - 1) * pageSize).take(pageSize);
      }

      const [docs, total] = await query
        .orderBy('f.followUpDate', 'DESC')
        .addOrderBy('f.createdAt', 'DESC')
        .getManyAndCount();

      return {
        docs,
        totalDocs: total,
        limit: pageSize,
        page,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLeadFollowUpById(id: number): Promise<LeadFollowUp> {
    try {
      const followUp = await this.followUpRepository.findOne({
        where: { id },
        relations: ['lead', 'createdBy', 'updatedBy']
      });
      if (!followUp) {
        throw new NotFoundException('Follow-up not found');
      }
      return followUp;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateLeadFollowUp(
    id: number,
    payload: UpdateLeadFollowUpDto,
    actor?: User,
  ): Promise<LeadFollowUp> {
    try {
      const followUp = await this.followUpRepository.findOne({ where: { id } });
      if (!followUp) {
        throw new NotFoundException('Follow-up not found');
      }

      Object.assign(followUp, {
        ...payload,
        followUpDate: payload.followUpDate ? new Date(payload.followUpDate) : followUp.followUpDate,
        completedAt: payload.completedAt ? new Date(payload.completedAt) : followUp.completedAt,
        updatedBy: actor || null,
        updatedAt: new Date(),
      });

      await this.followUpRepository.save(followUp);
      
      await this.auditLogRepository.save({
        action: 'UPDATE',
        module: 'LeadFollowUp',
        entityId: String(followUp.id),
        details: JSON.stringify(payload),
        performedBy: actor ? { id: actor.id } as User : null,
      });

      const updated = await this.followUpRepository.findOne({
        where: { id },
        relations: ['lead', 'createdBy', 'updatedBy']
      });
      return updated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteLeadFollowUp(id: number, hard = false, actor?: User): Promise<void> {
    try {
      const followUp = await this.followUpRepository.findOne({ where: { id } });
      if (!followUp) {
        throw new NotFoundException('Follow-up not found');
      }
      if (hard) {
        await this.followUpRepository.remove(followUp);
      } else {
        followUp.isActive = false;
        await this.followUpRepository.save(followUp);
      }
      await this.auditLogRepository.save({
        action: 'DELETE',
        module: 'LeadFollowUp',
        entityId: String(followUp.id),
        details: JSON.stringify({hard}),
        performedBy: actor ? { id: actor.id } as User : null,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
