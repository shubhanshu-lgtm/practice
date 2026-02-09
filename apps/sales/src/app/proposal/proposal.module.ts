import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from '../../../../../libs/database/src/entities/proposal.entity';
import { ProposalItem } from '../../../../../libs/database/src/entities/proposal-item.entity';
import { ProposalPaymentTerm } from '../../../../../libs/database/src/entities/proposal-payment-term.entity';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadService } from '../../../../../libs/database/src/entities/lead-service.entity';
import { ProposalItemRepository } from '../../../../../libs/database/src/repositories/proposal-item.repository';
import { ProposalPaymentTermRepository } from '../../../../../libs/database/src/repositories/proposal-payment-term.repository';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';

@Module({
  imports: [
    DBModule.forRoot(),
    ConfigModule, 
    ResponseHandlerModule,
    TypeOrmModule.forFeature([
      Proposal,
      ProposalItem,
      ProposalPaymentTerm,
      Lead,
      LeadService
    ])
  ],
  providers: [ProposalService, LeadService, ProposalItemRepository, ProposalPaymentTermRepository],
  controllers: [ProposalController],
  exports: [ProposalService, ProposalItemRepository, ProposalPaymentTermRepository]
})
export class ProposalModule {}
