import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceReportService } from './invoice-report.service';
import { Invoice } from '../../../../../libs/database/src/entities/invoice.entity';
import { InvoiceItem } from '../../../../../libs/database/src/entities/invoice-item.entity';
import { PaymentRecord } from '../../../../../libs/database/src/entities/payment-record.entity';
import { ProposalAcceptance } from '../../../../../libs/database/src/entities/proposal-acceptance.entity';
import { ProposalPaymentTerm } from '../../../../../libs/database/src/entities/proposal-payment-term.entity';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { TokenValidationMiddleware } from '../../../../../libs/middlewares/authMiddleware';
import { TokenValidationGuard } from '../../../../../libs/middlewares/authMiddleware.guard';

@Module({
  imports: [
    DBModule.forRoot(),
    ConfigModule,
    ResponseHandlerModule,
    TypeOrmModule.forFeature([
      Invoice,
      InvoiceItem,
      PaymentRecord,
      ProposalAcceptance,
      ProposalPaymentTerm
    ])
  ],
  providers: [
    InvoiceService,
    InvoiceReportService,
    JwtService,
    TokenValidationMiddleware,
    TokenValidationGuard
  ],
  controllers: [InvoiceController],
  exports: [InvoiceService]
})
export class InvoiceModule {}
