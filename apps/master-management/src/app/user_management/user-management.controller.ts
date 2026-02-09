import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from '../../../../../libs/interfaces/authenticated-request.interface';
import { UserManagementService } from './user-management.service';
import { JwtAuthGuard } from '../../../../../libs/auth/src/jwt-auth.guard';
import { ModuleAccessGuard } from '../../../../../libs/auth/src/module-access.guard';
import { PermissionAccessGuard } from '../../../../../libs/auth/src/permission-access.guard';
import { ModuleAccess } from '../../../../../libs/auth/src/module-access.decorator';
import { PermissionAccess } from '../../../../../libs/auth/src/permission-access.decorator';
import { SYSTEM_MODULE_CODES } from '../../../../../libs/constants/moduleConstants';
import { USER_GROUP } from '../../../../../libs/constants/autenticationConstants/userContants';
import { PERMISSIONS } from '../../../../../libs/constants/autenticationConstants/permissionManagerConstants';
import { CreateUserDto, UpdateUserDto } from '../../../../../libs/dtos/master_management/user_management.dto';

@Controller('user')
@UseGuards(JwtAuthGuard, ModuleAccessGuard, PermissionAccessGuard)
@ModuleAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT)
export class UserManagementController {
  constructor(private readonly svc: UserManagementService) {}

  @Get('users')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.READ)
  async listUsers() {
    return this.svc.listUsers();
  }

  @Get('users/:id')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.READ)
  async getUser(@Param('id') id: number) {
    return this.svc.getUser(Number(id));
  }

  @Post('add-user')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.ADD)
  async createUser(@Req() req: AuthenticatedRequest, @Body() body: CreateUserDto) {
    const actor = req.user;
    // Keep Super Admin / Admin check if it's a hard requirement, or rely on permissions. 
    // Usually Super Admin has all permissions, but explicit check is safer if permissions aren't set up for SA.
    if (![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(actor.user_group)) {
       // If we want to rely solely on permissions, we might remove this. 
       // But let's keep it as an additional safeguard or for legacy reasons if permissions are empty.
       // However, PermissionAccessGuard will throw if no permission record found.
    }
    return this.svc.createUser(body, actor.id);
  }

  @Put('users/:id')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.UPDATE)
  async updateUser(@Req() req: AuthenticatedRequest, @Param('id') id: number, @Body() body: UpdateUserDto) {
    const actor = req.user;
    return this.svc.updateUser(Number(id), body, actor.id);
  }

  @Post('users/:id/modules')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.UPDATE)
  async assignModules(@Req() req: AuthenticatedRequest, @Param('id') id: number, @Body() body: { modules: number[] }) {
    // const actor = req.user;
    return this.svc.assignModules(Number(id), body.modules);
  }
}
