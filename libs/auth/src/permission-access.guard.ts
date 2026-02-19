import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_ACCESS_KEY, PermissionRequirement } from './permission-access.decorator';
import { AuthenticatedRequest } from '../../interfaces/authenticated-request.interface';
import { USER_GROUP } from '../../constants/autenticationConstants/userContants';

@Injectable()
export class PermissionAccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirement = this.reflector.getAllAndOverride<PermissionRequirement>(PERMISSION_ACCESS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requirement) return true;

    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = req.user;
    if ([USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(req.user_group)) return true;
    
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const targetModule = (user.modules || []).find(m => m.code === requirement.module);
    if (!targetModule) {
      throw new ForbiddenException(`Access to module ${requirement.module} denied`);
    }

    return true;
  }
}
