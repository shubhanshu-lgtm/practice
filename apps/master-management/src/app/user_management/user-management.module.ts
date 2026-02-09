import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Department, Team, LoginSession } from '../../../../../libs/database/src';
import { SystemModule } from '../../../../../libs/database/src/entities/systemModule.entity';
import { UserManagementController } from './user-management.controller';
import { UserManagementService } from './user-management.service';
import { UserRepository } from '../../../../../libs/database/src/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, SystemModule, Department, Team, LoginSession])],
  controllers: [UserManagementController],
  providers: [UserManagementService, UserRepository],
})
export class UserManagementModule {}
