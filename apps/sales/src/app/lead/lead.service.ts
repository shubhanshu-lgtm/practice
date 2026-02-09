import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, Between, In } from 'typeorm';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadService } from '../../../../../libs/database/src/entities/lead-service.entity';
import { Customer } from '../../../../../libs/database/src/entities/customer.entity';
import { CustomerAddress } from '../../../../../libs/database/src/entities/customerAddress.entity';
import { CustomerContact } from '../../../../../libs/database/src/entities/customerContact.entity';
import { ServiceMaster } from '../../../../../libs/database/src/entities/service-master.entity';
import { CreateLeadDto } from '../../../../../libs/dtos/master_management/lead.dto';
import { UpdateLeadServiceDetailsDto } from '../../../../../libs/dtos/sales/update-lead-service.dto';

@Injectable()
export class LeadManagementService {
  constructor(
    @InjectRepository(Lead)
    private leadRepo: Repository<Lead>,
    @InjectRepository(LeadService)
    private leadServiceRepo: Repository<LeadService>,
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    @InjectRepository(CustomerAddress)
    private addressRepo: Repository<CustomerAddress>,
    @InjectRepository(CustomerContact)
    private contactRepo: Repository<CustomerContact>,
    @InjectRepository(ServiceMaster)
    private serviceMasterRepo: Repository<ServiceMaster>,
    private dataSource: DataSource
  ) {}

  private sanitizeCode(value: string, length: number) {
    const trimmed = (value || '').replace(/[^a-zA-Z]/g, '').toUpperCase();
    return trimmed.substring(0, length).padEnd(length, 'X');
  }

  private async generateEnquiryId(): Promise<string> {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const count = await this.leadRepo.count({ where: { createdAt: Between(start, end) } });
    const sequence = String(count + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `IS/${yy}/${mm}/${dd}/${sequence}`;
  }

  private generateCustomerId(customerName: string, country: string) {
    const comp = this.sanitizeCode(customerName, 4);
    const cnt = this.sanitizeCode(country, 3);
    // Random part to ensure uniqueness if needed, but per logic:
    return `IS/${comp}/${cnt}`;
  }

  async createLead(dto: CreateLeadDto): Promise<Lead> {
    return this.dataSource.transaction(async (manager) => {
      // 1. Customer
      const country = dto.addresses?.[0]?.country || 'XXX';
      const customerId = this.generateCustomerId(dto.customer.name, country);
      
      let customer = await this.customerRepo.findOne({ where: { name: dto.customer.name } }); // Simple check
      if (!customer) {
        customer = manager.create(Customer, {
          customerId,
          name: dto.customer.name,
          businessActivities: dto.customer.businessActivities,
          headcount: dto.customer.headcount,
        });
        customer = await manager.save(Customer, customer);
      }

      // 2. Addresses
      if (dto.addresses) {
        const addresses = dto.addresses.map(addr => manager.create(CustomerAddress, { ...addr, customer }));
        await manager.save(CustomerAddress, addresses);
      }

      // 3. Contacts
      if (dto.contacts) {
        const contacts = dto.contacts.map(ct => manager.create(CustomerContact, { ...ct, customer }));
        await manager.save(CustomerContact, contacts);
      }

      // 4. Lead
      const enquiryId = await this.generateEnquiryId();
      const lead = manager.create(Lead, {
        enquiryId,
        enquiryReference: dto.enquiryReference,
        source: dto.source,
        sourceDescription: dto.sourceDescription,
        status: dto.status,
        notes: dto.notes,
        isDraft: dto.isDraft,
        customer: customer,
        // createdBy: dto.createdBy // Need to resolve User entity if passed
      });
      const savedLead = await manager.save(Lead, lead);

      // 5. Services
      if (dto.serviceIds && dto.serviceIds.length > 0) {
        const services = await this.serviceMasterRepo.findBy({ id: In(dto.serviceIds) }); // In import needed
        const leadServices = services.map(svc => manager.create(LeadService, {
          lead: savedLead,
          service: svc
        }));
        await manager.save(LeadService, leadServices);
      }

      return savedLead;
    });
  }

  async getLead(id: number): Promise<Lead> {
    return this.leadRepo.findOne({
      where: { id: id },
      relations: ['customer', 'leadServices', 'leadServices.service', 'proposals']
    });
  }

  async updateLeadServiceDetails(leadServiceId: string, details: UpdateLeadServiceDetailsDto): Promise<LeadService> {
    const ls = await this.leadServiceRepo.findOne({ where: { id: Number(leadServiceId) } });
    if (!ls) throw new NotFoundException('Lead Service not found');
    Object.assign(ls, details);
    return this.leadServiceRepo.save(ls);
  }
}
