import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadEnquiry } from '../entities/lead-enquiry.entity';
import { LeadContact } from '../entities/lead-contact.entity';
import { LeadAddress } from '../entities/lead-address.entity';
import { User } from '../entities/user.entity';
import { CreateLeadEnquiryDto, UpdateLeadEnquiryDto } from '../../../dtos/sales/lead-enquiry.dto';

@Injectable()
export class LeadRepository {
  constructor(
    @InjectRepository(LeadEnquiry)
    private readonly leadEnquiryRepo: Repository<LeadEnquiry>,
    @InjectRepository(LeadContact)
    private readonly leadContactRepo: Repository<LeadContact>,
    @InjectRepository(LeadAddress)
    private readonly leadAddressRepo: Repository<LeadAddress>,
  ) {}

  /**
   * Generate enquiry ID: IS/YY/MM/DD/Sequence
   */
  async generateEnquiryId(): Promise<string> {
    const today = new Date();
    const yy = today.getFullYear().toString().slice(-2);
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    // Count leads created today
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const count = await this.leadEnquiryRepo.count({
      where: {
        createdAt: {
          $gte: todayStart,
          $lt: todayEnd,
        } as any,
      },
    });

    const sequence = String(count + 1).padStart(2, '0');
    return `IS/${yy}/${mm}/${dd}/${sequence}`;
  }

  /**
   * Generate customer ID: IS/COMP/CNT
   * COMP = First 4 letters of company name
   * CNT = First 3 letters of country
   */
  generateCustomerId(companyName: string, country: string): string {
    const comp = companyName.substring(0, 4).toUpperCase();
    const cnt = country.substring(0, 3).toUpperCase();
    return `IS/${comp}/${cnt}`;
  }

  /**
   * Create new lead enquiry
   */
  async createLead(dto: CreateLeadEnquiryDto, createdById: number): Promise<LeadEnquiry> {
    const enquiryId = await this.generateEnquiryId();
    const customerId = this.generateCustomerId(dto.companyName, dto.addresses[0]?.country || 'IND');

    const lead = this.leadEnquiryRepo.create({
      enquiryId,
      customerId,
      companyName: dto.companyName,
      enquiryReference: dto.enquiryReference,
      leadSource: dto.leadSource,
      sourceDescription: dto.sourceDescription,
      businessActivities: dto.businessActivities,
      headcount: dto.headcount,
      leadStatus: 'New',
      notes: dto.notes,
      createdById,
    });

    const savedLead = await this.leadEnquiryRepo.save(lead);

    // Create contacts
    if (dto.contacts && dto.contacts.length > 0) {
      const contacts = dto.contacts.map((contact) =>
        this.leadContactRepo.create({
          ...contact,
          leadId: Number(savedLead.id),
        }),
      );
      await this.leadContactRepo.save(contacts);
    }

    // Create addresses
    if (dto.addresses && dto.addresses.length > 0) {
      const addresses = dto.addresses.map((address) =>
        this.leadAddressRepo.create({
          ...address,
          leadId: Number(savedLead.id),
        }),
      );
      await this.leadAddressRepo.save(addresses);
    }

    return this.getLeadById(savedLead.id);
  }

  /**
   * Get lead by ID with all relations
   */
  async getLeadById(id: string): Promise<LeadEnquiry> {
    return this.leadEnquiryRepo.findOne({
      where: { id },
      relations: ['contacts', 'addresses', 'createdBy', 'updatedBy'],
    });
  }

  /**
   * Get lead by enquiry ID
   */
  async getLeadByEnquiryId(enquiryId: string): Promise<LeadEnquiry> {
    return this.leadEnquiryRepo.findOne({
      where: { enquiryId },
      relations: ['contacts', 'addresses', 'createdBy', 'updatedBy'],
    });
  }

  /**
   * Get all leads (paginated)
   */
  async getAllLeads(skip = 0, take = 10): Promise<{ data: LeadEnquiry[]; total: number }> {
    const [data, total] = await this.leadEnquiryRepo.findAndCount({
      skip,
      take,
      relations: ['contacts', 'addresses', 'createdBy'],
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  /**
   * Get leads by status
   */
  async getLeadsByStatus(status: string, skip = 0, take = 10): Promise<{ data: LeadEnquiry[]; total: number }> {
    const [data, total] = await this.leadEnquiryRepo.findAndCount({
      where: { leadStatus: status },
      skip,
      take,
      relations: ['contacts', 'addresses', 'createdBy'],
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  /**
   * Update lead enquiry
   */
  async updateLead(id: string, dto: UpdateLeadEnquiryDto, updatedById: number): Promise<LeadEnquiry> {  
    await this.leadEnquiryRepo.update(id, {
      ...dto,
      updatedById,
    });

    // Update contacts if provided
    if (dto.contacts && dto.contacts.length > 0) {
      await this.leadContactRepo.delete({ leadId: Number(id) });
      const contacts = dto.contacts.map((contact) =>
        this.leadContactRepo.create({
          ...contact,
          leadId: Number(id),
        }),
      );
      await this.leadContactRepo.save(contacts);
    }

    // Update addresses if provided
    if (dto.addresses && dto.addresses.length > 0) {
      await this.leadAddressRepo.delete({ leadId: Number(id) });
      const addresses = dto.addresses.map((address) =>
        this.leadAddressRepo.create({
          ...address,
          leadId: Number(id),
        }),
      );
      await this.leadAddressRepo.save(addresses);
    }

    return this.getLeadById(id);
  }

  /**
   * Delete lead
   */
  async deleteLead(id: string): Promise<void> {
    await this.leadEnquiryRepo.delete(Number(id));
  }

  /**
   * Check duplicate company name
   */
  async checkDuplicateCompany(companyName: string, excludeId?: number): Promise<LeadEnquiry | null> {
    const query = this.leadEnquiryRepo.createQueryBuilder('lead').where('LOWER(lead.companyName) = LOWER(:companyName)', {
      companyName,
    });

    if (excludeId) {
      query.andWhere('lead.id != :excludeId', { excludeId });
    }

    return query.getOne();
  }
}
