import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User, LoginSession, PermissionManager, Department, SystemModule } from '../../../../../libs/database/src';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { DefaultUserService } from './services/defaultUser.service';
import { UserRepository } from '../../../../../libs/database/src/repositories/user.repository';
import { PermissionManagerRepository } from '../../../../../libs/database/src/repositories/permissionManager.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LoginSession, PermissionManager, Department, SystemModule]),
    PassportModule.register({ defaultStrategy: 'google' }),
    ResponseHandlerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtService,
    JwtAuthGuard,
    DefaultUserService,
    UserRepository,
    PermissionManagerRepository,
  ],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly defaultUserService: DefaultUserService) {}

  async onModuleInit() {
    if (process.env.CREATE_DEFAULT_SUPER_ADMIN === 'true') {
      await this.defaultUserService.addDefaultUser();
    }
  }
}
