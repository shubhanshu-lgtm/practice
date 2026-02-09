import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProposalPaymentTerm } from '../entities/proposal-payment-term.entity';

@Injectable()
export class ProposalPaymentTermRepository {
  constructor(
    @InjectRepository(ProposalPaymentTerm)
    private readonly repo: Repository<ProposalPaymentTerm>,
  ) {}

  async create(term: Partial<ProposalPaymentTerm>): Promise<ProposalPaymentTerm> {
    const newTerm = this.repo.create(term);
    return this.repo.save(newTerm);
  }

  async findAll(): Promise<ProposalPaymentTerm[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ProposalPaymentTerm> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, term: Partial<ProposalPaymentTerm>): Promise<void> {
    await this.repo.update(id, term);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
