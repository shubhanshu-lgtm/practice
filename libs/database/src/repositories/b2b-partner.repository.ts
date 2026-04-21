import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { B2BPartner } from '../entities/b2b-partner.entity';

@Injectable()
export class B2BPartnerRepository {
  constructor(
    @InjectRepository(B2BPartner)
    private readonly repo: Repository<B2BPartner>,
  ) {}

  async create(partner: Partial<B2BPartner>): Promise<B2BPartner> {
    const newPartner = this.repo.create(partner);
    return this.repo.save(newPartner);
  }

  async findAll(options?: FindManyOptions<B2BPartner>): Promise<B2BPartner[]> {
    return this.repo.find(options);
  }

  async findAndCount(options?: FindManyOptions<B2BPartner>): Promise<[B2BPartner[], number]> {
    return this.repo.findAndCount(options);
  }

  async findOne(id: number): Promise<B2BPartner> {
    return this.repo.findOne({ where: { id } });
  }

  async preload(partner: Partial<B2BPartner>): Promise<B2BPartner> {
    return this.repo.preload(partner);
  }

  async save(partner: B2BPartner): Promise<B2BPartner> {
    return this.repo.save(partner);
  }

  async update(id: number, partner: Partial<B2BPartner>): Promise<void> {
    await this.repo.update(id, partner);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
