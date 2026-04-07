import { Module } from '@nestjs/common';
import { PartnerUserService } from './partner-user.service';
import { PartnerUserController } from './partner-user.controller';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { TokenValidationMiddleware, checkIfAdmin } from '../../../../../libs/middlewares/authMiddleware';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginSession } from '../../../../../libs/database/src/entities/loginSession.entity';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { S3Module } from '../../../../../libs/S3-Service/s3.module';
import { IntercertPartnerUser } from '../../../../../libs/database/src/entities/intercert-partner-user.entity';


@Module({
  imports: [
    DBModule.forRoot(),
    //   ResponseHandlerModule,
    // AuthModule,
      ResponseHandlerModule,
         ConfigModule,
         S3Module,
         TypeOrmModule.forFeature([ IntercertPartnerUser, LoginSession]),
  ],
  providers: [PartnerUserService, JwtService, TokenValidationMiddleware, checkIfAdmin, TokenValidationGuard, CheckIfAdminGuard],
  controllers: [PartnerUserController],
  exports: [PartnerUserService],
})
export class PartnerUserModule {}
