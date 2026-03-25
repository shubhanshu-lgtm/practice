import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { Team } from '../../../../../libs/database/src/entities/team.entity';
import { PROJECT_STATUS } from '../../../../../libs/constants/salesConstants';

export class AssignProjectTeamDto {
  teamId?: number;
  assignedToUserId?: number;
  status?: PROJECT_STATUS;
  notes?: string;
  endDate?: Date;
}

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Team)
    private teamRepo: Repository<Team>
  ) {}

  async getProjectsForUser(userId: number): Promise<Project[]> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['departments', 'teams', 'teams.department', 'permission']
    });

    if (!user) return [];

    const isAdmin = user.roleName === 'Admin' || user.roleName === 'Super Admin';

    if (isAdmin) {
      return this.projectRepo.find({
        relations: ['department', 'lead', 'lead.customer', 'proposal', 'team', 'assignedToUser']
      });
    }

    const allowedDeptIds = new Set<number>();

    if (user.departments) {
      user.departments.forEach((d) => allowedDeptIds.add(d.id));
    }

    const userTeams = user.teams as unknown as Team[];
    if (userTeams) {
      userTeams.forEach((t) => {
        if (t.department) {
          allowedDeptIds.add(t.department.id);
        }
      });
    }

    if (allowedDeptIds.size === 0) {
      return [];
    }

    return this.projectRepo.find({
      where: {
        department: { id: In([...allowedDeptIds]) }
      },
      relations: ['department', 'lead', 'lead.customer', 'proposal', 'team', 'assignedToUser']
    });
  }

  async getProject(id: number): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: [
        'department',
        'lead',
        'lead.customer',
        'proposal',
        'proposal.items',
        'proposal.paymentTerms',
        'team',
        'team.members',
        'assignedToUser'
      ]
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async getProjectsByClosure(closureId: number): Promise<Project[]> {
    return this.projectRepo.find({
      where: { closureId },
      relations: ['department', 'team', 'assignedToUser', 'lead', 'lead.customer']
    });
  }

  async assignTeamToProject(
    projectId: number,
    dto: AssignProjectTeamDto
  ): Promise<Project> {
    const project = await this.projectRepo.findOne({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');

    if (dto.teamId !== undefined) {
      if (dto.teamId === null) {
        project.teamId = null;
      } else {
        const team = await this.teamRepo.findOne({
          where: { id: dto.teamId, departmentId: project.departmentId }
        });
        if (!team) {
          throw new BadRequestException(
            `Team ${dto.teamId} does not belong to the project department`
          );
        }
        project.teamId = dto.teamId;
      }
    }

    if (dto.assignedToUserId !== undefined) {
      project.assignedToUserId = dto.assignedToUserId || null;
    }

    if (dto.status !== undefined) {
      project.status = dto.status;
    }

    if (dto.notes !== undefined) {
      project.notes = dto.notes;
    }

    if (dto.endDate !== undefined) {
      project.endDate = dto.endDate;
    }

    await this.projectRepo.save(project);
    return this.getProject(projectId);
  }

  async updateProjectStatus(
    projectId: number,
    status: PROJECT_STATUS
  ): Promise<Project> {
    const project = await this.projectRepo.findOne({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');
    project.status = status;
    await this.projectRepo.save(project);
    return this.getProject(projectId);
  }
}
