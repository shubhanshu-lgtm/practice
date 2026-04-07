import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
   * Generate enquiry ID: [PREFIX][YYYY][MM][DD][HH][mm][ss]_[SEQ]
   * Prefix is dynamic based on company name differentiation.
   */
  async generateEnquiryId(companyName: string): Promise<string> {
    const today = new Date();
    
    // 1. Clean the company name: remove common suffixes and non-alphanumeric chars
    const cleanedName = (companyName || 'UNK')
      .replace(/(?:pvt ltd|private limited|ltd|limited|inc|corp|llp)/gi, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .trim()
      .toUpperCase();

    // 2. Find similar companies to determine differentiation length
    // We look for names that share the first 4 characters in the lead_enquiry table
    const initialPrefix = cleanedName.substring(0, 4);
    const similarLeads = await this.leadEnquiryRepo.find({
      where: { companyName: Like(`${initialPrefix}%`) },
      select: ['companyName']
    });

    // Default prefix length is 4 (or less if name is shorter)
    let requiredLength = Math.min(cleanedName.length, 4);
    
    for (const lead of similarLeads) {
      const otherCleaned = lead.companyName
        .replace(/(?:pvt ltd|private limited|ltd|limited|inc|corp|llp)/gi, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .trim()
        .toUpperCase();

      if (otherCleaned === cleanedName) continue;

      let i = 0;
      while (i < cleanedName.length && i < otherCleaned.length && cleanedName[i] === otherCleaned[i]) {
        i++;
      }
      requiredLength = Math.max(requiredLength, i + 1);
    }

    const prefix = cleanedName.substring(0, Math.min(cleanedName.length, requiredLength));
    
    const yyyy = today.getFullYear().toString();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');

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
    return `${prefix}${yyyy}${mm}${dd}${hh}${min}${ss}_${sequence}`;
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
    const enquiryId = await this.generateEnquiryId(dto.companyName);
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
      const addresses = dto.addresses.map((address) => {
        const { addressType, ...rest } = address;
        return this.leadAddressRepo.create({
          ...rest,
          addressType: addressType as any,
          leadId: Number(savedLead.id),
        });
      });
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
    const { contacts, addresses, ...updateData } = dto;
    await this.leadEnquiryRepo.update(id, {
      ...updateData,
      updatedById,
    });

    // Update contacts if provided
    if (contacts && contacts.length > 0) {
      await this.leadContactRepo.delete({ leadId: Number(id) });
      const contactEntities = contacts.map((contact) =>
        this.leadContactRepo.create({
          ...contact,
          leadId: Number(id),
        }),
      );
      await this.leadContactRepo.save(contactEntities);
    }

    // Update addresses if provided
    if (addresses && addresses.length > 0) {
      await this.leadAddressRepo.delete({ leadId: Number(id) });
      const addressEntities = addresses.map((address) => {
        const { addressType, ...rest } = address;
        return this.leadAddressRepo.create({
          ...rest,
          addressType: addressType as any,
          leadId: Number(id),
        });
      });
      await this.leadAddressRepo.save(addressEntities);
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
