import { Module } from '@nestjs/common';
import { DBModule } from '../../../../libs/database/src/database.module';    
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../../../../libs/config/config.module';
import { ResponseHandlerModule } from '../../../../libs/response-handler/response-handler.module';
import { WorldDataModule } from './world_data/world_data.module';
import { AuthModule } from './authentication/auth.module';
import { DepartmentModule } from './department/department.module';
import { ModuleManagementModule } from './module_management/module_management.module';
import { LeadModule } from './lead/lead.module';
import { UserManagementModule } from './user_management/user-management.module';
import { TeamModule } from './team/team.module';
import { PartnerUserModule } from './partner-user/partner-user.module';
import { B2BPartnerModule } from './b2b-partner/b2b-partner.module';

@Module({
    imports: [
        DBModule.forRoot(),
        ConfigModule,
        ResponseHandlerModule,
        WorldDataModule,
        AuthModule,
        UserManagementModule,
        DepartmentModule,
        TeamModule,
        ModuleManagementModule,
        LeadModule,
        PartnerUserModule,
        B2BPartnerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
