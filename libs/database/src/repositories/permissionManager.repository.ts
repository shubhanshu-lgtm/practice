import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionManager } from '../entities/permissionManager.entity';
import { PermissionManagerI } from '../../../interfaces/authentication/permissionManager.interface';
import { User } from '../entities/user.entity';
import { USER_GROUP } from '../../../../libs/constants/autenticationConstants/userContants';

@Injectable()
export class PermissionManagerRepository {
  constructor(
    @InjectRepository(PermissionManager)
    private readonly permissionRepository: Repository<PermissionManager>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async addOrUpdatebulkPermission(input: PermissionManagerI.AddOrUpdatePermissionDb[]): Promise<void> {
    try {
      for (const item of input) {
        const exists = await this.permissionRepository.findOne({ where: { roleName: item.roleName, user_group: item.user_group } });
        if (exists) {
          await this.permissionRepository.update({ roleName: item.roleName, user_group: item.user_group }, item);
        } else {
          await this.permissionRepository.save(this.permissionRepository.create(item));
        }
      }
    } catch (error) {
      throw error;
    }
  }

    async addOrUpdatePermission(input: PermissionManagerI.AddPermission): Promise<void> {
      try {
        const { permissions, roleName, user_group, createdBy } = input;
        const user = await this.userRepository.findOne({where:{id: createdBy}});

        const updateVal = { createdBy: user, roleName, user_group, permissions };
        await this.permissionRepository.save(this.permissionRepository.create(updateVal));
      } catch (error) {
        throw error;
      }
    }

  async getPermissionByRoleName(input: { roleName?: string; createdBy?: number; user_group?: USER_GROUP; id?: number }): Promise<PermissionManager | null> {
    try {
      const { roleName, createdBy, user_group, id } = input;
      const query: any = {};

      if (roleName) query.roleName = roleName;
      if (createdBy) query.createdBy = createdBy;
      if (user_group) query.user_group = user_group;
      if (id) query.id = id;

      const permission = await this.permissionRepository.findOne({ where: query });
      return permission || null;
    } catch (error) {
      throw error;
    }
  }

  async getPermissionByRoleNameAndGroup(input: { roleName?: string; user_group?: USER_GROUP }): Promise<PermissionManager | null> {
    try {
      const { roleName, user_group } = input;
      const filters: any = {};

      if (roleName) filters.roleName = roleName;
      if (user_group) filters.user_group = user_group;

      if (Object.values(filters).length === 0) {
        return null;
      }

      const permission = await this.permissionRepository.findOne({ where: { roleName, user_group } });
      return permission || null;
    } catch (error) {
      throw error;
    }
  }

  async getPermissionById(id: number): Promise<PermissionManager | null> {
    try {
      const permission = await this.permissionRepository.findOne({ where: { id } });
      return permission || null;
    } catch (error) {
      throw error;
    }
  }
}
