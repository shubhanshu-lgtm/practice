import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_ACCESS_KEY, PermissionRequirement } from './permission-access.decorator';
import { AuthenticatedRequest } from '../../interfaces/authenticated-request.interface';
import { USER_GROUP } from '../../constants/autenticationConstants/userContants';
import { PERMISSIONS } from '../../../libs/constants/autenticationConstants/permissionManagerConstants';

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
    
    // Find module ID from user.modules (which are loaded in JwtAuthGuard)
    const targetModule = (user?.modules || []).find(m => m.code === requirement.module);
    
    // Check if user has permission object
    if (!user || !user.permission) {
        // Fallback: If user has the module assigned but no granular permission record, 
        // allow READ access if the requirement is READ.
        if (targetModule && requirement.action === PERMISSIONS.READ) {
            console.log(`User ${user?.email} has module ${requirement.module} but no granular permissions. Allowing READ access.`);
            return true;
        }
        
        throw new ForbiddenException('No permissions assigned');
    }

    if (!targetModule) {
        throw new ForbiddenException(`Access to module ${requirement.module} denied`);
    }

    // Check granular permission
    // user.permission.permissions is stored as JSON
    const permissions = user.permission.permissions || [];
    const permissionRecord = permissions.find(p => String(p.module) === String(targetModule.id));
    
    if (!permissionRecord) {
         // Fallback: If user has module but no specific record for this module in permission manager,
         // allow READ as default if they have the module assigned.
         if (requirement.action === PERMISSIONS.READ) return true;
         
         throw new ForbiddenException(`No permission record for module ${requirement.module}`);
    }

    if (!permissionRecord.action[requirement.action]) {
        throw new ForbiddenException(`Action ${requirement.action} denied on module ${requirement.module}`);
    }

    return true;
  }
}
