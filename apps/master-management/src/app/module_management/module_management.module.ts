import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { Menu, SystemModule, User, LoginSession } from '../../../../../libs/database/src';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { ModuleManagementController } from './module_management.controller';
import { ModuleManagementService } from './module_management.service';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { TokenValidationMiddleware, checkIfAdmin } from '../../../../../libs/middlewares/authMiddleware';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';

@Module({
  imports: [
    DBModule.forRoot(),
    ResponseHandlerModule,
    TypeOrmModule.forFeature([SystemModule, Menu, User, LoginSession]),
  ],
  controllers: [ModuleManagementController],
  providers: [ModuleManagementService, JwtService, TokenValidationMiddleware, checkIfAdmin, TokenValidationGuard, CheckIfAdminGuard],
})
export class ModuleManagementModule {}
