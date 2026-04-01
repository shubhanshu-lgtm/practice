import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository, In, Between, IsNull, FindOptionsWhere, Not, Brackets } from 'typeorm';
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
import { CreateLeadDto, UpdateLeadDto, CreateServiceDto, UpdateServiceDto, CreatePermissionDto, GetPermissionDto, CreateDeliverableDto, UpdateDeliverableDto, GetServicesFilterDto, CreateLeadFollowUpDto, UpdateLeadFollowUpDto, GetLeadFollowUpsDto, GetAssignedServicesFilterDto, DropLeadDto } from '../../../../../libs/dtos/master_management/lead.dto';
import { LEAD_SOURCE, LEAD_STATUS } from '../../../../../libs/constants/salesConstants';
import { USER_GROUP } from '../../../../../libs/constants/autenticationConstants/userContants';
import { SERVICE_TYPE, SERVICE_ACCESS_LEVEL, CATEGORY_TYPE, SERVICE_STATUS } from '../../../../../libs/constants/serviceConstants';
import { IPagination, IPaginationObject } from '../../../../../libs/interfaces/commonTypes/custom.interface';
import { paginate } from '../../../../../libs/utils/basicUtils';

interface ServiceAssignment {
  serviceId: number;
  description?: string;
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

  private buildServiceTree(services: ServiceMaster[]) {
    type ServiceTreeNode = ServiceMaster & { children: ServiceTreeNode[] };
    const nodes = new Map<number, ServiceTreeNode>();
    for (const s of services) {
      nodes.set(s.id, { ...s, children: [] });
    }
    const roots: ServiceTreeNode[] = [];
    for (const node of nodes.values()) {
      const parentId = node.parentId;
      if (parentId && nodes.has(parentId)) {
        nodes.get(parentId).children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

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

  private async generateEnquiryId(): Promise<string> {
    const today = new Date();
    const yy = today.getFullYear().toString().slice(-2);
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const count = await this.leadRepository.count({
      where: {
        createdAt: Between(todayStart, todayEnd),
      },
    });

    const sequence = String(count + 1).padStart(2, '0');
    return `IS/${yy}/${mm}/${dd}/${sequence}`;
  }

  private generateCustomerId(companyName: string, country: string): string {
    const comp = companyName.substring(0, 4).toUpperCase().replace(/\s/g, '');
    const cnt = country.substring(0, 3).toUpperCase();
    return `IS/${comp}/${cnt}`;
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

  async createLead(payload: CreateLeadDto, userId?: number): Promise<Lead> {
    try {
      const enquiryId = await this.generateEnquiryId();
      
      let customer: Customer = null;
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
        } else {
          const primaryAddress = payload.addresses?.find(addr => addr.isPrimary) || payload.addresses?.[0];
          const country = primaryAddress?.country || 'IND';
          const customerId = await this.generateUniqueCustomerId(payload.customer.name, country);
          
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
              this.addressRepository.create({ ...addr, customer })
            );
            await this.addressRepository.save(addresses);
          }
        }
        
        if (payload.contacts && payload.contacts.length > 0) {
          const contacts = payload.contacts.map((contact) =>
            this.contactRepository.create({
              ...contact,
              customer,
            }),
          );
          await this.contactRepository.save(contacts);
        }
      } else {
        throw new BadRequestException('Either customerId or customer data must be provided');
      }

      let createdBy: User = null;
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
        status: (payload.status as LEAD_STATUS) || LEAD_STATUS.NEW,
        notes: payload.notes,
        isDraft: payload.isDraft || false,
        customer,
        createdBy,
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
        const leadServices = services.map(service => 
          this.leadServiceEntityRepository.create({
            lead: savedLead,
            service: service
          })
        );
        await this.leadServiceEntityRepository.save(leadServices);
      }
      
      return this.leadRepository.findOne({
        where: { id: savedLead.id },
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLeads(actor?: User, pagination?: IPagination): Promise<IPaginationObject> {
    try {
      const { currentPage, limit, offset } = paginate(pagination?.page, pagination?.pageSize);

      const isAdmin = actor && [USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group);
      const where: FindOptionsWhere<Lead> = { isActive: true };
      if (!isAdmin && actor?.id) {
        where.createdBy = { id: actor.id };
      }

      const [leads, total] = await this.leadRepository.findAndCount({ 
        where,
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service'],
        skip: offset,
        take: limit,
        order: { createdAt: 'DESC' }
      });

      const totalPages = Math.ceil(total / limit);

      return {
        docs: leads,
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

  /**
   * Fetch dropped leads (Status = LOST)
   */
  async getDroppedLeads(actor?: User, pagination?: IPagination): Promise<IPaginationObject> {
    try {
      const { currentPage, limit, offset } = paginate(pagination?.page, pagination?.pageSize);

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
        docs: leads,
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

  async getServices(filter?: GetServicesFilterDto): Promise<IPaginationObject> {
    try {
      const { currentPage, limit, offset } = paginate(filter?.page, filter?.pageSize);

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
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
        ? services.filter(s => s.accessLevel === SERVICE_ACCESS_LEVEL.PUBLIC || (s.allowedUserGroups || []).includes(filter.userGroup))
        : services;
      return this.buildServiceTree(filtered);
    } catch (error) {
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
        payload.parentId = null;
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

      // ensure not duplicate (same name/code and parent pair)
      const existing = await this.serviceRepository.findOne({
        where: [
          { name: payload.name, parentId: payload.parentId || IsNull() },
          { code: payload.code, parentId: payload.parentId || IsNull() }
        ],
      });
      if (existing) {
        throw new BadRequestException(`A service or sub-category with name '${payload.name}' or code '${payload.code}' already exists under this parent.`);
      }

      // allow creating sub-categories if parentId provided
      let logoUrl: string = payload.logo;
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
        parentId: payload.parentId || null,
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

  async getLeadById(id: number, actor?: User): Promise<Lead> {
    try {
      const lead = await this.leadRepository.findOne({ 
        where: { id }, 
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
      return lead;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteLead(id: number, hard = false, actor?: User): Promise<void> {
    try {
      const lead = await this.leadRepository.findOne({ where: { id }, relations: ['createdBy'] });
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
        await this.leadServiceEntityRepository.delete({ lead: { id } });
        await this.leadRepository.remove(lead);
      } else {
        lead.isActive = false;
        await this.leadRepository.save(lead);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

async dropLead(id: number, payload: DropLeadDto, actor?: User): Promise<Lead> {
    return await this.dataSource.transaction(async (manager) => {
      const lead = await manager.findOne(Lead, { where: { id }, relations: ['createdBy'] });
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
      await manager.update(LeadServiceEntity, { leadId: id }, { 
        status: SERVICE_STATUS.DROPPED 
      });

      // Update all Proposals to REJECTED with drop reason
      const dropReasonNote = `[REJECTED DUE TO LEAD DROP] Lead Drop Reason: ${payload.reason}`;
      await manager.getRepository(Proposal).update({ 
        leadId: id 
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
      });
    });
  }

async rollbackLead(id: number, payload: any, actor?: User): Promise<Lead> {
    return await this.dataSource.transaction(async (manager) => {
      const lead = await manager.findOne(Lead, { where: { id }, relations: ['createdBy'] });
      if (!lead || lead.status !== LEAD_STATUS.LOST) {
        throw new BadRequestException('Lead must be in LOST status to rollback');
      }
      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        if (!lead.createdBy || lead.createdBy.id !== actor.id) {
          throw new NotFoundException('Lead not found');
        }
      }

      // Rollback LeadServices to REQUIREMENT_CONFIRMED
      await manager.update(LeadServiceEntity, { leadId: id }, { 
        status: SERVICE_STATUS.REQUIREMENT_CONFIRMED 
      });

      // Rollback Proposals to DRAFT
      const rollbackNote = `[ROLLEDBACK] Rollback Reason: ${payload.reason}`;
      await manager.getRepository(Proposal).update({ 
        leadId: id 
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
      });
    });
  }



  async updateLead(id: number, payload: UpdateLeadDto, actor?: User): Promise<Lead> {
    try {
      const lead = await this.leadRepository.findOne({
        where: { id },
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
        
        const services = await this.serviceRepository.find({ where: { id: In(serviceIds) } });
        const leadServices = services.map(service => 
          this.leadServiceEntityRepository.create({
            lead: lead,
            service: service
          })
        );
        await this.leadServiceEntityRepository.save(leadServices);
      }

      Object.assign(lead, updateData);

      await this.leadRepository.save(lead);
      return await this.leadRepository.findOne({
        where: { id: lead.id },
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
      });
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

  private formatLeadServicesSummary(lead: Lead): any {
    return {
      company_name: lead.customer?.name || null,
      enquiryId: lead.enquiryId || null,
      enquiryReference: lead.enquiryReference || null,
      leadStatus: lead.status || null,
      quality: lead.quality || null,
      source: lead.source || null,
      sourceDescription: lead.sourceDescription || null,
      notes: lead.notes || null,
      createdAt: lead.createdAt || null,
      createdBy: lead.createdBy
        ? { id: lead.createdBy.id, name: lead.createdBy.name, email: lead.createdBy.email }
        : null,
      services: (lead.leadServices || []).map(ls => ({
        service_name: ls.service?.category || ls.service?.parent?.name || ls.service?.parent?.category || ls.service?.name || null,
        sub_service_name: ls.service?.name || null,
        description: ls.service?.description || null,
        deliverables: ls.deliverables || [],
        status: ls.status || null,
        startDate: ls.startDate || null,
        endDate: ls.endDate || null,
        remarks: ls.remarks || null,
        owner: ls.owner ? { id: ls.owner.id, name: ls.owner.name, email: ls.owner.email } : null,
        department: ls.department ? { id: ls.department.id, name: ls.department.name } : null,
      })),
    };
  }

  async assignServices(leadId: number, serviceAssignments: ServiceAssignment[], actor?: User): Promise<any> {
    try {
      return await this.dataSource.transaction(async manager => {
        const lead = await manager.findOne(Lead, {
          where: { id: leadId },
          relations: ['createdBy'],
        });

        if (!lead || !lead.isActive) {
          throw new NotFoundException('Lead not found');
        }

        if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
          if (!lead.createdBy || lead.createdBy.id !== actor.id) {
            throw new NotFoundException('Lead not found');
          }
        }

        // Fetch existing lead services to compare and merge
        const existingLeadServices = await manager.find(LeadServiceEntity, {
          where: { lead: { id: leadId } },
          relations: ['owner', 'service', 'department'],
        });

        if (serviceAssignments && serviceAssignments.length > 0) {
          const uniqueServiceIds = [...new Set(serviceAssignments.map(sa => sa.serviceId))];
          const services = await manager.find(ServiceMaster, { where: { id: In(uniqueServiceIds) } });

          const foundServiceIds = services.map(s => s.id);
          const validAssignments = serviceAssignments.filter(sa => foundServiceIds.includes(sa.serviceId));

          if (validAssignments.length === 0 && serviceAssignments.length > 0) {
            throw new BadRequestException(`None of the provided service IDs exist: ${uniqueServiceIds.join(', ')}`);
          }

          // Services to remove: those in existing but not in payload
          const incomingServiceIds = validAssignments.map(sa => sa.serviceId);
          const servicesToRemove = existingLeadServices.filter(els => !incomingServiceIds.includes(els.serviceId));

          if (servicesToRemove.length > 0) {
            const removeIds = servicesToRemove.map(s => s.id);
            // Atomically unlink proposal items for services being removed
            await manager
              .createQueryBuilder()
              .update(ProposalItem)
              .set({ leadServiceId: null })
              .where(`leadServiceId IN (:...removeIds)`, { removeIds })
              .execute();

            await manager.delete(LeadServiceEntity, { id: In(removeIds) });
          }

          const servicesToUpdate = new Map<number, ServiceMaster>();
          const leadServicesToSave: LeadServiceEntity[] = [];

          for (const assignment of validAssignments) {
            const service = services.find(s => s.id === assignment.serviceId);
            const existing = existingLeadServices.find(els => els.serviceId === assignment.serviceId);

            if (assignment.description) {
              service.description = assignment.description;
              servicesToUpdate.set(service.id, service);
            }

            const uniqueDeliverables = assignment.deliverables
              ? [...new Set(assignment.deliverables.map((d: string) => d.trim()).filter(Boolean))]
              : [];

            let owner = null;
            if (assignment.ownerId) {
              owner = await manager.findOne(User, { where: { id: assignment.ownerId } });
            } else if (existing && existing.owner) {
              // Preserve existing owner if already set
              owner = existing.owner;
            } else if (actor) {
              // Default to authenticated user for new assignments
              owner = actor;
            }

            let department = null;
            if (assignment.departmentId) {
              department = await manager.findOne(Department, { where: { id: assignment.departmentId } });
            } else if (existing && existing.department) {
              department = existing.department;
            }

            const leadServiceData = {
              lead,
              service,
              deliverables: uniqueDeliverables.length > 0 ? uniqueDeliverables : (existing ? existing.deliverables : null),
              remarks: assignment.remarks !== undefined ? assignment.remarks : (existing ? existing.remarks : null),
              owner,
              department,
              status: assignment.status || (existing ? existing.status : SERVICE_STATUS.REQUIREMENT_CONFIRMED),
              startDate: assignment.startDate ? new Date(assignment.startDate) : (existing ? existing.startDate : null),
              endDate: assignment.endDate ? new Date(assignment.endDate) : (existing ? existing.endDate : null),
            };

            let leadService;
            if (existing) {
              leadService = manager.merge(LeadServiceEntity, existing, leadServiceData);
            } else {
              leadService = manager.create(LeadServiceEntity, leadServiceData);
            }
            leadServicesToSave.push(leadService);
          }

          if (servicesToUpdate.size > 0) {
            await manager.save(Array.from(servicesToUpdate.values()));
          }

          await manager.save(leadServicesToSave);
        } else {
          // If payload is empty or null, remove all services for this lead
          await manager
            .createQueryBuilder()
            .update(ProposalItem)
            .set({ leadServiceId: null })
            .where(`leadServiceId IN (SELECT id FROM lead_service WHERE leadId = :leadId)`, { leadId })
            .execute();

          await manager.delete(LeadServiceEntity, { lead: { id: leadId } });
        }

        const fullLead = await manager.findOne(Lead, {
          where: { id: leadId },
          relations: ['customer', 'createdBy', 'leadServices', 'leadServices.service', 'leadServices.service.parent', 'leadServices.owner', 'leadServices.department'],
        });

        return this.formatLeadServicesSummary(fullLead);
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllLeadsAssignedServices(actor?: User, pagination?: IPagination): Promise<IPaginationObject> {
    try {
      const { currentPage, limit, offset } = paginate(pagination?.page, pagination?.pageSize);

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
        docs: leads,
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

      query.orderBy('lead.createdAt', 'DESC').skip(offset).take(limit);

      const [assignments, total] = await query.getManyAndCount();
      const totalPages = Math.ceil(total / limit);

      const groupedMap = new Map<number, any>();
      for (const assignment of assignments) {
        const lead = assignment.lead;
        const leadId = lead?.id;

        const leadMetadata = {
          id: lead?.id || null,
          enquiryId: lead?.enquiryId || null,
          enquiryReference: lead?.enquiryReference || null,
          leadStatus: lead?.status || null,
          quality: lead?.quality || null,
          source: lead?.source || null,
          sourceDescription: lead?.sourceDescription || null,
          notes: lead?.notes || null,
          createdAt: lead?.createdAt || null,
          companyName: lead?.customer?.name || null,
          createdBy: lead?.createdBy
            ? { id: lead.createdBy.id, name: lead.createdBy.name, email: lead.createdBy.email, phoneNo: lead.createdBy.phoneNo, avatar: lead.createdBy.avatar, status: lead.createdBy.status, verifyStatus: lead.createdBy.verifyStatus, roleName: lead.createdBy.roleName, user_group: lead.createdBy.user_group, loginSource: lead.createdBy.loginSource, platform: lead.createdBy.platform }
            : null,
          addresses: lead?.customer?.addresses || [],
        };

        if (!groupedMap.has(leadId)) {
          groupedMap.set(leadId, {
            ...leadMetadata,
            services: [],
          });
        }

        groupedMap.get(leadId).services.push({
          Department: assignment.service?.category || null,
          serviceName: assignment.service?.name || null,
          description: assignment.service?.description || null,
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
          lead: leadMetadata,
          service: assignment.service
            ? {
                id: assignment.service.id,
                name: assignment.service.name,
                code: assignment.service.code,
                description: assignment.service.description,
                isActive: assignment.service.isActive,
                departmentId: assignment.service.departmentId,
                createdAt: assignment.service.createdAt,
                parentId: assignment.service.parentId,
                level: assignment.service.level,
                category: assignment.service.category,
                type: assignment.service.type,
                accessLevel: assignment.service.accessLevel,
                allowedUserGroups: assignment.service.allowedUserGroups,
                allowedDepartments: assignment.service.allowedDepartments,
                sortOrder: assignment.service.sortOrder,
                logo: assignment.service.logo,
              }
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

  async getLeadAssignedServices(leadId: number, actor?: User) {
    try {
      const lead = await this.leadRepository.findOne({ 
        where: { id: leadId }, 
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

      return lead;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateLeadService(leadId: number, serviceId: number, assignment: ServiceAssignment, actor?: User): Promise<Lead> {
    try {
      const lead = await this.leadRepository.findOne({ 
        where: { id: leadId }, 
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
        where: { lead: { id: leadId }, service: { id: serviceId } }
      });

      if (!leadService) {
        throw new NotFoundException('Service not assigned to this lead');
      }

      if (assignment.description) {
        service.description = assignment.description;
        await this.serviceRepository.save(service);
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
        where: { id: leadId }, 
        relations: ['customer', 'createdBy', 'leadServices', 'leadServices.service', 'leadServices.owner', 'leadServices.department'] 
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeLeadService(leadId: number, serviceId: number, actor?: User): Promise<void> {
    try {
      const lead = await this.leadRepository.findOne({ 
        where: { id: leadId }, 
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
        lead: { id: leadId },
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
  async createLeadFollowUp(leadId: number, payload: CreateLeadFollowUpDto, actor?: User): Promise<LeadFollowUp> {
    try {
      const lead = await this.leadRepository.findOne({ where: { id: leadId } });
      if (!lead || !lead.isActive) {
        throw new NotFoundException('Lead not found');
      }
      const followUp = this.followUpRepository.create({
        ...payload,
        lead,
        leadId,
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
    leadId: number,
    filter?: GetLeadFollowUpsDto,
    pagination?: IPagination,
  ): Promise<IPaginationObject> {
    try {
      const query = this.followUpRepository.createQueryBuilder('f')
        .leftJoinAndSelect('f.createdBy', 'createdBy')
        .leftJoinAndSelect('f.updatedBy', 'updatedBy')
        .where('f.leadId = :leadId', { leadId })
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
