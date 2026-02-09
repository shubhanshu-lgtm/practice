import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  async create(project: Partial<Project>): Promise<Project> {
    const newProject = this.repo.create(project);
    return this.repo.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Project> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, project: Partial<Project>): Promise<void> {
    await this.repo.update(id, project);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
