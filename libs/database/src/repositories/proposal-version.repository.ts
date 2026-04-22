import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProposalVersion } from '../entities/proposal-version.entity';

@Injectable()
export class ProposalVersionRepository {
  constructor(
    @InjectRepository(ProposalVersion)
    private readonly repo: Repository<ProposalVersion>,
  ) {}

  async create(version: Partial<ProposalVersion>): Promise<ProposalVersion> {
    const newVersion = this.repo.create(version);
    return this.repo.save(newVersion);
  }

  async findByProposalId(proposalId: number, options?: { skip?: number; take?: number }): Promise<[ProposalVersion[], number]> {
    return this.repo.findAndCount({
      where: { proposalId },
      order: { version: 'DESC' },
      skip: options?.skip,
      take: options?.take,
    });
  }

  async countByProposalId(proposalId: number): Promise<number> {
    return this.repo.count({ where: { proposalId } });
  }

  get rawRepository(): Repository<ProposalVersion> {
    return this.repo;
  }
}
