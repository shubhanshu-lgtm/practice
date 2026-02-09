import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadService } from '../entities/lead-service.entity';

@Injectable()
export class LeadServiceRepository {
  constructor(
    @InjectRepository(LeadService)
    private readonly leadServiceRepository: Repository<LeadService>,
  ) { }

  async create(leadService: Partial<LeadService>): Promise<LeadService> {
    try {
      const newLeadService = this.leadServiceRepository.create(leadService);
      return await this.leadServiceRepository.save(newLeadService);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<LeadService[]> {
    try {
      return await this.leadServiceRepository.find({
        relations: ['lead', 'service', 'department', 'owner']
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<LeadService | null> {
    try {
      return await this.leadServiceRepository.findOne({
        where: { id },
        relations: ['lead', 'service', 'department', 'owner']
      });
    } catch (error) {
      throw error;
    }
  }

  async findByLeadId(leadId: number): Promise<LeadService[]> {
    try {
      return await this.leadServiceRepository.find({
        where: { lead: { id: leadId } },
        relations: ['service', 'department', 'owner']
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, leadService: Partial<LeadService>): Promise<void> {
    try {
      await this.leadServiceRepository.update(id, leadService);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.leadServiceRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
