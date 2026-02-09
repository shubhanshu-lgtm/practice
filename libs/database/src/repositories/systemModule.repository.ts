import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SystemModule } from '../entities/systemModule.entity';

@Injectable()
export class SystemModuleRepository {
  constructor(
    @InjectRepository(SystemModule)
    private readonly repo: Repository<SystemModule>,
  ) {}

  async create(systemModule: Partial<SystemModule>): Promise<SystemModule> {
    const newSystemModule = this.repo.create(systemModule);
    return this.repo.save(newSystemModule);
  }

  async findAll(options?: FindManyOptions<SystemModule>): Promise<SystemModule[]> {
    return this.repo.find(options);
  }

  async findOne(id: number): Promise<SystemModule> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, systemModule: Partial<SystemModule>): Promise<void> {
    await this.repo.update(id, systemModule);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

// Repository for System Modules
