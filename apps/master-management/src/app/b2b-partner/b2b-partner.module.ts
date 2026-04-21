import { Module } from '@nestjs/common';
import { B2BPartnerController } from './b2b-partner.controller';
import { B2BPartnerService } from './b2b-partner.service';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { TokenValidationMiddleware, checkIfAdmin } from '../../../../../libs/middlewares/authMiddleware';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginSession } from '../../../../../libs/database/src/entities/loginSession.entity';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { S3Module } from '../../../../../libs/S3-Service/s3.module';
import { B2BPartner } from '../../../../../libs/database/src/entities/b2b-partner.entity';

@Module({
  imports: [
    DBModule.forRoot(),
    ResponseHandlerModule,
    ConfigModule,
    S3Module,
    TypeOrmModule.forFeature([B2BPartner, LoginSession]),
  ],
  controllers: [B2BPartnerController],
  providers: [
    B2BPartnerService,
    JwtService,
    TokenValidationMiddleware,
    checkIfAdmin,
    TokenValidationGuard,
    CheckIfAdminGuard,
  ],
  exports: [B2BPartnerService],
})
export class B2BPartnerModule {}  