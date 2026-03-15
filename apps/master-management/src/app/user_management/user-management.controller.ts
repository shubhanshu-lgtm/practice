import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from '../../../../../libs/interfaces/authenticated-request.interface';
import { UserManagementService } from './user-management.service';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { CreateUserDto, UpdateUserDto, UpdateUserGroupDto } from '../../../../../libs/dtos/master_management/user_management.dto';

@Controller('user')
@UseGuards(TokenValidationGuard, CheckIfAdminGuard)
export class UserManagementController {
  constructor(private readonly svc: UserManagementService) {}

  @Get('users')
  async listUsers() {
    const users = await this.svc.listUsers();
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users
    };
  }

  @Get('users/:id')
  async getUser(@Param('id') id: number) {
    const user = await this.svc.getUser(Number(id));
    return {
      success: true,
      message: 'User retrieved successfully',
      data: user
    };
  }

  @Post('add-user')
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
  async assignModules(@Req() req: AuthenticatedRequest, @Param('id') id: number, @Body() body: { modules: number[] }) {
    const result = await this.svc.assignModules(Number(id), body.modules);
    return {
      success: true,
      message: 'Modules assigned successfully',
      data: result
    };
  }

  @Post('users/:id/permission')
  async assignPermission(@Param('id') id: number, @Body() body: { permissionId: number }) {
    const result = await this.svc.assignPermission(Number(id), body.permissionId);
    return {
      success: true,
      message: 'Permission assigned successfully',
      data: result
    };
  }

  @Post('users/:id/access/grant-full')
  async grantFullModuleAccess(@Param('id') id: number, @Body() body: { moduleIds: number[] }) {
    const result = await this.svc.grantFullModuleAccess(Number(id), body.moduleIds);
    return {
      success: true,
      message: 'Full module access granted successfully',
      data: result
    };
  }

  @Post('users/:id/access/revoke')
  async revokeModuleAccess(@Param('id') id: number, @Body() body: { moduleIds: number[] }) {
    const result = await this.svc.revokeModuleAccess(Number(id), body.moduleIds);
    return {
      success: true,
      message: 'Module access revoked successfully',
      data: result
    };
  }

  @Post('users/:id/access/revoke-full')
  async revokeAllModuleAccess(@Param('id') id: number) {
    const result = await this.svc.revokeAllModuleAccess(Number(id));
    return {
      success: true,
      message: 'All module access revoked successfully',
      data: result
    };
  }

  @Post('users/permissions/sales-full')
  async assignSalesFullPermissions(@Body() body: { emails: string[] }) {
    const result = await this.svc.assignSalesFullPermissionsToUsers(body.emails);
    return {
      success: true,
      message: 'Sales permissions assigned successfully',
      data: result
    };
  }

  @Post('users/:id/departments')
  async assignDepartments(@Param('id') id: number, @Body() body: { departments: number[] }) {
    const result = await this.svc.assignDepartments(Number(id), body.departments);
    return {
      success: true,
      message: 'Departments assigned successfully',
      data: result
    };
  }

  @Post('users/:id/teams')
  async assignTeams(@Param('id') id: number, @Body() body: { teams: number[] }) {
    const result = await this.svc.assignTeams(Number(id), body.teams);
    return {
      success: true,
      message: 'Teams assigned successfully',
      data: result
    };
  }

  @Patch('users/:id/user-group')
  async updateUserGroup(@Param('id') id: number, @Body() body: UpdateUserGroupDto) {
    const user = await this.svc.updateUserGroup(Number(id), body.user_group);
    return {
      success: true,
      message: 'User group updated successfully',
      data: user
    };
  }

  @Delete('users/:id')
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
