import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadService } from '../../../../../libs/database/src/entities/lead-service.entity';
import { Customer } from '../../../../../libs/database/src/entities/customer.entity';
import { CustomerAddress } from '../../../../../libs/database/src/entities/customerAddress.entity';
import { CustomerContact } from '../../../../../libs/database/src/entities/customerContact.entity';
import { ServiceMaster } from '../../../../../libs/database/src/entities/service-master.entity';
import { LeadManagementService } from './lead.service';
import { LeadController } from './lead.controller';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';

@Module({
  imports: [
    DBModule.forRoot(),
    ConfigModule, 
    ResponseHandlerModule,
    TypeOrmModule.forFeature([
      Lead,
      LeadService,
      Customer,
      CustomerAddress,
      CustomerContact,
      ServiceMaster
    ])
  ],
  providers: [LeadManagementService],
  controllers: [LeadController],
  exports: [LeadManagementService]
})
export class LeadModule {}
