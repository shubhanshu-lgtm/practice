import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from '../entities/proposal.entity';

@Injectable()
export class ProposalRepository {
  constructor(
    @InjectRepository(Proposal)
    private readonly repo: Repository<Proposal>,
  ) {}

  // Repository for Proposals
  async create(proposal: Partial<Proposal>): Promise<Proposal> {
    const newProposal = this.repo.create(proposal);
    return this.repo.save(newProposal);
  }

  async findAll(): Promise<Proposal[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Proposal> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, proposal: Partial<Proposal>): Promise<void> {
    await this.repo.update(id, proposal);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
