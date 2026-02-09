import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS } from '../../constants/autenticationConstants/permissionManagerConstants';

export const PERMISSION_ACCESS_KEY = 'permission_access';

export interface PermissionRequirement {
  module: string; // Module Code
  action: PERMISSIONS;
}

export const PermissionAccess = (module: string, action: PERMISSIONS) => SetMetadata(PERMISSION_ACCESS_KEY, { module, action });
