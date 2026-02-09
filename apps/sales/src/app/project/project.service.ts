import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { Team } from '../../../../../libs/database/src/entities/team.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async getProjectsForUser(userId: number): Promise<Project[]> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['departments', 'teams', 'teams.department', 'permission']
    });

    if (!user) return [];

    // 1. Admin / Super Admin Check
    // This logic depends on how you define Admin/Super Admin. 
    // Checking roleName or permission level.
    const isAdmin = user.roleName === 'Admin' || user.roleName === 'Super Admin';
    
    if (isAdmin) {
      return this.projectRepo.find({ 
        relations: ['department', 'lead', 'proposal'] 
      });
    }

    // 2. Collect Department IDs
    const allowedDeptIds = new Set<number>();

    // From direct Department assignment
    if (user.departments) {
      user.departments.forEach(d => allowedDeptIds.add(d.id));
    }

    // From Team membership
    // Note: user.teams is defined as [] in User entity for circular dependency reasons, 
    // but at runtime with TypeORM relations it will be populated with Team objects.
    const userTeams = user.teams as unknown as Team[];
    if (userTeams) {
      userTeams.forEach(t => {
        if (t.department) {
          allowedDeptIds.add(t.department.id);
        }
      });
    }

    if (allowedDeptIds.size === 0) {
      return [];
    }

    // 3. Query Projects
    return this.projectRepo.find({
      where: {
        department: { id: In([...allowedDeptIds]) }
      },
      relations: ['department', 'lead', 'proposal']
    });
  }
}
