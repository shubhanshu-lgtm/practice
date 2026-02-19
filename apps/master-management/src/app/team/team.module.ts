import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { DBModule, Team, Department, User, LoginSession } from '../../../../../libs/database/src';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { TokenValidationMiddleware, checkIfAdmin } from '../../../../../libs/middlewares/authMiddleware';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { S3Module } from '../../../../../libs/S3-Service/s3.module';
@Module({
  imports: [
     DBModule.forRoot(),
              ConfigModule, 
              S3Module,
              ResponseHandlerModule,
    TypeOrmModule.forFeature([Team, Department, User, LoginSession]),
  ],
  controllers: [TeamController],
  providers: [TeamService, JwtService, TokenValidationMiddleware, checkIfAdmin, TokenValidationGuard, CheckIfAdminGuard],
  exports: [TeamService, TokenValidationGuard, CheckIfAdminGuard],
})
export class TeamModule {}
