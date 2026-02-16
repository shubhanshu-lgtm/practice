import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { Customer } from '../../../../../libs/database/src/entities/customer.entity';
import { CustomerAddress } from '../../../../../libs/database/src/entities/customerAddress.entity';
import { CustomerContact } from '../../../../../libs/database/src/entities/customerContact.entity';
import { Lead } from '../../../../../libs/database/src/entities/lead.entity';
import { LeadContact } from '../../../../../libs/database/src/entities/lead-contact.entity';
import { LeadAddress } from '../../../../../libs/database/src/entities/lead-address.entity';
import { LeadService as LeadServiceEntity } from '../../../../../libs/database/src/entities/lead-service.entity';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { PermissionManager } from '../../../../../libs/database/src/entities/permissionManager.entity';
import { LeadServiceRepository, LoginSession } from '../../../../../libs/database/src';
import { ServiceMaster } from '../../../../../libs/database/src/entities/service-master.entity';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';

@Module({
  imports: [
    DBModule.forRoot(),
    ResponseHandlerModule,
    TypeOrmModule.forFeature([Lead, LeadContact, LeadAddress, Customer, CustomerAddress, CustomerContact, User, LoginSession, ServiceMaster, LeadServiceEntity, PermissionManager]),
  ],
  controllers: [LeadController],
  providers: [LeadService, LeadServiceEntity,LeadServiceRepository],
})
export class LeadModule {}
