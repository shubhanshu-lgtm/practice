import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MODULE_ACCESS_KEY } from './module-access.decorator';
import { USER_GROUP } from '../../constants/autenticationConstants/userContants';

@Injectable()
export class ModuleAccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredModule = this.reflector.getAllAndOverride<string>(MODULE_ACCESS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredModule) return true;

    const req = context.switchToHttp().getRequest();
    if (req.user_group === USER_GROUP.SUPER_ADMIN) return true;

    const modules = req.modules || [];
    if (!modules || modules.length === 0) {
      throw new ForbiddenException('Module access denied');
    }

    const ok = modules.some((m: any) => {
      if (typeof m === 'string') return m === requiredModule;
      return (m.code && m.code === requiredModule) || (m.id && String(m.id) === String(requiredModule));
    });

    if (!ok) throw new ForbiddenException('Module access denied');
    return true;
  }
}
