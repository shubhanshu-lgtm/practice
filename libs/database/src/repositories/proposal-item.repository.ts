import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProposalItem } from '../entities/proposal-item.entity';

// Repository for Proposal Items
@Injectable()
export class ProposalItemRepository {
  constructor(
    @InjectRepository(ProposalItem)
    private readonly repo: Repository<ProposalItem>,
  ) {}

  async create(item: Partial<ProposalItem>): Promise<ProposalItem> {
    const newItem = this.repo.create(item);
    return this.repo.save(newItem);
  }

  async findAll(): Promise<ProposalItem[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ProposalItem> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, item: Partial<ProposalItem>): Promise<void> {
    await this.repo.update(id, item);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

// Repository for Proposal Items