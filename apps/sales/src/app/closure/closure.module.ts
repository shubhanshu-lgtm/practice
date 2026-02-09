import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { Proposal } from '../../../../../libs/database/src/entities/proposal.entity';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { ClosureService } from './closure.service';
import { ClosureController } from './closure.controller';

import { Project } from '../../../../../libs/database/src/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProposalAcceptance, Proposal, Lead, Project])
  ],
  providers: [ClosureService],
  controllers: [ClosureController],
  exports: [ClosureService]
})
export class ClosureModule {}
