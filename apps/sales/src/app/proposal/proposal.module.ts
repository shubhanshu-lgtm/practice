import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from '../../../../../libs/database/src/entities/proposal.entity';
import { ProposalItem } from '../../../../../libs/database/src/entities/proposal-item.entity';
import { ProposalPaymentTerm } from '../../../../../libs/database/src/entities/proposal-payment-term.entity';
import { ProposalFile } from '../../../../../libs/database/src/entities/proposal-file.entity';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { ProposalReportService } from './proposal-report.service';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadService as LeadServiceEntity } from '../../../../../libs/database/src/entities/lead-service.entity';
import { Customer } from '../../../../../libs/database/src/entities/customer.entity';
import { CustomerAddress } from '../../../../../libs/database/src/entities/customerAddress.entity';
import { CustomerContact } from '../../../../../libs/database/src/entities/customerContact.entity';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { TokenValidationMiddleware, checkIfAdmin } from '../../../../../libs/middlewares/authMiddleware';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { PdfTemplateService } from '../../../../../libs/templates/pdf-template.service';
import { S3Module } from '../../../../../libs/S3-Service/s3.module';

@Module({
  imports: [
    DBModule.forRoot(),
    ConfigModule,
    ResponseHandlerModule,
    S3Module,
    TypeOrmModule.forFeature([
      Proposal,
      ProposalItem,
      ProposalPaymentTerm,
      ProposalFile,
      Lead,
      LeadServiceEntity,
      Customer,
      CustomerAddress,
      CustomerContact,
      User
    ])
  ],
  providers: [
    ProposalService,
    ProposalReportService,
    PdfTemplateService,
    JwtService,
    TokenValidationMiddleware,
    TokenValidationGuard,
    CheckIfAdminGuard,
    checkIfAdmin,
  ],
  controllers: [ProposalController],
  exports: [ProposalService]
})
export class ProposalModule {}
