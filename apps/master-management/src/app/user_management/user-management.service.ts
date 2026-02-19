import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User, SystemModule, Department, Team, PermissionManager } from '../../../../../libs/database/src';
import { UserRepository } from '../../../../../libs/database/src/repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../../../../../libs/dtos/master_management/user_management.dto';
import { USER_ACCOUNT_STATUS, USER_GROUP, USER_LOGIN_SOURCE, USER_VERIFY_STATUS } from '../../../../../libs/constants/autenticationConstants/userContants';
import { PERMISSIONS } from '../../../../../libs/constants/autenticationConstants/permissionManagerConstants';
import { UserI } from '../../../../../libs/interfaces/authentication/user.interface';
import { generatePasswordHash } from '../../../../../libs/utils/bcryptUtil';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(SystemModule) private readonly moduleRepo: Repository<SystemModule>,
    @InjectRepository(Department) private readonly deptRepo: Repository<Department>,
    @InjectRepository(Team) private readonly teamRepo: Repository<Team>,
    @InjectRepository(PermissionManager) private readonly permissionRepo: Repository<PermissionManager>,
    private readonly userService: UserRepository,
  ) {}

  async listUsers() {
    return this.userRepo.find({ relations: ['permission', 'modules', 'departments', 'teams'] });
  }

  async getUser(id: number) {
    const u = await this.userRepo.findOne({ where: { id }, relations: ['permission', 'modules', 'departments', 'teams'] });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async createUser(payload: CreateUserDto, addedBy: number) {
    const { modules, departments, teams, role, password, ...rest } = payload;
    // const { modules, departments, teams, role, password, permissionId, ...rest } = payload;
    
    const email = payload.email.toLowerCase().trim();
    
    if (!email.endsWith('@intercert.com')) {
      throw new BadRequestException('Only @intercert.com email addresses are allowed.');
    }

    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists.`);
    }
    
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await generatePasswordHash(password);
    } else {
      const defaultPassword = "Intercert@OPMS123";
      hashedPassword = await generatePasswordHash(defaultPassword);
    }

    const userGroup = rest.user_group || USER_GROUP.USER;
    
    const id = await this.userService.addOrUpdateUser({
      ...rest,
      email,
      password: hashedPassword,
      roleName: role || 'User',
      user_group: userGroup,
      status: USER_ACCOUNT_STATUS.ACTIVE,
      verifyStatus: USER_VERIFY_STATUS.VERIFIED,
      loginSource: USER_LOGIN_SOURCE.LOCAL,
      addedBy,
    });
    if (!id) throw new Error('Unable to create user');
    
    if (modules && modules.length > 0) await this.assignModules(id, modules);
    if (departments && departments.length > 0) await this.assignDepartments(id, departments);
    if (teams && teams.length > 0) await this.assignTeams(id, teams);

    return this.getUser(id as number);
  }

  async updateUser(id: number, payload: UpdateUserDto, updatedBy: number) {
    const { modules, departments, teams, role, email, ...rest } = payload;
    
    if (email) {
      const normalizedEmail = email.toLowerCase().trim();
      
      if (!normalizedEmail.endsWith('@intercert.com')) {
        throw new BadRequestException('Only @intercert.com email addresses are allowed.');
      }

      const existingUser = await this.userRepo.findOne({ where: { email: normalizedEmail } });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(`User with email ${normalizedEmail} already exists.`);
      }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: UserI.AddOrUpdateUser = { ...rest, id, addedBy: updatedBy } as any;
    if (role) updateData.roleName = role;
    if (email) updateData.email = email.toLowerCase().trim();
    await this.userService.addOrUpdateUser(updateData);
    
    if (modules) await this.assignModules(id, modules);
    if (departments) await this.assignDepartments(id, departments);
    if (teams) await this.assignTeams(id, teams);
    
    return this.getUser(id);
  }

  async assignModules(userId: number, moduleIds: number[]) {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['modules'] });
    if (!user) throw new NotFoundException('User not found');
    
    if (!moduleIds || moduleIds.length === 0) {
      user.modules = [];
    } else {
      const modules = await this.moduleRepo.find({ where: { id: In(moduleIds) } });
      if (modules.length !== moduleIds.length) {
        throw new NotFoundException('One or more modules not found');
      }
      user.modules = modules;
    }
    
    await this.userRepo.save(user);
    return this.getUser(userId);
  }

  async assignDepartments(userId: number, deptIds: number[]) {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['departments'] });
    if (!user) throw new NotFoundException('User not found');
    
    if (!deptIds || deptIds.length === 0) {
      user.departments = [];
    } else {
      const depts = await this.deptRepo.find({ where: { id: In(deptIds) } });
      if (depts.length !== deptIds.length) {
        throw new NotFoundException('One or more departments not found');
      }
      user.departments = depts;
    }
    
    await this.userRepo.save(user);
    return this.getUser(userId);
  }

  async assignTeams(userId: number, teamIds: number[]) {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['teams'] });
    if (!user) throw new NotFoundException('User not found');
    
    if (!teamIds || teamIds.length === 0) {
      user.teams = [];
    } else {
      const teams = await this.teamRepo.find({ where: { id: In(teamIds) } });
      if (teams.length !== teamIds.length) {
        throw new NotFoundException('One or more teams not found');
      }
      user.teams = teams;
    }
    
    await this.userRepo.save(user);
    return this.getUser(userId);
  }

  async assignPermission(userId: number, permissionId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    
    // Validate permission exists
    const permission = await this.permissionRepo.findOne({ where: { id: permissionId } });
    if (!permission) throw new NotFoundException(`Permission with ID ${permissionId} not found`);
    
    user.permission = permission;
    await this.userRepo.save(user);
    
    return this.getUser(userId);
  }

  async deleteUser(userId: number, deletedBy: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    
    // Prevent self-deletion
    if (userId === deletedBy) {
      throw new BadRequestException('You cannot delete your own account');
    }
    
    // Soft delete or hard delete based on your requirement
    await this.userRepo.remove(user);
    
    return { success: true, message: `User ${user.email} deleted successfully` };
  }

  private async ensureSalesFullPermissionRole(userGroup: USER_GROUP): Promise<PermissionManager> {
    const roleName = 'SALES_MANAGEMENT_FULL';
    const existing = await this.permissionRepo.findOne({ where: { roleName, user_group: userGroup } });
    if (existing) return existing;

    const permission = this.permissionRepo.create({
      roleName,
      user_group: userGroup,
      permissions: [
        {
          module: 1,
          action: {
            [PERMISSIONS.ADD]: true,
            [PERMISSIONS.READ]: true,
            [PERMISSIONS.UPDATE]: true,
            [PERMISSIONS.DELETE]: true,
          }
        }
      ]
    } as unknown as PermissionManager);
    return this.permissionRepo.save(permission);
  }

  async assignSalesFullPermissionsToUsers(emails: string[]) {
    if (!emails || emails.length === 0) throw new BadRequestException('emails required');
    const users = await this.userRepo.find({ where: { email: In(emails) }, relations: ['modules'] });
    const foundEmails = new Set(users.map(u => u.email));
    const missing = emails.filter(e => !foundEmails.has(e));
    if (missing.length > 0) {
      throw new NotFoundException(`Users not found: ${missing.join(', ')}`);
    }

    const salesModule = await this.moduleRepo.findOne({ where: { id: 1 } });
    if (!salesModule) {
      throw new NotFoundException('Sales module not found');
    }

    const permissionsByGroup = new Map<USER_GROUP, PermissionManager>();
    for (const u of users) {
      const group = u.user_group || USER_GROUP.USER;
      let permission = permissionsByGroup.get(group);
      if (!permission) {
        permission = await this.ensureSalesFullPermissionRole(group);
        permissionsByGroup.set(group, permission);
      }
      u.permission = permission;
      const modules = u.modules || [];
      if (!modules.some(m => m.id === salesModule.id)) {
        modules.push(salesModule);
      }
      u.modules = modules;
    }
    await this.userRepo.save(users);
    return { success: true, assignedCount: users.length };
  }

  private async getOrCreateUserPermission(user: User): Promise<PermissionManager> {
    const roleName = `USER_${user.id}_CUSTOM`;
    if (user.permission && user.permission.roleName === roleName) {
      return this.permissionRepo.findOne({ where: { id: user.permission.id } });
    }
    const permission = this.permissionRepo.create({
      roleName,
      user_group: user.user_group || USER_GROUP.USER,
      permissions: []
    } as unknown as PermissionManager);
    const saved = await this.permissionRepo.save(permission);
    user.permission = saved;
    await this.userRepo.save(user);
    return saved;
  }

  async grantFullModuleAccess(userId: number, moduleIds: number[]) {
    if (!moduleIds || moduleIds.length === 0) {
      throw new BadRequestException('moduleIds required');
    }
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['modules', 'permission'] });
    if (!user) throw new NotFoundException('User not found');

    const modules = await this.moduleRepo.find({ where: { id: In(moduleIds) } });
    if (modules.length !== moduleIds.length) {
      throw new NotFoundException('One or more modules not found');
    }

    const permission = await this.getOrCreateUserPermission(user);
    const permissionRecords = permission.permissions || [];
    const permissionMap = new Map<number, PermissionManager['permissions'][number]>(
      permissionRecords.map(p => [Number(p.module), p])
    );
    for (const moduleId of moduleIds) {
      permissionMap.set(moduleId, {
        module: moduleId,
        action: {
          [PERMISSIONS.ADD]: true,
          [PERMISSIONS.READ]: true,
          [PERMISSIONS.UPDATE]: true,
          [PERMISSIONS.DELETE]: true,
        }
      });
    }
    permission.permissions = Array.from(permissionMap.values());
    await this.permissionRepo.save(permission);

    const currentModules = user.modules || [];
    const existingIds = new Set(currentModules.map(m => m.id));
    for (const m of modules) {
      if (!existingIds.has(m.id)) {
        currentModules.push(m);
      }
    }
    user.modules = currentModules;
    await this.userRepo.save(user);
    return this.getUser(userId);
  }

  async revokeModuleAccess(userId: number, moduleIds: number[]) {
    if (!moduleIds || moduleIds.length === 0) {
      throw new BadRequestException('moduleIds required');
    }
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['modules', 'permission'] });
    if (!user) throw new NotFoundException('User not found');

    if (user.permission) {
      const permission = await this.permissionRepo.findOne({ where: { id: user.permission.id } });
      if (permission) {
        permission.permissions = (permission.permissions || []).filter(p => !moduleIds.includes(Number(p.module)));
        await this.permissionRepo.save(permission);
      }
    }

    user.modules = (user.modules || []).filter(m => !moduleIds.includes(m.id));
    await this.userRepo.save(user);
    return this.getUser(userId);
  }

  async revokeAllModuleAccess(userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['modules', 'permission'] });
    if (!user) throw new NotFoundException('User not found');

    if (user.permission) {
      const permission = await this.permissionRepo.findOne({ where: { id: user.permission.id } });
      if (permission && permission.roleName === `USER_${user.id}_CUSTOM`) {
        permission.permissions = [];
        await this.permissionRepo.save(permission);
      }
    }
    user.modules = [];
    await this.userRepo.save(user);
    return this.getUser(userId);
  }

}
