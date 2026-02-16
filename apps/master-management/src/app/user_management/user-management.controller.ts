import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from '../../../../../libs/interfaces/authenticated-request.interface';
import { UserManagementService } from './user-management.service';
import { JwtAuthGuard } from '../../../../../libs/auth/src/jwt-auth.guard';
import { ModuleAccessGuard } from '../../../../../libs/auth/src/module-access.guard';
import { PermissionAccessGuard } from '../../../../../libs/auth/src/permission-access.guard';
import { ModuleAccess } from '../../../../../libs/auth/src/module-access.decorator';
import { PermissionAccess } from '../../../../../libs/auth/src/permission-access.decorator';
import { SYSTEM_MODULE_CODES } from '../../../../../libs/constants/moduleConstants';
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
    const users = await this.svc.listUsers();
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users
    };
  }

  @Get('users/:id')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.READ)
  async getUser(@Param('id') id: number) {
    const user = await this.svc.getUser(Number(id));
    return {
      success: true,
      message: 'User retrieved successfully',
      data: user
    };
  }

  @Post('add-user')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.ADD)
  async createUser(@Req() req: AuthenticatedRequest, @Body() body: CreateUserDto) {
    const actor = req.user;
    const user = await this.svc.createUser(body, actor.id);
    return {
      success: true,
      message: 'User created successfully',
      data: user
    };
  }

  @Put('users/:id')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.UPDATE)
  async updateUser(@Req() req: AuthenticatedRequest, @Param('id') id: number, @Body() body: UpdateUserDto) {
    const actor = req.user;
    const user = await this.svc.updateUser(Number(id), body, actor.id);
    return {
      success: true,
      message: 'User updated successfully',
      data: user
    };
  }

  //
  @Post('users/:id/modules')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.UPDATE)
  async assignModules(@Req() req: AuthenticatedRequest, @Param('id') id: number, @Body() body: { modules: number[] }) {
    const result = await this.svc.assignModules(Number(id), body.modules);
    return {
      success: true,
      message: 'Modules assigned successfully',
      data: result
    };
  }

  @Post('users/:id/permission')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.UPDATE)
  async assignPermission(@Param('id') id: number, @Body() body: { permissionId: number }) {
    const result = await this.svc.assignPermission(Number(id), body.permissionId);
    return {
      success: true,
      message: 'Permission assigned successfully',
      data: result
    };
  }

  @Post('users/:id/departments')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.UPDATE)
  async assignDepartments(@Param('id') id: number, @Body() body: { departments: number[] }) {
    const result = await this.svc.assignDepartments(Number(id), body.departments);
    return {
      success: true,
      message: 'Departments assigned successfully',
      data: result
    };
  }

  @Post('users/:id/teams')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.UPDATE)
  async assignTeams(@Param('id') id: number, @Body() body: { teams: number[] }) {
    const result = await this.svc.assignTeams(Number(id), body.teams);
    return {
      success: true,
      message: 'Teams assigned successfully',
      data: result
    };
  }

  @Delete('users/:id')
  @PermissionAccess(SYSTEM_MODULE_CODES.USER_MANAGEMENT, PERMISSIONS.DELETE)
  async deleteUser(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    const actor = req.user;
    const result = await this.svc.deleteUser(Number(id), actor.id);
    return {
      success: true,
      message: 'User deleted successfully',
      data: result
    };
  }

}
