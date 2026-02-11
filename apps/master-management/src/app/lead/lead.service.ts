import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, In, Between } from 'typeorm';
import { Customer } from '../../../../../libs/database/src/entities/customer.entity';
import { CustomerAddress } from '../../../../../libs/database/src/entities/customerAddress.entity';
import { CustomerContact } from '../../../../../libs/database/src/entities/customerContact.entity';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadService as LeadServiceEntity } from '../../../../../libs/database/src/entities/lead-service.entity';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { ServiceMaster } from '../../../../../libs/database/src/entities/service-master.entity';
import { CreateLeadDto, UpdateLeadDto, CreateServiceDto, UpdateServiceDto } from '../../../../../libs/dtos/master_management/lead.dto';
import { LEAD_SOURCE, LEAD_STATUS } from '../../../../../libs/constants/salesConstants';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
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

  async createLead(payload: CreateLeadDto): Promise<Lead> {
    try {
      const enquiryId = await this.generateEnquiryId();
      
      let customer: Customer = null;
      if (payload.customerId) {
        customer = await this.customerRepository.findOne({ where: { id: payload.customerId } });
      } else if (payload.customer) {
        customer = this.customerRepository.create(payload.customer);
        customer = await this.customerRepository.save(customer);
        
        if (payload.addresses && payload.addresses.length > 0) {
          const addresses = payload.addresses.map(addr => 
            this.addressRepository.create({ ...addr, customer })
          );
          await this.addressRepository.save(addresses);
        }
      }

      const contacts = payload.contacts.map((contact) =>
        this.contactRepository.create({
          ...contact,
          customer,
        }),
      );
      await this.contactRepository.save(contacts);

      let createdBy: User = null;
      if (payload.createdBy) {
        createdBy = await this.userRepository.findOne({ where: { id: payload.createdBy } });
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

      if (services.length > 0) {
        const leadServices = services.map(service => 
          this.leadServiceEntityRepository.create({
            lead: savedLead,
            service: service
          })
        );
        await this.leadServiceEntityRepository.save(leadServices);
      }
      
      return savedLead;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLeads(): Promise<Lead[]> {
    try {
      return await this.leadRepository.find({ relations: ['customer', 'leadServices', 'leadServices.service'] });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getServices(): Promise<ServiceMaster[]> {
    try {
      return await this.serviceRepository.find({ where: { isActive: true } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLeadById(id: number): Promise<Lead> {
    try {
      const lead = await this.leadRepository.findOne({ where: { id }, relations: ['customer', 'leadServices', 'leadServices.service'] });
      if (!lead) {
        throw new NotFoundException('Lead not found');
      }
      return lead;
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
}
