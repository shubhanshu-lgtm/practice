import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Department, Team, LoginSession, DBModule, PermissionManager } from '../../../../../libs/database/src';
import { SystemModule } from '../../../../../libs/database/src/entities/systemModule.entity';
import { UserManagementController } from './user-management.controller';
import { UserManagementService } from './user-management.service';
import { UserRepository } from '../../../../../libs/database/src/repositories/user.repository';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { S3Module } from '../../../../../libs/S3-Service/s3.module';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';

@Module({
  imports: [
    DBModule.forRoot(),
          ConfigModule, 
          S3Module,
          ResponseHandlerModule,TypeOrmModule.forFeature([User, SystemModule, Department, Team, LoginSession, PermissionManager])],
  controllers: [UserManagementController],
  providers: [UserManagementService, UserRepository],
})
export class UserManagementModule {}
