import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { Proposal } from '../../../../../libs/database/src/entities/proposal.entity';
import { LeadService } from '../../../../../libs/database/src/entities/lead-service.entity';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { TokenValidationMiddleware, checkIfAdmin } from '../../../../../libs/middlewares/authMiddleware';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';

@Module({
  imports: [
    DBModule.forRoot(),
    ConfigModule,
    ResponseHandlerModule,
    TypeOrmModule.forFeature([Lead, ProposalAcceptance, Project, Proposal, LeadService]),
  ],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    JwtService,
    TokenValidationMiddleware,
    TokenValidationGuard,
    CheckIfAdminGuard,
    checkIfAdmin,
  ],
  exports: [DashboardService],
})
export class DashboardModule {}
