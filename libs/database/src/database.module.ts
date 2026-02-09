import { Module } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { ConfigModule } from '../../config/config.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigDatabase } from '../../config/config.interface';
import {
    User,
    PermissionManager,
    Department,
    Team,
    Designation,
    StatusMaster,
    PriorityMaster,
    TaskTypeMaster,
    ActivityTypeMaster,
    DocumentTypeMaster,
    LeadEnquiry,
    LeadContact,
    LeadAddress,
    LoginSession,
    Session,
    SystemModule,
    Menu,
    Countries,
    States,
    Cities,
    Nationalities,
    Company,
    Branch,
    WorkRequest,
    WorkRequestType,
    SlaRule,
    NotificationRule,
    EscalationRule,
    Lead,
    Customer,
    CustomerAddress,
    CustomerContact,
    RoutingRule,
    ApprovalLevel,
    ApprovalStatus,
    AuditLog,
    DocumentClassification,
    LeadService,
    Proposal,
    ProposalItem,
    ProposalPaymentTerm,
    ProposalAcceptance,
    Project,
    ServiceMaster
} from './entities';

import {
    UserRepository,
    DepartmentRepository,
    TeamRepository,
    SystemModuleRepository,
    LeadRepository,
    ProposalRepository,
    ProposalItemRepository,
    ProposalPaymentTermRepository,
    ProposalAcceptanceRepository,
    ProjectRepository,
    SessionRepository,
    LoginSessionRepository,
    PermissionManagerRepository,
    LeadServiceRepository
} from './repositories';

@Module({})
export class DBModule {

    private static getConnectionOptions(config: ConfigService): TypeOrmModuleOptions {
        const dbData = config.get().db;
        if (!dbData) {
            throw new Error('Database configuration not found' );
        }
        const connectionOptions = this.getConnectionOptionsPostgres(dbData);
        return {
            ...connectionOptions,
            entities: [
                User,
                PermissionManager,
                Department,
                Team,
                Designation,
                StatusMaster,
                PriorityMaster,
                TaskTypeMaster,
                ActivityTypeMaster,
                DocumentTypeMaster,
                Countries,
                States,
                Cities,
                Nationalities,
                SystemModule,
                LeadEnquiry,
                LeadContact,
                LeadAddress,
                LoginSession,
                Session,
                Menu,
                Company,
                Branch,
                WorkRequest,
                WorkRequestType,
                SlaRule,
                NotificationRule,
                EscalationRule,
                Lead,
                Customer,
                CustomerAddress,
                CustomerContact,
                ServiceMaster,
                RoutingRule,
                ApprovalLevel,
                ApprovalStatus,
                AuditLog,
                DocumentClassification,
                LeadService,
                Proposal,
                ProposalItem,
                ProposalPaymentTerm,
                ProposalAcceptance,
                Project,
                ServiceMaster
            ],
            synchronize: true,
            //dropSchema: true,
            logging: false,
            migrationsRun: false
        };
    }

    private static getConnectionOptionsPostgres(dbData: ConfigDatabase): TypeOrmModuleOptions {
        const { database, entities, host, logging, password, port, synchronize, username } = dbData;
        return {
            database,
            entities,
            host,
            logging,
            password,
            port,
            synchronize,
            type: 'mysql',
            username,
        };
    }

    public static forRoot() {
        return {
            module: DBModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: (configService: ConfigService) => {
                        return DBModule.getConnectionOptions(configService);
                    },
                    inject: [ConfigService],
                }),
                TypeOrmModule.forFeature([
                   User,
                   PermissionManager,
                   Department,
                   Team,
                   Designation,
                   StatusMaster,
                   PriorityMaster,
                   TaskTypeMaster,
                   ActivityTypeMaster,
                   DocumentTypeMaster,
                   Countries,
                   States,
                   Cities,
                   Nationalities,
                   SystemModule,
                   LeadEnquiry,
                   LeadContact,
                   LeadAddress,
                   LoginSession,
                   Session,
                   Menu,
                   Company,
                   Branch,
                   WorkRequest,
                   WorkRequestType,
                   SlaRule,
                   NotificationRule,
                   EscalationRule,
                   Lead,
                   Customer,
                   CustomerAddress,
                   CustomerContact,
                   ServiceMaster,
                   RoutingRule,
                   ApprovalLevel,
                   ApprovalStatus,
                   AuditLog,
                   DocumentClassification,
                   LeadService,
                   Proposal,
                   ProposalItem,
                   ProposalPaymentTerm,
                   ProposalAcceptance,
                   Project,
                   ServiceMaster,
                ]),
            ],
            controllers: [],
            providers: [
                UserRepository,
                DepartmentRepository,
                TeamRepository,
                SystemModuleRepository,
                LeadRepository,
                ProposalRepository,
                ProposalItemRepository,
                ProposalPaymentTermRepository,
                ProposalAcceptanceRepository,
                ProjectRepository,
                SessionRepository,
                LoginSessionRepository,
                PermissionManagerRepository,
                LeadServiceRepository,
                TypeOrmModule
            ],
            exports: [
                UserRepository,
                DepartmentRepository,
                TeamRepository,
                SystemModuleRepository,
                LeadRepository,
                ProposalRepository,
                ProposalItemRepository,
                ProposalPaymentTermRepository,
                ProposalAcceptanceRepository,
                ProjectRepository,
                SessionRepository,
                LoginSessionRepository,
                LeadServiceRepository,
                PermissionManagerRepository,
                TypeOrmModule
            ],
        };
    }
}
