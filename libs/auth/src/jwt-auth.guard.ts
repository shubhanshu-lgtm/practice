import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, LoginSession } from '../../database/src';
import { ConfigService } from '../../config/config.service';
import { JWTPayload } from '../../interfaces/authentication/jwtPayload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LoginSession)
    private readonly loginSessionRepository: Repository<LoginSession>,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string = request.headers['authorization'] || request.headers['authorisation'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('authorisation token missing');
    }

    const token = authHeader.split(' ')[1];
    const secret = this.configService.get().JWT_SECRET_KEY;

    if (!secret) {
      throw new UnauthorizedException('JWT secret not configured');
    }

    try {
      const decoded = jwt.verify(token, secret) as JWTPayload;

      const user = await this.userRepository.findOne({ where: { id: decoded.referenceId }, relations: ['permission', 'modules', 'departments'] });
      if (!user) throw new UnauthorizedException('User not found');

      const loginSession = await this.loginSessionRepository.findOne({ where: { id: decoded.sessionId }, relations: ['user'] });
      if (loginSession) request.session = loginSession;

      request.user = user;
      request.user_group = decoded.user_group;
      request.department = user.departments;
      request.permissionId = decoded.permissionId;
      request.permission = user.permission;
      // expose modules for downstream guards
      try {
        request.modules = (user.modules || []).map((m: any) => (m.code ? m.code : m.id));
      } catch (e) {
        request.modules = [];
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
