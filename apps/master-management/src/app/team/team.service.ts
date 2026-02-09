import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team, Department, User } from '../../../../../libs/database/src';
import { CreateTeamDto, UpdateTeamDto } from '../../../../../libs/dtos/master_management/team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTeam(payload: CreateTeamDto): Promise<Team> {
    try {
      // Validate Department
      const department = await this.departmentRepository.findOne({ where: { id: Number(payload.departmentId) } });
      if (!department) {
        throw new NotFoundException('Department not found');
      } 

      // Validate Team Lead if provided
      if (payload.teamLeadId) {
        const lead = await this.userRepository.findOne({ where: { id: Number(payload.teamLeadId) } });     
        if (!lead) {
          throw new NotFoundException('Team Lead user not found');
        }
      }

      const team = this.teamRepository.create(payload);
      return await this.teamRepository.save(team);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTeams(): Promise<Team[]> {
    try {
      return await this.teamRepository.find({
        relations: ['department', 'teamLead', 'members'],
        order: { name: 'ASC' }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTeamById(id: number): Promise<Team> {
    try {
      const team = await this.teamRepository.findOne({
        where: { id },  
        relations: ['department', 'teamLead', 'members']
      });
      if (!team) {
        throw new NotFoundException('Team not found');
      }
      return team;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateTeam(id: number, payload: UpdateTeamDto): Promise<Team> {
    try {
      const existing = await this.teamRepository.findOne({ where: { id }});
      if (!existing) {
        throw new NotFoundException('Team not found');
      }

      if (payload.departmentId) {
        const department = await this.departmentRepository.findOne({ where: { id: Number(payload.departmentId) } });
        if (!department) {
          throw new NotFoundException('Department not found');
        }
      }

      await this.teamRepository.update({ id}, payload);
      return await this.getTeamById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteTeam(id: number): Promise<{ success: boolean }> {
    try {
      const result = await this.teamRepository.delete(id);  
      if (result.affected === 0) {
        throw new NotFoundException('Team not found');
      }
      return { success: true };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
