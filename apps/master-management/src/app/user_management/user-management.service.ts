import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User, SystemModule, Department, Team, PermissionManager } from '../../../../../libs/database/src';
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
    const { modules, departments, teams, role, password, permissionId, ...rest } = payload;
    
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
    
    let effectivePermissionId = permissionId;
    if (!effectivePermissionId) {
      // Try to find an existing permission matching both user_group and roleName
      const roleName = role || 'User';
      const existingPermission = await this.permissionRepo.findOne({ 
        where: { 
          user_group: userGroup,
          roleName: roleName
        } 
      });
      if (existingPermission) {
        console.log(`Auto-assigning permission ID ${existingPermission.id} to user based on role: ${roleName}, group: ${userGroup}`);
        effectivePermissionId = existingPermission.id;
      } else {
        // Fallback: try just user_group
        const groupPermission = await this.permissionRepo.findOne({ 
          where: { user_group: userGroup } 
        });
        if (groupPermission) {
          console.log(`Auto-assigning permission ID ${groupPermission.id} to user based on group: ${userGroup}`);
          effectivePermissionId = groupPermission.id;
        }
      }
    }

    const id = await this.userService.addOrUpdateUser({
      ...rest,
      email,
      password: hashedPassword,
      roleName: role || 'User',
      user_group: userGroup,
      status: USER_ACCOUNT_STATUS.ACTIVE,
      verifyStatus: USER_VERIFY_STATUS.VERIFIED,
      loginSource: USER_LOGIN_SOURCE.LOCAL,
      permission: effectivePermissionId,
      addedBy,
    });
    if (!id) throw new Error('Unable to create user');
    
    if (modules && modules.length > 0) await this.assignModules(id, modules);
    if (departments && departments.length > 0) await this.assignDepartments(id, departments);
    if (teams && teams.length > 0) await this.assignTeams(id, teams);

    return this.getUser(id as number);
  }

  async updateUser(id: number, payload: UpdateUserDto, updatedBy: number) {
    const { modules, departments, teams, role, email, permissionId, ...rest } = payload;
    
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
    if (permissionId) updateData.permission = permissionId;

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

}
