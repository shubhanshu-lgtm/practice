import { Module } from '@nestjs/common';
import { DBModule } from '../../../../libs/database/src/database.module';
import { ConfigModule } from '../../../../libs/config/config.module';
import { ResponseHandlerModule } from '../../../../libs/response-handler/response-handler.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadModule } from './lead/lead.module';
import { ProposalModule } from './proposal/proposal.module';
import { ClosureModule } from './closure/closure.module';
import { ProjectModule } from './project/project.module';

@Module({
    imports: [
        DBModule.forRoot(),
        ConfigModule,
        ResponseHandlerModule,
        LeadModule,
        ProposalModule,
        ClosureModule,
        ProjectModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
