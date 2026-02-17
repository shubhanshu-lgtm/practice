import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, In, Between } from 'typeorm';
import { Customer } from '../../../../../libs/database/src/entities/customer.entity';
import { CustomerAddress } from '../../../../../libs/database/src/entities/customerAddress.entity';
import { CustomerContact } from '../../../../../libs/database/src/entities/customerContact.entity';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadContact } from '../../../../../libs/database/src/entities/lead-contact.entity';
import { LeadAddress } from '../../../../../libs/database/src/entities/lead-address.entity';
import { LeadService as LeadServiceEntity } from '../../../../../libs/database/src/entities/lead-service.entity';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { ServiceMaster } from '../../../../../libs/database/src/entities/service-master.entity';
import { PermissionManager } from '../../../../../libs/database/src/entities/permissionManager.entity';
import { CreateLeadDto, UpdateLeadDto, CreateServiceDto, UpdateServiceDto, CreatePermissionDto, GetPermissionDto } from '../../../../../libs/dtos/master_management/lead.dto';
import { LEAD_SOURCE, LEAD_STATUS } from '../../../../../libs/constants/salesConstants';

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
  ) {}

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
          const customerId = this.generateCustomerId(payload.customer.name, country);
          
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

  async getLeads(): Promise<Lead[]> {
    try {
      return await this.leadRepository.find({ 
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getServices(): Promise<ServiceMaster[]> {
    try {
      return await this.serviceRepository.find({ where: { isActive: true }, order: { name: 'ASC' } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLeadById(id: number): Promise<Lead> {
    try {
      const lead = await this.leadRepository.findOne({ 
        where: { id }, 
        relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service'] 
      });
      if (!lead) {
        throw new NotFoundException('Lead not found');
      }
      return lead;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteLead(id: number, hard = false): Promise<void> {
    try {
      const lead = await this.leadRepository.findOne({ where: { id } });
      if (!lead) {
        throw new NotFoundException('Lead not found');
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

  async updateLead(id: number, payload: UpdateLeadDto): Promise<Lead> {
    try {
      const lead = await this.leadRepository.findOne({ where: { id }, relations: ['leadServices'] });
      if (!lead) {
        throw new NotFoundException('Lead not found');
      }

      const { serviceIds, ...updateData } = payload;

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

      return await this.leadRepository.save(lead);
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

  async assignServices(leadId: number, serviceIds: number[]): Promise<Lead> {
    try {
      const lead = await this.leadRepository.findOne({ where: { id: leadId }, relations: ['leadServices'] });
      if (!lead) {
        throw new NotFoundException('Lead not found');
      }

      await this.leadServiceEntityRepository.delete({ lead: { id: leadId } });

      if (serviceIds && serviceIds.length > 0) {
        const services = await this.serviceRepository.find({ where: { id: In(serviceIds) } });
        
        if (services.length !== serviceIds.length) {
          throw new BadRequestException('One or more service IDs are invalid');
        }

        const leadServices = services.map(service => 
          this.leadServiceEntityRepository.create({
            lead: lead,
            service: service
          })
        );
        await this.leadServiceEntityRepository.save(leadServices);
      }

      return await this.leadRepository.findOne({ 
        where: { id: leadId }, 
        relations: ['customer', 'createdBy', 'leadServices', 'leadServices.service'] 
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createService(payload: CreateServiceDto): Promise<ServiceMaster> {
    try {
      const service = this.serviceRepository.create(payload);
      return await this.serviceRepository.save(service);
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
}
