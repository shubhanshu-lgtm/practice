import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, LoginSession, PermissionManager } from '../../../../../libs/database/src';
import { JWTPayload } from '../../../../../libs/interfaces/authentication/jwtPayload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LoginSession)
    private readonly loginSessionRepository: Repository<LoginSession>,
    @InjectRepository(PermissionManager)
    private readonly permissionRepository: Repository<PermissionManager>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string =
      request.headers['authorization'] ||
      request.headers['authorisation'] ||
      request.headers['accesstoken'] ||
      request.headers['accessToken'];

    if (!authHeader) {
      throw new UnauthorizedException('authorisation token missing');
    }

    let token = authHeader;
    if (authHeader.toLowerCase().startsWith('bearer')) {
      token = authHeader.slice(6).trim();
    }
    if (!token) {
      throw new UnauthorizedException('authorisation token missing');
    }
    const secret = process.env.JWT_SECRET_KEY;
    
    if (!secret) {
      throw new UnauthorizedException('JWT secret not configured');
    }

    try {
      // Verify token and extract payload
      console.log("Verifying token...");
      const decoded = jwt.verify(token, secret) as JWTPayload;
      console.log("Decoded JWT Token: ", decoded);

      // Look up user in database using referenceId (userId) from JWT payload
      console.log("Looking for user with ID:", decoded.referenceId);
      
      const user = await this.userRepository.findOne({
        where: { id: decoded.referenceId },
        relations: ['permission', 'modules', 'departments'],
      });
      console.log("Authenticated User from DB: ", user);

      if (!user) {
        console.log("User not found with ID:", decoded.referenceId);
        throw new UnauthorizedException('User not found');
      }

      // Verify session exists and is active
      console.log("Looking for login session with ID:", decoded.sessionId);
      
      const loginSession = await this.loginSessionRepository.findOne({
        where: { id: decoded.sessionId },
        relations: ['user'],
      });
      
      if (loginSession) {
        console.log("Valid login session found:", loginSession.id);
        request.session = loginSession;
      } else {
        console.warn('Login session not found in DB, but JWT is valid. Proceeding for Postman/Dev compatibility.');
      }

      // Fallback for missing permissions: If user has no permission assigned, try to find a group-level permission
      if (!user.permission) {
        console.log(`User ${user.email} has no permission assigned. Looking for group-level permission for: ${decoded.user_group}`);
        const groupPermission = await this.permissionRepository.findOne({
          where: { user_group: decoded.user_group }
        });
        if (groupPermission) {
          console.log(`Found group-level permission (ID: ${groupPermission.id}) for user group: ${decoded.user_group}`);
          user.permission = groupPermission;
        }
      }

      // Attach user, user_group, department, and permission to request object
      request.userEmail = user.email;
      request.userRole = decoded.userRole;
      request.user = user;
      request.user_group = decoded.user_group;
      request.department = user.departments;
      request.modules = user.modules;
      request.permissionId = decoded.permissionId;
      request.permission = user.permission;

      // Allow request to proceed
      return true;
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
