import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { IntercertPartnerUser } from '../entities/intercert-partner-user.entity';

@Injectable()
export class IntercertPartnerUserRepository {
  constructor(
    @InjectRepository(IntercertPartnerUser)
    private readonly repo: Repository<IntercertPartnerUser>,
  ) {}

  async create(user: Partial<IntercertPartnerUser>): Promise<IntercertPartnerUser> {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }

  async findAll(options?: FindManyOptions<IntercertPartnerUser>): Promise<IntercertPartnerUser[]> {
    return this.repo.find(options);
  }

  async findAndCount(options?: FindManyOptions<IntercertPartnerUser>): Promise<[IntercertPartnerUser[], number]> {
    return this.repo.findAndCount(options);
  }

  async findOne(id: number): Promise<IntercertPartnerUser> {
    return this.repo.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<IntercertPartnerUser> {
    return this.repo.findOne({ where: { email } });
  }

  async preload(user: Partial<IntercertPartnerUser>): Promise<IntercertPartnerUser> {
    return this.repo.preload(user);
  }

  async save(user: IntercertPartnerUser): Promise<IntercertPartnerUser> {
    return this.repo.save(user);
  }

  async update(id: number, user: Partial<IntercertPartnerUser>): Promise<void> {
    await this.repo.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
