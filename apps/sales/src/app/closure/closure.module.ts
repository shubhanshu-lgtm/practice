import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { Proposal } from '../../../../../libs/database/src/entities/proposal.entity';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { ClosureService } from './closure.service';
import { ClosureController } from './closure.controller';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { TokenValidationMiddleware, checkIfAdmin } from '../../../../../libs/middlewares/authMiddleware';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { S3Module } from '../../../../../libs/S3-Service/s3.module';

@Module({
  imports: [
    DBModule.forRoot(),
    ConfigModule,
    ResponseHandlerModule,
    S3Module,
    TypeOrmModule.forFeature([ProposalAcceptance, Proposal, Lead, Project])
  ],
  providers: [
    ClosureService,
    JwtService,
    TokenValidationMiddleware,
    TokenValidationGuard,
    CheckIfAdminGuard,
    checkIfAdmin
  ],
  controllers: [ClosureController],
  exports: [ClosureService]
})
export class ClosureModule {}
