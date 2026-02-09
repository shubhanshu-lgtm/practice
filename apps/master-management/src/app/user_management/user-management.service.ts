import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User, SystemModule, Department, Team } from '../../../../../libs/database/src';
import { UserRepository } from '../../../../../libs/database/src/repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../../../../../libs/dtos/master_management/user_management.dto';
import { USER_ACCOUNT_STATUS, USER_GROUP, USER_LOGIN_SOURCE, USER_VERIFY_STATUS } from '../../../../../libs/constants/autenticationConstants/userContants';
import { UserI } from '../../../../../libs/interfaces/authentication/user.interface';
import { generatePasswordHash } from '../../../../../libs/utils/bcryptUtil';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(SystemModule) private readonly moduleRepo: Repository<SystemModule>,
    @InjectRepository(Department) private readonly deptRepo: Repository<Department>,
    @InjectRepository(Team) private readonly teamRepo: Repository<Team>,
    private readonly userService: UserRepository,
  ) {}

  async listUsers() {
    return this.userRepo.find({ relations: ['permission', 'modules', 'departments'] });
  }

  async getUser(id: number) {
    const u = await this.userRepo.findOne({ where: { id }, relations: ['permission', 'modules', 'departments'] });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async createUser(payload: CreateUserDto, addedBy: number) {
    const { modules, departments, teams, role, password, ...rest } = payload;
    
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await generatePasswordHash(password);
    }

    // basic create user
    const id = await this.userService.addOrUpdateUser({
      ...rest,
      password: hashedPassword,
      roleName: role || 'User',
      user_group: rest.user_group || USER_GROUP.USER,
      status: USER_ACCOUNT_STATUS.ACTIVE,
      verifyStatus: USER_VERIFY_STATUS.VERIFIED,
      loginSource: USER_LOGIN_SOURCE.LOCAL,
      addedBy,
    });
    if (!id) throw new Error('Unable to create user');
    
    // Assign relations if provided
    if (modules && modules.length > 0) await this.assignModules(id, modules);
    if (departments && departments.length > 0) await this.assignDepartments(id, departments);
    if (teams && teams.length > 0) await this.assignTeams(id, teams);

    return this.getUser(id as number);
  }

  async updateUser(id: number, payload: UpdateUserDto, updatedBy: number) {
    const { modules, departments, teams, role, ...rest } = payload;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: UserI.AddOrUpdateUser = { ...rest, id, addedBy: updatedBy } as any;
    if (role) updateData.roleName = role;

    await this.userService.addOrUpdateUser(updateData);
    
    if (modules) await this.assignModules(id, modules);
    if (departments) await this.assignDepartments(id, departments);
    if (teams) await this.assignTeams(id, teams);
    
    return this.getUser(id);
  }

  async assignModules(userId: number, moduleIds: number[]) {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['modules'] });
    if (!user) throw new NotFoundException('User not found');
    const modules = await this.moduleRepo.find({ where: { id: In(moduleIds || []) } });
    user.modules = modules;
    await this.userRepo.save(user);
    return { success: true };
  }

  async assignDepartments(userId: number, deptIds: number[]) {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['departments'] });
    if (!user) throw new NotFoundException('User not found');
    const depts = await this.deptRepo.find({ where: { id: In(deptIds || []) } });
    user.departments = depts;
    await this.userRepo.save(user);
    return { success: true };
  }

  async assignTeams(userId: number, teamIds: number[]) {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['teams'] });
    if (!user) throw new NotFoundException('User not found');
    const teams = await this.teamRepo.find({ where: { id: In(teamIds || []) } });
    user.teams = teams;
    await this.userRepo.save(user);
    return { success: true };
  }
}
