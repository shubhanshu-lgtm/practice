import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentRepository {
  constructor(
    @InjectRepository(Department)
    private readonly repo: Repository<Department>,
  ) {}

  async create(department: Partial<Department>): Promise<Department> {
    const newDepartment = this.repo.create(department);
    return this.repo.save(newDepartment);
  }

  async findAll(): Promise<Department[]> {
    return this.repo.find();
  }     

  async findOne(id: number): Promise<Department> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, department: Partial<Department>): Promise<void> {
    await this.repo.update(id, department);
  }

  async remove(id: number): Promise <void> {
    await this.repo.delete(id);
  }
}
