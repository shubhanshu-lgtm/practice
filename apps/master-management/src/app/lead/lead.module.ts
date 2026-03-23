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
import { ServiceDeliverable } from '../../../../../libs/database/src/entities/service-deliverable.entity';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { TokenValidationMiddleware, checkIfAdmin } from '../../../../../libs/middlewares/authMiddleware';
import { S3Module } from '../../../../../libs/S3-Service/s3.module';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';

import { Department } from '../../../../../libs/database/src/entities/department.entity';
import { ProposalItem } from '../../../../../libs/database/src/entities/proposal-item.entity';

@Module({
  imports: [
    DBModule.forRoot(),
    ResponseHandlerModule,
    ConfigModule,
    S3Module,
    TypeOrmModule.forFeature([Lead, LeadContact, LeadAddress, Customer, CustomerAddress, CustomerContact, User, LoginSession, ServiceMaster, ServiceDeliverable, LeadServiceEntity, PermissionManager, Department, ProposalItem]),
  ],
  controllers: [LeadController],
  providers: [LeadService, LeadServiceEntity, LeadServiceRepository, JwtService, TokenValidationMiddleware, checkIfAdmin, TokenValidationGuard, CheckIfAdminGuard],
})
export class LeadModule {}
