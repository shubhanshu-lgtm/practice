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
    if (req.user_group === USER_GROUP.SUPER_ADMIN) return true;
    
    // Check if user has permission object
    if (!user || !user.permission) {
        // If user is Super Admin, maybe allow? 
        // But better to stick to permission logic if requested.
        // Assuming user must have permissions.
        throw new ForbiddenException('No permissions assigned');
    }

    // Find module ID from user.modules (which are loaded in JwtAuthGuard)
    const targetModule = (user.modules || []).find(m => m.code === requirement.module);
    if (!targetModule) {
        throw new ForbiddenException(`Access to module ${requirement.module} denied`);
    }

    // Check granular permission
    // user.permission.permissions is stored as JSON
    const permissions = user.permission.permissions || [];
    const permissionRecord = permissions.find(p => String(p.module) === String(targetModule.id));
    
    if (!permissionRecord) {
         // Default deny if no record found
         throw new ForbiddenException(`No permission record for module ${requirement.module}`);
    }

    if (!permissionRecord.action[requirement.action]) {
        throw new ForbiddenException(`Action ${requirement.action} denied on module ${requirement.module}`);
    }

    return true;
  }
}
