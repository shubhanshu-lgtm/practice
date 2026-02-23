import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, In, Between, IsNull, FindOptionsWhere, Not } from 'typeorm';
import { Customer } from '../../../../../libs/database/src/entities/customer.entity';
import { CustomerAddress } from '../../../../../libs/database/src/entities/customerAddress.entity';
import { CustomerContact } from '../../../../../libs/database/src/entities/customerContact.entity';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadContact } from '../../../../../libs/database/src/entities/lead-contact.entity';
import { LeadAddress } from '../../../../../libs/database/src/entities/lead-address.entity';
import { LeadService as LeadServiceEntity } from '../../../../../libs/database/src/entities/lead-service.entity';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { ServiceMaster } from '../../../../../libs/database/src/entities/service-master.entity';
import { ServiceDeliverable } from '../../../../../libs/database/src/entities/service-deliverable.entity';
import { PermissionManager } from '../../../../../libs/database/src/entities/permissionManager.entity';
import { CreateLeadDto, UpdateLeadDto, CreateServiceDto, UpdateServiceDto, CreatePermissionDto, GetPermissionDto, CreateDeliverableDto, UpdateDeliverableDto, GetServicesFilterDto } from '../../../../../libs/dtos/master_management/lead.dto';
import { LEAD_SOURCE, LEAD_STATUS } from '../../../../../libs/constants/salesConstants';
import { USER_GROUP } from '../../../../../libs/constants/autenticationConstants/userContants';
import { SERVICE_TYPE, SERVICE_ACCESS_LEVEL } from '../../../../../libs/constants/serviceConstants';

interface ServiceAssignment {
  serviceId: number;
  description?: string;
  deliverables?: string[];
}

@Injectable()
export class LeadService {
  constructor(
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
    @InjectRepository(PermissionManager)
    private readonly permissionRepository: Repository<PermissionManager>,
    @InjectRepository(ServiceDeliverable)
    private readonly deliverableRepository: Repository<ServiceDeliverable>,
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

  async getLeads(actor?: User): Promise<Lead[]> {
    try {
      const isAdmin = actor && [USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group);
      const where: FindOptionsWhere<Lead> = { isActive: true };
      if (!isAdmin && actor?.id) {
        where.createdBy = { id: actor.id };
      }
      return await this.leadRepository.find({ 
        where,
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getServices(filter?: GetServicesFilterDto): Promise<ServiceMaster[]> {
    try {
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
      let services = await this.serviceRepository.find({
        where,
        relations,
        order: { sortOrder: 'ASC', name: 'ASC' }
      });
      if (filter?.userGroup) {
        const group = filter.userGroup;
        services = services.filter(s => s.accessLevel === SERVICE_ACCESS_LEVEL.PUBLIC || (s.allowedUserGroups || []).includes(group));
      }
      return services;
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
      return services;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addServiceCategory(payload: CreateServiceDto, file?: { originalname?: string }) {
    try {
      const categoryValue = payload.service_category || payload.category;
      if (!categoryValue) {
        throw new BadRequestException('service_category is required');
      }
      const servicePayload: CreateServiceDto = {
        ...payload,
        parentId: null,
        category: categoryValue,
        logo: file?.originalname || payload.logo
      };
      const created = await this.createService(servicePayload);
      return { message: 'Service category created successfully', data: created };
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

  async assignServices(leadId: number, serviceAssignments: ServiceAssignment[], actor?: User): Promise<Lead> {
    try {
      const lead = await this.leadRepository.findOne({ where: { id: leadId }, relations: ['leadServices', 'createdBy'] });
      if (!lead || !lead.isActive) {
        throw new NotFoundException('Lead not found');
      }
      if (actor && ![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
        if (!lead.createdBy || lead.createdBy.id !== actor.id) {
          throw new NotFoundException('Lead not found');
        }
      }

      await this.leadServiceEntityRepository.delete({ lead: { id: leadId } });

      if (serviceAssignments && serviceAssignments.length > 0) {
        const uniqueServiceIds = [...new Set(serviceAssignments.map(sa => sa.serviceId))];
        const services = await this.serviceRepository.find({ where: { id: In(uniqueServiceIds) } });
        
        if (services.length !== uniqueServiceIds.length) {
          throw new BadRequestException('One or more service IDs are invalid');
        }

        const servicesToUpdate = new Map<number, ServiceMaster>();
        const leadServicesData = [];

        for (const assignment of serviceAssignments) {
          const service = services.find(s => s.id === assignment.serviceId);
          if (!service) {
            throw new BadRequestException(`Service with ID ${assignment.serviceId} not found`);
          }

          if (assignment.description) {
            service.description = assignment.description;
            servicesToUpdate.set(service.id, service);
          }

          const uniqueDeliverables = assignment.deliverables 
            ? [...new Set(assignment.deliverables.map((d: string) => d.trim()).filter((d: string) => d))]
            : [];

          leadServicesData.push({
            lead: lead,
            service: service,
            deliverables: uniqueDeliverables.length > 0 ? uniqueDeliverables : null
          });
        }

        if (servicesToUpdate.size > 0) {
          await this.serviceRepository.save(Array.from(servicesToUpdate.values()));
        }

        const leadServices = leadServicesData.map(data =>
          this.leadServiceEntityRepository.create({
            lead: data.lead,
            service: data.service,
            deliverables: data.deliverables
          })
        );
        await this.leadServiceEntityRepository.save(leadServices);
      }

      return await this.leadRepository.findOne({ 
        where: { id: leadId }, 
        relations: ['customer', 'createdBy', 'leadServices', 'leadServices.service', 'leadServices.service.deliverables'] 
      });
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

      await this.leadServiceEntityRepository.save(leadService);

      return await this.leadRepository.findOne({ 
        where: { id: leadId }, 
        relations: ['customer', 'createdBy', 'leadServices', 'leadServices.service'] 
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

      return await this.serviceRepository.findOne({
        where: { id: savedService.id },
        relations: ['parent', 'department', 'deliverables']
      });
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
}
