import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../../../../../libs/database/src';
import { CreateDepartmentDto, UpdateDepartmentDto, UpdateDepartmentStatusDto } from '../../../../../libs/dtos/master_management/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async createDepartment(payload: CreateDepartmentDto): Promise<Department> {
    try {
      const department = this.departmentRepository.create(payload);
      return await this.departmentRepository.save(department);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDepartments(): Promise<Department[]> {
    try {
      return await this.departmentRepository.find({ order: { name: 'ASC' } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDepartmentById(id: number): Promise<Department> {
    try {
      const department = await this.departmentRepository.findOne({ where: { id } });
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      return department;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateDepartment(id: number, payload: UpdateDepartmentDto): Promise<Department> {
    try {
      const existing = await this.departmentRepository.findOne({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Department not found');
      }
      await this.departmentRepository.update({ id }, payload);
      return await this.getDepartmentById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateDepartmentStatus(id: number, payload: UpdateDepartmentStatusDto): Promise<Department> {
    try {
      const existing = await this.departmentRepository.findOne({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Department not found');
      }
      await this.departmentRepository.update({ id }, payload);
      return await this.getDepartmentById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
