import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProposalAcceptance } from '../entities/proposal-acceptance.entity';

@Injectable()
export class ProposalAcceptanceRepository {
  constructor(
    @InjectRepository(ProposalAcceptance)
    private readonly repo: Repository<ProposalAcceptance>,
  ) {}

  async create(acceptance: Partial<ProposalAcceptance>): Promise<ProposalAcceptance> {
    const newAcceptance = this.repo.create(acceptance);
    return this.repo.save(newAcceptance);
  }

  async findAll(): Promise<ProposalAcceptance[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ProposalAcceptance> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, acceptance: Partial<ProposalAcceptance>): Promise<void> {
    await this.repo.update(id, acceptance);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
