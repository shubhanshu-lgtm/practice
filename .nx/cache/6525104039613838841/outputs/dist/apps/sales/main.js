/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const database_module_1 = __webpack_require__(5);
const config_module_1 = __webpack_require__(10);
const response_handler_module_1 = __webpack_require__(89);
const app_controller_1 = __webpack_require__(91);
const app_service_1 = __webpack_require__(92);
const proposal_module_1 = __webpack_require__(93);
const closure_module_1 = __webpack_require__(120);
const project_module_1 = __webpack_require__(124);
const dashboard_module_1 = __webpack_require__(127);
const invoice_module_1 = __webpack_require__(131);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            config_module_1.ConfigModule,
            response_handler_module_1.ResponseHandlerModule,
            proposal_module_1.ProposalModule,
            closure_module_1.ClosureModule,
            project_module_1.ProjectModule,
            dashboard_module_1.DashboardModule,
            invoice_module_1.InvoiceModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DBModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DBModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_service_1 = __webpack_require__(6);
const config_module_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(11);
const entities_1 = __webpack_require__(12);
const repositories_1 = __webpack_require__(72);
let DBModule = DBModule_1 = class DBModule {
    static getConnectionOptions(config) {
        const dbData = config.get().db;
        if (!dbData) {
            throw new Error('Database configuration not found');
        }
        const connectionOptions = this.getConnectionOptionsPostgres(dbData);
        return {
            ...connectionOptions,
            entities: [
                entities_1.User,
                entities_1.PermissionManager,
                entities_1.Department,
                entities_1.Team,
                entities_1.Designation,
                entities_1.StatusMaster,
                entities_1.PriorityMaster,
                entities_1.TaskTypeMaster,
                entities_1.ActivityTypeMaster,
                entities_1.DocumentTypeMaster,
                entities_1.Countries,
                entities_1.States,
                entities_1.Cities,
                entities_1.Nationalities,
                entities_1.SystemModule,
                entities_1.LeadEnquiry,
                entities_1.LeadContact,
                entities_1.LeadAddress,
                entities_1.LoginSession,
                entities_1.Menu,
                entities_1.Company,
                entities_1.Branch,
                entities_1.WorkRequest,
                entities_1.WorkRequestType,
                entities_1.SlaRule,
                entities_1.NotificationRule,
                entities_1.EscalationRule,
                entities_1.Lead,
                entities_1.Customer,
                entities_1.CustomerAddress,
                entities_1.CustomerContact,
                entities_1.ServiceMaster,
                entities_1.RoutingRule,
                entities_1.ApprovalLevel,
                entities_1.ApprovalStatus,
                entities_1.AuditLog,
                entities_1.DocumentClassification,
                entities_1.LeadService,
                entities_1.LeadFollowUp,
                entities_1.Proposal,
                entities_1.ProposalItem,
                entities_1.ProposalPaymentTerm,
                entities_1.ProposalFile,
                entities_1.ProposalAcceptance,
                entities_1.Project,
                entities_1.ServiceMaster,
                entities_1.ServiceDeliverable,
                entities_1.Invoice,
                entities_1.InvoiceItem,
                entities_1.PaymentRecord,
                entities_1.IntercertPartnerUser
            ],
            synchronize: false,
            //dropSchema: true,
            logging: false,
            migrationsRun: false
        };
    }
    static getConnectionOptionsPostgres(dbData) {
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
    static forRoot() {
        return {
            module: DBModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_module_1.ConfigModule],
                    useFactory: (configService) => {
                        return DBModule_1.getConnectionOptions(configService);
                    },
                    inject: [config_service_1.ConfigService],
                }),
                typeorm_1.TypeOrmModule.forFeature([
                    entities_1.User,
                    entities_1.PermissionManager,
                    entities_1.Department,
                    entities_1.Team,
                    entities_1.Designation,
                    entities_1.StatusMaster,
                    entities_1.PriorityMaster,
                    entities_1.TaskTypeMaster,
                    entities_1.ActivityTypeMaster,
                    entities_1.DocumentTypeMaster,
                    entities_1.Countries,
                    entities_1.States,
                    entities_1.Cities,
                    entities_1.Nationalities,
                    entities_1.SystemModule,
                    entities_1.LeadEnquiry,
                    entities_1.LeadContact,
                    entities_1.LeadAddress,
                    entities_1.LeadFollowUp,
                    entities_1.LoginSession,
                    entities_1.Menu,
                    entities_1.Company,
                    entities_1.Branch,
                    entities_1.WorkRequest,
                    entities_1.WorkRequestType,
                    entities_1.SlaRule,
                    entities_1.NotificationRule,
                    entities_1.EscalationRule,
                    entities_1.Lead,
                    entities_1.Customer,
                    entities_1.CustomerAddress,
                    entities_1.CustomerContact,
                    entities_1.ServiceMaster,
                    entities_1.RoutingRule,
                    entities_1.ApprovalLevel,
                    entities_1.ApprovalStatus,
                    entities_1.AuditLog,
                    entities_1.DocumentClassification,
                    entities_1.LeadService,
                    entities_1.Proposal,
                    entities_1.ProposalItem,
                    entities_1.ProposalPaymentTerm,
                    entities_1.ProposalFile,
                    entities_1.ProposalAcceptance,
                    entities_1.Project,
                    entities_1.ServiceMaster,
                    entities_1.ServiceDeliverable,
                    entities_1.Invoice,
                    entities_1.InvoiceItem,
                    entities_1.PaymentRecord,
                    entities_1.IntercertPartnerUser
                ]),
            ],
            controllers: [],
            providers: [
                repositories_1.UserRepository,
                repositories_1.DepartmentRepository,
                repositories_1.TeamRepository,
                repositories_1.SystemModuleRepository,
                repositories_1.LeadRepository,
                repositories_1.ProposalRepository,
                repositories_1.ProposalItemRepository,
                repositories_1.ProposalPaymentTermRepository,
                repositories_1.ProposalAcceptanceRepository,
                repositories_1.ProjectRepository,
                repositories_1.LoginSessionRepository,
                repositories_1.PermissionManagerRepository,
                repositories_1.LeadServiceRepository,
                repositories_1.IntercertPartnerUserRepository,
                typeorm_1.TypeOrmModule
            ],
            exports: [
                repositories_1.UserRepository,
                repositories_1.DepartmentRepository,
                repositories_1.TeamRepository,
                repositories_1.SystemModuleRepository,
                repositories_1.LeadRepository,
                repositories_1.ProposalRepository,
                repositories_1.ProposalItemRepository,
                repositories_1.ProposalPaymentTermRepository,
                repositories_1.ProposalAcceptanceRepository,
                repositories_1.ProjectRepository,
                repositories_1.LoginSessionRepository,
                repositories_1.PermissionManagerRepository,
                repositories_1.LeadServiceRepository,
                repositories_1.IntercertPartnerUserRepository,
                typeorm_1.TypeOrmModule
            ],
        };
    }
};
exports.DBModule = DBModule;
exports.DBModule = DBModule = DBModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], DBModule);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_interface_1 = __webpack_require__(7);
const config_default_1 = __webpack_require__(8);
const dotenv_1 = __webpack_require__(9);
(0, dotenv_1.config)();
let ConfigService = class ConfigService {
    constructor(data = config_default_1.DEFAULT_CONFIG) {
        this.config = data;
    }
    loadFromEnv() {
        console.log('[ConfigService] Loading from env. GOOGLE_CALLBACK_URL from process.env:', process.env.GOOGLE_CALLBACK_URL);
        this.config = this.parseConfigFromEnv(process.env);
        console.log('[ConfigService] Final GoogleAuth config:', this.config.GoogleAuth);
    }
    parseConfigFromEnv(env) {
        return {
            env: env.NODE_ENV || config_default_1.DEFAULT_CONFIG.env,
            servicePorts: this.parseServicePorts(env, config_default_1.DEFAULT_CONFIG.servicePorts),
            db: this.parseDBConfig(env, config_default_1.DEFAULT_CONFIG.db),
            JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
            JWT_EXPIRY_TIME: Number.parseInt(process.env.JWT_EXPIRY_TIME, 10),
            logLevel: env.LOG_LEVEL || config_default_1.DEFAULT_CONFIG.logLevel,
            AUTH_KEY: process.env.AUTH_KEY,
            S3_bucket: this.parseS3Config(env),
            SMTP: this.parseSMTPConfig(env, config_default_1.DEFAULT_CONFIG.SMTP),
            VIN_SECRET: process.env.VIN_SECRET,
            GoogleAuth: this.parseGoogleAuthConfig(env),
            FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
            TWILIO_SECRET: this.parseTwilioConfig(env),
            FIREBASE_SERVICE_ACCOUNT: env.FIREBASE_SERVICE_ACCOUNT,
            PaypalCredentials: this.parsePaypalConfig(env),
            SERVER_BASE_PATH: process.env.SERVER_BASE_PATH,
            CORS_ORIGINS: process.env.CORS_ORIGINS || ''
        };
    }
    parseDBConfig(env, defaultConfig) {
        return {
            host: process.env.DB_HOST || "",
            port: Number(process.env.DB_PORT) || 0,
            username: process.env.DB_USERNAME || "",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_DATABASE || "",
            type: 'mysql',
            synchronize: true,
            logging: false,
            entities: []
        };
    }
    parseS3Config(env) {
        return {
            access_key_id: env.S3_ACCESS_KEY_ID,
            secret_access_key: env.S3_SECRET_ACCESS_KEY,
            bucket_name: env.S3_BUCKET_NAME,
            region: env.S3_REGION,
        };
    }
    parseServicePorts(env, defaultConfig) {
        return {
            authentication: Number.parseInt(env.AUTHENTICATION_PORT, 10) || defaultConfig.authentication,
            product: Number.parseInt(env.PRODUCT_PORT, 10) || defaultConfig.product,
            // userManagement: parseInt(env.USER_MANAGEMENT) || defaultConfig.userManagement,
            userManagement: Number.parseInt(env.USER_MANAGEMENT || '') || defaultConfig.userManagement,
            auditManagement: Number.parseInt(env.AUDIT_MANAGEMENT || '') || defaultConfig.auditManagement,
            auditorManagement: Number.parseInt(env.AUDITOR_MANAGEMENT || '') || defaultConfig.auditorManagement,
            masterManagement: Number.parseInt(env.MASTER_MANAGEMENT || '') || defaultConfig.masterManagement,
            sales: Number.parseInt(env.SALES_PORT || '') || defaultConfig.sales,
        };
    }
    parseSMTPConfig(env, defaultConfig) {
        return {
            SERVICE: "gmail",
            HOST: env.SMTP_HOST || "",
            PORT: Number.parseInt(env.SMTP_PORT || "587"),
            USERNAME: env.SMTP_USERNAME,
            PASSWORD: env.SMTP_PASSWORD,
            SENDER: env.SMTP_SENDER,
            SMTP_TLS: env.SMTP_TLS
        };
    }
    parseGoogleAuthConfig(env) {
        return {
            GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
            GOOGLE_REDIRECT_URI: env.GOOGLE_REDIRECT_URI,
            GOOGLE_CALLBACK_URL: env.GOOGLE_CALLBACK_URL
        };
    }
    parsePaypalConfig(env) {
        return {
            PAYPAL_MODE: env.PAYPAL_MODE,
            PAYPAL_CLIENT_ID: env.PAYPAL_CLIENT_ID,
            PAYPAL_CLIENT_SECRET: env.PAYPAL_CLIENT_SECRET
        };
    }
    parseTwilioConfig(env) {
        return {
            SERVICE_ID: env.SERVICE_ID,
            TWILIO_ACCOUNT_SID: env.TWILIO_ACCOUNT_SID,
            TWILIO_AUTH_TOKEN: env.TWILIO_AUTH_TOKEN,
            TWILIO_PHONE_NUMBER: env.TWILIO_PHONE_NUMBER
        };
    }
    getEnvOrThrow(key) {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
        return value;
    }
    get() {
        return this.config;
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_interface_1.ConfigData !== "undefined" && config_interface_1.ConfigData) === "function" ? _a : Object])
], ConfigService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_CONFIG = void 0;
exports.DEFAULT_CONFIG = {
    env: 'production',
    db: {
        host: '',
        port: 0,
        username: '',
        password: '',
        database: '',
        type: 'mysql',
        synchronize: true,
        logging: false,
        entities: [],
    },
    logLevel: 'info',
    JWT_SECRET_KEY: '',
    JWT_EXPIRY_TIME: 0,
    AUTH_KEY: '',
    servicePorts: {
        authentication: 8085,
        product: 8087,
        userManagement: 8086,
        auditManagement: 8088,
        auditorManagement: 8089,
        masterManagement: 8094,
        sales: 8095,
    },
    S3_bucket: { access_key_id: '', bucket_name: '', region: '', secret_access_key: '' },
    SMTP: { HOST: '', PASSWORD: '', PORT: 587, SENDER: '', SERVICE: 'gmail', SMTP_TLS: '', USERNAME: '' },
    GoogleAuth: { GOOGLE_CLIENT_ID: '', GOOGLE_CLIENT_SECRET: '', GOOGLE_REDIRECT_URI: '', GOOGLE_CALLBACK_URL: '' },
    VIN_SECRET: '',
    FRONTEND_BASE_URL: '',
    SERVER_BASE_PATH: '',
    TWILIO_SECRET: {
        TWILIO_ACCOUNT_SID: '',
        TWILIO_AUTH_TOKEN: '',
        SERVICE_ID: '',
        TWILIO_PHONE_NUMBER: ''
    },
    FIREBASE_SERVICE_ACCOUNT: '',
    PaypalCredentials: { PAYPAL_MODE: '', PAYPAL_CLIENT_ID: '', PAYPAL_CLIENT_SECRET: '' },
    CORS_ORIGINS: ''
};


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_service_1 = __webpack_require__(6);
const configFactory = {
    provide: config_service_1.ConfigService,
    useFactory: () => {
        const config = new config_service_1.ConfigService();
        config.loadFromEnv();
        return config;
    },
};
let ConfigModule = class ConfigModule {
};
exports.ConfigModule = ConfigModule;
exports.ConfigModule = ConfigModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [configFactory],
        exports: [configFactory],
    })
], ConfigModule);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);
// export * from './session.entity'; // DEPRECATED - Use LoginSession instead
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(39), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);
tslib_1.__exportStar(__webpack_require__(47), exports);
// Duplicate removed - loginSession.entity already exported above
// export * from './session.entity'; // DEPRECATED - Use LoginSession instead
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);
tslib_1.__exportStar(__webpack_require__(52), exports);
tslib_1.__exportStar(__webpack_require__(53), exports);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(55), exports);
tslib_1.__exportStar(__webpack_require__(56), exports);
tslib_1.__exportStar(__webpack_require__(57), exports);
tslib_1.__exportStar(__webpack_require__(58), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);
tslib_1.__exportStar(__webpack_require__(60), exports);
tslib_1.__exportStar(__webpack_require__(61), exports);
tslib_1.__exportStar(__webpack_require__(62), exports);
tslib_1.__exportStar(__webpack_require__(63), exports);
tslib_1.__exportStar(__webpack_require__(64), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(67), exports);
tslib_1.__exportStar(__webpack_require__(68), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);
tslib_1.__exportStar(__webpack_require__(70), exports);
tslib_1.__exportStar(__webpack_require__(71), exports);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const userContants_1 = __webpack_require__(16);
const class_validator_1 = __webpack_require__(17);
const class_transformer_1 = __webpack_require__(18);
const commonConstants_1 = __webpack_require__(19);
const permissionManager_entity_1 = __webpack_require__(20);
const department_entity_1 = __webpack_require__(22);
const systemModule_entity_1 = __webpack_require__(23);
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phoneNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "avatar", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, select: false }),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: userContants_1.USER_ACCOUNT_STATUS,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _b : Object)
], User.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: userContants_1.USER_VERIFY_STATUS,
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof userContants_1.USER_VERIFY_STATUS !== "undefined" && userContants_1.USER_VERIFY_STATUS) === "function" ? _c : Object)
], User.prototype, "verifyStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.id, { nullable: true })
    // @IsDefined()
    ,
    (0, typeorm_1.JoinColumn)({ name: "addedBy" }),
    tslib_1.__metadata("design:type", User)
], User.prototype, "addedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => permissionManager_entity_1.PermissionManager, (p) => p.users),
    (0, typeorm_1.JoinColumn)({ name: "permission" }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof permissionManager_entity_1.PermissionManager !== "undefined" && permissionManager_entity_1.PermissionManager) === "function" ? _d : Object)
], User.prototype, "permission", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "roleName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: userContants_1.USER_GROUP,
        nullable: true
    }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _e : Object)
], User.prototype, "user_group", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => department_entity_1.Department, { nullable: true }),
    (0, typeorm_1.JoinTable)({
        name: 'user_departments',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'departmentId', referencedColumnName: 'id' },
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "departments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => systemModule_entity_1.SystemModule, { nullable: true }),
    (0, typeorm_1.JoinTable)({
        name: 'user_modules',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'moduleId', referencedColumnName: 'id' },
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "modules", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: userContants_1.USER_LOGIN_SOURCE,
        nullable: true
    }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", typeof (_f = typeof userContants_1.USER_LOGIN_SOURCE !== "undefined" && userContants_1.USER_LOGIN_SOURCE) === "function" ? _f : Object)
], User.prototype, "loginSource", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: commonConstants_1.PLATFORM,
        nullable: true
    }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", typeof (_g = typeof commonConstants_1.PLATFORM !== "undefined" && commonConstants_1.PLATFORM) === "function" ? _g : Object)
], User.prototype, "platform", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => permissionManager_entity_1.PermissionManager, (p) => p.createdBy)
    // @JoinColumn({ name: "permissionManager" })
    ,
    tslib_1.__metadata("design:type", Array)
], User.prototype, "permissionManagers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)('Team', (team) => team.teamLead),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "teamsLed", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)('Team', (team) => team.members),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "teams", void 0);
exports.User = User = tslib_1.__decorate([
    (0, typeorm_1.Entity)('user')
], User);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PHONE_TYPE = exports.ADDRESS_TYPE = exports.INVITE_STATUS = exports.INVITE_MEMBER = exports.USER_LOGIN_SOURCE = exports.ADD_UPDATE_EMAIL_TYPE = exports.ADD_UPDATE_EMAIL_STATUS = exports.OTP_REQUEST_LIMITS = exports.LOGIN_BY = exports.OTP_SEND_ON = exports.OTP_TYPE = exports.SESSION_STATUS = exports.USER_GROUP = exports.USER_VERIFY_STATUS = exports.USER_ACCOUNT_STATUS = void 0;
var USER_ACCOUNT_STATUS;
(function (USER_ACCOUNT_STATUS) {
    USER_ACCOUNT_STATUS["ACTIVE"] = "ACTIVE";
    USER_ACCOUNT_STATUS["INACTIVE"] = "INACTIVE";
    USER_ACCOUNT_STATUS["BLOCKED"] = "BLOCKED";
    USER_ACCOUNT_STATUS["DELETED"] = "DELETED";
})(USER_ACCOUNT_STATUS || (exports.USER_ACCOUNT_STATUS = USER_ACCOUNT_STATUS = {}));
var USER_VERIFY_STATUS;
(function (USER_VERIFY_STATUS) {
    USER_VERIFY_STATUS["UNVERIFIED"] = "UNVERIFIED";
    USER_VERIFY_STATUS["VERIFIED"] = "VERIFIED";
})(USER_VERIFY_STATUS || (exports.USER_VERIFY_STATUS = USER_VERIFY_STATUS = {}));
var USER_GROUP;
(function (USER_GROUP) {
    USER_GROUP["SUPER_ADMIN"] = "SUPER_ADMIN";
    USER_GROUP["ADMIN"] = "ADMINISTRATOR";
    USER_GROUP["SALES_TEAM"] = "SALES_TEAM";
    USER_GROUP["USER"] = "USER";
    USER_GROUP["MANAGER"] = "MANAGER";
    USER_GROUP["IT_SUPPORT"] = "IT_SUPPORT";
    USER_GROUP["TEAM_LEAD"] = "TEAM_LEAD";
    //SERVICEs
    USER_GROUP["VAPT_TEAM"] = "VAPT_TEAM";
    USER_GROUP["GRC_TEAM"] = "GRC_TEAM";
    USER_GROUP["AUDIT_TEAM"] = "AUDIT_TEAM";
    USER_GROUP["ISO_TEAM"] = "ISO_TEAM";
})(USER_GROUP || (exports.USER_GROUP = USER_GROUP = {}));
var SESSION_STATUS;
(function (SESSION_STATUS) {
    SESSION_STATUS["LOGGED_IN"] = "LOGGED_IN";
    SESSION_STATUS["LOGGED_OUT"] = "LOGGED_OUT";
    SESSION_STATUS["BLOCKED"] = "BLOCKED";
})(SESSION_STATUS || (exports.SESSION_STATUS = SESSION_STATUS = {}));
var OTP_TYPE;
(function (OTP_TYPE) {
    OTP_TYPE["REGISTER_OTP"] = "REGISTER_OTP";
    OTP_TYPE["LOGIN_OTP"] = "LOGIN_OTP";
    OTP_TYPE["FORGOT_PASSWORD_OTP"] = "FORGOT_PASSWORD_OTP";
    OTP_TYPE["ADD_EMAIL"] = "ADD_EMAIL";
    OTP_TYPE["ADD_PHONE_NO"] = "ADD_PHONE_NO";
    OTP_TYPE["CUSTOM_LOGIN"] = "CUSTOM_LOGIN";
})(OTP_TYPE || (exports.OTP_TYPE = OTP_TYPE = {}));
var OTP_SEND_ON;
(function (OTP_SEND_ON) {
    OTP_SEND_ON["PHONE"] = "PHONE";
    OTP_SEND_ON["EMAIL"] = "EMAIL";
})(OTP_SEND_ON || (exports.OTP_SEND_ON = OTP_SEND_ON = {}));
var LOGIN_BY;
(function (LOGIN_BY) {
    LOGIN_BY["PHONE"] = "PHONE";
    LOGIN_BY["EMAIL"] = "EMAIL";
})(LOGIN_BY || (exports.LOGIN_BY = LOGIN_BY = {}));
var OTP_REQUEST_LIMITS;
(function (OTP_REQUEST_LIMITS) {
    OTP_REQUEST_LIMITS[OTP_REQUEST_LIMITS["RESEND_OTP"] = 200] = "RESEND_OTP";
})(OTP_REQUEST_LIMITS || (exports.OTP_REQUEST_LIMITS = OTP_REQUEST_LIMITS = {}));
var ADD_UPDATE_EMAIL_STATUS;
(function (ADD_UPDATE_EMAIL_STATUS) {
    ADD_UPDATE_EMAIL_STATUS[ADD_UPDATE_EMAIL_STATUS["PENDING"] = 0] = "PENDING";
    ADD_UPDATE_EMAIL_STATUS[ADD_UPDATE_EMAIL_STATUS["VERIFIED"] = 1] = "VERIFIED";
})(ADD_UPDATE_EMAIL_STATUS || (exports.ADD_UPDATE_EMAIL_STATUS = ADD_UPDATE_EMAIL_STATUS = {}));
var ADD_UPDATE_EMAIL_TYPE;
(function (ADD_UPDATE_EMAIL_TYPE) {
    ADD_UPDATE_EMAIL_TYPE[ADD_UPDATE_EMAIL_TYPE["ADD"] = 0] = "ADD";
    ADD_UPDATE_EMAIL_TYPE[ADD_UPDATE_EMAIL_TYPE["UPDATE"] = 1] = "UPDATE";
})(ADD_UPDATE_EMAIL_TYPE || (exports.ADD_UPDATE_EMAIL_TYPE = ADD_UPDATE_EMAIL_TYPE = {}));
var USER_LOGIN_SOURCE;
(function (USER_LOGIN_SOURCE) {
    USER_LOGIN_SOURCE["LOCAL"] = "LOCAL";
    USER_LOGIN_SOURCE["GOOGLE"] = "GOOGLE";
})(USER_LOGIN_SOURCE || (exports.USER_LOGIN_SOURCE = USER_LOGIN_SOURCE = {}));
;
var INVITE_MEMBER;
(function (INVITE_MEMBER) {
    // BUYER = "BUYER",
    // SELLER = "SELLER",
})(INVITE_MEMBER || (exports.INVITE_MEMBER = INVITE_MEMBER = {}));
var INVITE_STATUS;
(function (INVITE_STATUS) {
    INVITE_STATUS["PENDING"] = "PENDING";
    INVITE_STATUS["VERIFIED"] = "VERIFIED";
    INVITE_STATUS["REJECTED"] = "REJECTED";
})(INVITE_STATUS || (exports.INVITE_STATUS = INVITE_STATUS = {}));
var ADDRESS_TYPE;
(function (ADDRESS_TYPE) {
    ADDRESS_TYPE["OFFICE"] = "OFFICE";
    ADDRESS_TYPE["BILLING"] = "BILLING";
    ADDRESS_TYPE["SHIPPING"] = "SHIPPING";
    ADDRESS_TYPE["REGISTERED_OFFICE"] = "REGISTERED_OFFICE";
    ADDRESS_TYPE["CORPORATE_OFFICE"] = "CORPORATE_OFFICE";
    ADDRESS_TYPE["FACTORY_OFFICE"] = "FACTORY_OFFICE";
    ADDRESS_TYPE["BRANCH_OFFICE"] = "BRANCH_OFFICE";
    ADDRESS_TYPE["HOME"] = "HOME";
    ADDRESS_TYPE["OTHERS"] = "OTHERS";
})(ADDRESS_TYPE || (exports.ADDRESS_TYPE = ADDRESS_TYPE = {}));
var PHONE_TYPE;
(function (PHONE_TYPE) {
    PHONE_TYPE["OFFICE"] = "OFFICE";
    PHONE_TYPE["MOBILE"] = "MOBILE";
    PHONE_TYPE["RESIDENTIAL"] = "RESIDENTIAL";
    PHONE_TYPE["FAX"] = "FAX";
})(PHONE_TYPE || (exports.PHONE_TYPE = PHONE_TYPE = {}));


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LOGO_WHITTEBG = exports.LOGO = exports.FILE_SIZE_IN_BYTES = exports.DEVICE_TYPE = exports.PLATFORM = exports.TOKEN_TYPE = exports.S3_FOLDER = exports.ExpressRequestParams = exports.ErrorMessages = exports.ERROR_CODES = void 0;
var ERROR_CODES;
(function (ERROR_CODES) {
    ERROR_CODES[ERROR_CODES["UNEXPECTED_ERROR"] = 501] = "UNEXPECTED_ERROR";
    ERROR_CODES[ERROR_CODES["OUTGOING_API_ERROR"] = 777] = "OUTGOING_API_ERROR";
    ERROR_CODES[ERROR_CODES["ERROR_UNKNOWN_SHOW_TO_USER"] = 408] = "ERROR_UNKNOWN_SHOW_TO_USER";
    ERROR_CODES[ERROR_CODES["ERROR_UNKNOWN"] = 409] = "ERROR_UNKNOWN";
    ERROR_CODES[ERROR_CODES["ERROR_CANNOT_FULLFILL_REQUEST"] = 417] = "ERROR_CANNOT_FULLFILL_REQUEST";
    ERROR_CODES[ERROR_CODES["DATABASE_ERROR"] = 461] = "DATABASE_ERROR";
    ERROR_CODES[ERROR_CODES["DATABASE_DUPLICATE_ERROR_CODE"] = 465] = "DATABASE_DUPLICATE_ERROR_CODE";
    ERROR_CODES[ERROR_CODES["ACCESS_DENIED"] = 403] = "ACCESS_DENIED";
    ERROR_CODES[ERROR_CODES["INVALID_ROUTE_URL"] = 608] = "INVALID_ROUTE_URL";
    ERROR_CODES[ERROR_CODES["INVALID_BASE_URL"] = 609] = "INVALID_BASE_URL";
    ERROR_CODES[ERROR_CODES["JWT_TOKEN_INVALID"] = 498] = "JWT_TOKEN_INVALID";
    ERROR_CODES[ERROR_CODES["JWT_TOKEN_EXPIRED"] = 463] = "JWT_TOKEN_EXPIRED";
    ERROR_CODES[ERROR_CODES["NOT_AUTHORIZED"] = 401] = "NOT_AUTHORIZED";
    ERROR_CODES[ERROR_CODES["NOT_FOUND"] = 404] = "NOT_FOUND";
    ERROR_CODES[ERROR_CODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ERROR_CODES[ERROR_CODES["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    ERROR_CODES[ERROR_CODES["UNVERIFIED_ACCOUNT"] = 466] = "UNVERIFIED_ACCOUNT";
    ERROR_CODES[ERROR_CODES["BLOCKED_USER"] = 468] = "BLOCKED_USER";
    ERROR_CODES[ERROR_CODES["TEST_DRIVE_TAKEN"] = 470] = "TEST_DRIVE_TAKEN";
})(ERROR_CODES || (exports.ERROR_CODES = ERROR_CODES = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["UNEXPECTED_ERROR"] = "Unexpected Error";
    ErrorMessages["SOMETHING_WENT_WRONG"] = "Something Went Wrong";
    ErrorMessages["JWT_TOKEN_INVALID"] = "Invalid Token";
    ErrorMessages["JWT_TOKEN_EXPIRED"] = "Session Expired";
    ErrorMessages["NOT_AUTHORIZED"] = "NOT_AUTHORIZED";
    ErrorMessages["ACCESS_DENIED"] = "ACCESS_DENIED";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
exports.ExpressRequestParams = {
    IP_ADDRESS: "ip_address",
    AUTH_PAYLOAD: "auth_payload"
};
exports.S3_FOLDER = {
    PROFILE: 'profile',
    products: 'products'
};
var TOKEN_TYPE;
(function (TOKEN_TYPE) {
    TOKEN_TYPE["GUEST_LOGIN"] = "GUEST_LOGIN";
    TOKEN_TYPE["USER_LOGIN"] = "USER_LOGIN";
})(TOKEN_TYPE || (exports.TOKEN_TYPE = TOKEN_TYPE = {}));
var PLATFORM;
(function (PLATFORM) {
    PLATFORM["WEB"] = "WEB";
    PLATFORM["ANDROID"] = "ANDROID";
    PLATFORM["IOS"] = "IOS";
})(PLATFORM || (exports.PLATFORM = PLATFORM = {}));
var DEVICE_TYPE;
(function (DEVICE_TYPE) {
    DEVICE_TYPE["WEB"] = "WEB";
    DEVICE_TYPE["ANDROID"] = "ANDROID";
    DEVICE_TYPE["IOS"] = "IOS";
})(DEVICE_TYPE || (exports.DEVICE_TYPE = DEVICE_TYPE = {}));
exports.FILE_SIZE_IN_BYTES = 50 * 1024 * 1024; //50mb
exports.LOGO = "";
exports.LOGO_WHITTEBG = "";


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionManager = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const userContants_1 = __webpack_require__(16);
const permissionManagerConstants_1 = __webpack_require__(21);
const user_entity_1 = __webpack_require__(13);
let PermissionManager = class PermissionManager {
};
exports.PermissionManager = PermissionManager;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PermissionManager.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], PermissionManager.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PermissionManager.prototype, "roleName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, u => u.permissionManagers),
    (0, typeorm_1.JoinColumn)({ name: "createdBy" }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], PermissionManager.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], PermissionManager.prototype, "permissions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: userContants_1.USER_GROUP,
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _c : Object)
], PermissionManager.prototype, "user_group", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, u => u.permission),
    (0, typeorm_1.JoinColumn)({ name: "user" }),
    tslib_1.__metadata("design:type", Array)
], PermissionManager.prototype, "users", void 0);
exports.PermissionManager = PermissionManager = tslib_1.__decorate([
    (0, typeorm_1.Entity)('permissionmanager')
], PermissionManager);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MODULES = exports.PERMISSIONS = void 0;
var PERMISSIONS;
(function (PERMISSIONS) {
    // NONE = "NONE", 
    PERMISSIONS["READ"] = "READ";
    PERMISSIONS["UPDATE"] = "UPDATE";
    PERMISSIONS["DELETE"] = "DELETE";
    PERMISSIONS["ADD"] = "ADD";
})(PERMISSIONS || (exports.PERMISSIONS = PERMISSIONS = {}));
// implementation pending
// export const PERMISSIONS =
// {
//     NONE : 0,
//     READ : 1,
//     ADD : 2,
//     UPDATE : 4,
//     DELETE : 8,
// }
exports.MODULES = {
    "Buyer": 1,
    "Seller": 2,
    "Role Management": 3,
    "User": 4,
    "Manager": 5
};


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Department = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const userContants_1 = __webpack_require__(16);
let Department = class Department {
};
exports.Department = Department;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Department.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Department.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Department.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], Department.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: userContants_1.USER_ACCOUNT_STATUS,
        default: userContants_1.USER_ACCOUNT_STATUS.ACTIVE
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _b : Object)
], Department.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)('Team', (team) => team.department),
    tslib_1.__metadata("design:type", Array)
], Department.prototype, "teams", void 0);
exports.Department = Department = tslib_1.__decorate([
    (0, typeorm_1.Entity)('department')
], Department);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemModule = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const userContants_1 = __webpack_require__(16);
const menu_entity_1 = __webpack_require__(24);
let SystemModule = class SystemModule {
};
exports.SystemModule = SystemModule;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SystemModule.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], SystemModule.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], SystemModule.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], SystemModule.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: userContants_1.USER_ACCOUNT_STATUS,
        default: userContants_1.USER_ACCOUNT_STATUS.ACTIVE
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _b : Object)
], SystemModule.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => menu_entity_1.Menu, (menu) => menu.module),
    tslib_1.__metadata("design:type", Array)
], SystemModule.prototype, "menus", void 0);
exports.SystemModule = SystemModule = tslib_1.__decorate([
    (0, typeorm_1.Entity)('systemmodule')
], SystemModule);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Menu = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const userContants_1 = __webpack_require__(16);
const systemModule_entity_1 = __webpack_require__(23);
let Menu = class Menu {
};
exports.Menu = Menu;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Menu.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Menu.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Menu.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Menu.prototype, "path", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Menu.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: userContants_1.USER_ACCOUNT_STATUS,
        default: userContants_1.USER_ACCOUNT_STATUS.ACTIVE
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _b : Object)
], Menu.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => systemModule_entity_1.SystemModule, (module) => module.menus),
    (0, typeorm_1.JoinColumn)({ name: 'moduleId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof systemModule_entity_1.SystemModule !== "undefined" && systemModule_entity_1.SystemModule) === "function" ? _c : Object)
], Menu.prototype, "module", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Menu, (menu) => menu.children, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentId' }),
    tslib_1.__metadata("design:type", Menu)
], Menu.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Menu, (menu) => menu.parent),
    tslib_1.__metadata("design:type", Array)
], Menu.prototype, "children", void 0);
exports.Menu = Menu = tslib_1.__decorate([
    (0, typeorm_1.Entity)('menu')
], Menu);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginSession = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const userContants_1 = __webpack_require__(16);
const user_entity_1 = __webpack_require__(13);
const commonConstants_1 = __webpack_require__(19);
let LoginSession = class LoginSession {
};
exports.LoginSession = LoginSession;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], LoginSession.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], LoginSession.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, u => u.id),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], LoginSession.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: userContants_1.LOGIN_BY,
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof userContants_1.LOGIN_BY !== "undefined" && userContants_1.LOGIN_BY) === "function" ? _c : Object)
], LoginSession.prototype, "loginBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], LoginSession.prototype, "loginIdentity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], LoginSession.prototype, "fcmToken", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'enum',
        enum: commonConstants_1.DEVICE_TYPE
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof commonConstants_1.DEVICE_TYPE !== "undefined" && commonConstants_1.DEVICE_TYPE) === "function" ? _d : Object)
], LoginSession.prototype, "deviceType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], LoginSession.prototype, "refreshToken", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: userContants_1.SESSION_STATUS,
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof userContants_1.SESSION_STATUS !== "undefined" && userContants_1.SESSION_STATUS) === "function" ? _e : Object)
], LoginSession.prototype, "loginStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    tslib_1.__metadata("design:type", Number)
], LoginSession.prototype, "refreshTokenExpiry", void 0);
exports.LoginSession = LoginSession = tslib_1.__decorate([
    (0, typeorm_1.Entity)('loginsession')
], LoginSession);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Team = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const department_entity_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(13);
let Team = class Team {
};
exports.Team = Team;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Team.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    tslib_1.__metadata("design:type", String)
], Team.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    tslib_1.__metadata("design:type", String)
], Team.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (dept) => dept.teams),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _a : Object)
], Team.prototype, "department", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Team.prototype, "departmentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.teamsLed, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'teamLeadId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Team.prototype, "teamLead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Team.prototype, "teamLeadId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.teams),
    (0, typeorm_1.JoinTable)({
        name: 'team_members',
        joinColumn: { name: 'teamId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' }
    }),
    tslib_1.__metadata("design:type", Array)
], Team.prototype, "members", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], Team.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Team.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Team.prototype, "updatedAt", void 0);
exports.Team = Team = tslib_1.__decorate([
    (0, typeorm_1.Entity)('team')
], Team);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Designation = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let Designation = class Designation {
};
exports.Designation = Designation;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Designation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    tslib_1.__metadata("design:type", String)
], Designation.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    tslib_1.__metadata("design:type", String)
], Designation.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], Designation.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Designation.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Designation.prototype, "updatedAt", void 0);
exports.Designation = Designation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('designation')
], Designation);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusMaster = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let StatusMaster = class StatusMaster {
};
exports.StatusMaster = StatusMaster;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], StatusMaster.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    tslib_1.__metadata("design:type", String)
], StatusMaster.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    tslib_1.__metadata("design:type", String)
], StatusMaster.prototype, "module", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    tslib_1.__metadata("design:type", String)
], StatusMaster.prototype, "color", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], StatusMaster.prototype, "displayOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], StatusMaster.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], StatusMaster.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], StatusMaster.prototype, "updatedAt", void 0);
exports.StatusMaster = StatusMaster = tslib_1.__decorate([
    (0, typeorm_1.Entity)('status_master')
], StatusMaster);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PriorityMaster = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let PriorityMaster = class PriorityMaster {
};
exports.PriorityMaster = PriorityMaster;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PriorityMaster.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    tslib_1.__metadata("design:type", String)
], PriorityMaster.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], PriorityMaster.prototype, "level", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    tslib_1.__metadata("design:type", String)
], PriorityMaster.prototype, "color", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], PriorityMaster.prototype, "displayOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], PriorityMaster.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], PriorityMaster.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PriorityMaster.prototype, "updatedAt", void 0);
exports.PriorityMaster = PriorityMaster = tslib_1.__decorate([
    (0, typeorm_1.Entity)('priority_master')
], PriorityMaster);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskTypeMaster = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let TaskTypeMaster = class TaskTypeMaster {
};
exports.TaskTypeMaster = TaskTypeMaster;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TaskTypeMaster.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    tslib_1.__metadata("design:type", String)
], TaskTypeMaster.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    tslib_1.__metadata("design:type", String)
], TaskTypeMaster.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], TaskTypeMaster.prototype, "displayOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], TaskTypeMaster.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], TaskTypeMaster.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], TaskTypeMaster.prototype, "updatedAt", void 0);
exports.TaskTypeMaster = TaskTypeMaster = tslib_1.__decorate([
    (0, typeorm_1.Entity)('task_type_master')
], TaskTypeMaster);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivityTypeMaster = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let ActivityTypeMaster = class ActivityTypeMaster {
};
exports.ActivityTypeMaster = ActivityTypeMaster;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ActivityTypeMaster.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    tslib_1.__metadata("design:type", String)
], ActivityTypeMaster.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    tslib_1.__metadata("design:type", String)
], ActivityTypeMaster.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ActivityTypeMaster.prototype, "displayOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], ActivityTypeMaster.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ActivityTypeMaster.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ActivityTypeMaster.prototype, "updatedAt", void 0);
exports.ActivityTypeMaster = ActivityTypeMaster = tslib_1.__decorate([
    (0, typeorm_1.Entity)('activity_type_master')
], ActivityTypeMaster);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentTypeMaster = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let DocumentTypeMaster = class DocumentTypeMaster {
};
exports.DocumentTypeMaster = DocumentTypeMaster;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DocumentTypeMaster.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    tslib_1.__metadata("design:type", String)
], DocumentTypeMaster.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    tslib_1.__metadata("design:type", String)
], DocumentTypeMaster.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], DocumentTypeMaster.prototype, "displayOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], DocumentTypeMaster.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DocumentTypeMaster.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DocumentTypeMaster.prototype, "updatedAt", void 0);
exports.DocumentTypeMaster = DocumentTypeMaster = tslib_1.__decorate([
    (0, typeorm_1.Entity)('document_type_master')
], DocumentTypeMaster);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceMaster = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const department_entity_1 = __webpack_require__(22);
const service_deliverable_entity_1 = __webpack_require__(34);
const serviceConstants_1 = __webpack_require__(35);
let ServiceMaster = class ServiceMaster {
};
exports.ServiceMaster = ServiceMaster;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ServiceMaster.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], ServiceMaster.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], ServiceMaster.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ServiceMaster.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ServiceMaster.prototype, "timeline", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], ServiceMaster.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _a : Object)
], ServiceMaster.prototype, "department", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ServiceMaster.prototype, "departmentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ServiceMaster.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => ServiceMaster, (service) => service.children, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentId' }),
    tslib_1.__metadata("design:type", ServiceMaster)
], ServiceMaster.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ServiceMaster.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => ServiceMaster, (service) => service.parent),
    tslib_1.__metadata("design:type", Array)
], ServiceMaster.prototype, "children", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ServiceMaster.prototype, "level", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    tslib_1.__metadata("design:type", String)
], ServiceMaster.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: serviceConstants_1.SERVICE_TYPE,
        nullable: true
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof serviceConstants_1.SERVICE_TYPE !== "undefined" && serviceConstants_1.SERVICE_TYPE) === "function" ? _c : Object)
], ServiceMaster.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: serviceConstants_1.SERVICE_ACCESS_LEVEL,
        default: serviceConstants_1.SERVICE_ACCESS_LEVEL.PUBLIC
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof serviceConstants_1.SERVICE_ACCESS_LEVEL !== "undefined" && serviceConstants_1.SERVICE_ACCESS_LEVEL) === "function" ? _d : Object)
], ServiceMaster.prototype, "accessLevel", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ServiceMaster.prototype, "allowedUserGroups", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ServiceMaster.prototype, "allowedDepartments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ServiceMaster.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ServiceMaster.prototype, "assignmentGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ServiceMaster.prototype, "logo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => service_deliverable_entity_1.ServiceDeliverable, (deliverable) => deliverable.service),
    tslib_1.__metadata("design:type", Array)
], ServiceMaster.prototype, "deliverables", void 0);
exports.ServiceMaster = ServiceMaster = tslib_1.__decorate([
    (0, typeorm_1.Entity)('service_master')
], ServiceMaster);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceDeliverable = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const service_master_entity_1 = __webpack_require__(33);
let ServiceDeliverable = class ServiceDeliverable {
};
exports.ServiceDeliverable = ServiceDeliverable;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ServiceDeliverable.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    tslib_1.__metadata("design:type", String)
], ServiceDeliverable.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ServiceDeliverable.prototype, "deliverables", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ServiceDeliverable.prototype, "dueDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    tslib_1.__metadata("design:type", Boolean)
], ServiceDeliverable.prototype, "isCompleted", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    tslib_1.__metadata("design:type", Boolean)
], ServiceDeliverable.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => service_master_entity_1.ServiceMaster, (service) => service.deliverables, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof service_master_entity_1.ServiceMaster !== "undefined" && service_master_entity_1.ServiceMaster) === "function" ? _b : Object)
], ServiceDeliverable.prototype, "service", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ServiceDeliverable.prototype, "serviceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ServiceDeliverable.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ServiceDeliverable.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ServiceDeliverable.prototype, "updatedAt", void 0);
exports.ServiceDeliverable = ServiceDeliverable = tslib_1.__decorate([
    (0, typeorm_1.Entity)('service_deliverable')
], ServiceDeliverable);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SERVICE_CATEGORY_ACCESS = exports.SERVICE_STATUS = exports.SERVICE_ACCESS_LEVEL = exports.SERVICE_TYPE = exports.CATEGORY_TYPE = exports.SERVICE_CATEGORY = void 0;
var SERVICE_CATEGORY;
(function (SERVICE_CATEGORY) {
    SERVICE_CATEGORY["VAPT"] = "VAPT";
    SERVICE_CATEGORY["GRC"] = "GRC";
    SERVICE_CATEGORY["AUDIT"] = "AUDIT";
    SERVICE_CATEGORY["ISO_STANDARDIZATION"] = "ISO_STANDARDIZATION";
    SERVICE_CATEGORY["TRAINING"] = "TRAINING";
    SERVICE_CATEGORY["CONSULTING"] = "CONSULTING";
    SERVICE_CATEGORY["OTHER"] = "OTHER";
    SERVICE_CATEGORY["REGULATORY_COMPLIANCE"] = "REGULATORY_COMPLIANCE";
})(SERVICE_CATEGORY || (exports.SERVICE_CATEGORY = SERVICE_CATEGORY = {}));
var CATEGORY_TYPE;
(function (CATEGORY_TYPE) {
    CATEGORY_TYPE["SUB_CATEGORY"] = "Sub-Category";
    CATEGORY_TYPE["CATEGORY"] = "Category";
})(CATEGORY_TYPE || (exports.CATEGORY_TYPE = CATEGORY_TYPE = {}));
var SERVICE_TYPE;
(function (SERVICE_TYPE) {
    // VAPT Types
    SERVICE_TYPE["WEB_VAPT"] = "WEB_VAPT";
    SERVICE_TYPE["MOBILE_VAPT"] = "MOBILE_VAPT";
    SERVICE_TYPE["NETWORK_VAPT"] = "NETWORK_VAPT";
    SERVICE_TYPE["API_VAPT"] = "API_VAPT";
    SERVICE_TYPE["CLOUD_VAPT"] = "CLOUD_VAPT";
    SERVICE_TYPE["IOT_VAPT"] = "IOT_VAPT";
    SERVICE_TYPE["SOURCE_CODE_REVIEW"] = "SOURCE_CODE_REVIEW";
    // Mobile VAPT Sub-types
    SERVICE_TYPE["ANDROID_VAPT"] = "ANDROID_VAPT";
    SERVICE_TYPE["IOS_VAPT"] = "IOS_VAPT";
    //HYBRID_VAPT = 'HYBRID_VAPT',
    // GRC Types
    SERVICE_TYPE["COMPLIANCE_AUDIT"] = "COMPLIANCE_AUDIT";
    SERVICE_TYPE["RISK_ASSESSMENT"] = "RISK_ASSESSMENT";
    SERVICE_TYPE["GOVERNANCE_CONSULTING"] = "GOVERNANCE_CONSULTING";
    // ISO Types
    SERVICE_TYPE["ISO_9001"] = "ISO_9001";
    SERVICE_TYPE["ISO_27001"] = "ISO_27001";
    SERVICE_TYPE["ISO_22301"] = "ISO_22301";
    SERVICE_TYPE["ISO_20000"] = "ISO_20000";
    // Generic
    SERVICE_TYPE["OTHER"] = "OTHER";
})(SERVICE_TYPE || (exports.SERVICE_TYPE = SERVICE_TYPE = {}));
var SERVICE_ACCESS_LEVEL;
(function (SERVICE_ACCESS_LEVEL) {
    SERVICE_ACCESS_LEVEL["PUBLIC"] = "PUBLIC";
    SERVICE_ACCESS_LEVEL["DEPARTMENT_ONLY"] = "DEPARTMENT_ONLY";
    SERVICE_ACCESS_LEVEL["PRIVATE"] = "PRIVATE"; // Only assigned owners
})(SERVICE_ACCESS_LEVEL || (exports.SERVICE_ACCESS_LEVEL = SERVICE_ACCESS_LEVEL = {}));
var SERVICE_STATUS;
(function (SERVICE_STATUS) {
    SERVICE_STATUS["REQUIREMENT_CONFIRMED"] = "Requirement Confirmed";
    SERVICE_STATUS["IN_PROGRESS"] = "In Progress";
    SERVICE_STATUS["ON_HOLD"] = "On Hold";
    SERVICE_STATUS["DROPPED"] = "Dropped";
})(SERVICE_STATUS || (exports.SERVICE_STATUS = SERVICE_STATUS = {}));
// Mapping of which user groups can access which service categories
exports.SERVICE_CATEGORY_ACCESS = {
    [SERVICE_CATEGORY.VAPT]: ['VAPT_TEAM', 'MANAGER', 'SUPER_ADMIN', 'ADMIN'],
    [SERVICE_CATEGORY.GRC]: ['GRC_TEAM', 'MANAGER', 'SUPER_ADMIN', 'ADMIN'],
    [SERVICE_CATEGORY.AUDIT]: ['AUDIT_TEAM', 'MANAGER', 'SUPER_ADMIN', 'ADMIN'],
    [SERVICE_CATEGORY.ISO_STANDARDIZATION]: ['ISO_TEAM', 'MANAGER', 'SUPER_ADMIN', 'ADMIN'],
    [SERVICE_CATEGORY.TRAINING]: ['SALES_TEAM', 'MANAGER', 'SUPER_ADMIN', 'ADMIN'],
    [SERVICE_CATEGORY.CONSULTING]: ['SALES_TEAM', 'MANAGER', 'SUPER_ADMIN', 'ADMIN'],
    [SERVICE_CATEGORY.OTHER]: ['SALES_TEAM', 'MANAGER', 'SUPER_ADMIN', 'ADMIN']
};


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Customer = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const customerAddress_entity_1 = __webpack_require__(37);
const customerContact_entity_1 = __webpack_require__(38);
const lead_entity_1 = __webpack_require__(39);
const service_master_entity_1 = __webpack_require__(33);
let Customer = class Customer {
};
exports.Customer = Customer;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Customer.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Customer.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "businessActivities", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "headcount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => customerAddress_entity_1.CustomerAddress, (address) => address.customer),
    tslib_1.__metadata("design:type", Array)
], Customer.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => customerContact_entity_1.CustomerContact, (contact) => contact.customer),
    tslib_1.__metadata("design:type", Array)
], Customer.prototype, "contacts", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => lead_entity_1.Lead, (lead) => lead.customer),
    tslib_1.__metadata("design:type", Array)
], Customer.prototype, "leads", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => service_master_entity_1.ServiceMaster),
    (0, typeorm_1.JoinTable)({
        name: 'customer_services',
        joinColumn: { name: 'customerId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'serviceId', referencedColumnName: 'id' }
    }),
    tslib_1.__metadata("design:type", Array)
], Customer.prototype, "services", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "designation", void 0);
exports.Customer = Customer = tslib_1.__decorate([
    (0, typeorm_1.Entity)('customer')
], Customer);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerAddress = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const customer_entity_1 = __webpack_require__(36);
const userContants_1 = __webpack_require__(16);
let CustomerAddress = class CustomerAddress {
};
exports.CustomerAddress = CustomerAddress;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CustomerAddress.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CustomerAddress.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "addressLine1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "addressLine2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "city", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "state", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "postalCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: userContants_1.ADDRESS_TYPE, nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof userContants_1.ADDRESS_TYPE !== "undefined" && userContants_1.ADDRESS_TYPE) === "function" ? _b : Object)
], CustomerAddress.prototype, "addressType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], CustomerAddress.prototype, "isPrimary", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.addresses),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof customer_entity_1.Customer !== "undefined" && customer_entity_1.Customer) === "function" ? _c : Object)
], CustomerAddress.prototype, "customer", void 0);
exports.CustomerAddress = CustomerAddress = tslib_1.__decorate([
    (0, typeorm_1.Entity)('customeraddress')
], CustomerAddress);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerContact = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const customer_entity_1 = __webpack_require__(36);
let CustomerContact = class CustomerContact {
};
exports.CustomerContact = CustomerContact;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CustomerContact.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CustomerContact.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CustomerContact.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CustomerContact.prototype, "designation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CustomerContact.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CustomerContact.prototype, "phoneNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CustomerContact.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], CustomerContact.prototype, "isPrimary", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.contacts),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof customer_entity_1.Customer !== "undefined" && customer_entity_1.Customer) === "function" ? _b : Object)
], CustomerContact.prototype, "customer", void 0);
exports.CustomerContact = CustomerContact = tslib_1.__decorate([
    (0, typeorm_1.Entity)('customercontact')
], CustomerContact);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lead = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const customer_entity_1 = __webpack_require__(36);
const user_entity_1 = __webpack_require__(13);
const lead_service_entity_1 = __webpack_require__(40);
const proposal_entity_1 = __webpack_require__(41);
const lead_contact_entity_1 = __webpack_require__(45);
const lead_address_entity_1 = __webpack_require__(46);
const lead_followup_entity_1 = __webpack_require__(47);
const salesConstants_1 = __webpack_require__(48);
let Lead = class Lead {
};
exports.Lead = Lead;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Lead.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "enquiryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "enquiryReference", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        default: salesConstants_1.LEAD_SOURCE.WEBSITE
    }),
    tslib_1.__metadata("design:type", Object)
], Lead.prototype, "source", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "sourceDetail", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object)
], Lead.prototype, "meta", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "sourceDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: salesConstants_1.LEAD_STATUS,
        default: salesConstants_1.LEAD_STATUS.NEW
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof salesConstants_1.LEAD_STATUS !== "undefined" && salesConstants_1.LEAD_STATUS) === "function" ? _d : Object)
], Lead.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: salesConstants_1.LEAD_QUALITY,
        default: salesConstants_1.LEAD_QUALITY.WARM
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof salesConstants_1.LEAD_QUALITY !== "undefined" && salesConstants_1.LEAD_QUALITY) === "function" ? _e : Object)
], Lead.prototype, "quality", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Lead.prototype, "isDraft", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], Lead.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.leads),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    tslib_1.__metadata("design:type", typeof (_f = typeof customer_entity_1.Customer !== "undefined" && customer_entity_1.Customer) === "function" ? _f : Object)
], Lead.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.id, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdBy' }),
    tslib_1.__metadata("design:type", typeof (_g = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _g : Object)
], Lead.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => lead_service_entity_1.LeadService, (leadService) => leadService.lead),
    tslib_1.__metadata("design:type", Array)
], Lead.prototype, "leadServices", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_entity_1.Proposal, (proposal) => proposal.lead),
    tslib_1.__metadata("design:type", Array)
], Lead.prototype, "proposals", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => lead_contact_entity_1.LeadContact, (contact) => contact.lead, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Lead.prototype, "contacts", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => lead_address_entity_1.LeadAddress, (address) => address.lead, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Lead.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => lead_followup_entity_1.LeadFollowUp, (followUp) => followUp.lead),
    tslib_1.__metadata("design:type", Array)
], Lead.prototype, "followUps", void 0);
exports.Lead = Lead = tslib_1.__decorate([
    (0, typeorm_1.Entity)('lead')
], Lead);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadService = exports.SERVICE_STATUS = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const lead_entity_1 = __webpack_require__(39);
const service_master_entity_1 = __webpack_require__(33);
const user_entity_1 = __webpack_require__(13);
const department_entity_1 = __webpack_require__(22);
const serviceConstants_1 = __webpack_require__(35);
Object.defineProperty(exports, "SERVICE_STATUS", ({ enumerable: true, get: function () { return serviceConstants_1.SERVICE_STATUS; } }));
let LeadService = class LeadService {
};
exports.LeadService = LeadService;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], LeadService.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_entity_1.Lead, (lead) => lead.leadServices),
    (0, typeorm_1.JoinColumn)({ name: 'leadId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof lead_entity_1.Lead !== "undefined" && lead_entity_1.Lead) === "function" ? _a : Object)
], LeadService.prototype, "lead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], LeadService.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadService.prototype, "assignmentGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => service_master_entity_1.ServiceMaster),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof service_master_entity_1.ServiceMaster !== "undefined" && service_master_entity_1.ServiceMaster) === "function" ? _b : Object)
], LeadService.prototype, "service", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], LeadService.prototype, "serviceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadService.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadService.prototype, "timeline", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _c : Object)
], LeadService.prototype, "department", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], LeadService.prototype, "departmentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'ownerId' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _d : Object)
], LeadService.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], LeadService.prototype, "ownerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: serviceConstants_1.SERVICE_STATUS,
        default: serviceConstants_1.SERVICE_STATUS.REQUIREMENT_CONFIRMED
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof serviceConstants_1.SERVICE_STATUS !== "undefined" && serviceConstants_1.SERVICE_STATUS) === "function" ? _e : Object)
], LeadService.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], LeadService.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], LeadService.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Array)
], LeadService.prototype, "deliverables", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadService.prototype, "remarks", void 0);
exports.LeadService = LeadService = tslib_1.__decorate([
    (0, typeorm_1.Entity)('lead_service')
], LeadService);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Proposal = exports.SUBMITTED_BY = exports.PROPOSAL_DIVISION = exports.PROPOSAL_STATUS = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const lead_entity_1 = __webpack_require__(39);
const proposal_item_entity_1 = __webpack_require__(42);
const proposal_payment_term_entity_1 = __webpack_require__(43);
const proposal_file_entity_1 = __webpack_require__(44);
var PROPOSAL_STATUS;
(function (PROPOSAL_STATUS) {
    PROPOSAL_STATUS["DRAFT"] = "Draft";
    PROPOSAL_STATUS["SUBMITTED"] = "Submitted";
    PROPOSAL_STATUS["APPROVED"] = "Approved";
    PROPOSAL_STATUS["REJECTED"] = "Rejected";
    PROPOSAL_STATUS["REVISED"] = "Revised";
    PROPOSAL_STATUS["EXPIRED"] = "Expired";
    PROPOSAL_STATUS["DROPPED"] = "Dropped";
})(PROPOSAL_STATUS || (exports.PROPOSAL_STATUS = PROPOSAL_STATUS = {}));
var PROPOSAL_DIVISION;
(function (PROPOSAL_DIVISION) {
    PROPOSAL_DIVISION["GRC_DIVISION"] = "GRC DIVISION";
    PROPOSAL_DIVISION["VAPT_DIVISION"] = "VAPT DIVISION";
    PROPOSAL_DIVISION["CERTIFICATION_DIVISION"] = "CERTIFICATION DIVISION";
})(PROPOSAL_DIVISION || (exports.PROPOSAL_DIVISION = PROPOSAL_DIVISION = {}));
var SUBMITTED_BY;
(function (SUBMITTED_BY) {
    SUBMITTED_BY["CLIENT"] = "Client";
    SUBMITTED_BY["ADMIN"] = "Admin";
    SUBMITTED_BY["INTERCERT_NOIDA"] = "Intercert Noida";
    SUBMITTED_BY["INTERCERT_BANGALORE"] = "Intercert Bangalore";
    SUBMITTED_BY["INTERCERT"] = "Intercert";
})(SUBMITTED_BY || (exports.SUBMITTED_BY = SUBMITTED_BY = {}));
let Proposal = class Proposal {
};
exports.Proposal = Proposal;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Proposal.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Proposal.prototype, "proposalReference", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    tslib_1.__metadata("design:type", Number)
], Proposal.prototype, "version", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Proposal.prototype, "proposalDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Proposal.prototype, "validUntil", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PROPOSAL_STATUS,
        default: PROPOSAL_STATUS.DRAFT
    }),
    tslib_1.__metadata("design:type", String)
], Proposal.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PROPOSAL_DIVISION,
        default: PROPOSAL_DIVISION.CERTIFICATION_DIVISION
    }),
    tslib_1.__metadata("design:type", String)
], Proposal.prototype, "division", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SUBMITTED_BY,
        default: SUBMITTED_BY.INTERCERT_NOIDA
    }),
    tslib_1.__metadata("design:type", String)
], Proposal.prototype, "submittedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Proposal.prototype, "subject", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Proposal.prototype, "introduction", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Proposal.prototype, "termsAndConditions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Proposal.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Proposal.prototype, "subTotal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Proposal.prototype, "totalDiscount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Proposal.prototype, "totalTaxAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Proposal.prototype, "grandTotal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 3, default: 'INR' }),
    tslib_1.__metadata("design:type", String)
], Proposal.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_entity_1.Lead, (lead) => lead.proposals),
    (0, typeorm_1.JoinColumn)({ name: 'leadId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof lead_entity_1.Lead !== "undefined" && lead_entity_1.Lead) === "function" ? _c : Object)
], Proposal.prototype, "lead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Proposal.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Proposal.prototype, "assignmentGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_item_entity_1.ProposalItem, (item) => item.proposal, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Proposal.prototype, "items", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_payment_term_entity_1.ProposalPaymentTerm, (term) => term.proposal, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Proposal.prototype, "paymentTerms", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_file_entity_1.ProposalFile, (file) => file.proposal, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Proposal.prototype, "files", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Proposal.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Proposal.prototype, "updatedAt", void 0);
exports.Proposal = Proposal = tslib_1.__decorate([
    (0, typeorm_1.Entity)('proposal')
], Proposal);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalItem = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const proposal_entity_1 = __webpack_require__(41);
const lead_service_entity_1 = __webpack_require__(40);
const proposal_payment_term_entity_1 = __webpack_require__(43);
let ProposalItem = class ProposalItem {
};
exports.ProposalItem = ProposalItem;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => proposal_entity_1.Proposal, (proposal) => proposal.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'proposalId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof proposal_entity_1.Proposal !== "undefined" && proposal_entity_1.Proposal) === "function" ? _a : Object)
], ProposalItem.prototype, "proposal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "proposalId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_service_entity_1.LeadService, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'leadServiceId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof lead_service_entity_1.LeadService !== "undefined" && lead_service_entity_1.LeadService) === "function" ? _b : Object)
], ProposalItem.prototype, "leadService", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "leadServiceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalItem.prototype, "serviceName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalItem.prototype, "serviceType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalItem.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProposalItem.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ProposalItem.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 3 }),
    tslib_1.__metadata("design:type", String)
], ProposalItem.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "discount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "taxPercentage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "discountAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "taxableAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "taxAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "netAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_payment_term_entity_1.ProposalPaymentTerm, (term) => term.proposalItem, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], ProposalItem.prototype, "paymentTerms", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], ProposalItem.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], ProposalItem.prototype, "updatedAt", void 0);
exports.ProposalItem = ProposalItem = tslib_1.__decorate([
    (0, typeorm_1.Entity)('proposal_item')
], ProposalItem);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalPaymentTerm = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const proposal_entity_1 = __webpack_require__(41);
const proposal_item_entity_1 = __webpack_require__(42);
let ProposalPaymentTerm = class ProposalPaymentTerm {
};
exports.ProposalPaymentTerm = ProposalPaymentTerm;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ProposalPaymentTerm.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => proposal_entity_1.Proposal, (proposal) => proposal.paymentTerms, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'proposalId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof proposal_entity_1.Proposal !== "undefined" && proposal_entity_1.Proposal) === "function" ? _a : Object)
], ProposalPaymentTerm.prototype, "proposal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ProposalPaymentTerm.prototype, "proposalId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => proposal_item_entity_1.ProposalItem, (item) => item.paymentTerms, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'proposalItemId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof proposal_item_entity_1.ProposalItem !== "undefined" && proposal_item_entity_1.ProposalItem) === "function" ? _b : Object)
], ProposalPaymentTerm.prototype, "proposalItem", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ProposalPaymentTerm.prototype, "proposalItemId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ProposalPaymentTerm.prototype, "milestoneName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], ProposalPaymentTerm.prototype, "percentage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalPaymentTerm.prototype, "triggerEvent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ProposalPaymentTerm.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProposalPaymentTerm.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ProposalPaymentTerm.prototype, "updatedAt", void 0);
exports.ProposalPaymentTerm = ProposalPaymentTerm = tslib_1.__decorate([
    (0, typeorm_1.Entity)('proposal_payment_term')
], ProposalPaymentTerm);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalFile = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const proposal_entity_1 = __webpack_require__(41);
let ProposalFile = class ProposalFile {
};
exports.ProposalFile = ProposalFile;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ProposalFile.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => proposal_entity_1.Proposal, (proposal) => proposal.files, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'proposalId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof proposal_entity_1.Proposal !== "undefined" && proposal_entity_1.Proposal) === "function" ? _a : Object)
], ProposalFile.prototype, "proposal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ProposalFile.prototype, "proposalId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    tslib_1.__metadata("design:type", String)
], ProposalFile.prototype, "fileUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalFile.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ProposalFile.prototype, "createdAt", void 0);
exports.ProposalFile = ProposalFile = tslib_1.__decorate([
    (0, typeorm_1.Entity)('proposal_files')
], ProposalFile);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadContact = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const lead_entity_1 = __webpack_require__(39);
let LeadContact = class LeadContact {
};
exports.LeadContact = LeadContact;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], LeadContact.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_entity_1.Lead, (lead) => lead.contacts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'leadId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof lead_entity_1.Lead !== "undefined" && lead_entity_1.Lead) === "function" ? _a : Object)
], LeadContact.prototype, "lead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], LeadContact.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    tslib_1.__metadata("design:type", String)
], LeadContact.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadContact.prototype, "designation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    tslib_1.__metadata("design:type", String)
], LeadContact.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    tslib_1.__metadata("design:type", String)
], LeadContact.prototype, "phoneNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    tslib_1.__metadata("design:type", String)
], LeadContact.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], LeadContact.prototype, "isPrimary", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], LeadContact.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], LeadContact.prototype, "updatedAt", void 0);
exports.LeadContact = LeadContact = tslib_1.__decorate([
    (0, typeorm_1.Entity)('lead_contact')
], LeadContact);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadAddress = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const lead_entity_1 = __webpack_require__(39);
const userContants_1 = __webpack_require__(16);
let LeadAddress = class LeadAddress {
};
exports.LeadAddress = LeadAddress;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], LeadAddress.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_entity_1.Lead, (lead) => lead.addresses, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'leadId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof lead_entity_1.Lead !== "undefined" && lead_entity_1.Lead) === "function" ? _a : Object)
], LeadAddress.prototype, "lead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], LeadAddress.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    tslib_1.__metadata("design:type", String)
], LeadAddress.prototype, "addressLine1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadAddress.prototype, "addressLine2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    tslib_1.__metadata("design:type", String)
], LeadAddress.prototype, "city", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadAddress.prototype, "state", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    tslib_1.__metadata("design:type", String)
], LeadAddress.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadAddress.prototype, "postalCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: userContants_1.ADDRESS_TYPE, nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof userContants_1.ADDRESS_TYPE !== "undefined" && userContants_1.ADDRESS_TYPE) === "function" ? _b : Object)
], LeadAddress.prototype, "addressType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], LeadAddress.prototype, "isPrimary", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], LeadAddress.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], LeadAddress.prototype, "updatedAt", void 0);
exports.LeadAddress = LeadAddress = tslib_1.__decorate([
    (0, typeorm_1.Entity)('lead_address')
], LeadAddress);


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadFollowUp = exports.FOLLOWUP_PRIORITY = exports.FOLLOWUP_TYPE = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const lead_entity_1 = __webpack_require__(39);
const user_entity_1 = __webpack_require__(13);
var FOLLOWUP_TYPE;
(function (FOLLOWUP_TYPE) {
    FOLLOWUP_TYPE["CALL"] = "Call";
    FOLLOWUP_TYPE["EMAIL"] = "Email";
    FOLLOWUP_TYPE["MEETING"] = "Meeting";
    FOLLOWUP_TYPE["WHATSAPP"] = "WhatsApp";
    FOLLOWUP_TYPE["SITE_VISIT"] = "Site Visit";
    FOLLOWUP_TYPE["FOLLOW_UP"] = "Follow Up";
    FOLLOWUP_TYPE["STATUS_UPDATE"] = "Status Update";
    FOLLOWUP_TYPE["NOTE"] = "Note";
    FOLLOWUP_TYPE["OTHER"] = "Other";
})(FOLLOWUP_TYPE || (exports.FOLLOWUP_TYPE = FOLLOWUP_TYPE = {}));
var FOLLOWUP_PRIORITY;
(function (FOLLOWUP_PRIORITY) {
    FOLLOWUP_PRIORITY["LOW"] = "Low";
    FOLLOWUP_PRIORITY["MEDIUM"] = "Medium";
    FOLLOWUP_PRIORITY["HIGH"] = "High";
    FOLLOWUP_PRIORITY["URGENT"] = "Urgent";
})(FOLLOWUP_PRIORITY || (exports.FOLLOWUP_PRIORITY = FOLLOWUP_PRIORITY = {}));
let LeadFollowUp = class LeadFollowUp {
};
exports.LeadFollowUp = LeadFollowUp;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], LeadFollowUp.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_entity_1.Lead, (lead) => lead.followUps),
    (0, typeorm_1.JoinColumn)({ name: 'leadId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof lead_entity_1.Lead !== "undefined" && lead_entity_1.Lead) === "function" ? _a : Object)
], LeadFollowUp.prototype, "lead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], LeadFollowUp.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: FOLLOWUP_TYPE,
        default: FOLLOWUP_TYPE.FOLLOW_UP
    }),
    tslib_1.__metadata("design:type", String)
], LeadFollowUp.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    tslib_1.__metadata("design:type", String)
], LeadFollowUp.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], LeadFollowUp.prototype, "followUpDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], LeadFollowUp.prototype, "completedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], LeadFollowUp.prototype, "isCompleted", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: FOLLOWUP_PRIORITY,
        default: FOLLOWUP_PRIORITY.MEDIUM
    }),
    tslib_1.__metadata("design:type", String)
], LeadFollowUp.prototype, "priority", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadFollowUp.prototype, "outcome", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadFollowUp.prototype, "nextAction", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdBy' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _d : Object)
], LeadFollowUp.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], LeadFollowUp.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedBy' }),
    tslib_1.__metadata("design:type", typeof (_f = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _f : Object)
], LeadFollowUp.prototype, "updatedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], LeadFollowUp.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], LeadFollowUp.prototype, "isActive", void 0);
exports.LeadFollowUp = LeadFollowUp = tslib_1.__decorate([
    (0, typeorm_1.Entity)('lead_followup')
], LeadFollowUp);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PAYMENT_METHOD = exports.INVOICE_TAX_TYPE = exports.INVOICE_STATUS = exports.PROJECT_STATUS = exports.PROPOSAL_STATUS = exports.LEAD_QUALITY = exports.LEAD_STATUS = exports.B2B = exports.SOCIAL_MEDIA_PLATFORM = exports.LEAD_SOURCE = void 0;
var LEAD_SOURCE;
(function (LEAD_SOURCE) {
    LEAD_SOURCE["GOOGLE_ADS"] = "Google Ads";
    LEAD_SOURCE["LINKEDIN"] = "LinkedIn";
    LEAD_SOURCE["CAMPAIGNS"] = "Campaigns";
    LEAD_SOURCE["EMAIL"] = "Email";
    LEAD_SOURCE["WEBSITE"] = "Website";
    LEAD_SOURCE["VERBAL"] = "Verbal";
    LEAD_SOURCE["EVENTS"] = "Events";
    LEAD_SOURCE["REFERENCE"] = "Reference";
    LEAD_SOURCE["REPEAT_CLIENT"] = "Repeat Client";
    LEAD_SOURCE["SOCIAL_MEDIA"] = "Social Media";
    LEAD_SOURCE["DIRECT"] = "Direct";
    LEAD_SOURCE["ASSOCIATES"] = "Associates";
    LEAD_SOURCE["B2B"] = "B2B";
    LEAD_SOURCE["SPRINTO"] = "Sprinto";
    LEAD_SOURCE["SCYTALE"] = "Scytale";
    LEAD_SOURCE["OTHERS"] = "Others";
})(LEAD_SOURCE || (exports.LEAD_SOURCE = LEAD_SOURCE = {}));
var SOCIAL_MEDIA_PLATFORM;
(function (SOCIAL_MEDIA_PLATFORM) {
    SOCIAL_MEDIA_PLATFORM["GOOGLE_ADS"] = "Google Ads";
    SOCIAL_MEDIA_PLATFORM["INSTAGRAM"] = "Instagram";
    SOCIAL_MEDIA_PLATFORM["FACEBOOK"] = "Facebook";
    SOCIAL_MEDIA_PLATFORM["LINKEDIN"] = "LinkedIn";
    SOCIAL_MEDIA_PLATFORM["YOUTUBE"] = "YouTube";
    SOCIAL_MEDIA_PLATFORM["X_TWITTER"] = "X (Twitter)";
})(SOCIAL_MEDIA_PLATFORM || (exports.SOCIAL_MEDIA_PLATFORM = SOCIAL_MEDIA_PLATFORM = {}));
var B2B;
(function (B2B) {
    B2B["SPRINTO"] = "Sprinto";
    B2B["SCYTALE"] = "Scytale";
    B2B["SCRUT"] = "Scrut";
    B2B["OTHERS"] = "Others";
})(B2B || (exports.B2B = B2B = {}));
var LEAD_STATUS;
(function (LEAD_STATUS) {
    LEAD_STATUS["NEW"] = "New";
    LEAD_STATUS["CONTACTED"] = "Contacted";
    LEAD_STATUS["SERVICES"] = "Services";
    LEAD_STATUS["PROPOSAL"] = "Proposal";
    LEAD_STATUS["AWARDED"] = "Awarded";
    LEAD_STATUS["LOST"] = "Lost";
})(LEAD_STATUS || (exports.LEAD_STATUS = LEAD_STATUS = {}));
var LEAD_QUALITY;
(function (LEAD_QUALITY) {
    LEAD_QUALITY["COLD"] = "Cold";
    LEAD_QUALITY["WARM"] = "Warm";
    LEAD_QUALITY["HOT"] = "Hot";
})(LEAD_QUALITY || (exports.LEAD_QUALITY = LEAD_QUALITY = {}));
var PROPOSAL_STATUS;
(function (PROPOSAL_STATUS) {
    PROPOSAL_STATUS["DRAFT"] = "Draft";
    PROPOSAL_STATUS["SENT"] = "Sent";
    PROPOSAL_STATUS["APPROVED"] = "Approved";
    PROPOSAL_STATUS["REJECTED"] = "Rejected";
    PROPOSAL_STATUS["EXPIRED"] = "Expired";
    PROPOSAL_STATUS["DROPPED"] = "Dropped";
})(PROPOSAL_STATUS || (exports.PROPOSAL_STATUS = PROPOSAL_STATUS = {}));
var PROJECT_STATUS;
(function (PROJECT_STATUS) {
    PROJECT_STATUS["PENDING"] = "Pending";
    PROJECT_STATUS["IN_PROGRESS"] = "In Progress";
    PROJECT_STATUS["ON_HOLD"] = "On Hold";
    PROJECT_STATUS["COMPLETED"] = "Completed";
    PROJECT_STATUS["CANCELLED"] = "Cancelled";
})(PROJECT_STATUS || (exports.PROJECT_STATUS = PROJECT_STATUS = {}));
var INVOICE_STATUS;
(function (INVOICE_STATUS) {
    INVOICE_STATUS["DRAFT"] = "Draft";
    INVOICE_STATUS["SENT"] = "Sent";
    INVOICE_STATUS["PAID"] = "Paid";
    INVOICE_STATUS["PARTIAL"] = "Partial";
    INVOICE_STATUS["OVERDUE"] = "Overdue";
    INVOICE_STATUS["CANCELLED"] = "Cancelled";
})(INVOICE_STATUS || (exports.INVOICE_STATUS = INVOICE_STATUS = {}));
var INVOICE_TAX_TYPE;
(function (INVOICE_TAX_TYPE) {
    INVOICE_TAX_TYPE["CGST_SGST"] = "CGST_SGST";
    INVOICE_TAX_TYPE["IGST"] = "IGST";
    INVOICE_TAX_TYPE["NONE"] = "None";
})(INVOICE_TAX_TYPE || (exports.INVOICE_TAX_TYPE = INVOICE_TAX_TYPE = {}));
var PAYMENT_METHOD;
(function (PAYMENT_METHOD) {
    PAYMENT_METHOD["NEFT"] = "NEFT";
    PAYMENT_METHOD["RTGS"] = "RTGS";
    PAYMENT_METHOD["CHEQUE"] = "Cheque";
    PAYMENT_METHOD["CASH"] = "Cash";
    PAYMENT_METHOD["ONLINE"] = "Online";
    PAYMENT_METHOD["UPI"] = "UPI";
})(PAYMENT_METHOD || (exports.PAYMENT_METHOD = PAYMENT_METHOD = {}));


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadEnquiry = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const user_entity_1 = __webpack_require__(13);
const lead_contact_entity_1 = __webpack_require__(45);
// @ts-ignore - Circular dependency resolution
const lead_address_entity_1 = __webpack_require__(46);
let LeadEnquiry = class LeadEnquiry {
};
exports.LeadEnquiry = LeadEnquiry;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "enquiryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "enquiryReference", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "leadSource", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "sourceDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "businessActivities", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "headcount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'New' }),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "leadStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], LeadEnquiry.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], LeadEnquiry.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], LeadEnquiry.prototype, "createdById", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], LeadEnquiry.prototype, "updatedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], LeadEnquiry.prototype, "updatedById", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => lead_contact_entity_1.LeadContact, (contact) => contact.lead, { cascade: true, eager: true }),
    tslib_1.__metadata("design:type", Array)
], LeadEnquiry.prototype, "contacts", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => lead_address_entity_1.LeadAddress, (address) => address.lead, { cascade: true, eager: true }),
    tslib_1.__metadata("design:type", Array)
], LeadEnquiry.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], LeadEnquiry.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], LeadEnquiry.prototype, "updatedAt", void 0);
exports.LeadEnquiry = LeadEnquiry = tslib_1.__decorate([
    (0, typeorm_1.Entity)('lead_enquiry')
], LeadEnquiry);


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Countries = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
let Countries = class Countries {
};
exports.Countries = Countries;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id", unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], Countries.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", length: 100 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("char", { name: "iso3", nullable: true, length: 3 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "iso3", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("char", { name: "numeric_code", nullable: true, length: 3 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "numericCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("char", { name: "iso2", nullable: true, length: 2 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "iso2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "phonecode", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "phonecode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "capital", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "capital", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "currency", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "currency_name", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "currencyName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "currency_symbol", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "currencySymbol", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "tld", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "tld", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "native", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "native", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "region", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "region", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "subregion", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "subregion", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("text", { name: "timezones", nullable: true }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "timezones", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("text", { name: "translations", nullable: true }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "translations", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "latitude",
        nullable: true,
        precision: 10,
        scale: 8,
    }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "latitude", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "longitude",
        nullable: true,
        precision: 11,
        scale: 8,
    }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "longitude", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "emoji", nullable: true, length: 191 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "emoji", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "emojiU", nullable: true, length: 191 }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "emojiU", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("timestamp", { name: "created_at", nullable: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Countries.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Countries.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "flag", width: 1, default: () => "'1'" }),
    tslib_1.__metadata("design:type", Boolean)
], Countries.prototype, "flag", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "wikiDataId",
        nullable: true,
        comment: "Rapid API GeoDB Cities",
        length: 255,
    }),
    tslib_1.__metadata("design:type", String)
], Countries.prototype, "wikiDataId", void 0);
exports.Countries = Countries = tslib_1.__decorate([
    (0, typeorm_1.Entity)("countries")
], Countries);


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.States = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
let States = class States {
};
exports.States = States;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id", unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], States.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", length: 255 }),
    tslib_1.__metadata("design:type", String)
], States.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("mediumint", { name: "country_id", unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], States.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("char", { name: "country_code", length: 2 }),
    tslib_1.__metadata("design:type", String)
], States.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "fips_code", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], States.prototype, "fipsCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "iso2", nullable: true, length: 255 }),
    tslib_1.__metadata("design:type", String)
], States.prototype, "iso2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "type", nullable: true, length: 191 }),
    tslib_1.__metadata("design:type", String)
], States.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "latitude",
        nullable: true,
        precision: 10,
        scale: 8,
    }),
    tslib_1.__metadata("design:type", String)
], States.prototype, "latitude", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "longitude",
        nullable: true,
        precision: 11,
        scale: 8,
    }),
    tslib_1.__metadata("design:type", String)
], States.prototype, "longitude", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("timestamp", { name: "created_at", nullable: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], States.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], States.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "flag", width: 1, default: () => "'1'" }),
    tslib_1.__metadata("design:type", Boolean)
], States.prototype, "flag", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "wikiDataId",
        nullable: true,
        comment: "Rapid API GeoDB Cities",
        length: 255,
    }),
    tslib_1.__metadata("design:type", String)
], States.prototype, "wikiDataId", void 0);
exports.States = States = tslib_1.__decorate([
    (0, typeorm_1.Entity)("states")
], States);


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cities = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
let Cities = class Cities {
};
exports.Cities = Cities;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    tslib_1.__metadata("design:type", Number)
], Cities.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", length: 255 }),
    tslib_1.__metadata("design:type", String)
], Cities.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("mediumint", { name: "state_id", unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], Cities.prototype, "stateId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "state_code", length: 255 }),
    tslib_1.__metadata("design:type", String)
], Cities.prototype, "stateCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("mediumint", { name: "country_id", unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], Cities.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("char", { name: "country_code", length: 2 }),
    tslib_1.__metadata("design:type", String)
], Cities.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("decimal", { name: "latitude", precision: 10, scale: 8 }),
    tslib_1.__metadata("design:type", String)
], Cities.prototype, "latitude", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("decimal", { name: "longitude", precision: 11, scale: 8 }),
    tslib_1.__metadata("design:type", String)
], Cities.prototype, "longitude", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "created_at",
        default: () => "'2014-01-01 01:01:01'",
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Cities.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Cities.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "flag", width: 1, default: () => "'1'" }),
    tslib_1.__metadata("design:type", Boolean)
], Cities.prototype, "flag", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "wikiDataId",
        nullable: true,
        comment: "Rapid API GeoDB Cities",
        length: 255,
    }),
    tslib_1.__metadata("design:type", String)
], Cities.prototype, "wikiDataId", void 0);
exports.Cities = Cities = tslib_1.__decorate([
    (0, typeorm_1.Entity)("cities")
], Cities);


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nationalities = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
let Nationalities = class Nationalities {
};
exports.Nationalities = Nationalities;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "num_code" }),
    tslib_1.__metadata("design:type", Number)
], Nationalities.prototype, "numCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "alpha_2_code", nullable: true, length: 2 }),
    tslib_1.__metadata("design:type", String)
], Nationalities.prototype, "alpha_2Code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "alpha_3_code", nullable: true, length: 3 }),
    tslib_1.__metadata("design:type", String)
], Nationalities.prototype, "alpha_3Code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "en_short_name", nullable: true, length: 52 }),
    tslib_1.__metadata("design:type", String)
], Nationalities.prototype, "enShortName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nationality", nullable: true, length: 39 }),
    tslib_1.__metadata("design:type", String)
], Nationalities.prototype, "nationality", void 0);
exports.Nationalities = Nationalities = tslib_1.__decorate([
    (0, typeorm_1.Entity)("nationalities")
], Nationalities);


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Company = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const branch_entity_1 = __webpack_require__(55);
let Company = class Company {
};
exports.Company = Company;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Company.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Company.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Company.prototype, "registrationNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Company.prototype, "taxId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Company.prototype, "website", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Company.prototype, "logoUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => branch_entity_1.Branch, (branch) => branch.company),
    tslib_1.__metadata("design:type", Array)
], Company.prototype, "branches", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Company.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Company.prototype, "updatedAt", void 0);
exports.Company = Company = tslib_1.__decorate([
    (0, typeorm_1.Entity)('company')
], Company);


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Branch = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const company_entity_1 = __webpack_require__(54);
let Branch = class Branch {
};
exports.Branch = Branch;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Branch.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "addressLine1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "addressLine2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "city", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "state", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "postalCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], Branch.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.branches),
    (0, typeorm_1.JoinColumn)({ name: 'companyId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof company_entity_1.Company !== "undefined" && company_entity_1.Company) === "function" ? _a : Object)
], Branch.prototype, "company", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Branch.prototype, "createdAt", void 0);
exports.Branch = Branch = tslib_1.__decorate([
    (0, typeorm_1.Entity)('branch')
], Branch);


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkRequest = exports.WORK_REQUEST_PRIORITY = exports.WORK_REQUEST_STATUS = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const work_request_type_entity_1 = __webpack_require__(57);
const customer_entity_1 = __webpack_require__(36);
const user_entity_1 = __webpack_require__(13);
const department_entity_1 = __webpack_require__(22);
var WORK_REQUEST_STATUS;
(function (WORK_REQUEST_STATUS) {
    WORK_REQUEST_STATUS["NEW"] = "New";
    WORK_REQUEST_STATUS["ACCEPTED"] = "Accepted";
    WORK_REQUEST_STATUS["REJECTED"] = "Rejected";
    WORK_REQUEST_STATUS["CLARIFICATION"] = "Clarification";
    WORK_REQUEST_STATUS["IN_PROGRESS"] = "In Progress";
    WORK_REQUEST_STATUS["COMPLETED"] = "Completed";
})(WORK_REQUEST_STATUS || (exports.WORK_REQUEST_STATUS = WORK_REQUEST_STATUS = {}));
var WORK_REQUEST_PRIORITY;
(function (WORK_REQUEST_PRIORITY) {
    WORK_REQUEST_PRIORITY["LOW"] = "Low";
    WORK_REQUEST_PRIORITY["MEDIUM"] = "Medium";
    WORK_REQUEST_PRIORITY["HIGH"] = "High";
    WORK_REQUEST_PRIORITY["CRITICAL"] = "Critical";
})(WORK_REQUEST_PRIORITY || (exports.WORK_REQUEST_PRIORITY = WORK_REQUEST_PRIORITY = {}));
let WorkRequest = class WorkRequest {
};
exports.WorkRequest = WorkRequest;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], WorkRequest.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], WorkRequest.prototype, "requestId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => work_request_type_entity_1.WorkRequestType),
    (0, typeorm_1.JoinColumn)({ name: 'requestTypeId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof work_request_type_entity_1.WorkRequestType !== "undefined" && work_request_type_entity_1.WorkRequestType) === "function" ? _a : Object)
], WorkRequest.prototype, "requestType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof customer_entity_1.Customer !== "undefined" && customer_entity_1.Customer) === "function" ? _b : Object)
], WorkRequest.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: WORK_REQUEST_PRIORITY,
        default: WORK_REQUEST_PRIORITY.MEDIUM
    }),
    tslib_1.__metadata("design:type", String)
], WorkRequest.prototype, "priority", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], WorkRequest.prototype, "targetDeliveryDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: WORK_REQUEST_STATUS,
        default: WORK_REQUEST_STATUS.NEW
    }),
    tslib_1.__metadata("design:type", String)
], WorkRequest.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], WorkRequest.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'requestedBy' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _d : Object)
], WorkRequest.prototype, "requestedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    tslib_1.__metadata("design:type", typeof (_e = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _e : Object)
], WorkRequest.prototype, "targetDepartment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assignedTo' }),
    tslib_1.__metadata("design:type", typeof (_f = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _f : Object)
], WorkRequest.prototype, "assignedTo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], WorkRequest.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], WorkRequest.prototype, "updatedAt", void 0);
exports.WorkRequest = WorkRequest = tslib_1.__decorate([
    (0, typeorm_1.Entity)('work_request')
], WorkRequest);


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkRequestType = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let WorkRequestType = class WorkRequestType {
};
exports.WorkRequestType = WorkRequestType;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], WorkRequestType.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], WorkRequestType.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], WorkRequestType.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], WorkRequestType.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], WorkRequestType.prototype, "isActive", void 0);
exports.WorkRequestType = WorkRequestType = tslib_1.__decorate([
    (0, typeorm_1.Entity)('work_request_type')
], WorkRequestType);


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlaRule = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let SlaRule = class SlaRule {
};
exports.SlaRule = SlaRule;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SlaRule.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SlaRule.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SlaRule.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SlaRule.prototype, "entityType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SlaRule.prototype, "priority", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SlaRule.prototype, "resolutionTimeHours", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SlaRule.prototype, "responseTimeHours", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], SlaRule.prototype, "isActive", void 0);
exports.SlaRule = SlaRule = tslib_1.__decorate([
    (0, typeorm_1.Entity)('sla_rule')
], SlaRule);


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationRule = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let NotificationRule = class NotificationRule {
};
exports.NotificationRule = NotificationRule;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], NotificationRule.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NotificationRule.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NotificationRule.prototype, "event", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NotificationRule.prototype, "channel", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    tslib_1.__metadata("design:type", String)
], NotificationRule.prototype, "template", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], NotificationRule.prototype, "isActive", void 0);
exports.NotificationRule = NotificationRule = tslib_1.__decorate([
    (0, typeorm_1.Entity)('notification_rule')
], NotificationRule);


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EscalationRule = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let EscalationRule = class EscalationRule {
};
exports.EscalationRule = EscalationRule;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], EscalationRule.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], EscalationRule.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], EscalationRule.prototype, "slaRuleId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], EscalationRule.prototype, "level", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], EscalationRule.prototype, "escalateToRole", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], EscalationRule.prototype, "triggerAfterHours", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], EscalationRule.prototype, "isActive", void 0);
exports.EscalationRule = EscalationRule = tslib_1.__decorate([
    (0, typeorm_1.Entity)('escalation_rule')
], EscalationRule);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoutingRule = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const work_request_type_entity_1 = __webpack_require__(57);
const department_entity_1 = __webpack_require__(22);
let RoutingRule = class RoutingRule {
};
exports.RoutingRule = RoutingRule;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RoutingRule.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => work_request_type_entity_1.WorkRequestType),
    (0, typeorm_1.JoinColumn)({ name: 'requestTypeId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof work_request_type_entity_1.WorkRequestType !== "undefined" && work_request_type_entity_1.WorkRequestType) === "function" ? _a : Object)
], RoutingRule.prototype, "requestType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _b : Object)
], RoutingRule.prototype, "targetDepartment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], RoutingRule.prototype, "isActive", void 0);
exports.RoutingRule = RoutingRule = tslib_1.__decorate([
    (0, typeorm_1.Entity)('routing_rule')
], RoutingRule);


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApprovalLevel = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let ApprovalLevel = class ApprovalLevel {
};
exports.ApprovalLevel = ApprovalLevel;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ApprovalLevel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], ApprovalLevel.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    tslib_1.__metadata("design:type", Number)
], ApprovalLevel.prototype, "sequence", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ApprovalLevel.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], ApprovalLevel.prototype, "isActive", void 0);
exports.ApprovalLevel = ApprovalLevel = tslib_1.__decorate([
    (0, typeorm_1.Entity)('approval_level')
], ApprovalLevel);


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApprovalStatus = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let ApprovalStatus = class ApprovalStatus {
};
exports.ApprovalStatus = ApprovalStatus;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ApprovalStatus.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], ApprovalStatus.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], ApprovalStatus.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], ApprovalStatus.prototype, "isActive", void 0);
exports.ApprovalStatus = ApprovalStatus = tslib_1.__decorate([
    (0, typeorm_1.Entity)('approval_status')
], ApprovalStatus);


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLog = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const user_entity_1 = __webpack_require__(13);
let AuditLog = class AuditLog {
};
exports.AuditLog = AuditLog;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], AuditLog.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "action", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "module", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "entityId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "details", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "ipAddress", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'performedBy' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], AuditLog.prototype, "performedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AuditLog.prototype, "performedAt", void 0);
exports.AuditLog = AuditLog = tslib_1.__decorate([
    (0, typeorm_1.Entity)('audit_log')
], AuditLog);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentClassification = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let DocumentClassification = class DocumentClassification {
};
exports.DocumentClassification = DocumentClassification;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DocumentClassification.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], DocumentClassification.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], DocumentClassification.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], DocumentClassification.prototype, "isActive", void 0);
exports.DocumentClassification = DocumentClassification = tslib_1.__decorate([
    (0, typeorm_1.Entity)('document_classification')
], DocumentClassification);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalAcceptance = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const proposal_entity_1 = __webpack_require__(41);
const lead_entity_1 = __webpack_require__(39);
const department_entity_1 = __webpack_require__(22);
let ProposalAcceptance = class ProposalAcceptance {
};
exports.ProposalAcceptance = ProposalAcceptance;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ProposalAcceptance.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => proposal_entity_1.Proposal),
    (0, typeorm_1.JoinColumn)({ name: 'proposalId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof proposal_entity_1.Proposal !== "undefined" && proposal_entity_1.Proposal) === "function" ? _a : Object)
], ProposalAcceptance.prototype, "proposal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ProposalAcceptance.prototype, "proposalId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => lead_entity_1.Lead),
    (0, typeorm_1.JoinColumn)({ name: 'leadId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof lead_entity_1.Lead !== "undefined" && lead_entity_1.Lead) === "function" ? _b : Object)
], ProposalAcceptance.prototype, "lead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ProposalAcceptance.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalAcceptance.prototype, "assignmentGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProposalAcceptance.prototype, "awardDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalAcceptance.prototype, "poNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ProposalAcceptance.prototype, "poFileUrls", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], ProposalAcceptance.prototype, "billingNameSameAsCustomer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalAcceptance.prototype, "billToCompanyName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ProposalAcceptance.prototype, "billToAddress", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalAcceptance.prototype, "gstNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalAcceptance.prototype, "gstType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ProposalAcceptance.prototype, "billingEmailIds", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ProposalAcceptance.prototype, "billingContactPerson", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalAcceptance.prototype, "raisedFromEntity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'accountDepartmentId' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _d : Object)
], ProposalAcceptance.prototype, "accountDepartment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ProposalAcceptance.prototype, "accountDepartmentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ProposalAcceptance.prototype, "invoiceServices", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalAcceptance.prototype, "department", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalAcceptance.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], ProposalAcceptance.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], ProposalAcceptance.prototype, "updatedAt", void 0);
exports.ProposalAcceptance = ProposalAcceptance = tslib_1.__decorate([
    (0, typeorm_1.Entity)('proposal_acceptance')
], ProposalAcceptance);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Project = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const department_entity_1 = __webpack_require__(22);
const lead_entity_1 = __webpack_require__(39);
const proposal_entity_1 = __webpack_require__(41);
const team_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(13);
const salesConstants_1 = __webpack_require__(48);
let Project = class Project {
};
exports.Project = Project;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "projectCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Project.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Project.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: salesConstants_1.PROJECT_STATUS,
        default: salesConstants_1.PROJECT_STATUS.PENDING
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof salesConstants_1.PROJECT_STATUS !== "undefined" && salesConstants_1.PROJECT_STATUS) === "function" ? _c : Object)
], Project.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _d : Object)
], Project.prototype, "department", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "departmentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'teamId' }),
    tslib_1.__metadata("design:type", typeof (_e = typeof team_entity_1.Team !== "undefined" && team_entity_1.Team) === "function" ? _e : Object)
], Project.prototype, "team", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "teamId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assignedToUserId' }),
    tslib_1.__metadata("design:type", typeof (_f = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _f : Object)
], Project.prototype, "assignedToUser", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "assignedToUserId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_entity_1.Lead),
    (0, typeorm_1.JoinColumn)({ name: 'leadId' }),
    tslib_1.__metadata("design:type", typeof (_g = typeof lead_entity_1.Lead !== "undefined" && lead_entity_1.Lead) === "function" ? _g : Object)
], Project.prototype, "lead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => proposal_entity_1.Proposal),
    (0, typeorm_1.JoinColumn)({ name: 'proposalId' }),
    tslib_1.__metadata("design:type", typeof (_h = typeof proposal_entity_1.Proposal !== "undefined" && proposal_entity_1.Proposal) === "function" ? _h : Object)
], Project.prototype, "proposal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "proposalId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "closureId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], Project.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], Project.prototype, "updatedAt", void 0);
exports.Project = Project = tslib_1.__decorate([
    (0, typeorm_1.Entity)('project')
], Project);


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Invoice = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const proposal_acceptance_entity_1 = __webpack_require__(66);
const project_entity_1 = __webpack_require__(67);
const lead_entity_1 = __webpack_require__(39);
const department_entity_1 = __webpack_require__(22);
const proposal_payment_term_entity_1 = __webpack_require__(43);
const invoice_item_entity_1 = __webpack_require__(69);
const payment_record_entity_1 = __webpack_require__(70);
const salesConstants_1 = __webpack_require__(48);
let Invoice = class Invoice {
};
exports.Invoice = Invoice;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "invoiceNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => proposal_acceptance_entity_1.ProposalAcceptance, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'closureId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof proposal_acceptance_entity_1.ProposalAcceptance !== "undefined" && proposal_acceptance_entity_1.ProposalAcceptance) === "function" ? _a : Object)
], Invoice.prototype, "closure", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "closureId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof project_entity_1.Project !== "undefined" && project_entity_1.Project) === "function" ? _b : Object)
], Invoice.prototype, "project", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "projectId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_entity_1.Lead, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'leadId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof lead_entity_1.Lead !== "undefined" && lead_entity_1.Lead) === "function" ? _c : Object)
], Invoice.prototype, "lead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => proposal_payment_term_entity_1.ProposalPaymentTerm, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'paymentTermId' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof proposal_payment_term_entity_1.ProposalPaymentTerm !== "undefined" && proposal_payment_term_entity_1.ProposalPaymentTerm) === "function" ? _d : Object)
], Invoice.prototype, "paymentTerm", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "paymentTermId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'accountDepartmentId' }),
    tslib_1.__metadata("design:type", typeof (_e = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _e : Object)
], Invoice.prototype, "accountDepartment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "accountDepartmentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "billFromEntity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "billToCompanyName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Invoice.prototype, "billToAddress", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "billToGstNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "billToPan", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "customerPoNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "accountManager", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "businessNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "sacCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Invoice.prototype, "bankDetails", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Invoice.prototype, "invoiceDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], Invoice.prototype, "dueDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "subTotal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "totalDiscount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: salesConstants_1.INVOICE_TAX_TYPE,
        default: salesConstants_1.INVOICE_TAX_TYPE.NONE
    }),
    tslib_1.__metadata("design:type", typeof (_h = typeof salesConstants_1.INVOICE_TAX_TYPE !== "undefined" && salesConstants_1.INVOICE_TAX_TYPE) === "function" ? _h : Object)
], Invoice.prototype, "taxType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "cgstPercentage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "sgstPercentage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "igstPercentage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "cgstAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "sgstAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "igstAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "totalTaxAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "grandTotal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "advancePaid", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "netPayable", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "amountReceived", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "remainingBalance", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 3, default: 'INR' }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: salesConstants_1.INVOICE_STATUS,
        default: salesConstants_1.INVOICE_STATUS.DRAFT
    }),
    tslib_1.__metadata("design:type", typeof (_j = typeof salesConstants_1.INVOICE_STATUS !== "undefined" && salesConstants_1.INVOICE_STATUS) === "function" ? _j : Object)
], Invoice.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "pdfUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_item_entity_1.InvoiceItem, (item) => item.invoice, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Invoice.prototype, "items", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => payment_record_entity_1.PaymentRecord, (payment) => payment.invoice),
    tslib_1.__metadata("design:type", Array)
], Invoice.prototype, "payments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], Invoice.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_l = typeof Date !== "undefined" && Date) === "function" ? _l : Object)
], Invoice.prototype, "updatedAt", void 0);
exports.Invoice = Invoice = tslib_1.__decorate([
    (0, typeorm_1.Entity)('invoice')
], Invoice);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoiceItem = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const invoice_entity_1 = __webpack_require__(68);
let InvoiceItem = class InvoiceItem {
};
exports.InvoiceItem = InvoiceItem;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => invoice_entity_1.Invoice, (invoice) => invoice.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'invoiceId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof invoice_entity_1.Invoice !== "undefined" && invoice_entity_1.Invoice) === "function" ? _a : Object)
], InvoiceItem.prototype, "invoice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "invoiceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "proposalItemId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], InvoiceItem.prototype, "serviceName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], InvoiceItem.prototype, "serviceDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "qty", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "unitPrice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "discount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "discountAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "taxableAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "taxPercentage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "taxAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "netAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 3, default: 'INR' }),
    tslib_1.__metadata("design:type", String)
], InvoiceItem.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], InvoiceItem.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], InvoiceItem.prototype, "updatedAt", void 0);
exports.InvoiceItem = InvoiceItem = tslib_1.__decorate([
    (0, typeorm_1.Entity)('invoice_item')
], InvoiceItem);


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentRecord = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const invoice_entity_1 = __webpack_require__(68);
const salesConstants_1 = __webpack_require__(48);
let PaymentRecord = class PaymentRecord {
};
exports.PaymentRecord = PaymentRecord;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PaymentRecord.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => invoice_entity_1.Invoice, (invoice) => invoice.payments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'invoiceId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof invoice_entity_1.Invoice !== "undefined" && invoice_entity_1.Invoice) === "function" ? _a : Object)
], PaymentRecord.prototype, "invoice", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PaymentRecord.prototype, "invoiceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], PaymentRecord.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PaymentRecord.prototype, "paymentDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], PaymentRecord.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: salesConstants_1.PAYMENT_METHOD,
        default: salesConstants_1.PAYMENT_METHOD.NEFT
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof salesConstants_1.PAYMENT_METHOD !== "undefined" && salesConstants_1.PAYMENT_METHOD) === "function" ? _c : Object)
], PaymentRecord.prototype, "paymentMethod", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], PaymentRecord.prototype, "bankName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], PaymentRecord.prototype, "transactionId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], PaymentRecord.prototype, "chequeNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], PaymentRecord.prototype, "remainingBalance", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], PaymentRecord.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], PaymentRecord.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], PaymentRecord.prototype, "updatedAt", void 0);
exports.PaymentRecord = PaymentRecord = tslib_1.__decorate([
    (0, typeorm_1.Entity)('payment_record')
], PaymentRecord);


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IntercertPartnerUser = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
let IntercertPartnerUser = class IntercertPartnerUser {
};
exports.IntercertPartnerUser = IntercertPartnerUser;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], IntercertPartnerUser.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntercertPartnerUser.prototype, "username", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntercertPartnerUser.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntercertPartnerUser.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntercertPartnerUser.prototype, "company", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntercertPartnerUser.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntercertPartnerUser.prototype, "city", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntercertPartnerUser.prototype, "state", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntercertPartnerUser.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], IntercertPartnerUser.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], IntercertPartnerUser.prototype, "auditorCount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    tslib_1.__metadata("design:type", String)
], IntercertPartnerUser.prototype, "status", void 0);
exports.IntercertPartnerUser = IntercertPartnerUser = tslib_1.__decorate([
    (0, typeorm_1.Entity)('intercert_partner_user')
], IntercertPartnerUser);


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
// export * from './session.repository'; // DEPRECATED - Use LoginSessionRepository instead
tslib_1.__exportStar(__webpack_require__(73), exports);
// export * from './role.repository'; // Removed as Role entity does not exist
tslib_1.__exportStar(__webpack_require__(74), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);
tslib_1.__exportStar(__webpack_require__(77), exports);
tslib_1.__exportStar(__webpack_require__(80), exports);
tslib_1.__exportStar(__webpack_require__(81), exports);
tslib_1.__exportStar(__webpack_require__(82), exports);
tslib_1.__exportStar(__webpack_require__(83), exports);
tslib_1.__exportStar(__webpack_require__(84), exports);
tslib_1.__exportStar(__webpack_require__(85), exports);
tslib_1.__exportStar(__webpack_require__(86), exports);
tslib_1.__exportStar(__webpack_require__(87), exports);
tslib_1.__exportStar(__webpack_require__(88), exports);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const department_entity_1 = __webpack_require__(22);
let DepartmentRepository = class DepartmentRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async create(department) {
        const newDepartment = this.repo.create(department);
        return this.repo.save(newDepartment);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async update(id, department) {
        await this.repo.update(id, department);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.DepartmentRepository = DepartmentRepository;
exports.DepartmentRepository = DepartmentRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DepartmentRepository);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const team_entity_1 = __webpack_require__(26);
let TeamRepository = class TeamRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async create(team) {
        const newTeam = this.repo.create(team);
        return this.repo.save(newTeam);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async update(id, team) {
        await this.repo.update(id, team);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.TeamRepository = TeamRepository;
exports.TeamRepository = TeamRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TeamRepository);


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemModuleRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const systemModule_entity_1 = __webpack_require__(23);
let SystemModuleRepository = class SystemModuleRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async create(systemModule) {
        const newSystemModule = this.repo.create(systemModule);
        return this.repo.save(newSystemModule);
    }
    async findAll(options) {
        return this.repo.find(options);
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async update(id, systemModule) {
        await this.repo.update(id, systemModule);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.SystemModuleRepository = SystemModuleRepository;
exports.SystemModuleRepository = SystemModuleRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(systemModule_entity_1.SystemModule)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], SystemModuleRepository);
// Repository for System Modules


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const lead_enquiry_entity_1 = __webpack_require__(49);
const lead_contact_entity_1 = __webpack_require__(45);
const lead_address_entity_1 = __webpack_require__(46);
let LeadRepository = class LeadRepository {
    constructor(leadEnquiryRepo, leadContactRepo, leadAddressRepo) {
        this.leadEnquiryRepo = leadEnquiryRepo;
        this.leadContactRepo = leadContactRepo;
        this.leadAddressRepo = leadAddressRepo;
    }
    /**
     * Generate enquiry ID: [PREFIX][YYYY][MM][DD][HH][mm][ss]_[SEQ]
     * Prefix is dynamic based on company name differentiation.
     */
    async generateEnquiryId(companyName) {
        const today = new Date();
        // 1. Clean the company name: remove common suffixes and non-alphanumeric chars
        const cleanedName = (companyName || 'UNK')
            .replace(/(?:pvt ltd|private limited|ltd|limited|inc|corp|llp)/gi, '')
            .replace(/[^a-zA-Z0-9]/g, '')
            .trim()
            .toUpperCase();
        // 2. Find similar companies to determine differentiation length
        // We look for names that share the first 4 characters in the lead_enquiry table
        const initialPrefix = cleanedName.substring(0, 4);
        const similarLeads = await this.leadEnquiryRepo.find({
            where: { companyName: (0, typeorm_2.Like)(`${initialPrefix}%`) },
            select: ['companyName']
        });
        // Default prefix length is 4 (or less if name is shorter)
        let requiredLength = Math.min(cleanedName.length, 4);
        for (const lead of similarLeads) {
            const otherCleaned = lead.companyName
                .replace(/(?:pvt ltd|private limited|ltd|limited|inc|corp|llp)/gi, '')
                .replace(/[^a-zA-Z0-9]/g, '')
                .trim()
                .toUpperCase();
            if (otherCleaned === cleanedName)
                continue;
            let i = 0;
            while (i < cleanedName.length && i < otherCleaned.length && cleanedName[i] === otherCleaned[i]) {
                i++;
            }
            requiredLength = Math.max(requiredLength, i + 1);
        }
        const prefix = cleanedName.substring(0, Math.min(cleanedName.length, requiredLength));
        const yyyy = today.getFullYear().toString();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');
        const ss = String(today.getSeconds()).padStart(2, '0');
        // Count leads created today
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const count = await this.leadEnquiryRepo.count({
            where: {
                createdAt: {
                    $gte: todayStart,
                    $lt: todayEnd,
                },
            },
        });
        const sequence = String(count + 1).padStart(2, '0');
        return `${prefix}${yyyy}${mm}${dd}${hh}${min}${ss}_${sequence}`;
    }
    /**
     * Generate customer ID: IS/COMP/CNT
     * COMP = First 4 letters of company name
     * CNT = First 3 letters of country
     */
    generateCustomerId(companyName, country) {
        const comp = companyName.substring(0, 4).toUpperCase();
        const cnt = country.substring(0, 3).toUpperCase();
        return `IS/${comp}/${cnt}`;
    }
    /**
     * Create new lead enquiry
     */
    async createLead(dto, createdById) {
        const enquiryId = await this.generateEnquiryId(dto.companyName);
        const customerId = this.generateCustomerId(dto.companyName, dto.addresses[0]?.country || 'IND');
        const lead = this.leadEnquiryRepo.create({
            enquiryId,
            customerId,
            companyName: dto.companyName,
            enquiryReference: dto.enquiryReference,
            leadSource: dto.leadSource,
            sourceDescription: dto.sourceDescription,
            businessActivities: dto.businessActivities,
            headcount: dto.headcount,
            leadStatus: 'New',
            notes: dto.notes,
            createdById,
        });
        const savedLead = await this.leadEnquiryRepo.save(lead);
        // Create contacts
        if (dto.contacts && dto.contacts.length > 0) {
            const contacts = dto.contacts.map((contact) => this.leadContactRepo.create({
                ...contact,
                leadId: Number(savedLead.id),
            }));
            await this.leadContactRepo.save(contacts);
        }
        // Create addresses
        if (dto.addresses && dto.addresses.length > 0) {
            const addresses = dto.addresses.map((address) => {
                const { addressType, ...rest } = address;
                return this.leadAddressRepo.create({
                    ...rest,
                    addressType: addressType,
                    leadId: Number(savedLead.id),
                });
            });
            await this.leadAddressRepo.save(addresses);
        }
        return this.getLeadById(savedLead.id);
    }
    /**
     * Get lead by ID with all relations
     */
    async getLeadById(id) {
        return this.leadEnquiryRepo.findOne({
            where: { id },
            relations: ['contacts', 'addresses', 'createdBy', 'updatedBy'],
        });
    }
    /**
     * Get lead by enquiry ID
     */
    async getLeadByEnquiryId(enquiryId) {
        return this.leadEnquiryRepo.findOne({
            where: { enquiryId },
            relations: ['contacts', 'addresses', 'createdBy', 'updatedBy'],
        });
    }
    /**
     * Get all leads (paginated)
     */
    async getAllLeads(skip = 0, take = 10) {
        const [data, total] = await this.leadEnquiryRepo.findAndCount({
            skip,
            take,
            relations: ['contacts', 'addresses', 'createdBy'],
            order: { createdAt: 'DESC' },
        });
        return { data, total };
    }
    /**
     * Get leads by status
     */
    async getLeadsByStatus(status, skip = 0, take = 10) {
        const [data, total] = await this.leadEnquiryRepo.findAndCount({
            where: { leadStatus: status },
            skip,
            take,
            relations: ['contacts', 'addresses', 'createdBy'],
            order: { createdAt: 'DESC' },
        });
        return { data, total };
    }
    /**
     * Update lead enquiry
     */
    async updateLead(id, dto, updatedById) {
        const { contacts, addresses, ...updateData } = dto;
        await this.leadEnquiryRepo.update(id, {
            ...updateData,
            updatedById,
        });
        // Update contacts if provided
        if (contacts && contacts.length > 0) {
            await this.leadContactRepo.delete({ leadId: Number(id) });
            const contactEntities = contacts.map((contact) => this.leadContactRepo.create({
                ...contact,
                leadId: Number(id),
            }));
            await this.leadContactRepo.save(contactEntities);
        }
        // Update addresses if provided
        if (addresses && addresses.length > 0) {
            await this.leadAddressRepo.delete({ leadId: Number(id) });
            const addressEntities = addresses.map((address) => {
                const { addressType, ...rest } = address;
                return this.leadAddressRepo.create({
                    ...rest,
                    addressType: addressType,
                    leadId: Number(id),
                });
            });
            await this.leadAddressRepo.save(addressEntities);
        }
        return this.getLeadById(id);
    }
    /**
     * Delete lead
     */
    async deleteLead(id) {
        await this.leadEnquiryRepo.delete(Number(id));
    }
    /**
     * Check duplicate company name
     */
    async checkDuplicateCompany(companyName, excludeId) {
        const query = this.leadEnquiryRepo.createQueryBuilder('lead').where('LOWER(lead.companyName) = LOWER(:companyName)', {
            companyName,
        });
        if (excludeId) {
            query.andWhere('lead.id != :excludeId', { excludeId });
        }
        return query.getOne();
    }
};
exports.LeadRepository = LeadRepository;
exports.LeadRepository = LeadRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(lead_enquiry_entity_1.LeadEnquiry)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(lead_contact_entity_1.LeadContact)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(lead_address_entity_1.LeadAddress)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], LeadRepository);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(13);
const userContants_1 = __webpack_require__(16);
const permissionManager_entity_1 = __webpack_require__(20);
const basicUtils_1 = __webpack_require__(78);
let UserRepository = class UserRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    mapObject(obj) {
        let resObj = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (key === 'id' && obj[key] !== undefined && obj[key] !== null)
                    resObj[key] = obj[key].toString();
                else if (key === 'user_group' && obj[key] !== undefined && obj[key] !== null)
                    resObj[key] = obj[key];
                else if (obj[key] !== undefined && obj[key] !== null)
                    resObj[key] = obj[key];
            }
        }
        return resObj;
    }
    async checkUserEmailExist(email) {
        try {
            const count = await this.userRepository.count({ where: { email } });
            return count > 0;
        }
        catch (error) {
            throw error;
        }
    }
    async insertDefaultUser(input) {
        try {
            const { email, verifyStatus, password, status, user_group, loginSource, name } = input;
            const insertVal = { email, verifyStatus, password, status, user_group, loginSource, name };
            const user = await this.userRepository.save(this.userRepository.create(insertVal));
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async findOneByEmail(email) {
        try {
            return await this.userRepository.findOne({
                where: { email }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async insertUser(input) {
        try {
            const { phoneNo, status, verifyStatus, permission, roleName, user_group, email, password, name } = input;
            const insertVal = { phoneNo, status, verifyStatus, permission, roleName, user_group, email, password, name };
            const fields = this.mapObject(insertVal);
            if (permission) {
                let pRef = new permissionManager_entity_1.PermissionManager();
                pRef.id = permission;
                fields.permission = pRef;
            }
            const user = await this.userRepository.save(this.userRepository.create(fields));
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async addOrUpdateUser(input) {
        try {
            const { phoneNo, avatar, status, verifyStatus, id, permission, roleName, user_group, email, name, addedBy, password, loginSource } = input;
            const insertVal = { phoneNo, status, avatar, verifyStatus, permission, roleName, user_group, email, name, password, loginSource };
            const fields = this.mapObject(insertVal);
            if (permission) {
                let pRef = new permissionManager_entity_1.PermissionManager();
                pRef.id = permission;
                fields.permission = pRef;
            }
            if (addedBy) {
                let addedByRef = new user_entity_1.User();
                addedByRef.id = addedBy;
                fields.addedBy = addedByRef;
            }
            let userId = null;
            if (id) {
                const r = await this.userRepository.update({ id }, fields);
                if (r.affected && r.affected > 0) {
                    userId = id;
                }
            }
            else {
                const user = await this.userRepository.insert(this.userRepository.create(fields));
                const userJson = JSON.parse(JSON.stringify(user));
                if (userJson.identifiers && userJson.identifiers.length > 0 && userJson.identifiers[0].id) {
                    userId = userJson.identifiers[0].id;
                }
            }
            return userId;
        }
        catch (error) {
            throw error;
        }
    }
    async updateRoleAndPermission(input) {
        try {
            const { permission, roleName, userId } = input;
            let permissionRef = new permissionManager_entity_1.PermissionManager();
            permissionRef.id = permission;
            await this.userRepository.update(userId, {
                permission: permissionRef,
                roleName,
            });
            return;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserIdByPhoneNo(phoneNo) {
        try {
            const doc = await this.userRepository.findOne({ where: { phoneNo }, select: { id: true, status: true, verifyStatus: true, user_group: true } });
            return doc || null;
        }
        catch (error) {
            throw error;
        }
    }
    async updateUserStatus(input) {
        try {
            const { userId, status, verifyStatus, password } = input;
            const updateFields = this.mapObject({ status, verifyStatus, password });
            await this.userRepository.update(userId.toString(), updateFields);
            return;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserByEmail(email) {
        try {
            const selectFields = {
                id: true,
                name: true,
                email: true,
                phoneNo: true,
                verifyStatus: true,
                password: true,
                avatar: true,
                roleName: true,
                user_group: true,
                status: true,
                createdAt: true,
            };
            const user = await this.userRepository.findOne({
                where: { email },
                select: selectFields,
                relations: ['modules', 'departments', 'teams']
            });
            return user || null;
        }
        catch (error) {
            throw error;
        }
    }
    async getUnverifiedUserByPhone(phoneNo, getPassword = false) {
        try {
            const selectFields = {
                name: true,
                email: true,
                phoneNo: true,
                verifyStatus: true,
                password: true,
                avatar: true,
                roleName: true,
                user_group: true,
                status: true,
                id: true,
            };
            const user = await this.userRepository.findOne({ where: { phoneNo }, select: selectFields, loadRelationIds: true });
            if (user && user.password && !getPassword) {
                user.password = '';
            }
            return user || null;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserByUserId(userId, showPassword = false) {
        try {
            const selectFields = {
                id: true,
                name: true,
                email: true,
                phoneNo: true,
                addedBy: true,
                avatar: true,
                roleName: true,
                user_group: true,
                status: true,
                createdAt: true,
            };
            if (showPassword)
                selectFields.password = true;
            const user = await this.userRepository.findOne({ where: { id: userId, verifyStatus: userContants_1.USER_VERIFY_STATUS.VERIFIED }, loadRelationIds: true });
            if (!user) {
                return null;
            }
            let result = {};
            for (const key in selectFields) {
                if (Object.prototype.hasOwnProperty.call(selectFields, key)) {
                    if (user[key])
                        result[key] = user[key];
                }
            }
            return result || null;
        }
        catch (error) {
            console.log("Error get userById db", error);
            throw error;
        }
    }
    async getUserByGroup(user_group) {
        try {
            const selectFields = {
                id: true,
                name: true,
                email: true,
                phoneNo: true,
                avatar: true,
                roleName: true,
                user_group: true,
                status: true
            };
            const user = await this.userRepository.find({ where: { user_group, verifyStatus: userContants_1.USER_VERIFY_STATUS.VERIFIED }, select: selectFields });
            return user || null;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserByRoleAndGroup(user_group, roleName) {
        try {
            const selectFields = {
                id: true,
                name: true,
                email: true,
                phoneNo: true,
                avatar: true,
                roleName: true,
                user_group: true,
            };
            const user = await this.userRepository.findOne({ where: { user_group, verifyStatus: userContants_1.USER_VERIFY_STATUS.VERIFIED, roleName: roleName }, select: selectFields });
            return user || null;
        }
        catch (error) {
            throw error;
        }
    }
    async updateUserAccountStatus(input) {
        try {
            const { status, userId } = input;
            await this.userRepository.update(userId.toString(), { status });
            return;
        }
        catch (error) {
            throw error;
        }
    }
    async getUsersByFilter(input) {
        try {
            const { user_group, page, pageSize, status, search } = input;
            const { currentPage, limit, offset } = (0, basicUtils_1.paginate)(page, pageSize);
            const selectFields = {
                id: true,
                name: true,
                email: true,
                phoneNo: true,
                avatar: true,
                roleName: true,
                user_group: true,
                status: true,
            };
            const fields = this.mapObject({ user_group, status });
            fields.verifyStatus = userContants_1.USER_VERIFY_STATUS.VERIFIED;
            let searches = [];
            if (search) {
                searches.push({ email: (0, typeorm_2.ILike)(`${search}%`) });
                searches.push({ name: (0, typeorm_2.ILike)(`${search}%`) });
                searches.push({ phoneNo: (0, typeorm_2.ILike)(`${search}%`) });
            }
            const queryBuilder = this.userRepository
                .createQueryBuilder('user')
                .select([])
                .where(fields)
                .andWhere(searches)
                .skip(offset)
                .take(limit);
            queryBuilder.addOrderBy('user.createdAt', `DESC`);
            for (const key in selectFields) {
                if (selectFields[key]) {
                    queryBuilder.addSelect(`user.${key}`);
                }
            }
            const [userList, count] = await queryBuilder.getManyAndCount();
            const totalPages = Math.ceil(count / limit);
            const paginateObject = {
                docs: userList,
                hasNextPage: input.page < totalPages,
                hasPrevPage: input.page > 1,
                limit: limit,
                page: currentPage,
                totalDocs: count,
                totalPages,
            };
            return paginateObject;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserCounts(input) {
        try {
            const { groups } = input;
            const groupIN = groups.map(() => `?`).join(', ');
            let whereF = `verifyStatus = 'VERIFIED'`;
            if (groupIN) {
                whereF += ` and user_group IN(${groupIN})`;
            }
            const query = `SELECT count(id) AS userCount, user_group FROM user 
            WHERE ${whereF}
            GROUP BY user_group;`;
            const result = await this.userRepository.query(query, groups);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserRepository);


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isValidVIN = exports.getOTP = exports.getRandomInt = exports.validPhoneNo = exports.paginate = exports.removeSpecialCharacter = exports.isValidEmail = exports.validateEmail = exports.isNumber = exports.getRandomNumber = exports.getRandomString = void 0;
const tslib_1 = __webpack_require__(1);
const mobile_1 = tslib_1.__importDefault(__webpack_require__(79));
function getRandomString(length, withSpecialChar, isUpperCaseOnly) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charset = "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz";
    let charactersLength = withSpecialChar ? charset.length : characters.length;
    for (let i = 0; i < length; i++) {
        if (withSpecialChar) {
            result += charset.charAt(Math.floor(Math.random() * charactersLength));
        }
        else {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }
    if (isUpperCaseOnly) {
        return result.toUpperCase();
    }
    return result;
}
exports.getRandomString = getRandomString;
function getRandomNumber(length) {
    let result = '';
    let numbers = '0123456789';
    let numbersLength = numbers.length;
    for (let i = 0; i < length; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    return result;
}
exports.getRandomNumber = getRandomNumber;
function isNumber(str) {
    return /^\d+$/.test(str);
}
exports.isNumber = isNumber;
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
};
exports.validateEmail = validateEmail;
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
exports.isValidEmail = isValidEmail;
// Utility function to provide replaceAll functionality for older TypeScript targets
function replaceAllPolyfill(str, search, replacement) {
    if (typeof search === 'string') {
        return str.split(search).join(replacement);
    }
    return str.replace(search, replacement);
}
function removeSpecialCharacter(str) {
    const rgx = /[^a-zA-Z\d-._]+|\.(?![a-zA-Z\d]+\b)/g;
    return replaceAllPolyfill(str, rgx, '');
}
exports.removeSpecialCharacter = removeSpecialCharacter;
function paginate(page, pageSize) {
    const currentPage = (page && page > 0) ? page : 1;
    pageSize = (pageSize && pageSize > 0) ? pageSize : 20;
    const offset = (pageSize * currentPage) - pageSize;
    const limit = pageSize;
    return {
        offset,
        limit,
        currentPage
    };
}
exports.paginate = paginate;
;
function validPhoneNo(phoneNo) {
    if (!phoneNo) {
        return false;
    }
    let parseNo = (0, mobile_1.default)(phoneNo);
    return (parseNo?.isPossible());
}
exports.validPhoneNo = validPhoneNo;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomInt = getRandomInt;
function getOTP() {
    return `${Math.floor(100000 + Math.random() * 900000)}`;
}
exports.getOTP = getOTP;
function isValidVIN(vin) {
    return /^[A-HJ-NPR-Z\d]{17}$/i.test(vin);
}
exports.isValidVIN = isValidVIN;


/***/ }),
/* 79 */
/***/ ((module) => {

module.exports = require("libphonenumber-js/mobile");

/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionManagerRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const permissionManager_entity_1 = __webpack_require__(20);
const user_entity_1 = __webpack_require__(13);
let PermissionManagerRepository = class PermissionManagerRepository {
    constructor(permissionRepository, userRepository) {
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }
    async addOrUpdatebulkPermission(input) {
        try {
            for (const item of input) {
                const exists = await this.permissionRepository.findOne({ where: { roleName: item.roleName, user_group: item.user_group } });
                if (exists) {
                    await this.permissionRepository.update({ roleName: item.roleName, user_group: item.user_group }, item);
                }
                else {
                    await this.permissionRepository.save(this.permissionRepository.create(item));
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async addOrUpdatePermission(input) {
        try {
            const { permissions, roleName, user_group, createdBy } = input;
            const user = await this.userRepository.findOne({ where: { id: createdBy } });
            const updateVal = { createdBy: user, roleName, user_group, permissions };
            await this.permissionRepository.save(this.permissionRepository.create(updateVal));
        }
        catch (error) {
            throw error;
        }
    }
    async getPermissionByRoleName(input) {
        try {
            const { roleName, createdBy, user_group, id } = input;
            const query = {};
            if (roleName)
                query.roleName = roleName;
            if (createdBy)
                query.createdBy = createdBy;
            if (user_group)
                query.user_group = user_group;
            if (id)
                query.id = id;
            const permission = await this.permissionRepository.findOne({ where: query });
            return permission || null;
        }
        catch (error) {
            throw error;
        }
    }
    async getPermissionByRoleNameAndGroup(input) {
        try {
            const { roleName, user_group } = input;
            const filters = {};
            if (roleName)
                filters.roleName = roleName;
            if (user_group)
                filters.user_group = user_group;
            if (Object.values(filters).length === 0) {
                return null;
            }
            const permission = await this.permissionRepository.findOne({ where: { roleName, user_group } });
            return permission || null;
        }
        catch (error) {
            throw error;
        }
    }
    async getPermissionById(id) {
        try {
            const permission = await this.permissionRepository.findOne({ where: { id } });
            return permission || null;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.PermissionManagerRepository = PermissionManagerRepository;
exports.PermissionManagerRepository = PermissionManagerRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(permissionManager_entity_1.PermissionManager)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], PermissionManagerRepository);


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginSessionRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const loginSession_entity_1 = __webpack_require__(25);
const user_entity_1 = __webpack_require__(13);
const userContants_1 = __webpack_require__(16);
let LoginSessionRepository = class LoginSessionRepository {
    constructor(sessionRepository, userRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
    }
    async insertLoginSession(input) {
        try {
            const { loginStatus, refreshToken, refreshTokenExpiry, userId, loginIdentity, loginBy, fcmToken, deviceType } = input;
            const user = await this.userRepository.findOne({ where: { id: userId } });
            const newSession = this.sessionRepository.create({
                loginStatus,
                refreshToken,
                refreshTokenExpiry,
                user,
                loginIdentity,
                loginBy,
                fcmToken,
                deviceType
            });
            const res = await this.sessionRepository.save(newSession);
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async getLoginSession(sessionId) {
        try {
            const session = await this.sessionRepository.findOne({ where: { id: sessionId } });
            return session || null;
        }
        catch (error) {
            throw error;
        }
    }
    async logoutCurrentSession(sessionId) {
        try {
            // await this.sessionRepository.update(sessionId, { loginStatus: SESSION_STATUS.LOGGED_OUT , fcmToken: null });
            await this.sessionRepository.delete(sessionId);
        }
        catch (error) {
            throw error;
        }
    }
    async logoutAllSessionDb(userId) {
        try {
            // await this.sessionRepository.update({ user: { id: userId } }, { loginStatus: SESSION_STATUS.LOGGED_OUT });
            await this.sessionRepository.delete({ user: { id: userId } });
        }
        catch (error) {
            throw error;
        }
    }
    async logoutAllEmailSessionDb(userId, email) {
        try {
            // await this.sessionRepository.update({ user: { id: userId }, loginBy: LOGIN_BY.EMAIL, loginIdentity: email }, { loginStatus: SESSION_STATUS.LOGGED_OUT });
            await this.sessionRepository.delete({ user: { id: userId }, loginBy: userContants_1.LOGIN_BY.EMAIL, loginIdentity: email });
        }
        catch (error) {
            throw error;
        }
    }
    async logoutAllPhoneSessionDb(userId, phoneNo) {
        try {
            await this.sessionRepository.update({ user: { id: userId }, loginBy: userContants_1.LOGIN_BY.PHONE, loginIdentity: phoneNo }, { loginStatus: userContants_1.SESSION_STATUS.LOGGED_OUT });
        }
        catch (error) {
            throw error;
        }
    }
    async getLoginSessionByRefreshToken(refreshToken, sessionId) {
        try {
            const session = await this.sessionRepository.findOne({ where: { refreshToken, id: sessionId } });
            return session || null;
        }
        catch (error) {
            throw error;
        }
    }
    async checkLoginSession(sessionId) {
        let success = false;
        if (!sessionId) {
            return true;
        }
        const session = await this.getLoginSession(sessionId);
        if (session && session.loginStatus == userContants_1.SESSION_STATUS.LOGGED_IN) {
            success = true;
        }
        return success;
    }
    async blockAllSessionDb(userId) {
        try {
            await this.sessionRepository.update({ user: { id: userId } }, { loginStatus: userContants_1.SESSION_STATUS.BLOCKED });
        }
        catch (error) {
            throw error;
        }
    }
    async getAllSessionByUserId(userId) {
        try {
            const session = await this.sessionRepository.find({ where: { user: { id: userId }, loginStatus: userContants_1.SESSION_STATUS.LOGGED_IN } });
            return session;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.LoginSessionRepository = LoginSessionRepository;
exports.LoginSessionRepository = LoginSessionRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(loginSession_entity_1.LoginSession)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], LoginSessionRepository);


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadServiceRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const lead_service_entity_1 = __webpack_require__(40);
let LeadServiceRepository = class LeadServiceRepository {
    constructor(leadServiceRepository) {
        this.leadServiceRepository = leadServiceRepository;
    }
    async create(leadService) {
        try {
            const newLeadService = this.leadServiceRepository.create(leadService);
            return await this.leadServiceRepository.save(newLeadService);
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            return await this.leadServiceRepository.find({
                relations: ['lead', 'service', 'department', 'owner']
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            return await this.leadServiceRepository.findOne({
                where: { id },
                relations: ['lead', 'service', 'department', 'owner']
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findByLeadId(leadId) {
        try {
            return await this.leadServiceRepository.find({
                where: { lead: { id: leadId } },
                relations: ['service', 'department', 'owner']
            });
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, leadService) {
        try {
            await this.leadServiceRepository.update(id, leadService);
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.leadServiceRepository.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.LeadServiceRepository = LeadServiceRepository;
exports.LeadServiceRepository = LeadServiceRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(lead_service_entity_1.LeadService)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], LeadServiceRepository);


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const proposal_entity_1 = __webpack_require__(41);
let ProposalRepository = class ProposalRepository {
    constructor(repo) {
        this.repo = repo;
    }
    // Repository for Proposals
    async create(proposal) {
        const newProposal = this.repo.create(proposal);
        return this.repo.save(newProposal);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async update(id, proposal) {
        await this.repo.update(id, proposal);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.ProposalRepository = ProposalRepository;
exports.ProposalRepository = ProposalRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(proposal_entity_1.Proposal)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProposalRepository);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalItemRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const proposal_item_entity_1 = __webpack_require__(42);
// Repository for Proposal Items
let ProposalItemRepository = class ProposalItemRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async create(item) {
        const newItem = this.repo.create(item);
        return this.repo.save(newItem);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async update(id, item) {
        await this.repo.update(id, item);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.ProposalItemRepository = ProposalItemRepository;
exports.ProposalItemRepository = ProposalItemRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(proposal_item_entity_1.ProposalItem)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProposalItemRepository);
// Repository for Proposal Items


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalPaymentTermRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const proposal_payment_term_entity_1 = __webpack_require__(43);
let ProposalPaymentTermRepository = class ProposalPaymentTermRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async create(term) {
        const newTerm = this.repo.create(term);
        return this.repo.save(newTerm);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async update(id, term) {
        await this.repo.update(id, term);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.ProposalPaymentTermRepository = ProposalPaymentTermRepository;
exports.ProposalPaymentTermRepository = ProposalPaymentTermRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(proposal_payment_term_entity_1.ProposalPaymentTerm)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProposalPaymentTermRepository);


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalAcceptanceRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const proposal_acceptance_entity_1 = __webpack_require__(66);
let ProposalAcceptanceRepository = class ProposalAcceptanceRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async create(acceptance) {
        const newAcceptance = this.repo.create(acceptance);
        return this.repo.save(newAcceptance);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async update(id, acceptance) {
        await this.repo.update(id, acceptance);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.ProposalAcceptanceRepository = ProposalAcceptanceRepository;
exports.ProposalAcceptanceRepository = ProposalAcceptanceRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(proposal_acceptance_entity_1.ProposalAcceptance)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProposalAcceptanceRepository);


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const project_entity_1 = __webpack_require__(67);
let ProjectRepository = class ProjectRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async create(project) {
        const newProject = this.repo.create(project);
        return this.repo.save(newProject);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async update(id, project) {
        await this.repo.update(id, project);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.ProjectRepository = ProjectRepository;
exports.ProjectRepository = ProjectRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProjectRepository);


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IntercertPartnerUserRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const intercert_partner_user_entity_1 = __webpack_require__(71);
let IntercertPartnerUserRepository = class IntercertPartnerUserRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async create(user) {
        const newUser = this.repo.create(user);
        return this.repo.save(newUser);
    }
    async findAll(options) {
        return this.repo.find(options);
    }
    async findAndCount(options) {
        return this.repo.findAndCount(options);
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async findOneByEmail(email) {
        return this.repo.findOne({ where: { email } });
    }
    async preload(user) {
        return this.repo.preload(user);
    }
    async save(user) {
        return this.repo.save(user);
    }
    async update(id, user) {
        await this.repo.update(id, user);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.IntercertPartnerUserRepository = IntercertPartnerUserRepository;
exports.IntercertPartnerUserRepository = IntercertPartnerUserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(intercert_partner_user_entity_1.IntercertPartnerUser)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], IntercertPartnerUserRepository);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseHandlerModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const response_handler_service_1 = __webpack_require__(90);
let ResponseHandlerModule = class ResponseHandlerModule {
};
exports.ResponseHandlerModule = ResponseHandlerModule;
exports.ResponseHandlerModule = ResponseHandlerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [response_handler_service_1.ResponseHandlerService],
        exports: [response_handler_service_1.ResponseHandlerService]
    })
], ResponseHandlerModule);


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseHandlerService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const commonConstants_1 = __webpack_require__(19);
let ResponseHandlerService = class ResponseHandlerService {
    sendSuccessResponse(res, response) {
        res.status(200).json(response);
    }
    sendErrorResponse(res, errorBody) {
        // normalize Error instances or plain objects
        if (errorBody instanceof common_1.HttpException) {
            const status = errorBody.getStatus();
            const response = errorBody.getResponse();
            errorBody = {
                statusCode: status,
                message: typeof response === 'string' ? response : response.message || errorBody.message,
                extraError: errorBody.stack,
            };
        }
        else if (errorBody instanceof Error) {
            console.error('Error Response (Error object):', errorBody.message, errorBody.stack);
            errorBody = {
                statusCode: commonConstants_1.ERROR_CODES.UNEXPECTED_ERROR,
                message: errorBody.message || commonConstants_1.ErrorMessages.UNEXPECTED_ERROR,
                extraError: errorBody.stack,
            };
        }
        else {
            console.error('Error Response: ', JSON.stringify(errorBody));
        }
        if (!errorBody.statusCode || !errorBody.message) {
            errorBody.statusCode = commonConstants_1.ERROR_CODES.UNEXPECTED_ERROR;
            errorBody.message = commonConstants_1.ErrorMessages.UNEXPECTED_ERROR;
        }
        const body = {
            statusCode: errorBody.statusCode,
            message: errorBody.message,
            data: undefined,
            extraError: errorBody.extraError,
            success: false
        };
        res.status(errorBody.statusCode).json(body);
    }
};
exports.ResponseHandlerService = ResponseHandlerService;
exports.ResponseHandlerService = ResponseHandlerService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ResponseHandlerService);


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_service_1 = __webpack_require__(92);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const proposal_entity_1 = __webpack_require__(41);
const proposal_item_entity_1 = __webpack_require__(42);
const proposal_payment_term_entity_1 = __webpack_require__(43);
const proposal_file_entity_1 = __webpack_require__(44);
const proposal_service_1 = __webpack_require__(94);
const proposal_controller_1 = __webpack_require__(106);
const proposal_report_service_1 = __webpack_require__(95);
const lead_entity_1 = __webpack_require__(39);
const lead_service_entity_1 = __webpack_require__(40);
const customer_entity_1 = __webpack_require__(36);
const customerAddress_entity_1 = __webpack_require__(37);
const customerContact_entity_1 = __webpack_require__(38);
const user_entity_1 = __webpack_require__(13);
const database_module_1 = __webpack_require__(5);
const config_module_1 = __webpack_require__(10);
const response_handler_module_1 = __webpack_require__(89);
const jwt_service_1 = __webpack_require__(112);
const authMiddleware_1 = __webpack_require__(111);
const authMiddleware_guard_1 = __webpack_require__(110);
const pdf_template_service_1 = __webpack_require__(100);
const s3_module_1 = __webpack_require__(119);
let ProposalModule = class ProposalModule {
};
exports.ProposalModule = ProposalModule;
exports.ProposalModule = ProposalModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            config_module_1.ConfigModule,
            response_handler_module_1.ResponseHandlerModule,
            s3_module_1.S3Module,
            typeorm_1.TypeOrmModule.forFeature([
                proposal_entity_1.Proposal,
                proposal_item_entity_1.ProposalItem,
                proposal_payment_term_entity_1.ProposalPaymentTerm,
                proposal_file_entity_1.ProposalFile,
                lead_entity_1.Lead,
                lead_service_entity_1.LeadService,
                customer_entity_1.Customer,
                customerAddress_entity_1.CustomerAddress,
                customerContact_entity_1.CustomerContact,
                user_entity_1.User
            ])
        ],
        providers: [
            proposal_service_1.ProposalService,
            proposal_report_service_1.ProposalReportService,
            pdf_template_service_1.PdfTemplateService,
            jwt_service_1.JwtService,
            authMiddleware_1.TokenValidationMiddleware,
            authMiddleware_guard_1.TokenValidationGuard,
            authMiddleware_guard_1.CheckIfAdminGuard,
            authMiddleware_1.checkIfAdmin,
        ],
        controllers: [proposal_controller_1.ProposalController],
        exports: [proposal_service_1.ProposalService]
    })
], ProposalModule);


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const proposal_entity_1 = __webpack_require__(41);
const proposal_item_entity_1 = __webpack_require__(42);
const proposal_payment_term_entity_1 = __webpack_require__(43);
//import { CreateProposalWithServicesDto } from '../../../../../libs/dtos/sales/create-proposal-with-services.dto';
const lead_entity_1 = __webpack_require__(39);
const lead_service_entity_1 = __webpack_require__(40);
//import PDFDocument from 'pdfkit';
const proposal_file_entity_1 = __webpack_require__(44);
const proposal_acceptance_entity_1 = __webpack_require__(66);
const proposal_report_service_1 = __webpack_require__(95);
const pdf_template_service_1 = __webpack_require__(100);
const s3File_service_1 = __webpack_require__(103);
const path = tslib_1.__importStar(__webpack_require__(97));
const fs = tslib_1.__importStar(__webpack_require__(98));
const serviceConstants_1 = __webpack_require__(35);
//import * as os from 'os';
let ProposalService = class ProposalService {
    constructor(proposalRepo, leadRepo, proposalFileRepo, dataSource, proposalReportService, pdfTemplateService, s3Service) {
        this.proposalRepo = proposalRepo;
        this.leadRepo = leadRepo;
        this.proposalFileRepo = proposalFileRepo;
        this.dataSource = dataSource;
        this.proposalReportService = proposalReportService;
        this.pdfTemplateService = pdfTemplateService;
        this.s3Service = s3Service;
    }
    async buildProposalDraft(dto, lead) {
        // Ensure the lead record is available (with service assignments) for draft generation.
        if (!lead) {
            const isNumeric = !isNaN(Number(dto.leadId));
            const where = isNumeric ? { id: Number(dto.leadId) } : { enquiryId: dto.leadId };
            lead = await this.leadRepo.findOne({
                where,
                relations: ['customer', 'customer.contacts', 'customer.addresses', 'leadServices', 'leadServices.service'],
            });
        }
        if (!lead) {
            throw new common_1.NotFoundException('Lead not found');
        }
        // Ensure services are loaded; in some cases the relation is not populated even when the lead has services.
        let leadServices = lead.leadServices;
        if (!leadServices || leadServices.length === 0) {
            leadServices = await this.dataSource.getRepository(lead_service_entity_1.LeadService).find({
                where: { leadId: lead.id },
                relations: ['service'],
            });
        }
        const proposalDate = dto.proposalDate ? new Date(dto.proposalDate) : new Date();
        const itemsDto = dto.items;
        if (!itemsDto || itemsDto.length === 0) {
            throw new common_1.BadRequestException('Items are required');
        }
        const subject = (dto.subject?.trim() ||
            `Proposal for ${itemsDto.map(i => i.serviceName || '').filter(Boolean).join(', ')}` ||
            'Proposal');
        const submittedBy = dto.submittedBy ?? proposal_entity_1.SUBMITTED_BY.INTERCERT_NOIDA;
        const itemEntities = [];
        let subTotal = 0;
        let totalDiscount = 0;
        let totalTaxAmount = 0;
        for (const itemDto of itemsDto) {
            const leadService = leadServices?.find((ls) => ls.id === itemDto.leadServiceId);
            if (!leadService) {
                const availableIds = leadServices?.map(ls => ls.id) || [];
                throw new common_1.BadRequestException(`Service with ID ${itemDto.leadServiceId} is not assigned to this lead (Lead ID: ${lead.id}). ` +
                    `Assigned Service IDs for this lead are: ${availableIds.join(', ')}`);
            }
            const item = new proposal_item_entity_1.ProposalItem();
            item.leadServiceId = itemDto.leadServiceId;
            item.serviceName = itemDto.serviceName || leadService?.service?.name || '';
            item.serviceType = itemDto.serviceType || leadService?.service?.category || '';
            item.description = itemDto.description || (leadService?.deliverables ? leadService.deliverables.join(', ') : leadService?.service?.description || '');
            item.startDate = itemDto.startDate || leadService?.startDate;
            item.endDate = itemDto.endDate || leadService?.endDate;
            item.amount = itemDto.amount;
            item.currency = itemDto.currency;
            item.discount = itemDto.discount ?? 0;
            item.taxPercentage = itemDto.taxPercentage ?? 0;
            const discountAmt = (item.amount * item.discount) / 100;
            const taxableAmt = item.amount - discountAmt;
            const taxAmt = (taxableAmt * item.taxPercentage) / 100;
            item.discountAmount = discountAmt;
            item.taxableAmount = taxableAmt;
            item.taxAmount = taxAmt;
            item.netAmount = taxableAmt + taxAmt;
            subTotal += item.amount;
            totalDiscount += discountAmt;
            totalTaxAmount += taxAmt;
            itemEntities.push(item);
        }
        const grandTotal = subTotal - totalDiscount + totalTaxAmount;
        // Use the assignmentGroupId from the DTO if provided, otherwise resolve it from services
        const assignmentGroupId = dto.assignmentGroupId || this.resolveAssignmentGroupIdFromLeadServices(leadServices, itemsDto.map((item) => item.leadServiceId));
        const draft = {
            leadId: lead.id,
            proposalDate,
            validUntil: dto.validUntil,
            submittedBy,
            division: dto.division || this.deriveDivisionFromLeadServices(itemEntities),
            subject,
            introduction: dto.introduction,
            termsAndConditions: dto.termsAndConditions,
            notes: dto.notes,
            currency: itemEntities.length > 0 ? itemEntities[0].currency : 'INR',
            subTotal,
            totalDiscount,
            totalTaxAmount,
            grandTotal,
            assignmentGroupId,
        };
        return { draft, items: itemEntities, totals: { subTotal, totalDiscount, totalTaxAmount, grandTotal } };
    }
    async createProposal(dto) {
        return this.dataSource.transaction(async (manager) => {
            const isNumeric = !isNaN(Number(dto.leadId));
            const where = isNumeric ? { id: Number(dto.leadId) } : { enquiryId: dto.leadId };
            const lead = await manager.findOne(lead_entity_1.Lead, { where });
            if (!lead)
                throw new common_1.NotFoundException('Lead not found');
            // --- Fresh Proposal Creation ---
            // We always create a new proposal record on POST. This allows users to generate 
            // separate proposals for different services in the same batch at different times.
            // If a user wants to add services to an existing draft, they should use the PATCH endpoint.
            const count = await manager.count(proposal_entity_1.Proposal, { where: { leadId: lead.id } });
            const seq = String(count + 1).padStart(2, '0');
            const reference = `PROP/${lead.enquiryId || 'UNKNOWN'}/${seq}`;
            const { draft, items } = await this.buildProposalDraft(dto, lead);
            const proposal = manager.create(proposal_entity_1.Proposal, {
                ...draft,
                leadId: lead.id,
                proposalReference: reference,
                version: 1,
                status: proposal_entity_1.PROPOSAL_STATUS.DRAFT,
                items,
            });
            const saved = await manager.save(proposal_entity_1.Proposal, proposal);
            for (const item of saved.items) {
                const itemDto = dto.items.find(i => i.leadServiceId === item.leadServiceId);
                if (itemDto && itemDto.paymentTerms && itemDto.paymentTerms.length > 0) {
                    const totalPct = itemDto.paymentTerms.reduce((s, t) => s + t.percentage, 0);
                    if (Math.abs(totalPct - 100) > 0.01) {
                        throw new common_1.BadRequestException(`Payment term percentages for service ${item.serviceName} must sum to 100`);
                    }
                    const terms = itemDto.paymentTerms.map(t => manager.create(proposal_payment_term_entity_1.ProposalPaymentTerm, {
                        proposalId: saved.id,
                        proposalItemId: item.id,
                        milestoneName: t.milestoneName,
                        percentage: t.percentage,
                        triggerEvent: t.triggerEvent,
                        amount: (item.netAmount * t.percentage) / 100
                    }));
                    await manager.save(proposal_payment_term_entity_1.ProposalPaymentTerm, terms);
                }
            }
            const result = await manager.findOne(proposal_entity_1.Proposal, {
                where: { id: saved.id },
                relations: [
                    'items',
                    'items.leadService',
                    'items.leadService.service',
                    'paymentTerms',
                    'lead',
                    'lead.customer',
                    'lead.customer.contacts',
                    'lead.customer.addresses'
                ]
            });
            return result ?? saved;
        });
    }
    getTemplateDataForProposal(proposal) {
        return this.prepareTemplateData(proposal);
    }
    async getPdfMeta(id) {
        const proposal = await this.getProposal(id);
        const templateData = this.getTemplateDataForProposal(proposal);
        return {
            templateData,
            downloadUrl: `/proposals/${id}/pdf`,
        };
    }
    async getTemplateTagsForProposal(id) {
        const proposal = await this.getProposal(id);
        const templatePath = this.getTemplatePath(proposal);
        const tags = await this.pdfTemplateService.extractDocxTemplateTags(templatePath);
        return {
            templatePath,
            tags,
        };
    }
    async previewProposal(dto) {
        const { draft, items, totals } = await this.buildProposalDraft(dto);
        return { draft, items, totals };
    }
    async createProposalWithPdf(dto) {
        const proposal = await this.createProposal(dto);
        const pdfBuffer = await this.generatePdfFromTemplate(proposal.id);
        // Upload to S3 with structured path
        const year = new Date().getFullYear().toString();
        const companyName = proposal.lead?.customer?.name || 'Unknown_Company';
        const fileName = `${proposal.proposalReference.replace(/\//g, '_')}.pdf`;
        const uploadResult = await this.s3Service.uploadProposalPdf(pdfBuffer, fileName, year, companyName);
        // Create proposal file record
        const proposalFile = this.proposalFileRepo.create({
            proposalId: proposal.id,
            fileUrl: uploadResult.viewUrl,
            fileName: fileName
        });
        await this.proposalFileRepo.save(proposalFile);
        return {
            proposal,
            pdfUrl: uploadResult.viewUrl,
            pdfBase64: pdfBuffer.toString('base64'),
        };
    }
    //  async createProposalWithPdf(dto: CreateProposalDto) {
    //   const proposal = await this.createProposal(dto);
    //   const templateData = this.getTemplateDataForProposal(proposal);
    //   const pdfBuffer = await this.generatePdfFromTemplate(proposal.id);
    //   return {
    //     proposal,
    //     templateData,
    //     pdfBase64: pdfBuffer.toString('base64'),
    //   };
    // }
    async createProposalWithPdfBuffer(dto) {
        const proposal = await this.createProposal(dto);
        const pdfBuffer = await this.generatePdfFromTemplate(proposal.id);
        // Upload to S3 with structured path
        const year = new Date().getFullYear().toString();
        const companyName = proposal.lead?.customer?.name || 'Unknown_Company';
        const fileName = `${proposal.proposalReference.replace(/\//g, '_')}.pdf`;
        const uploadResult = await this.s3Service.uploadProposalPdf(pdfBuffer, fileName, year, companyName);
        // Create proposal file record
        const proposalFile = this.proposalFileRepo.create({
            proposalId: proposal.id,
            fileUrl: uploadResult.viewUrl,
            fileName: fileName
        });
        await this.proposalFileRepo.save(proposalFile);
        return { proposal, pdfBuffer };
    }
    // async createProposalWithServices(dto: CreateProposalWithServicesDto): Promise<Proposal> {
    //   // Transform service assignments into proposal items
    //   const lead = await this.leadRepo.findOne({
    //     where: { id: Number(dto.leadId) },
    //     relations: ['leadServices', 'leadServices.service', 'customer', 'customer.contacts', 'customer.addresses']
    //   });
    //   if (!lead) throw new NotFoundException('Lead not found');
    //   const items: CreateProposalItemDto[] = (dto.services || []).map((service) => {
    //     const leadService = lead.leadServices?.find(ls => ls.service?.id === service.serviceId);
    //     if (!leadService) {
    //       throw new BadRequestException(`Service with id ${service.serviceId} is not assigned to the lead`);
    //     }
    //     const description = service.description || (leadService.deliverables ? leadService.deliverables.join(', ') : '');
    //     return {
    //       leadServiceId: leadService.id,
    //       serviceName: leadService.service?.name || '',
    //       serviceType: leadService.service?.category || '',
    //       description,
    //       startDate: leadService.startDate,
    //       endDate: leadService.endDate,
    //       amount: service.amount ?? 0,
    //       currency: 'INR',
    //       discount: 0,
    //       taxPercentage: 0
    //     };
    //   });
    //   const { services: _services, ...baseDto } = dto as any;
    //   return this.createProposal({
    //     ...baseDto,
    //     items,
    //   });
    // }
    async getProposal(id) {
        const proposal = await this.proposalRepo.findOne({
            where: {
                id,
                lead: { isActive: true }
            },
            relations: [
                'items',
                'items.leadService',
                'items.leadService.service',
                'paymentTerms',
                'files',
                'lead',
                'lead.contacts',
                'lead.addresses',
                'lead.customer',
                'lead.customer.contacts',
                'lead.customer.addresses'
            ]
        });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        return proposal;
    }
    async uploadProposalFiles(proposalId, files) {
        const proposal = await this.getProposal(proposalId);
        const companyName = proposal.lead?.customer?.name || 'Unknown_Company';
        const year = new Date().getFullYear().toString();
        const uploadResults = [];
        for (const file of files) {
            const uploadResult = await this.s3Service.uploadProposalPdf(file.buffer, file.originalname, year, companyName);
            // Create a document record for each file
            const doc = this.proposalFileRepo.create({
                proposalId,
                fileUrl: uploadResult.viewUrl,
                fileName: file.originalname
            });
            await this.proposalFileRepo.save(doc);
            uploadResults.push(uploadResult);
        }
        return uploadResults;
    }
    async uploadSignature(file) {
        return this.s3Service.uploadSignature(file.buffer, file.originalname);
    }
    async uploadAuditorFile(file) {
        return this.s3Service.uploadAuditorFile(file.buffer, file.originalname);
    }
    async getProposals(query) {
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        const qb = this.proposalRepo.createQueryBuilder('proposal')
            .leftJoinAndSelect('proposal.lead', 'lead')
            .leftJoinAndSelect('lead.customer', 'customer')
            .leftJoinAndSelect('lead.contacts', 'leadContacts')
            .leftJoinAndSelect('lead.addresses', 'leadAddresses')
            .leftJoinAndSelect('customer.contacts', 'customerContacts')
            .leftJoinAndSelect('customer.addresses', 'customerAddresses')
            .leftJoinAndSelect('proposal.paymentTerms', 'paymentTerms')
            .leftJoinAndSelect('proposal.files', 'files')
            .leftJoinAndSelect('proposal.items', 'items')
            .leftJoinAndSelect('items.leadService', 'leadService')
            .leftJoinAndSelect('leadService.service', 'service')
            .where('lead.isActive = :isActive', { isActive: true })
            .andWhere('proposal.status != :droppedStatus', { droppedStatus: proposal_entity_1.PROPOSAL_STATUS.DROPPED });
        if (query?.leadId) {
            const isNumeric = !isNaN(Number(query.leadId));
            if (isNumeric) {
                qb.andWhere('proposal.leadId = :leadId', { leadId: Number(query.leadId) });
            }
            else {
                qb.andWhere('lead.enquiryId = :enquiryId', { enquiryId: query.leadId });
            }
        }
        if (query?.assignmentGroupId) {
            qb.andWhere('proposal.assignmentGroupId = :assignmentGroupId', { assignmentGroupId: query.assignmentGroupId });
        }
        if (query?.status) {
            qb.andWhere('proposal.status = :status', { status: query.status });
        }
        if (query?.search) {
            const search = `%${query.search}%`;
            qb.andWhere('(proposal.proposalReference LIKE :search OR customer.name LIKE :search OR lead.enquiryId LIKE :search)', { search });
        }
        qb.orderBy('proposal.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async getLeadServiceStatuses(leadId) {
        const isNumeric = !isNaN(Number(leadId));
        const whereLead = isNumeric ? { id: Number(leadId) } : { enquiryId: leadId };
        const lead = await this.leadRepo.findOne({ where: whereLead });
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        const leadServices = await this.dataSource.getRepository(lead_service_entity_1.LeadService).find({
            where: { leadId: lead.id },
            relations: ['service'],
        });
        const proposals = await this.proposalRepo.find({
            where: { leadId: lead.id },
            relations: ['items'],
            order: { id: 'DESC' },
        });
        const closureMap = new Map();
        if (proposals.some(p => p.status === proposal_entity_1.PROPOSAL_STATUS.APPROVED)) {
            const approvedIds = proposals
                .filter(p => p.status === proposal_entity_1.PROPOSAL_STATUS.APPROVED)
                .map(p => p.id);
            const closures = await this.dataSource
                .getRepository(proposal_acceptance_entity_1.ProposalAcceptance)
                .find({ where: { proposalId: (0, typeorm_2.In)(approvedIds) } });
            for (const c of closures) {
                closureMap.set(Number(c.proposalId), Number(c.id));
            }
        }
        const serviceStatusMap = new Map();
        for (const proposal of proposals) {
            for (const item of proposal.items || []) {
                if (!serviceStatusMap.has(item.leadServiceId)) {
                    const closureId = closureMap.get(proposal.id);
                    serviceStatusMap.set(item.leadServiceId, {
                        proposalId: proposal.id,
                        proposalReference: proposal.proposalReference,
                        proposalStatus: proposal.status,
                        closureId,
                    });
                }
            }
        }
        const available = [];
        const proposed = [];
        const closed = [];
        for (const ls of leadServices) {
            const info = serviceStatusMap.get(ls.id);
            if (!info) {
                available.push(ls);
            }
            else if (info.proposalStatus === proposal_entity_1.PROPOSAL_STATUS.APPROVED) {
                closed.push({ ...ls, proposalId: info.proposalId, proposalReference: info.proposalReference, closureId: info.closureId });
            }
            else if (info.proposalStatus !== proposal_entity_1.PROPOSAL_STATUS.DROPPED) {
                proposed.push({ ...ls, proposalId: info.proposalId, proposalReference: info.proposalReference, proposalStatus: info.proposalStatus });
            }
        }
        return { available, proposed, closed };
    }
    async updateProposal(id, dto) {
        return this.dataSource.transaction(async (manager) => {
            const proposal = await manager.findOne(proposal_entity_1.Proposal, {
                where: { id },
                relations: ['items', 'paymentTerms']
            });
            if (!proposal)
                throw new common_1.NotFoundException('Proposal not found');
            // Destructure items and leadId to handle string resolution
            const { items: itemDtos, leadId, ...otherData } = dto;
            // If leadId is provided (as string or number), resolve it to numeric ID
            if (leadId) {
                const isNumeric = !isNaN(Number(leadId));
                const whereLead = isNumeric ? { id: Number(leadId) } : { enquiryId: leadId };
                const lead = await manager.findOne(lead_entity_1.Lead, { where: whereLead });
                if (!lead)
                    throw new common_1.NotFoundException('Lead not found');
                proposal.leadId = lead.id;
            }
            delete otherData.paymentTerms;
            Object.assign(proposal, otherData);
            let hasChanges = Object.keys(otherData).length > 0 || !!leadId;
            if (itemDtos) {
                hasChanges = true;
                // 1. Fetch current items to delete them and their terms explicitly
                const currentItems = await manager.find(proposal_item_entity_1.ProposalItem, { where: { proposalId: id } });
                const currentItemIds = currentItems.map(item => item.id);
                // 2. Clear existing payment terms first to avoid FK constraint issues when deleting items
                if (currentItemIds.length > 0) {
                    await manager.delete(proposal_payment_term_entity_1.ProposalPaymentTerm, { proposalItemId: (0, typeorm_2.In)(currentItemIds) });
                }
                await manager.delete(proposal_payment_term_entity_1.ProposalPaymentTerm, { proposalId: id });
                // 3. Now delete the items
                await manager.delete(proposal_item_entity_1.ProposalItem, { proposalId: id });
                const existingItems = proposal.items || [];
                let subTotal = 0;
                let totalDiscount = 0;
                let totalTaxAmount = 0;
                const savedItems = [];
                for (const itemDto of itemDtos) {
                    const leadService = await manager.findOne(lead_service_entity_1.LeadService, {
                        where: { id: itemDto.leadServiceId, leadId: proposal.leadId },
                        relations: ['service'],
                    });
                    if (!leadService) {
                        throw new common_1.BadRequestException(`Service with ID ${itemDto.leadServiceId} is not assigned to the lead.`);
                    }
                    const existingItem = existingItems.find(ei => ei.leadServiceId === itemDto.leadServiceId);
                    const item = manager.create(proposal_item_entity_1.ProposalItem, {
                        proposalId: proposal.id,
                        leadServiceId: itemDto.leadServiceId,
                        serviceName: itemDto.serviceName || leadService?.service?.name || existingItem?.serviceName || '',
                        serviceType: itemDto.serviceType || leadService?.service?.category || existingItem?.serviceType || '',
                        description: itemDto.description || (leadService?.deliverables ? leadService.deliverables.join(', ') : existingItem?.description || ''),
                        startDate: itemDto.startDate || existingItem?.startDate || leadService?.startDate,
                        endDate: itemDto.endDate || existingItem?.endDate || leadService?.endDate,
                        amount: itemDto.amount,
                        currency: itemDto.currency || existingItem?.currency || 'INR',
                        discount: itemDto.discount !== undefined ? itemDto.discount : (existingItem?.discount || 0),
                        taxPercentage: itemDto.taxPercentage !== undefined ? itemDto.taxPercentage : (existingItem?.taxPercentage || 0)
                    });
                    const discountAmt = (item.amount * item.discount) / 100;
                    const taxableAmt = item.amount - discountAmt;
                    const taxAmt = (taxableAmt * item.taxPercentage) / 100;
                    item.discountAmount = discountAmt;
                    item.taxableAmount = taxableAmt;
                    item.taxAmount = taxAmt;
                    item.netAmount = taxableAmt + taxAmt;
                    const savedItem = await manager.save(proposal_item_entity_1.ProposalItem, item);
                    savedItems.push(savedItem);
                    subTotal += Number(savedItem.amount);
                    totalDiscount += discountAmt;
                    totalTaxAmount += taxAmt;
                }
                for (const item of savedItems) {
                    const itemDto = itemDtos.find(i => i.leadServiceId === item.leadServiceId);
                    if (itemDto && itemDto.paymentTerms && itemDto.paymentTerms.length > 0) {
                        const totalPct = itemDto.paymentTerms.reduce((s, t) => s + t.percentage, 0);
                        if (Math.abs(totalPct - 100) > 0.01) {
                            throw new common_1.BadRequestException(`Payment term percentages sum to 100`);
                        }
                        const terms = itemDto.paymentTerms.map(t => manager.create(proposal_payment_term_entity_1.ProposalPaymentTerm, {
                            proposalId: proposal.id,
                            proposalItemId: item.id,
                            milestoneName: t.milestoneName,
                            percentage: t.percentage,
                            triggerEvent: t.triggerEvent,
                            amount: (item.netAmount * t.percentage) / 100
                        }));
                        await manager.save(proposal_payment_term_entity_1.ProposalPaymentTerm, terms);
                    }
                }
                proposal.subTotal = subTotal;
                proposal.totalDiscount = totalDiscount;
                proposal.totalTaxAmount = totalTaxAmount;
                proposal.grandTotal = subTotal - totalDiscount + totalTaxAmount;
                if (savedItems.length > 0)
                    proposal.currency = savedItems[0].currency;
                proposal.division = this.deriveDivisionFromLeadServices(savedItems);
                // Recalculate assignmentGroupId based on items if not explicitly provided in DTO
                if (!dto.assignmentGroupId) {
                    proposal.assignmentGroupId = await this.resolveProposalAssignmentGroupId(manager, savedItems.map(i => i.leadServiceId));
                }
                delete proposal.items;
                delete proposal.paymentTerms;
            }
            if (hasChanges) {
                proposal.version = (proposal.version || 1) + 1;
            }
            await manager.save(proposal_entity_1.Proposal, proposal);
            return this.getProposal(id);
        });
    }
    async updateStatus(id, dto) {
        const proposal = await this.proposalRepo.findOne({
            where: { id },
            relations: ['items']
        });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status === proposal_entity_1.PROPOSAL_STATUS.APPROVED) {
            throw new common_1.BadRequestException('Approved proposals cannot be modified');
        }
        proposal.status = dto.status;
        if (dto.notes)
            proposal.notes = dto.notes;
        // If status is DROPPED, also mark all associated lead services as DROPPED
        if (dto.status === proposal_entity_1.PROPOSAL_STATUS.DROPPED) {
            const leadServiceIds = proposal.items?.map(item => item.leadServiceId).filter(Boolean);
            if (leadServiceIds && leadServiceIds.length > 0) {
                await this.dataSource.getRepository(lead_service_entity_1.LeadService).update({ id: (0, typeorm_2.In)(leadServiceIds) }, { status: serviceConstants_1.SERVICE_STATUS.DROPPED });
            }
        }
        await this.proposalRepo.save(proposal);
        return this.getProposal(id);
    }
    async deleteProposal(id) {
        const proposal = await this.proposalRepo.findOne({ where: { id } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status === proposal_entity_1.PROPOSAL_STATUS.APPROVED) {
            throw new common_1.BadRequestException('Approved proposals cannot be deleted');
        }
        await this.proposalRepo.delete(id);
    }
    async generateProposalPdf(id) {
        const proposal = await this.proposalRepo.findOne({
            where: { id },
            relations: [
                'items',
                'items.leadService',
                'items.leadService.service',
                'lead',
                'lead.customer',
                'lead.customer.addresses',
                'lead.customer.contacts',
                'lead.createdBy',
                'paymentTerms',
            ],
        });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        const customer = proposal.lead?.customer;
        const primaryAddress = customer?.addresses?.find((a) => a.isPrimary) || customer?.addresses?.[0];
        const primaryContact = customer?.contacts?.find((c) => c.isPrimary) || customer?.contacts?.[0];
        const createdBy = proposal.lead?.createdBy;
        const data = {
            proposal: {
                proposalReference: proposal.proposalReference,
                proposalDate: proposal.proposalDate,
                validUntil: proposal.validUntil,
                submittedBy: proposal.submittedBy,
                subject: proposal.subject,
                division: proposal.division,
                currency: proposal.currency,
                totalAmount: Number(proposal.subTotal),
                taxAmount: Number(proposal.totalTaxAmount),
                grandTotal: Number(proposal.grandTotal),
                status: proposal.status,
                termsAndConditions: proposal.termsAndConditions,
                introduction: proposal.introduction,
            },
            lead: {
                enquiryId: proposal.lead?.enquiryId,
                customerName: customer?.name,
                customerAddress: primaryAddress
                    ? [primaryAddress.addressLine1, primaryAddress.addressLine2]
                        .filter(Boolean)
                        .join(', ')
                    : '',
                customerCity: primaryAddress?.city,
                customerState: primaryAddress?.state,
                customerCountry: primaryAddress?.country,
                headcount: customer?.headcount,
                businessActivities: customer?.businessActivities,
                contactPerson: primaryContact?.name,
                contactEmail: primaryContact?.email,
                contactPhone: primaryContact?.phoneNo,
            },
            items: proposal.items?.map((item) => ({
                serviceName: item.serviceName || item.leadService?.service?.name || '',
                description: item.description,
                deliverables: item.leadService?.deliverables || [],
                timeline: item.leadService?.timeline || item.leadService?.service?.description || 'N/A',
                amount: Number(item.amount),
                currency: item.currency,
                discount: Number(item.discount),
                taxPercentage: Number(item.taxPercentage),
                netAmount: Number(item.netAmount),
            })) || [],
            paymentTerms: proposal.paymentTerms?.map((term) => ({
                milestoneName: term.milestoneName,
                percentage: Number(term.percentage),
                triggerEvent: term.triggerEvent,
                amount: Number(term.amount),
            })) || [],
            auth: {
                preparedBy: createdBy?.name || proposal.submittedBy || 'N/A',
                preparedByEmail: createdBy?.email || '',
                preparedByDesignation: createdBy?.roleName || '',
                preparedBySign: null,
                submittedByEntity: proposal.submittedBy || 'INTERCERT',
            },
        };
        return this.proposalReportService.generateProposalReport(data);
    }
    async generatePdfFromTemplate(id) {
        const proposal = await this.getProposal(id);
        // 1. Select the correct template
        const templatePath = this.getTemplatePath(proposal);
        if (!fs.existsSync(templatePath)) {
            throw new common_1.NotFoundException(`Proposal template not found at ${templatePath}`);
        }
        // 2. Prepare data for the template
        const data = this.prepareTemplateData(proposal);
        // 3. Fill the PDF template
        return this.pdfTemplateService.fillProposalPdf(templatePath, data);
    }
    deriveDivisionFromLeadServices(items) {
        const categories = items
            .map((item) => (item.leadService?.service?.category || item.serviceType || '').toString().trim().toUpperCase())
            .filter(Boolean);
        if (categories.some((c) => c.includes('GRC'))) {
            return proposal_entity_1.PROPOSAL_DIVISION.GRC_DIVISION;
        }
        if (categories.some((c) => c.includes('VAPT'))) {
            return proposal_entity_1.PROPOSAL_DIVISION.VAPT_DIVISION;
        }
        return proposal_entity_1.PROPOSAL_DIVISION.CERTIFICATION_DIVISION;
    }
    resolveAssignmentGroupIdFromLeadServices(leadServices, leadServiceIds) {
        const assignmentGroupIds = leadServiceIds
            .map(id => leadServices.find(ls => ls.id === id)?.assignmentGroupId)
            .filter((id) => Boolean(id));
        const uniqueGroups = [...new Set(assignmentGroupIds)];
        return uniqueGroups.length === 1 ? uniqueGroups[0] : null;
    }
    async resolveProposalAssignmentGroupId(manager, leadServiceIds) {
        if (!leadServiceIds || leadServiceIds.length === 0) {
            return null;
        }
        const uniqueServiceIds = [...new Set(leadServiceIds)];
        const leadServices = await manager.find(lead_service_entity_1.LeadService, { where: { id: (0, typeorm_2.In)(uniqueServiceIds) } });
        const groupIds = leadServices
            .map(ls => ls.assignmentGroupId)
            .filter((id) => Boolean(id));
        const uniqueGroups = [...new Set(groupIds)];
        return uniqueGroups.length === 1 ? uniqueGroups[0] : null;
    }
    getTemplatePath(proposal) {
        const primaryAddress = proposal.lead?.customer?.addresses?.find(a => a.isPrimary) || proposal.lead?.customer?.addresses?.[0];
        const rawCountry = primaryAddress?.country;
        const customerCountry = rawCountry ? rawCountry.toString().trim().toUpperCase() : '';
        // Normalize common country representations
        const isIndia = ['INDIA', 'IND', 'IN'].includes(customerCountry);
        // Use the stored division from the entity.
        const isCertification = proposal.division === proposal_entity_1.PROPOSAL_DIVISION.CERTIFICATION_DIVISION;
        let templateName = '';
        if (isIndia) {
            if (isCertification) {
                templateName = 'India Certification Divison Proposal.pdf';
            }
            else {
                // GRC, VAPT, or any other division for India
                templateName = 'India GRC Proposal.pdf';
            }
        }
        else {
            // For any other country (e.g. USA)
            if (isCertification) {
                templateName = 'USA Certification Divison Proposal.pdf';
            }
            else {
                // GRC, VAPT, or any other division for other countries
                templateName = 'USA GRC PROPOSAL.pdf';
            }
        }
        return path.join(process.cwd(), 'libs', 'templates', 'Proposal', templateName);
    }
    formatDate(date) {
        if (!date)
            return 'N/A';
        try {
            const d = new Date(date);
            if (isNaN(d.getTime()))
                return String(date);
            return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        }
        catch {
            return String(date);
        }
    }
    formatCurrency(amount, currency) {
        const symbols = { INR: '₹', USD: '$', EUR: '€', ZAR: 'R' };
        const symbol = symbols[currency] || `${currency} `;
        return `${symbol}${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    prepareTemplateData(proposal) {
        const customer = proposal.lead?.customer;
        const primaryContact = customer?.contacts?.find((c) => c.isPrimary) || customer?.contacts?.[0];
        const primaryAddress = customer?.addresses?.find((a) => a.isPrimary) || customer?.addresses?.[0];
        const createdBy = proposal.lead?.createdBy;
        const items = proposal.items?.map((item, index) => ({
            index: index + 1,
            serviceName: item.serviceName || item.leadService?.service?.name || 'N/A',
            serviceType: item.serviceType || item.leadService?.service?.category || 'N/A',
            description: item.description,
            startDate: item.startDate ? this.formatDate(item.startDate) : null,
            endDate: item.endDate ? this.formatDate(item.endDate) : null,
            amount: this.formatCurrency(item.amount, item.currency),
            currency: item.currency,
            discount: `${Number(item.discount).toFixed(2)}%`,
            taxPercentage: `${Number(item.taxPercentage).toFixed(2)}%`,
            discountAmount: this.formatCurrency(item.discountAmount, item.currency),
            taxableAmount: this.formatCurrency(item.taxableAmount, item.currency),
            taxAmount: this.formatCurrency(item.taxAmount, item.currency),
            netAmount: this.formatCurrency(item.netAmount, item.currency),
            deliverables: item.leadService?.deliverables?.map(d => ({ deliverable: d })) || [],
            timeline: item.leadService?.timeline || item.leadService?.service?.description || 'N/A',
        }));
        const total_fee = this.formatCurrency(proposal.grandTotal, proposal.currency);
        const companyName = customer?.name || 'N/A';
        const companyLocation = primaryAddress ?
            `${primaryAddress.addressLine1}${primaryAddress.addressLine2 ? ', ' + primaryAddress.addressLine2 : ''}, ${primaryAddress.city}, ${primaryAddress.state}, ${primaryAddress.country} - ${primaryAddress.postalCode}` :
            'N/A';
        const headcount = customer?.headcount || 'N/A';
        const businessActivities = customer?.businessActivities || 'N/A';
        const scopeOfServices = items?.map(i => i.serviceName).filter(Boolean) || [];
        const proposalReference = proposal.proposalReference;
        const proposalDateFormatted = this.formatDate(proposal.proposalDate);
        const validityDays = proposal.validUntil
            ? Math.ceil((new Date(proposal.validUntil).getTime() - new Date(proposal.proposalDate).getTime()) / (1000 * 60 * 60 * 24))
            : 30;
        return {
            // Direct field requirements
            division: proposal.division,
            subject: proposal.subject,
            submittedTo: companyName,
            proposalNo: proposalReference,
            proposalId: proposalReference,
            submittedBy: proposal.submittedBy,
            proposalDate: proposalDateFormatted,
            currency: proposal.currency,
            // Scoping
            scoping: {
                locations_and_headcounts: companyLocation,
                headcount: headcount,
                businessActivities: businessActivities,
                scopeOfServices: scopeOfServices.join(', '),
            },
            // Project Deliverables & timelines (A.3)
            project_deliverables: items?.map(i => ({
                service: i.serviceName,
                deliverables: i.deliverables
            })),
            timelines: items?.map(i => ({
                service: i.serviceName,
                timeline: i.timeline
            })),
            // Table data
            items: items,
            // Auth & Summary
            prepared_by_name: createdBy?.name || proposal.submittedBy || 'N/A',
            prepared_by_email: createdBy?.email || 'info@intercert.com',
            validity_days: validityDays,
            subtotal: this.formatCurrency(proposal.subTotal, proposal.currency),
            total_discount: this.formatCurrency(proposal.totalDiscount, proposal.currency),
            total_tax: this.formatCurrency(proposal.totalTaxAmount, proposal.currency),
            grand_total: total_fee,
            // Kept for older template compatibility
            customer: {
                name: companyName,
                location: companyLocation,
                headcount: headcount,
                business_activities: businessActivities,
                contact: primaryContact?.name || 'CEO',
            },
        };
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(proposal_entity_1.Proposal)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(proposal_file_entity_1.ProposalFile)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _d : Object, typeof (_e = typeof proposal_report_service_1.ProposalReportService !== "undefined" && proposal_report_service_1.ProposalReportService) === "function" ? _e : Object, typeof (_f = typeof pdf_template_service_1.PdfTemplateService !== "undefined" && pdf_template_service_1.PdfTemplateService) === "function" ? _f : Object, typeof (_g = typeof s3File_service_1.S3FileService !== "undefined" && s3File_service_1.S3FileService) === "function" ? _g : Object])
], ProposalService);


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ProposalReportService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalReportService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const pdfkit_1 = tslib_1.__importDefault(__webpack_require__(96));
const path = tslib_1.__importStar(__webpack_require__(97));
const fs = tslib_1.__importStar(__webpack_require__(98));
const axios_1 = tslib_1.__importDefault(__webpack_require__(99));
const INTERCERT_ADDRESS = '2001 Timberloch Place, Suite 500, The Woodlands, Texas 77380 United States';
const INTERCERT_PHONE = '+1 281 899 8052';
const INTERCERT_EMAIL = 'info@intercert.com';
const INTERCERT_WEBSITE = 'www.intercert.com';
const ABOUT_INTERCERT = [
    'INTERCERT is a leading multinational organization specializing in Audits and Assessments. We provide Management System Certification, Governance, Risk, and Compliance (GRC) related services, Training, and Security Assessment services. Founded in 2009 with a commitment to building a secure and sustainable world through customer-centric services.',
    'Our Accreditations and Services includes:',
];
const ACCREDITATIONS = [
    'Accredited from leading America\'s accreditation board (SCC, Canada & UAF, United States) under IAF for ISO Certification Services & accredited from Exemplar Global for ISO Lead Auditor / Implementation Training.',
    'United States Registered CPA firm (INTERCERT CPA LLC) in State of Montana, vide License Number PAC-FIRM-LIC-51611 for SOC2 / SOC1 Services.',
    'Accredited from Cloud Security Alliance, United States for CSA STAR Certification services.',
    'Registered Practitioner Organization (RPO) from Cyber AB, United States for CMMC Certification Services with onboard C3PAO\'s.',
    'PCI DSS QSA Company (Group Company) for PCI DSS Certification.',
    'Data Protection GDPR, HIPAA, PDPA & Cyber Security Compliances for NIST, HITRUST, FEDRAMP, DORA, NIS2, Cyber Essential attestation by qualified CISA\'s.',
    'VAPT & Security Assessment Services by a qualified team of CISA\'s / CEH / Cyber Experts.',
];
const ABOUT_CLOSING = 'With extensive experience across diverse industries and business sectors, INTERCERT experienced team of 150+ Assessors delivers assessment services globally in compliance with ISO 17021 requirements. Our team excels at adapting to changing business needs, ensuring that our service delivery consistently meets and exceeds client expectations.';
const COMMERCIAL_TC = [
    'The validity of Proposal is 30 days and INTERCERT reserve the right of acceptance beyond the validity period.',
    'Payment Terms – The 100% fee shall be paid before submission of final certificate/report.',
    'The final deliverables will always be issued on full settlement of invoices.',
    'All fees once paid are non-refundable in any circumstances.',
    'The assessment may be conducted (offsite / onsite) as per applicable rules, guidelines and Country / State specific guidelines travel advisories.',
    'The Travel and Boarding for assessment team (if required) shall be arranged by Client otherwise will be billed as per actuals to client.',
    'The above-mentioned fee is inclusive of all Offsite activities like Contract Review, Assessment Planning, Report Preparation, Reviews and issuance of certification / attestation tabulated based on information\'s as per client application & mentioned under scoping section, any deviation may lead to revision in certification fee / proposal.',
    'The Invoices shall be settled through electronic transfer within 15 days of Invoice or before conducting the audit, whichever is earlier. Any transfer charges or withholding taxes, if applicable will be on the part of client.',
];
const GENERAL_TC_SECTIONS = [
    {
        title: 'Fairness',
        text: 'The Assessment will be conducted as per the requirements of frameworks defined under the scoping and require suitable criteria for measurement of the effectiveness of the controls be identified as per applicable frameworks.\n\nThe assessment team will examine, on a test basis, evidence supporting company\'s description of controls, and perform other procedures, as necessary in the circumstances to provide a reasonable basis for the report.\n\nThe Client Top Management shall provide an assertion letter about the fairness of the presentation of the description and suitability of the design of the operating effectiveness of the controls to achieve the related control objectives of the required frameworks.\n\nThe Client shall make available all records, evidences, documentation & information required during the audit. The audit team will maintain privacy & confidentiality of the information provided.',
    },
    {
        title: 'Confidentiality',
        text: 'The Client and INTERCERT shall protect the confidentiality of each other\'s Confidential Information in the same manner as they protect the confidentiality of their own proprietary and confidential information of similar nature. Each Party, while acknowledging the confidential and proprietary nature of the Confidential Information agrees to take all reasonable measures at its own expense to restrain its representatives from prohibited or unauthorized disclosure or use of the Confidential Information.',
    },
    {
        title: 'Liability',
        text: 'The assessment be conducted at the given point of time based on sampling data of client process and establishment produced during the assessment process. INTERCERT don\'t assume any responsibility arising over client systems, management process or any new update or changes resulting from client team intervention or negligence.\n\nINTERCERT will not be accountable for any third-party claims, demand, suit, or proceedings made or brought against client by a third party arising from the non-compliance of assessed frameworks / compliance reporting.\n\nExcept to the extent prohibited by law, in no event shall INTERCERT or any of its officers, directors, shareholders, employees, auditors, subcontractors or agents be liable for any indirect, exemplary, incidental, special, punitive, cover, business interruption, lost profit, or consequential damages, whether an action is in contract or tort and regardless of the theory of liability, even if INTERCERT has been advised of the possibility of such damages. Notwithstanding anything to the contrary elsewhere contained herein, the maximum aggregate liability of INTERCERT together with its affiliates arising out of or related to this assignment shall not exceed the amount has paid by the client for this assignment in the six-month period preceding the event giving rise to the liability.',
    },
];
let ProposalReportService = ProposalReportService_1 = class ProposalReportService {
    constructor() {
        this.logger = new common_1.Logger(ProposalReportService_1.name);
        this.PRIMARY_COLOR = '#0047AB';
        this.LIGHT_BLUE = '#E8F0FE';
        this.GRID_COLOR = 'black';
        this.TEXT_COLOR = 'black';
    }
    async generateProposalReport(data) {
        let preparedSignBuffer = null;
        if (data.auth?.preparedBySign) {
            try {
                const response = await axios_1.default.get(data.auth.preparedBySign, { responseType: 'arraybuffer' });
                preparedSignBuffer = Buffer.from(response.data);
            }
            catch (err) {
                this.logger.warn(`Could not fetch signature from ${data.auth.preparedBySign}`);
            }
        }
        return new Promise((resolve, reject) => {
            try {
                const doc = new pdfkit_1.default({ margin: 50, size: 'A4', bufferPages: true });
                const buffers = [];
                doc.on('data', (chunk) => buffers.push(chunk));
                doc.on('end', () => resolve(Buffer.concat(buffers)));
                doc.on('error', (err) => reject(err));
                doc.strokeColor('black').lineWidth(0.5);
                this.generateCoverPage(doc, data.proposal, data.lead);
                this.generateCoverLetter(doc, data.proposal, data.lead, data.auth);
                this.generateSectionA(doc, data.lead, data.items);
                this.generateSectionB(doc, data.items, data.proposal);
                this.generateSectionC(doc, data.proposal);
                this.generateSignaturePage(doc, data.auth, preparedSignBuffer);
                const range = doc.bufferedPageRange();
                const logoPath = path.join(process.cwd(), 'libs', 'templates', 'Logo_Blue.png');
                for (let i = range.start; i < range.start + range.count; i++) {
                    doc.switchToPage(i);
                    this.generatePageHeader(doc, logoPath);
                    this.generateFooter(doc, i + 1, range.count, data.proposal);
                }
                doc.end();
            }
            catch (error) {
                this.logger.error('Error generating Proposal PDF:', error);
                reject(error);
            }
        });
    }
    generatePageHeader(doc, logoPath) {
        doc.save();
        try {
            if (fs.existsSync(logoPath)) {
                doc.image(logoPath, 430, 20, { width: 120 });
            }
            else {
                doc.fillColor(this.PRIMARY_COLOR).fontSize(16).font('Helvetica-Bold')
                    .text('INTERCERT', 410, 20, { width: 140, align: 'right' });
                doc.fontSize(8).font('Helvetica').fillColor('#555')
                    .text('Certification & Security Services', 410, 40, { width: 140, align: 'right' });
            }
        }
        catch (error) {
            this.logger.warn('Could not add logo to PDF header, using text fallback');
            doc.fillColor(this.PRIMARY_COLOR).fontSize(16).font('Helvetica-Bold')
                .text('INTERCERT', 410, 20, { width: 140, align: 'right' });
        }
        doc.restore();
    }
    generateFooter(doc, pageNum, totalPages, proposal) {
        const footerY = 760;
        doc.save();
        // Footer line
        doc.moveTo(50, footerY - 5).lineTo(550, footerY - 5)
            .strokeColor('#E5E7EB').lineWidth(0.5).stroke();
        // Footer content
        doc.fontSize(8).fillColor('#6B7280').font('Helvetica');
        // Left side: Proposal reference
        const ref = proposal?.proposalReference || '';
        doc.text(`Ref: ${ref}`, 50, footerY, { lineBreak: false });
        // Center: Confidential notice
        doc.text('CONFIDENTIAL AND PROPRIETARY', 275, footerY, { align: 'center', width: 50, lineBreak: false });
        // Right side: Page numbering
        const rightX = 450;
        const rightWidth = 100;
        doc.text(`Page ${pageNum} of ${totalPages}`, rightX, footerY, { align: 'right', width: rightWidth, lineBreak: false });
        // Second line: Company info
        doc.text(`INTERCERT © ${new Date().getFullYear()} | ${INTERCERT_WEBSITE}`, 50, footerY + 10, { lineBreak: false });
        doc.restore();
    }
    checkPageBreak(doc, neededHeight) {
        if (doc.y + neededHeight > 740) {
            doc.addPage();
            doc.y = 100;
            return true;
        }
        return false;
    }
    drawSectionHeader(doc, title) {
        this.checkPageBreak(doc, 60);
        const y = doc.y;
        // Section header with border
        doc.fillColor(this.PRIMARY_COLOR).fontSize(14).font('Helvetica-Bold')
            .text(title, 50, y + 5);
        // Underline
        doc.moveTo(50, y + 20).lineTo(550, y + 20)
            .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
        doc.moveDown(1.2);
        doc.font('Helvetica').fillColor(this.TEXT_COLOR);
    }
    drawSubSectionHeader(doc, title) {
        this.checkPageBreak(doc, 40);
        const y = doc.y;
        // Subsection header with bold text and small underline
        doc.fillColor(this.PRIMARY_COLOR).fontSize(12).font('Helvetica-Bold')
            .text(title, 50, y + 3);
        // Small underline
        doc.moveTo(50, y + 15).lineTo(250, y + 15)
            .strokeColor(this.PRIMARY_COLOR).lineWidth(0.5).stroke();
        doc.moveDown(1);
        doc.font('Helvetica').fillColor(this.TEXT_COLOR);
    }
    generateCoverPage(doc, proposal, lead) {
        doc.y = 100;
        // Company Logo and Header
        doc.fillColor(this.PRIMARY_COLOR).fontSize(16).font('Helvetica-Bold')
            .text('INTERCERT', 50, doc.y, { align: 'center', width: 500 });
        doc.fontSize(10).font('Helvetica').fillColor('#555')
            .text('Certification & Security Services', 50, doc.y, { align: 'center', width: 500 });
        doc.moveDown(2);
        // Main Title
        doc.fontSize(28).font('Helvetica-Bold').fillColor(this.PRIMARY_COLOR)
            .text('BUSINESS PROPOSAL', 50, doc.y, { align: 'center', width: 500 });
        doc.moveDown(1.5);
        // Division
        const division = proposal?.division || 'GRC DIVISION';
        doc.fontSize(14).font('Helvetica-Bold').fillColor('#555')
            .text(division, 50, doc.y, { align: 'center', width: 500 });
        doc.moveDown(2);
        // Subject Line
        const subject = proposal?.subject || `Proposal for Services`;
        doc.fontSize(12).font('Helvetica').fillColor(this.TEXT_COLOR)
            .text(subject, 50, doc.y, { align: 'center', width: 500 });
        doc.moveDown(3);
        // Horizontal Line
        doc.moveTo(100, doc.y).lineTo(500, doc.y)
            .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
        doc.moveDown(2);
        // Submitted To Section
        doc.fontSize(12).font('Helvetica-Bold').fillColor(this.TEXT_COLOR)
            .text('SUBMITTED TO:', 50, doc.y);
        doc.font('Helvetica').fontSize(14).fillColor(this.PRIMARY_COLOR)
            .text(lead?.customerName || '', 50, doc.y, { width: 300 });
        doc.moveDown(1.5);
        // Proposal Information Table
        const infoY = doc.y;
        const labelX = 50;
        const valueX = 200;
        const renderInfoRow = (label, value, y) => {
            doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR).text(label, labelX, y);
            doc.font('Helvetica').fontSize(10).fillColor('#555').text(value || 'N/A', valueX, y, { width: 300 });
        };
        renderInfoRow('Proposal No.:', proposal?.proposalReference || 'N/A', infoY);
        doc.moveDown(1);
        renderInfoRow('Dated:', this.formatDate(proposal?.proposalDate), doc.y);
        doc.moveDown(1);
        renderInfoRow('Submitted By:', proposal?.submittedBy || 'INTERCERT', doc.y);
        doc.moveDown(1);
        renderInfoRow('Valid Until:', this.formatDate(proposal?.validUntil), doc.y);
        doc.moveDown(3);
        // INTERCERT Contact Information
        doc.fontSize(9).font('Helvetica').fillColor('#777')
            .text(INTERCERT_ADDRESS, 50, doc.y, { align: 'center', width: 500 });
        doc.moveDown(0.3);
        doc.text(`Phone: ${INTERCERT_PHONE} | Email: ${INTERCERT_EMAIL} | Website: ${INTERCERT_WEBSITE}`, 50, doc.y, { align: 'center', width: 500 });
        doc.moveDown(2);
        // Final Horizontal Line
        doc.moveTo(100, doc.y).lineTo(500, doc.y)
            .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
    }
    generateCoverLetter(doc, proposal, lead, auth) {
        doc.addPage();
        doc.y = 100;
        // Header with Proposal Reference and Date
        doc.fontSize(10).font('Helvetica-Bold').fillColor(this.TEXT_COLOR)
            .text(`Proposal No.: ${proposal?.proposalReference || 'N/A'}`, 50, doc.y);
        doc.font('Helvetica-Bold')
            .text(`Date: ${this.formatDate(proposal?.proposalDate)}`, 400, doc.y, { align: 'right', width: 150 });
        doc.moveDown(2);
        // Recipient Address
        doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
            .text('To,', 50, doc.y);
        doc.moveDown(0.5);
        doc.font('Helvetica').fontSize(11).fillColor(this.TEXT_COLOR)
            .text(lead?.customerName || '', 50, doc.y, { width: 300 });
        const addressParts = [
            lead?.customerAddress,
            lead?.customerCity,
            lead?.customerState,
            lead?.customerCountry,
        ].filter(Boolean).join(', ');
        if (addressParts) {
            doc.moveDown(0.5);
            doc.text(addressParts, 50, doc.y, { width: 300 });
        }
        if (lead?.contactPerson) {
            doc.moveDown(0.5);
            doc.text(`Attn: ${lead.contactPerson}`, 50, doc.y, { width: 300 });
        }
        if (lead?.contactEmail) {
            doc.moveDown(0.5);
            doc.text(`Email: ${lead.contactEmail}`, 50, doc.y, { width: 300 });
        }
        if (lead?.contactPhone) {
            doc.moveDown(0.5);
            doc.text(`Phone: ${lead.contactPhone}`, 50, doc.y, { width: 300 });
        }
        doc.moveDown(2);
        // Subject Line
        const subject = proposal?.subject || 'Proposal for Services';
        doc.font('Helvetica-Bold').fontSize(11)
            .text(`Subject: ${subject}`, 50, doc.y, { width: 500 });
        doc.moveDown(1.5);
        // Salutation
        doc.font('Helvetica').fontSize(11).fillColor(this.TEXT_COLOR)
            .text('Dear Sir/Madam,', 50, doc.y);
        doc.moveDown(1.5);
        // Introduction Paragraph
        doc.font('Helvetica').fontSize(11).fillColor(this.TEXT_COLOR)
            .text('Further to your enquiry and subsequent discussions, we are pleased to submit our comprehensive proposal for the services outlined below.', 50, doc.y, { width: 500, align: 'justify' });
        doc.moveDown(1);
        // About INTERCERT
        doc.font('Helvetica').fontSize(11).fillColor(this.TEXT_COLOR)
            .text(ABOUT_INTERCERT[0], 50, doc.y, { width: 500, align: 'justify' });
        doc.moveDown(1);
        doc.font('Helvetica-Bold').text(ABOUT_INTERCERT[1], 50, doc.y);
        doc.moveDown(0.5);
        // Accreditations List
        ACCREDITATIONS.forEach((item) => {
            this.checkPageBreak(doc, 35);
            const bulletY = doc.y;
            doc.font('Helvetica').fontSize(10).fillColor(this.TEXT_COLOR)
                .text('\u2022', 55, bulletY);
            doc.text(item, 70, bulletY, { width: 475, align: 'justify' });
            doc.moveDown(0.5);
        });
        doc.moveDown(0.5);
        this.checkPageBreak(doc, 60);
        // Closing About INTERCERT
        doc.font('Helvetica').fontSize(11).fillColor(this.TEXT_COLOR)
            .text(ABOUT_CLOSING, 50, doc.y, { width: 500, align: 'justify' });
        doc.moveDown(1);
        // Proposal Submission Statement
        this.checkPageBreak(doc, 60);
        doc.font('Helvetica').fontSize(11)
            .text('We have carefully reviewed your requirements and are confident in our ability to deliver exceptional service that meets your expectations.', 50, doc.y, { width: 500, align: 'justify' });
        doc.moveDown(1);
        doc.text('This proposal outlines our understanding of your needs, the scope of services, commercial terms, and our approach to delivering value.', 50, doc.y, { width: 500, align: 'justify' });
        doc.moveDown(1.5);
        // Closing Remarks
        doc.text('We look forward to the opportunity to partner with you and contribute to your organization\'s success.', 50, doc.y, { width: 500, align: 'justify' });
        doc.moveDown(2);
        // Signature Block
        doc.font('Helvetica').text('Thanking you,', 50, doc.y);
        doc.moveDown(1);
        doc.font('Helvetica-Bold').text(auth?.preparedBy || 'N/A', 50, doc.y);
        if (auth?.preparedByDesignation) {
            doc.font('Helvetica').fontSize(10).fillColor('#555')
                .text(auth.preparedByDesignation, 50, doc.y);
        }
        if (auth?.preparedByEmail) {
            doc.font('Helvetica').fontSize(10).fillColor('#555')
                .text(auth.preparedByEmail, 50, doc.y);
        }
        doc.moveDown(0.5);
        doc.font('Helvetica-Bold').text(auth?.submittedByEntity || 'INTERCERT', 50, doc.y);
        doc.moveDown(2);
    }
    generateSectionA(doc, lead, items) {
        this.checkPageBreak(doc, 80);
        this.drawSectionHeader(doc, 'Section A – Scoping & Project Deliverables');
        this.drawSubSectionHeader(doc, 'A.1 Scoping');
        const scopingRows = [
            { label: 'Company Name', value: lead?.customerName || '' },
            { label: 'Location/s & Headcounts', value: [lead?.customerCity, lead?.customerCountry, lead?.headcount ? `(${lead.headcount})` : ''].filter(Boolean).join(', ') },
            { label: 'Business Activities', value: lead?.businessActivities || '' },
            {
                label: 'Scope of Services',
                value: items?.map((item, idx) => `${idx + 1}. ${item.serviceName || item.leadService?.service?.name || ''}`).join('\n') || '',
            },
        ];
        scopingRows.forEach((row) => {
            this.checkPageBreak(doc, 35);
            const rowY = doc.y;
            const LABEL_W = 130;
            const VALUE_W = 370;
            const labelH = doc.fontSize(10).font('Helvetica-Bold').heightOfString(row.label, { width: LABEL_W - 10 });
            const valueH = doc.font('Helvetica').heightOfString(row.value || 'N/A', { width: VALUE_W - 10 });
            const rowH = Math.max(labelH, valueH) + 12;
            doc.save();
            doc.fillColor(this.LIGHT_BLUE).rect(50, rowY, LABEL_W, rowH).fill();
            doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(50, rowY, LABEL_W, rowH).stroke();
            doc.strokeColor(this.GRID_COLOR).rect(50 + LABEL_W, rowY, VALUE_W, rowH).stroke();
            doc.fillColor(this.PRIMARY_COLOR).font('Helvetica-Bold').fontSize(10)
                .text(row.label, 55, rowY + 6, { width: LABEL_W - 10 });
            doc.fillColor(this.TEXT_COLOR).font('Helvetica').fontSize(10)
                .text(row.value || 'N/A', 50 + LABEL_W + 5, rowY + 6, { width: VALUE_W - 10 });
            doc.restore();
            doc.y = rowY + rowH;
        });
        doc.moveDown(1.5);
        this.checkPageBreak(doc, 80);
        this.drawSubSectionHeader(doc, 'A.2 Project Deliverables');
        this.drawDeliverablesTableHeader(doc);
        items?.forEach((item) => {
            const serviceName = item.serviceName || item.leadService?.service?.name || '';
            const deliverables = Array.isArray(item.deliverables)
                ? item.deliverables.join('\n')
                : (item.description || '');
            if (this.checkPageBreak(doc, 40)) {
                this.drawDeliverablesTableHeader(doc);
            }
            const currentY = doc.y;
            const sH = doc.fontSize(9).font('Helvetica').heightOfString(serviceName, { width: 175 });
            const dH = doc.heightOfString(deliverables || 'N/A', { width: 310 });
            const rowH = Math.max(sH, dH) + 12;
            doc.save();
            doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(50, currentY, 185, rowH).stroke();
            doc.strokeColor(this.GRID_COLOR).rect(235, currentY, 315, rowH).stroke();
            doc.fillColor(this.TEXT_COLOR).font('Helvetica').fontSize(9)
                .text(serviceName, 55, currentY + 6, { width: 175 });
            doc.text(deliverables || 'N/A', 240, currentY + 6, { width: 305 });
            doc.restore();
            doc.y = currentY + rowH;
        });
        doc.moveDown(1.5);
        this.checkPageBreak(doc, 80);
        this.drawSubSectionHeader(doc, 'A.3 Timelines');
        doc.fontSize(9).font('Helvetica').fillColor('#555')
            .text('The estimated timelines mentioned below depends upon client team support and providing the required information to audit team.', 50, doc.y, { width: 500 });
        doc.moveDown(0.8);
        this.drawTimelinesTableHeader(doc);
        items?.forEach((item) => {
            const serviceName = item.serviceName || item.leadService?.service?.name || '';
            const timeline = item.timeline || '3-4 Weeks';
            if (this.checkPageBreak(doc, 30)) {
                this.drawTimelinesTableHeader(doc);
            }
            const currentY = doc.y;
            const sH = doc.fontSize(9).font('Helvetica').heightOfString(serviceName, { width: 310 });
            const tH = doc.heightOfString(timeline, { width: 175 });
            const rowH = Math.max(sH, tH) + 10;
            doc.save();
            doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(50, currentY, 320, rowH).stroke();
            doc.strokeColor(this.GRID_COLOR).rect(370, currentY, 180, rowH).stroke();
            doc.fillColor(this.TEXT_COLOR).font('Helvetica').fontSize(9)
                .text(serviceName, 55, currentY + 5, { width: 310 });
            doc.text(timeline, 375, currentY + 5, { width: 170 });
            doc.restore();
            doc.y = currentY + rowH;
        });
        doc.moveDown(2);
    }
    drawDeliverablesTableHeader(doc) {
        const tableTop = doc.y;
        doc.fontSize(9).font('Helvetica-Bold');
        const cols = [
            { text: 'Services', x: 50, w: 185 },
            { text: 'Deliverables', x: 235, w: 315 },
        ];
        let maxH = 18;
        cols.forEach(c => {
            const h = doc.heightOfString(c.text, { width: c.w - 10 });
            if (h > maxH)
                maxH = h;
        });
        maxH += 10;
        cols.forEach(c => {
            doc.save();
            doc.fillColor(this.LIGHT_BLUE).rect(c.x, tableTop, c.w, maxH).fill();
            doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, tableTop, c.w, maxH).stroke();
            doc.fillColor(this.PRIMARY_COLOR).text(c.text, c.x + 5, tableTop + 5, { width: c.w - 10, align: 'center' });
            doc.restore();
        });
        doc.y = tableTop + maxH;
        doc.font('Helvetica').fontSize(9);
    }
    drawTimelinesTableHeader(doc) {
        const tableTop = doc.y;
        doc.fontSize(9).font('Helvetica-Bold');
        const cols = [
            { text: 'Services', x: 50, w: 320 },
            { text: 'Timelines', x: 370, w: 180 },
        ];
        let maxH = 18;
        cols.forEach(c => {
            const h = doc.heightOfString(c.text, { width: c.w - 10 });
            if (h > maxH)
                maxH = h;
        });
        maxH += 10;
        cols.forEach(c => {
            doc.save();
            doc.fillColor(this.LIGHT_BLUE).rect(c.x, tableTop, c.w, maxH).fill();
            doc.strokeColor(this.GRID_COLOR).lineWidth(0.5).rect(c.x, tableTop, c.w, maxH).stroke();
            doc.fillColor(this.PRIMARY_COLOR).text(c.text, c.x + 5, tableTop + 5, { width: c.w - 10, align: 'center' });
            doc.restore();
        });
        doc.y = tableTop + maxH;
        doc.font('Helvetica').fontSize(9);
    }
    generateSectionB(doc, items, proposal) {
        this.checkPageBreak(doc, 100);
        this.drawSectionHeader(doc, 'Section B – Project Fee');
        const currency = proposal?.currency || 'USD';
        // Enhanced table columns with better spacing
        const cols = [
            { text: '#', x: 50, w: 35 },
            { text: 'Service Description', x: 85, w: 320 },
            { text: `Amount (${currency})`, x: 405, w: 145 },
        ];
        const tableTop = doc.y;
        // Table header with professional styling
        doc.save();
        doc.fillColor(this.PRIMARY_COLOR).rect(50, tableTop, 500, 25).fill();
        cols.forEach(c => {
            doc.fillColor('white').font('Helvetica-Bold').fontSize(10)
                .text(c.text, c.x + 5, tableTop + 8, { width: c.w - 10, align: c.text.includes('Amount') ? 'right' : 'left' });
            // Vertical separators
            if (c.x > 50) {
                doc.moveTo(c.x, tableTop).lineTo(c.x, tableTop + 25)
                    .strokeColor('white').lineWidth(0.5).stroke();
            }
        });
        // Bottom border
        doc.moveTo(50, tableTop + 25).lineTo(550, tableTop + 25)
            .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
        doc.restore();
        doc.y = tableTop + 25;
        // Table rows with alternating background colors
        items?.forEach((item, idx) => {
            if (this.checkPageBreak(doc, 30)) {
                // Recreate header if page break occurs
                const hdrY = doc.y;
                doc.save();
                doc.fillColor(this.PRIMARY_COLOR).rect(50, hdrY, 500, 25).fill();
                cols.forEach(c => {
                    doc.fillColor('white').font('Helvetica-Bold').fontSize(10)
                        .text(c.text, c.x + 5, hdrY + 8, { width: c.w - 10, align: c.text.includes('Amount') ? 'right' : 'left' });
                    if (c.x > 50) {
                        doc.moveTo(c.x, hdrY).lineTo(c.x, hdrY + 25)
                            .strokeColor('white').lineWidth(0.5).stroke();
                    }
                });
                doc.moveTo(50, hdrY + 25).lineTo(550, hdrY + 25)
                    .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
                doc.restore();
                doc.y = hdrY + 25;
            }
            const currentY = doc.y;
            const serviceName = item.serviceName || item.leadService?.service?.name || '';
            const amount = Number(item.netAmount || item.amount || 0);
            const amountStr = amount > 0 ? this.formatCurrency(amount, currency) : `${currency}`;
            const sH = doc.fontSize(10).heightOfString(serviceName, { width: cols[1].w - 10 });
            const rowH = Math.max(sH, 20) + 10;
            // Alternating row colors
            const bgColor = idx % 2 === 0 ? '#FFFFFF' : '#F8F9FB';
            doc.save();
            doc.fillColor(bgColor).rect(50, currentY, 500, rowH).fill();
            // Cell borders
            cols.forEach(c => {
                doc.strokeColor('#E5E7EB').lineWidth(0.5).rect(c.x, currentY, c.w, rowH).stroke();
            });
            // Cell content
            doc.fillColor(this.TEXT_COLOR).fontSize(10).font('Helvetica')
                .text(String(idx + 1), cols[0].x + 5, currentY + 8, { width: cols[0].w - 10, align: 'center' });
            doc.text(serviceName, cols[1].x + 5, currentY + 8, { width: cols[1].w - 10 });
            doc.font('Helvetica-Bold')
                .text(amountStr, cols[2].x + 5, currentY + 8, { width: cols[2].w - 10, align: 'right' });
            doc.restore();
            doc.y = currentY + rowH;
        });
        // Total row with prominent styling
        this.checkPageBreak(doc, 200);
        const totalY = doc.y;
        const totalRowH = 28;
        const grandTotal = Number(proposal?.grandTotal || proposal?.totalAmount || 0);
        const totalStr = grandTotal > 0 ? this.formatCurrency(grandTotal, currency) : `${currency}`;
        doc.save();
        // Total row background
        doc.fillColor(this.PRIMARY_COLOR).rect(50, totalY, 500, totalRowH).fill();
        // Total label
        doc.fillColor('white').font('Helvetica-Bold').fontSize(12)
            .text('TOTAL FEE', cols[1].x + 5, totalY + 9, { width: cols[1].w - 10, align: 'right' });
        // Total amount
        doc.fillColor('white').font('Helvetica-Bold').fontSize(12)
            .text(totalStr, cols[2].x + 5, totalY + 9, { width: cols[2].w - 10, align: 'right' });
        // Top border for total row
        doc.moveTo(50, totalY).lineTo(550, totalY)
            .strokeColor(this.PRIMARY_COLOR).lineWidth(1).stroke();
        doc.restore();
        doc.y = totalY + totalRowH;
        doc.moveDown(2);
        // Additional notes about payment terms
        doc.fontSize(9).font('Helvetica').fillColor('#6B7280')
            .text('Note: All amounts are exclusive of applicable taxes. Payment terms: 50% advance, 50% upon completion.', 50, doc.y, { width: 500 });
        doc.moveDown(1);
    }
    generateSectionC(doc, proposal) {
        this.checkPageBreak(doc, 80);
        this.drawSectionHeader(doc, 'Section C – Terms & Conditions');
        this.drawSubSectionHeader(doc, 'C.1 Commercial Terms & Conditions');
        COMMERCIAL_TC.forEach((item, idx) => {
            this.checkPageBreak(doc, 35);
            const bulletY = doc.y;
            doc.font('Helvetica').fontSize(9).fillColor(this.TEXT_COLOR)
                .text(`${idx + 1}.`, 55, bulletY, { width: 20 });
            doc.text(item, 75, bulletY, { width: 470, align: 'justify' });
            doc.moveDown(0.6);
        });
        if (proposal?.termsAndConditions) {
            doc.moveDown(0.5);
            this.checkPageBreak(doc, 40);
            doc.font('Helvetica').fontSize(9).fillColor(this.TEXT_COLOR)
                .text(proposal.termsAndConditions, 50, doc.y, { width: 500, align: 'justify' });
        }
        doc.moveDown(1.5);
        this.checkPageBreak(doc, 60);
        this.drawSubSectionHeader(doc, 'C.2 General Terms & Conditions');
        GENERAL_TC_SECTIONS.forEach((section) => {
            this.checkPageBreak(doc, 60);
            doc.font('Helvetica-Bold').fontSize(10).fillColor(this.PRIMARY_COLOR)
                .text(section.title, 50, doc.y);
            doc.moveDown(0.5);
            doc.font('Helvetica').fontSize(9).fillColor(this.TEXT_COLOR)
                .text(section.text, 50, doc.y, { width: 500, align: 'justify' });
            doc.moveDown(1.2);
        });
        doc.moveDown(1);
    }
    generateSignaturePage(doc, auth, preparedSignBuffer) {
        this.checkPageBreak(doc, 200);
        const TABLE_LEFT = 50;
        const TABLE_WIDTH = 500;
        const COL_W = TABLE_WIDTH / 2;
        const SUBMITTED_X = TABLE_LEFT;
        const ACCEPTED_X = TABLE_LEFT + COL_W;
        // Signature section header
        doc.font('Helvetica-Bold').fontSize(12).fillColor(this.PRIMARY_COLOR)
            .text('ACCEPTANCE AND AUTHORIZATION', 50, doc.y);
        doc.moveTo(50, doc.y + 15).lineTo(300, doc.y + 15)
            .strokeColor(this.PRIMARY_COLOR).lineWidth(0.5).stroke();
        doc.moveDown(2);
        const baseY = doc.y;
        // Submitted By section
        doc.font('Helvetica-Bold').fontSize(11).fillColor(this.TEXT_COLOR)
            .text(`FOR ${auth?.submittedByEntity || 'INTERCERT'}`, SUBMITTED_X, baseY);
        // Accepted By section  
        doc.font('Helvetica-Bold').fontSize(11).fillColor(this.TEXT_COLOR)
            .text('FOR CLIENT ORGANIZATION', ACCEPTED_X, baseY);
        doc.moveDown(3);
        const sigY = doc.y;
        // Signature lines
        doc.moveTo(SUBMITTED_X, sigY).lineTo(SUBMITTED_X + 200, sigY)
            .strokeColor('#666').lineWidth(0.5).stroke();
        doc.moveTo(ACCEPTED_X, sigY).lineTo(ACCEPTED_X + 200, sigY)
            .strokeColor('#666').lineWidth(0.5).stroke();
        // Signature image if available
        if (preparedSignBuffer) {
            try {
                doc.image(preparedSignBuffer, SUBMITTED_X, sigY - 25, { height: 30 });
            }
            catch (err) {
                this.logger.warn('Could not embed signature image');
            }
        }
        doc.moveDown(2);
        const nameY = doc.y;
        // Submitted By details
        doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
            .text('Name:', SUBMITTED_X, nameY);
        doc.font('Helvetica').fontSize(10).fillColor(this.TEXT_COLOR)
            .text(auth?.preparedBy || 'Authorized Signatory', SUBMITTED_X, nameY + 14, { width: 200 });
        if (auth?.preparedByDesignation) {
            doc.font('Helvetica').fontSize(9).fillColor('#666')
                .text(auth.preparedByDesignation, SUBMITTED_X, nameY + 28, { width: 200 });
        }
        // Accepted By details
        doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
            .text('Name:', ACCEPTED_X, nameY);
        doc.font('Helvetica').fontSize(10).fillColor('#666')
            .text('_________________________', ACCEPTED_X, nameY + 14, { width: 200 });
        doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
            .text('Designation:', ACCEPTED_X, nameY + 28);
        doc.font('Helvetica').fontSize(9).fillColor('#666')
            .text('_________________________', ACCEPTED_X, nameY + 42, { width: 200 });
        doc.moveDown(2);
        // Date section
        const dateY = doc.y;
        doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
            .text('Date:', SUBMITTED_X, dateY);
        doc.font('Helvetica').fontSize(10).fillColor(this.TEXT_COLOR)
            .text(new Date().toLocaleDateString('en-GB'), SUBMITTED_X, dateY + 14, { width: 200 });
        doc.font('Helvetica-Bold').fontSize(10).fillColor(this.TEXT_COLOR)
            .text('Date:', ACCEPTED_X, dateY);
        doc.font('Helvetica').fontSize(10).fillColor('#666')
            .text('_________________________', ACCEPTED_X, dateY + 14, { width: 200 });
        doc.moveDown(3);
        // Terms acceptance note
        doc.font('Helvetica').fontSize(9).fillColor('#666').font('Helvetica-Oblique')
            .text('By signing this proposal, both parties agree to the terms and conditions outlined in this document.', 50, doc.y, { width: 500 });
    }
    formatDate(date) {
        if (!date)
            return 'N/A';
        try {
            const d = new Date(date);
            if (isNaN(d.getTime()))
                return String(date);
            return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        }
        catch {
            return String(date);
        }
    }
    formatCurrency(amount, currency) {
        // use text currency codes to avoid encoding issues
        const symbols = { INR: 'INR ', USD: '$', EUR: '€', ZAR: 'R', GBP: '£' };
        const symbol = symbols[currency] || `${currency} `;
        return `${symbol}${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
};
exports.ProposalReportService = ProposalReportService;
exports.ProposalReportService = ProposalReportService = ProposalReportService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ProposalReportService);


/***/ }),
/* 96 */
/***/ ((module) => {

module.exports = require("pdfkit");

/***/ }),
/* 97 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 98 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 99 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var PdfTemplateService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PdfTemplateService = exports.PROPOSAL_DIVISION = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const pdf_lib_1 = __webpack_require__(101);
const fs = tslib_1.__importStar(__webpack_require__(98));
const path = tslib_1.__importStar(__webpack_require__(97));
const pizzip_1 = tslib_1.__importDefault(__webpack_require__(102));
// Define proposal division enum
var PROPOSAL_DIVISION;
(function (PROPOSAL_DIVISION) {
    PROPOSAL_DIVISION["GRC_DIVISION"] = "GRC_DIVISION";
    PROPOSAL_DIVISION["CERTIFICATION_DIVISION"] = "CERTIFICATION_DIVISION";
})(PROPOSAL_DIVISION || (exports.PROPOSAL_DIVISION = PROPOSAL_DIVISION = {}));
let PdfTemplateService = PdfTemplateService_1 = class PdfTemplateService {
    constructor() {
        this.logger = new common_1.Logger(PdfTemplateService_1.name);
        // Define table cell coordinates based on PDF template analysis
        this.TABLE_CELLS = {
            // Personnel table coordinates (first page - table section)
            personnel: {
                // Row 1 (main row for auditor information in the table)
                row1: {
                    name: { x: 200, y: 0 },
                    designation: { x: 400, y: 0 } // X position for third column (Designation / Area of Working) - adjusted
                },
                // Row 2 (backup row)
                row2: {
                    name: { x: 200, y: 0 },
                    designation: { x: 400, y: 0 } // X position for third column - adjusted
                }
            }
        };
    }
    async fillPdfTemplate(auditorName, designation, generationDate, interviewerName) {
        const formattedDate = generationDate || new Date().toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '-');
        try {
            // Load the existing PDF template
            const templatePath = path.join(__dirname, '..', '..', '..', 'libs', 'templates', 'Contract Agreement.pdf');
            const existingPdfBytes = fs.readFileSync(templatePath);
            // Load the PDF document
            const pdfDoc = await pdf_lib_1.PDFDocument.load(new Uint8Array(existingPdfBytes));
            // Get the first page (personnel table is on first page)
            const firstPage = pdfDoc.getPages()[0];
            const { height } = firstPage.getSize();
            // Get the second page (signature section is on second page)
            const secondPage = pdfDoc.getPages()[1];
            // Embed the Helvetica font
            const helveticaFont = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
            const helveticaBoldFont = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBold);
            // Calculate dynamic Y positions based on page height
            this.calculateDynamicPositions(height);
            // Fill personnel table with dynamic positioning
            this.fillPersonnelTableDynamically(firstPage, auditorName, designation, helveticaFont, helveticaBoldFont);
            // Fill signature section on second page
            this.fillSignatureSection(secondPage, auditorName, generationDate, helveticaFont, helveticaBoldFont, interviewerName);
            // Save the modified PDF
            const pdfBytes = await pdfDoc.save();
            return Buffer.from(pdfBytes);
        }
        catch (error) {
            this.logger.error('Error filling PDF template:', error);
            throw error;
        }
    }
    calculateDynamicPositions(pageHeight) {
        // Calculate Y positions dynamically based on page height
        // These values are calibrated for standard A4 page height (841.89 points)
        // Position for the top table where "Name of Certification Personnel" and "Designation / Area of Working" are located
        const baseY = pageHeight - 158; // Adjusted for 1-2px top margin to center in cell
        // Update row positions for the top table
        this.TABLE_CELLS.personnel.row1.name.y = baseY; // Row 1: Name of Certification Personnel
        this.TABLE_CELLS.personnel.row1.designation.y = baseY;
        this.TABLE_CELLS.personnel.row2.name.y = baseY - 22; // Row 2: Designation / Area of Working
        this.TABLE_CELLS.personnel.row2.designation.y = baseY - 22;
    }
    fillPersonnelTableDynamically(page, name, designation, font, boldFont) {
        // Draw the name in the first row (uppercase as per requirement) - BOLD
        page.drawText(name.toUpperCase(), {
            x: 315,
            y: this.TABLE_CELLS.personnel.row1.name.y,
            size: 12,
            font: boldFont || font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        // Draw the designation in the second row - BOLD and moved 1px down
        page.drawText(designation, {
            x: 315,
            y: this.TABLE_CELLS.personnel.row2.designation.y - 2,
            size: 11,
            font: boldFont || font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        this.logger.log(`Placed "${name}" and "${designation}" in personnel table`);
    }
    findEmptyRow(page) {
        return this.TABLE_CELLS.personnel.row1;
    }
    fillSignatureSection(page, auditorName, generationDate, font, boldFont, interviewerName) {
        const { width, height } = page.getSize();
        // Position for names in signature section (ABOVE the lines)
        const interviewerNameX = 70;
        const auditorNameX = 320;
        const nameY = 182; // Moved slightly higher to be clearly above the signature lines
        // Position for date in signature section (on same line as "Date:" label)
        const leftDateX = 70; // Position closer to "Date:" label
        const rightDateX = 355; // Adjusted to be closer to "Date:" label
        const dateY = 140; // Aligned with the "Date:" label text baseline
        // Draw the interviewer name (left side, above line) - BOLD
        page.drawText(interviewerName, {
            x: interviewerNameX,
            y: nameY,
            size: 11,
            font: boldFont,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        // Draw the auditor name (right side, above line) - BOLD
        page.drawText(auditorName.toUpperCase(), {
            x: auditorNameX,
            y: nameY,
            size: 11,
            font: boldFont,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        // Draw the date on same line as "Date:" label (Left side only) - BOLD
        page.drawText(generationDate, {
            x: leftDateX,
            y: dateY,
            size: 10,
            font: boldFont,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
    }
    /**
     * Advanced method to detect table cells in the PDF template
     * This would analyze the PDF structure to find empty cells dynamically
     */
    async detectTableCells(page) {
        // This is a placeholder for advanced cell detection
        // In a real implementation, you would:
        // 1. Analyze the PDF content for table structures
        // 2. Identify empty cells by checking for text content
        // 3. Return coordinates of empty cells
        // For now, return predefined coordinates
        return {
            emptyCells: [
                { row: 2, col: 2, x: 180, y: 0, type: 'name' },
                { row: 2, col: 3, x: 350, y: 0, type: 'designation' }
            ]
        };
    }
    /**
     * Save modified PDF to file
     */
    saveToFile(buffer, filename) {
        try {
            const uploadsDir = './uploads/certificates';
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }
            const filePath = `${uploadsDir}/${filename}`;
            fs.writeFileSync(filePath, buffer);
            return `/uploads/certificates/${filename}`;
        }
        catch (error) {
            this.logger.error('Error saving modified PDF:', error);
            throw new Error(`Failed to save modified PDF: ${error.message}`);
        }
    }
    extractDocxTemplateTags(docxPath) {
        if (!fs.existsSync(docxPath)) {
            throw new common_1.NotFoundException(`Template not found: ${docxPath}`);
        }
        const content = fs.readFileSync(docxPath);
        const zip = new pizzip_1.default(content);
        const tags = new Set();
        const regex = /\{\{([^}]+)\}\}/g;
        Object.keys(zip.files).forEach(relativePath => {
            const file = zip.files[relativePath];
            if (!relativePath.endsWith('.xml'))
                return;
            try {
                const text = file.asText();
                let match;
                while ((match = regex.exec(text))) {
                    const tag = match[1].trim();
                    if (tag)
                        tags.add(tag);
                }
            }
            catch {
                // ignore non-text entries
            }
        });
        return Array.from(tags).sort();
    }
    async fillProposalPdf(templatePath, data) {
        if (!fs.existsSync(templatePath)) {
            throw new common_1.NotFoundException(`Template not found: ${templatePath}`);
        }
        const pdfBytes = fs.readFileSync(templatePath);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(new Uint8Array(pdfBytes));
        const pages = pdfDoc.getPages();
        const pageCount = pages.length;
        const helveticaFont = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
        const helveticaBoldFont = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBold);
        // Fill cover page (page 1)
        const page1 = pages[0];
        page1.drawText(data.subject || '', { x: 90, y: 220, size: 14, font: helveticaBoldFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        page1.drawText(data.customer?.name || '', { x: 90, y: 270, size: 12, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        page1.drawText(data.proposal?.reference || '', { x: 350, y: 315, size: 12, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        page1.drawText(data.proposal?.date || '', { x: 450, y: 315, size: 12, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        // Page 2 (Cover Letter)
        const page2 = pages[1]; // 0-indexed
        // multi-line address block
        if (data.customer?.addressLines) {
            data.customer.addressLines.forEach((line, idx) => {
                page2.drawText(line, { x: 80, y: 125 + idx * 15, size: 12, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
            });
        }
        page2.drawText(data.subject || '', { x: 80, y: 195, size: 12, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        page2.drawText(data.customer?.name || '', { x: 170, y: 485, size: 12, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        // Page 3 (Scoping / Company Details)
        const page3 = pages[2];
        page3.drawText(data.customer?.name || '', { x: 190, y: 130, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        // certification vs GRC fields
        if (data.proposal?.division === PROPOSAL_DIVISION.GRC_DIVISION) {
            page3.drawText(`${data.customer?.location || ''} / ${data.customer?.headcount || ''}`, { x: 320, y: 130, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
            page3.drawText(data.customer?.business_activities || '', { x: 485, y: 130, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        }
        else {
            page3.drawText(data.customer?.headOfficeAddress || '', { x: 130, y: 130, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
            page3.drawText(data.customer?.locationAddresses || '', { x: 380, y: 130, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        }
        // first scope line
        const scopeItems = data.scope_of_services || [];
        if (scopeItems[0])
            page3.drawText(scopeItems[0], { x: 150, y: 180, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        // Page 4 (Commercial Summary)
        const page4 = pages[3];
        const services = data.services || [];
        if (data.proposal?.division === PROPOSAL_DIVISION.GRC_DIVISION) {
            const feeX = 470;
            const feeYs = [185, 215, 245, 300];
            services.forEach((service, idx) => {
                if (idx < feeYs.length) {
                    page4.drawText(service.fee || '', { x: feeX, y: feeYs[idx], size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
                }
            });
        }
        else {
            const feeX = 400;
            const feeYs = [185, 220, 280, 315, 350, 400];
            services.forEach((service, idx) => {
                if (idx < feeYs.length) {
                    page4.drawText(service.fee || '', { x: feeX, y: feeYs[idx], size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
                }
            });
            page4.drawText(data.total_fee || '', { x: feeX, y: 400, size: 12, font: helveticaBoldFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        }
        // Page 5 (Commercial Terms)
        const page5 = pages[4];
        page5.drawText(data.validity_days?.toString() || '30', { x: 245, y: 100, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        if (data.paymentTerms && data.paymentTerms.length) {
            page5.drawText(`${data.paymentTerms[0].percentage}%`, { x: 340, y: 170, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        }
        if (data.proposal?.currency === 'INR') {
            page5.drawText(data.taxRate || '', { x: 300, y: 80, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        }
        // Page 6/8 liability & signature
        const liabilityPage = pageCount >= 8 ? pages[5] : pages[5];
        liabilityPage.drawText(data.customer?.name || '', { x: 295, y: 405, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        // Signature coordinates per document
        let clientNameY = 195;
        let clientDateY = 235;
        const tpl = path.basename(templatePath).toLowerCase();
        if (tpl.includes('usa grc')) {
            clientNameY = 185;
            clientDateY = 220;
        }
        if (tpl.includes('india grc')) {
            clientNameY = 180;
            clientDateY = 215;
        }
        if (tpl.includes('usa certification') || tpl.includes('india certification')) {
            clientNameY = 195;
            clientDateY = 235;
        }
        const lastPage = pages[pageCount - 1];
        lastPage.drawText('Prashant K', { x: 170, y: clientNameY - 20, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        lastPage.drawText(data.proposal?.date || '', { x: 170, y: clientNameY - 10, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        lastPage.drawText(data.customer?.name || '', { x: 370, y: clientNameY, size: 12, font: helveticaBoldFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        lastPage.drawText(data.customer?.designation || '', { x: 370, y: clientNameY + 20, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        lastPage.drawText(data.customer?.date || '', { x: 370, y: clientDateY, size: 10, font: helveticaFont, color: (0, pdf_lib_1.rgb)(0, 0, 0) });
        const modifiedPdfBytes = await pdfDoc.save();
        return Buffer.from(modifiedPdfBytes);
    }
};
exports.PdfTemplateService = PdfTemplateService;
exports.PdfTemplateService = PdfTemplateService = PdfTemplateService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PdfTemplateService);


/***/ }),
/* 101 */
/***/ ((module) => {

module.exports = require("pdf-lib");

/***/ }),
/* 102 */
/***/ ((module) => {

module.exports = require("pizzip");

/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3FileService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_service_1 = __webpack_require__(6);
const aws_sdk_1 = __webpack_require__(104);
const node_crypto_1 = __webpack_require__(105);
let S3FileService = class S3FileService {
    constructor(configService) {
        this.configService = configService;
    }
    async s3FileUpload(dataBuffer, s3FilePath, originalName) {
        try {
            const s3Config = this.configService.get().S3_bucket;
            console.log('Loaded S3 Config:', s3Config);
            if (!s3Config.access_key_id || !s3Config.secret_access_key || !s3Config.bucket_name || !s3Config.region) {
                throw new Error('Missing required S3 configuration!');
            }
            const s3 = new aws_sdk_1.S3({
                region: s3Config.region,
                credentials: {
                    accessKeyId: s3Config.access_key_id,
                    secretAccessKey: s3Config.secret_access_key,
                },
                // Add timeout and retry configuration
                // maxRetries: 3,
                // retryDelayOptions: {
                //     customBackoff: function(retryCount) {
                //         return Math.pow(2, retryCount) * 100; // exponential backoff
                //     }
                // },
                // httpOptions: {
                //     timeout: 30000, // 30 seconds timeout
                //     connectTimeout: 10000, // 10 seconds connect timeout
                // }
            });
            // Get file extension to determine content type
            const fileExt = originalName?.split('.').pop()?.toLowerCase() || '';
            const contentTypes = {
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'png': 'image/png',
                'gif': 'image/gif',
                'pdf': 'application/pdf',
                'txt': 'text/plain',
                'html': 'text/html',
                'css': 'text/css',
                'js': 'application/javascript',
                'json': 'application/json',
                'xml': 'application/xml',
                'csv': 'text/csv',
                'doc': 'application/msword',
                'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'xls': 'application/vnd.ms-excel',
                'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'ppt': 'application/vnd.ms-powerpoint',
                'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'zip': 'application/zip',
                'rar': 'application/x-rar-compressed',
                'mp3': 'audio/mpeg',
                'wav': 'audio/wav',
                'mp4': 'video/mp4',
                'webm': 'video/webm',
                'ogg': 'video/ogg'
                // Add more content types as needed
            };
            // Default to octet-stream if type is not recognized
            const contentType = contentTypes[fileExt] || 'application/octet-stream';
            // Upload the file with content type
            await s3.upload({
                Bucket: s3Config.bucket_name,
                Body: dataBuffer,
                Key: s3FilePath,
                ACL: 'private',
                ContentType: contentType,
                // Remove ContentDisposition from here
            }).promise();
            // Generate pre-signed URL with forced download disabled
            //         const url = s3.getSignedUrl('getObject', {
            //             Bucket: s3Config.bucket_name,
            //             Key: s3FilePath,
            //             Expires: 3600, // 1 hour
            //             // Remove ResponseContentDisposition to allow browser to handle the file
            //             ResponseContentType: contentType
            //         });
            //         console.log('S3 Upload successful. File URL:', url);
            //         return url;
            //     } catch (error) {
            //         console.error('Error in s3 Upload function:', error);
            //         throw error;
            //     }
            // }
            const viewUrl = s3.getSignedUrl('getObject', {
                Bucket: s3Config.bucket_name,
                Key: s3FilePath,
                Expires: 3600,
                ResponseContentType: contentType
            });
            // Generate download URL (forces download)
            const downloadUrl = s3.getSignedUrl('getObject', {
                Bucket: s3Config.bucket_name,
                Key: s3FilePath,
                Expires: 3600,
                ResponseContentDisposition: `attachment; filename="${encodeURIComponent(originalName)}"`,
                ResponseContentType: contentType
            });
            console.log('S3 Upload successful');
            return {
                viewUrl,
                downloadUrl,
                filename: originalName,
                mimetype: contentType,
                size: dataBuffer.length
            };
        }
        catch (error) {
            console.error('Error in s3 Upload function:', error);
            throw error;
        }
    }
    getS3Path(fileName) {
        const s3Config = this.configService.get().S3_bucket;
        return `https://${s3Config.bucket_name}.s3.${s3Config.region}.amazonaws.com/${fileName}`;
    }
    async s3MultipleFileUpload(files, folderPath) {
        try {
            // Convert single file to array for consistent processing
            const filesArray = Array.isArray(files) ? files : [files];
            const uploadPromises = filesArray.map((file) => {
                const s3FilePath = `${folderPath}/${file.originalname}`;
                return this.s3FileUpload(file.buffer, s3FilePath, file.originalname);
            });
            const uploadResults = await Promise.all(uploadPromises);
            return uploadResults;
        }
        catch (error) {
            console.error('Error in multiple S3 file upload:', error);
            throw error;
        }
    }
    generateFileName(originalName) {
        const ext = originalName.split('.').pop();
        return `${Date.now()}-${(0, node_crypto_1.randomUUID)()}.${ext}`;
    }
    certificatePath(fileName) {
        return `OPMS/certificates/${fileName}`;
    }
    pdfPath(fileName) {
        return `OPMS/pdfs/${fileName}`;
    }
    imagePath(fileName) {
        return `OPMS/images/${fileName}`;
    }
    videoPath(fileName) {
        return `OPMS/videos/${fileName}`;
    }
    customPath(folder, fileName) {
        return `OPMS/${folder}/${fileName}`;
    }
    proposalPath(year, companyName, fileName) {
        const sanitizedCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '_');
        return `OPMS/proposals/${year}/${sanitizedCompanyName}/${fileName}`;
    }
    auditorPath(fileName) {
        return `OPMS/auditors/${fileName}`;
    }
    signaturePath(fileName) {
        return `OPMS/signature/${fileName}`;
    }
    /** ---------- UPLOAD HELPERS --------------- **/
    async uploadCertificate(buffer, originalName) {
        const fileName = this.generateFileName(originalName);
        const path = this.certificatePath(fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }
    async uploadPdf(buffer, originalName) {
        const fileName = this.generateFileName(originalName);
        const path = this.pdfPath(fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }
    async uploadProposalPdf(buffer, originalName, year, companyName) {
        const fileName = this.generateFileName(originalName);
        const path = this.proposalPath(year, companyName, fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }
    async uploadAuditorFile(buffer, originalName) {
        const fileName = this.generateFileName(originalName);
        const path = this.auditorPath(fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }
    async uploadSignature(buffer, originalName) {
        const fileName = this.generateFileName(originalName);
        const path = this.signaturePath(fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }
    async uploadImage(buffer, originalName) {
        const fileName = this.generateFileName(originalName);
        const path = this.imagePath(fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }
    async uploadVideo(buffer, originalName) {
        const fileName = this.generateFileName(originalName);
        const path = this.videoPath(fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }
    async uploadToFolder(folder, buffer, originalName) {
        const fileName = this.generateFileName(originalName);
        const path = this.customPath(folder, fileName);
        return this.s3FileUpload(buffer, path, originalName);
    }
};
exports.S3FileService = S3FileService;
exports.S3FileService = S3FileService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_service_1.ConfigService !== "undefined" && config_service_1.ConfigService) === "function" ? _a : Object])
], S3FileService);


/***/ }),
/* 104 */
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),
/* 105 */
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const proposal_service_1 = __webpack_require__(94);
const create_proposal_dto_1 = __webpack_require__(107);
const express_1 = __webpack_require__(109);
const response_handler_service_1 = __webpack_require__(90);
const authMiddleware_guard_1 = __webpack_require__(110);
const platform_express_1 = __webpack_require__(117);
const custom_interface_1 = __webpack_require__(118);
const proposal_entity_1 = __webpack_require__(41);
const s3File_service_1 = __webpack_require__(103);
//import { CreateProposalWithServicesDto } from '../../../../../libs/dtos/sales/create-proposal-with-services.dto';
let ProposalController = class ProposalController {
    constructor(proposalService, responseHandler, s3Service) {
        this.proposalService = proposalService;
        this.responseHandler = responseHandler;
        this.s3Service = s3Service;
    }
    async create(res, dto) {
        try {
            const proposal = await this.proposalService.createProposal(dto);
            const skipped = proposal._skippedAlreadyProposedServiceIds ?? [];
            const templateData = this.proposalService.getTemplateDataForProposal(proposal);
            const isUpdated = skipped.length > 0 || false;
            return this.responseHandler.sendSuccessResponse(res, {
                message: isUpdated
                    ? `Existing proposal updated with new services. ${skipped.length} service(s) were already in the proposal and skipped.`
                    : 'Proposal created successfully',
                data: { proposal, templateData, skippedLeadServiceIds: skipped }
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async uploadPdf(res, file, proposalId) {
        try {
            if (!file)
                throw new common_1.BadRequestException('No file uploaded');
            if (!file.originalname.match(/\.(pdf)$/))
                throw new common_1.BadRequestException('Only PDF files are allowed!');
            const result = await this.proposalService.uploadProposalFiles(proposalId, [file]);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Proposal PDF uploaded successfully',
                data: result,
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async uploadSignature(res, file) {
        try {
            if (!file)
                throw new common_1.BadRequestException('No file uploaded');
            const result = await this.proposalService.uploadSignature(file);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Signature uploaded successfully',
                data: result,
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async uploadAuditorFile(res, file) {
        try {
            if (!file)
                throw new common_1.BadRequestException('No file uploaded');
            const result = await this.proposalService.uploadAuditorFile(file);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Auditor file uploaded successfully',
                data: result,
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async preview(res, dto) {
        try {
            const preview = await this.proposalService.previewProposal(dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Proposal preview generated successfully',
                data: preview
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    // @Post('with-services')
    // @UseGuards(TokenValidationGuard)
    // async createWithServices(@Res() res: Response, @Body() dto: CreateProposalWithServicesDto) {
    //   try {
    //     const proposal = await this.proposalService.createProposalWithServices(dto);
    //     return this.responseHandler.sendSuccessResponse(res, {
    //       message: 'Proposal created successfully',
    //       data: proposal
    //     });
    //   } catch (error) {
    //     return this.responseHandler.sendErrorResponse(res, error);
    //   }
    // }
    async createWithPdf(res, dto) {
        try {
            const result = await this.proposalService.createProposalWithPdf(dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Proposal created and PDF generated successfully',
                data: result
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async createWithPdfDownload(res, dto) {
        try {
            const { proposal, pdfBuffer } = await this.proposalService.createProposalWithPdfBuffer(dto);
            const filename = `Proposal_${proposal.proposalReference.replace(/\//g, '-')}_V${proposal.version}.pdf`;
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': pdfBuffer.length,
                'Content-Transfer-Encoding': 'binary',
            });
            return res.status(common_1.HttpStatus.OK).send(pdfBuffer);
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async findAll(res, leadId, assignmentGroupId, status, search, page, limit) {
        try {
            const result = await this.proposalService.getProposals({ leadId, assignmentGroupId, status, search, page, limit });
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Proposals fetched successfully',
                data: result
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getLeadServiceStatuses(res, leadId) {
        try {
            const result = await this.proposalService.getLeadServiceStatuses(leadId);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Lead service statuses fetched successfully',
                data: result,
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async findOne(res, id) {
        try {
            const proposal = await this.proposalService.getProposal(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Proposal fetched successfully',
                data: proposal
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getPdfMeta(res, id) {
        try {
            const meta = await this.proposalService.getPdfMeta(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'PDF metadata fetched successfully',
                data: meta
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getTemplateTags(res, id) {
        try {
            const tags = await this.proposalService.getTemplateTagsForProposal(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Template tags fetched successfully',
                data: tags
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async downloadPdf(res, id) {
        try {
            const proposal = await this.proposalService.getProposal(id);
            const pdfBuffer = await this.proposalService.generatePdfFromTemplate(id);
            const filename = `Proposal_${proposal.proposalReference.replace(/\//g, '-')}_V${proposal.version}.pdf`;
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': pdfBuffer.length,
                'Content-Transfer-Encoding': 'binary',
            });
            return res.status(common_1.HttpStatus.OK).send(pdfBuffer);
        }
        catch (error) {
            console.error('downloadPdf error:', error);
            // convert to ApiErrorType if necessary
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateStatus(res, id, dto) {
        try {
            const proposal = await this.proposalService.updateStatus(id, dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Proposal status updated successfully',
                data: proposal
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async update(res, id, dto) {
        try {
            const proposal = await this.proposalService.updateProposal(id, dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Proposal updated successfully',
                data: proposal
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async remove(res, id) {
        try {
            await this.proposalService.deleteProposal(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Proposal deleted successfully'
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    //@UseGuards(TokenValidationGuard)
    async generatePdf(res, id) {
        try {
            const buffer = await this.proposalService.generatePdfFromTemplate(id);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="proposal-${id}.pdf"`,
                'Content-Length': buffer.length,
                'Content-Transfer-Encoding': 'binary',
            });
            return res.status(common_1.HttpStatus.OK).send(buffer);
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
};
exports.ProposalController = ProposalController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, typeof (_e = typeof create_proposal_dto_1.CreateProposalDto !== "undefined" && create_proposal_dto_1.CreateProposalDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload-pdf'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__param(2, (0, common_1.Query)('proposalId', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, typeof (_g = typeof custom_interface_1.FileUpload !== "undefined" && custom_interface_1.FileUpload) === "function" ? _g : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "uploadPdf", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload-signature'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, typeof (_j = typeof custom_interface_1.FileUpload !== "undefined" && custom_interface_1.FileUpload) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "uploadSignature", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload-auditor-file'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object, typeof (_l = typeof custom_interface_1.FileUpload !== "undefined" && custom_interface_1.FileUpload) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "uploadAuditorFile", null);
tslib_1.__decorate([
    (0, common_1.Post)('preview'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object, typeof (_o = typeof create_proposal_dto_1.CreateProposalDto !== "undefined" && create_proposal_dto_1.CreateProposalDto) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "preview", null);
tslib_1.__decorate([
    (0, common_1.Post)('/with-pdf'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object, typeof (_q = typeof create_proposal_dto_1.CreateProposalDto !== "undefined" && create_proposal_dto_1.CreateProposalDto) === "function" ? _q : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "createWithPdf", null);
tslib_1.__decorate([
    (0, common_1.Post)('with-pdf-download'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object, typeof (_s = typeof create_proposal_dto_1.CreateProposalDto !== "undefined" && create_proposal_dto_1.CreateProposalDto) === "function" ? _s : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "createWithPdfDownload", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Query)('leadId')),
    tslib_1.__param(2, (0, common_1.Query)('assignmentGroupId')),
    tslib_1.__param(3, (0, common_1.Query)('status')),
    tslib_1.__param(4, (0, common_1.Query)('search')),
    tslib_1.__param(5, (0, common_1.Query)('page')),
    tslib_1.__param(6, (0, common_1.Query)('limit')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_t = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _t : Object, String, String, typeof (_u = typeof proposal_entity_1.PROPOSAL_STATUS !== "undefined" && proposal_entity_1.PROPOSAL_STATUS) === "function" ? _u : Object, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('lead-services/:leadId'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('leadId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_v = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _v : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "getLeadServiceStatuses", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_w = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _w : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/pdf-meta'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_x = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _x : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "getPdfMeta", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/template-tags'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_y = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _y : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "getTemplateTags", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/pdf'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_z = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _z : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "downloadPdf", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_0 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _0 : Object, Number, typeof (_1 = typeof create_proposal_dto_1.UpdateProposalStatusDto !== "undefined" && create_proposal_dto_1.UpdateProposalStatusDto) === "function" ? _1 : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "updateStatus", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_2 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _2 : Object, Number, typeof (_3 = typeof create_proposal_dto_1.UpdateProposalDto !== "undefined" && create_proposal_dto_1.UpdateProposalDto) === "function" ? _3 : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_4 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _4 : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/generate-pdf')
    //@UseGuards(TokenValidationGuard)
    ,
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_5 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _5 : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProposalController.prototype, "generatePdf", null);
exports.ProposalController = ProposalController = tslib_1.__decorate([
    (0, common_1.Controller)('proposals'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof proposal_service_1.ProposalService !== "undefined" && proposal_service_1.ProposalService) === "function" ? _a : Object, typeof (_b = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _b : Object, typeof (_c = typeof s3File_service_1.S3FileService !== "undefined" && s3File_service_1.S3FileService) === "function" ? _c : Object])
], ProposalController);


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProposalStatusDto = exports.UpdateProposalDto = exports.CreateProposalDto = exports.CreateProposalItemDto = exports.CreateProposalPaymentTermDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_transformer_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(17);
const mapped_types_1 = __webpack_require__(108);
const proposal_entity_1 = __webpack_require__(41);
class CreateProposalPaymentTermDto {
}
exports.CreateProposalPaymentTermDto = CreateProposalPaymentTermDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalPaymentTermDto.prototype, "milestoneName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    tslib_1.__metadata("design:type", Number)
], CreateProposalPaymentTermDto.prototype, "percentage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalPaymentTermDto.prototype, "triggerEvent", void 0);
class CreateProposalItemDto {
}
exports.CreateProposalItemDto = CreateProposalItemDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateProposalItemDto.prototype, "leadServiceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalItemDto.prototype, "serviceName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalItemDto.prototype, "serviceType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalItemDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateProposalItemDto.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CreateProposalItemDto.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateProposalItemDto.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalItemDto.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    tslib_1.__metadata("design:type", Number)
], CreateProposalItemDto.prototype, "discount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    tslib_1.__metadata("design:type", Number)
], CreateProposalItemDto.prototype, "taxPercentage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateProposalPaymentTermDto),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateProposalItemDto.prototype, "paymentTerms", void 0);
class CreateProposalDto {
}
exports.CreateProposalDto = CreateProposalDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Object)
], CreateProposalDto.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalDto.prototype, "assignmentGroupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], CreateProposalDto.prototype, "proposalDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], CreateProposalDto.prototype, "validUntil", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(proposal_entity_1.SUBMITTED_BY),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof proposal_entity_1.SUBMITTED_BY !== "undefined" && proposal_entity_1.SUBMITTED_BY) === "function" ? _e : Object)
], CreateProposalDto.prototype, "submittedBy", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(proposal_entity_1.PROPOSAL_DIVISION),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_f = typeof proposal_entity_1.PROPOSAL_DIVISION !== "undefined" && proposal_entity_1.PROPOSAL_DIVISION) === "function" ? _f : Object)
], CreateProposalDto.prototype, "division", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalDto.prototype, "subject", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalDto.prototype, "introduction", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalDto.prototype, "termsAndConditions", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalDto.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateProposalItemDto),
    tslib_1.__metadata("design:type", Array)
], CreateProposalDto.prototype, "items", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateProposalPaymentTermDto),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateProposalDto.prototype, "paymentTerms", void 0);
class UpdateProposalDto extends (0, mapped_types_1.PartialType)(CreateProposalDto) {
}
exports.UpdateProposalDto = UpdateProposalDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(proposal_entity_1.PROPOSAL_STATUS),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_g = typeof proposal_entity_1.PROPOSAL_STATUS !== "undefined" && proposal_entity_1.PROPOSAL_STATUS) === "function" ? _g : Object)
], UpdateProposalDto.prototype, "status", void 0);
class UpdateProposalStatusDto {
}
exports.UpdateProposalStatusDto = UpdateProposalStatusDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(proposal_entity_1.PROPOSAL_STATUS),
    tslib_1.__metadata("design:type", typeof (_h = typeof proposal_entity_1.PROPOSAL_STATUS !== "undefined" && proposal_entity_1.PROPOSAL_STATUS) === "function" ? _h : Object)
], UpdateProposalStatusDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProposalStatusDto.prototype, "notes", void 0);


/***/ }),
/* 108 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 109 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckIfAdminGuard = exports.KeyValidationGuard = exports.OptionalTokenValidationAndGuestUserGuard = exports.TokenValidationAndGuestUserGuard = exports.TokenValidationGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const authMiddleware_1 = __webpack_require__(111);
let TokenValidationGuard = class TokenValidationGuard {
    constructor(tokenValidationMiddleware) {
        this.tokenValidationMiddleware = tokenValidationMiddleware;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.tokenValidationMiddleware.use(request, response, (err) => {
                if (err) {
                    console.log("Error token validation", err);
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
};
exports.TokenValidationGuard = TokenValidationGuard;
exports.TokenValidationGuard = TokenValidationGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof authMiddleware_1.TokenValidationMiddleware !== "undefined" && authMiddleware_1.TokenValidationMiddleware) === "function" ? _a : Object])
], TokenValidationGuard);
let TokenValidationAndGuestUserGuard = class TokenValidationAndGuestUserGuard {
    constructor(tokenValidationAndGuestMiddleware) {
        this.tokenValidationAndGuestMiddleware = tokenValidationAndGuestMiddleware;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.tokenValidationAndGuestMiddleware.use(request, response, (err) => {
                if (err) {
                    console.log("Error token validation", err);
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
};
exports.TokenValidationAndGuestUserGuard = TokenValidationAndGuestUserGuard;
exports.TokenValidationAndGuestUserGuard = TokenValidationAndGuestUserGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof authMiddleware_1.TokenValidationAndGuestMiddleware !== "undefined" && authMiddleware_1.TokenValidationAndGuestMiddleware) === "function" ? _b : Object])
], TokenValidationAndGuestUserGuard);
let OptionalTokenValidationAndGuestUserGuard = class OptionalTokenValidationAndGuestUserGuard {
    constructor(optionalTokenValidationAndGuestMiddleware) {
        this.optionalTokenValidationAndGuestMiddleware = optionalTokenValidationAndGuestMiddleware;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.optionalTokenValidationAndGuestMiddleware.use(request, response, (err) => {
                if (err) {
                    console.log("Error token validation", err);
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
};
exports.OptionalTokenValidationAndGuestUserGuard = OptionalTokenValidationAndGuestUserGuard;
exports.OptionalTokenValidationAndGuestUserGuard = OptionalTokenValidationAndGuestUserGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof authMiddleware_1.OptionalTokenValidationAndGuestMiddleware !== "undefined" && authMiddleware_1.OptionalTokenValidationAndGuestMiddleware) === "function" ? _c : Object])
], OptionalTokenValidationAndGuestUserGuard);
let KeyValidationGuard = class KeyValidationGuard {
    constructor(KeyValidationMiddleware) {
        this.KeyValidationMiddleware = KeyValidationMiddleware;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.KeyValidationMiddleware.use(request, response, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
};
exports.KeyValidationGuard = KeyValidationGuard;
exports.KeyValidationGuard = KeyValidationGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof authMiddleware_1.KeyValidationMiddleware !== "undefined" && authMiddleware_1.KeyValidationMiddleware) === "function" ? _d : Object])
], KeyValidationGuard);
let CheckIfAdminGuard = class CheckIfAdminGuard {
    constructor(checkIfAdmin) {
        this.checkIfAdmin = checkIfAdmin;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.checkIfAdmin.use(request, response, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
};
exports.CheckIfAdminGuard = CheckIfAdminGuard;
exports.CheckIfAdminGuard = CheckIfAdminGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof authMiddleware_1.checkIfAdmin !== "undefined" && authMiddleware_1.checkIfAdmin) === "function" ? _e : Object])
], CheckIfAdminGuard);


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkIfAdminUser = exports.checkIfAdmin = exports.KeyValidationMiddleware = exports.OptionalTokenValidationAndGuestMiddleware = exports.TokenValidationAndGuestMiddleware = exports.TokenValidationMiddleware = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const commonConstants_1 = __webpack_require__(19);
const jwt_service_1 = __webpack_require__(112);
const src_1 = __webpack_require__(114);
const response_handler_service_1 = __webpack_require__(90);
const userContants_1 = __webpack_require__(16);
const config_service_1 = __webpack_require__(6);
const messageConstants_1 = __webpack_require__(116);
// interface NestMiddlewareExtended
// {
//   use(req: Request, res: Response, tokenType: TOKEN_TYPE, next: (error?: Error | any) => void): any;
// }
let TokenValidationMiddleware = class TokenValidationMiddleware {
    constructor(jwtService, LoginSessionModel, ResponseHandler) {
        this.jwtService = jwtService;
        this.LoginSessionModel = LoginSessionModel;
        this.ResponseHandler = ResponseHandler;
    }
    async use(req, res, next) {
        const errorResponse = {
            statusCode: commonConstants_1.ERROR_CODES.JWT_TOKEN_INVALID, message: commonConstants_1.ErrorMessages.JWT_TOKEN_INVALID, extraError: '', name: ''
        };
        try {
            const accessToken = req.headers['accesstoken'] || null;
            const { verified, payload, errorCode, errorMessage } = await this.jwtService.verifyJWTToken(accessToken);
            if (verified && payload) {
                if (payload.tokenType != commonConstants_1.TOKEN_TYPE.USER_LOGIN) {
                    this.ResponseHandler.sendErrorResponse(res, errorResponse);
                }
                else {
                    const loginSession = await this.LoginSessionModel.getLoginSession(payload.sessionId);
                    if (loginSession && loginSession.loginStatus == userContants_1.SESSION_STATUS.LOGGED_IN) {
                        req['userPayload'] = payload;
                        req.user = {
                            id: payload.referenceId,
                            name: payload.name,
                            user_group: payload.user_group
                        };
                        req.user_group = payload.user_group;
                        req.modules = payload.modules || [];
                        req.department = payload.department || [];
                        req.permissionId = payload.permissionId;
                        next();
                    }
                    else if (loginSession && loginSession.loginStatus == userContants_1.SESSION_STATUS.BLOCKED) {
                        errorResponse.statusCode = commonConstants_1.ERROR_CODES.BLOCKED_USER;
                        errorResponse.message = messageConstants_1.COMMON_MSG.BLOCKED_USER;
                        this.ResponseHandler.sendErrorResponse(res, errorResponse);
                    }
                    else {
                        errorResponse.statusCode = commonConstants_1.ERROR_CODES.NOT_AUTHORIZED;
                        errorResponse.message = commonConstants_1.ErrorMessages.NOT_AUTHORIZED;
                        this.ResponseHandler.sendErrorResponse(res, errorResponse);
                    }
                }
            }
            else {
                errorResponse.statusCode = errorCode;
                errorResponse.message = errorMessage;
                this.ResponseHandler.sendErrorResponse(res, errorResponse);
            }
        }
        catch (error) {
            errorResponse.extraError = error;
            this.ResponseHandler.sendErrorResponse(res, errorResponse);
        }
    }
};
exports.TokenValidationMiddleware = TokenValidationMiddleware;
exports.TokenValidationMiddleware = TokenValidationMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_service_1.JwtService !== "undefined" && jwt_service_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoginSessionRepository !== "undefined" && src_1.LoginSessionRepository) === "function" ? _b : Object, typeof (_c = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _c : Object])
], TokenValidationMiddleware);
let TokenValidationAndGuestMiddleware = class TokenValidationAndGuestMiddleware {
    constructor(jwtService, LoginSessionModel, ResponseHandler) {
        this.jwtService = jwtService;
        this.LoginSessionModel = LoginSessionModel;
        this.ResponseHandler = ResponseHandler;
    }
    async use(req, res, next) {
        const errorResponse = {
            statusCode: commonConstants_1.ERROR_CODES.JWT_TOKEN_INVALID, message: commonConstants_1.ErrorMessages.JWT_TOKEN_INVALID, extraError: '', name: ''
        };
        try {
            const accessToken = req.headers['accesstoken'] || null;
            if (accessToken == "null" || !accessToken) {
                next();
            }
            else {
                const { verified, payload, errorCode, errorMessage } = await this.jwtService.verifyJWTToken(accessToken);
                if (verified && payload) {
                    if (payload.tokenType && payload.tokenType == commonConstants_1.TOKEN_TYPE.GUEST_LOGIN) {
                        req['userPayload'] = payload;
                        next();
                    }
                    else if (payload.tokenType && payload.tokenType == commonConstants_1.TOKEN_TYPE.USER_LOGIN) {
                        const loginSession = await this.LoginSessionModel.getLoginSession(payload.sessionId);
                        if (loginSession && loginSession.loginStatus == userContants_1.SESSION_STATUS.LOGGED_IN) {
                            req['userPayload'] = payload;
                            req.user = {
                                id: payload.referenceId,
                                name: payload.name,
                                user_group: payload.user_group
                            };
                            req.user_group = payload.user_group;
                            req.modules = payload.modules || [];
                            req.permissionId = payload.permissionId;
                            next();
                        }
                        else if (loginSession && loginSession.loginStatus == userContants_1.SESSION_STATUS.BLOCKED) {
                            errorResponse.statusCode = commonConstants_1.ERROR_CODES.BLOCKED_USER;
                            errorResponse.message = messageConstants_1.COMMON_MSG.BLOCKED_USER;
                            this.ResponseHandler.sendErrorResponse(res, errorResponse);
                        }
                        else {
                            errorResponse.statusCode = commonConstants_1.ERROR_CODES.NOT_AUTHORIZED;
                            errorResponse.message = commonConstants_1.ErrorMessages.NOT_AUTHORIZED;
                            this.ResponseHandler.sendErrorResponse(res, errorResponse);
                        }
                    }
                    else {
                        errorResponse.statusCode = commonConstants_1.ERROR_CODES.NOT_AUTHORIZED;
                        errorResponse.message = commonConstants_1.ErrorMessages.NOT_AUTHORIZED;
                        this.ResponseHandler.sendErrorResponse(res, errorResponse);
                    }
                }
                else {
                    errorResponse.statusCode = errorCode;
                    errorResponse.message = errorMessage;
                    this.ResponseHandler.sendErrorResponse(res, errorResponse);
                }
            }
        }
        catch (error) {
            errorResponse.extraError = error;
            this.ResponseHandler.sendErrorResponse(res, errorResponse);
        }
    }
};
exports.TokenValidationAndGuestMiddleware = TokenValidationAndGuestMiddleware;
exports.TokenValidationAndGuestMiddleware = TokenValidationAndGuestMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof jwt_service_1.JwtService !== "undefined" && jwt_service_1.JwtService) === "function" ? _d : Object, typeof (_e = typeof src_1.LoginSessionRepository !== "undefined" && src_1.LoginSessionRepository) === "function" ? _e : Object, typeof (_f = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _f : Object])
], TokenValidationAndGuestMiddleware);
let OptionalTokenValidationAndGuestMiddleware = class OptionalTokenValidationAndGuestMiddleware {
    constructor(jwtService, LoginSessionModel, ResponseHandler) {
        this.jwtService = jwtService;
        this.LoginSessionModel = LoginSessionModel;
        this.ResponseHandler = ResponseHandler;
    }
    async use(req, res, next) {
        const errorResponse = {
            statusCode: commonConstants_1.ERROR_CODES.JWT_TOKEN_INVALID, message: commonConstants_1.ErrorMessages.JWT_TOKEN_INVALID, extraError: '', name: ''
        };
        try {
            const accessToken = req.headers['accesstoken'] || null;
            if (!accessToken) {
                next();
            }
            else {
                const { verified, payload, errorCode, errorMessage } = await this.jwtService.verifyJWTToken(accessToken);
                if (verified && payload) {
                    if (payload.tokenType && payload.tokenType == commonConstants_1.TOKEN_TYPE.GUEST_LOGIN) {
                        req['userPayload'] = payload;
                    }
                }
                next();
            }
        }
        catch (error) {
            errorResponse.extraError = error;
            this.ResponseHandler.sendErrorResponse(res, errorResponse);
        }
    }
};
exports.OptionalTokenValidationAndGuestMiddleware = OptionalTokenValidationAndGuestMiddleware;
exports.OptionalTokenValidationAndGuestMiddleware = OptionalTokenValidationAndGuestMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof jwt_service_1.JwtService !== "undefined" && jwt_service_1.JwtService) === "function" ? _g : Object, typeof (_h = typeof src_1.LoginSessionRepository !== "undefined" && src_1.LoginSessionRepository) === "function" ? _h : Object, typeof (_j = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _j : Object])
], OptionalTokenValidationAndGuestMiddleware);
let KeyValidationMiddleware = class KeyValidationMiddleware {
    constructor(ResponseHandler, configService) {
        this.ResponseHandler = ResponseHandler;
        this.configService = configService;
    }
    use(req, res, next) {
        const errorResponse = {
            statusCode: commonConstants_1.ERROR_CODES.ACCESS_DENIED, message: commonConstants_1.ErrorMessages.NOT_AUTHORIZED, name: ""
        };
        if (this.configService.get().AUTH_KEY != req.headers.authKey) {
            this.ResponseHandler.sendErrorResponse(res, errorResponse);
        }
        else
            next();
    }
};
exports.KeyValidationMiddleware = KeyValidationMiddleware;
exports.KeyValidationMiddleware = KeyValidationMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _k : Object, typeof (_l = typeof config_service_1.ConfigService !== "undefined" && config_service_1.ConfigService) === "function" ? _l : Object])
], KeyValidationMiddleware);
let checkIfAdmin = class checkIfAdmin {
    constructor(ResponseHandler) {
        this.ResponseHandler = ResponseHandler;
    }
    use(req, res, next) {
        const errorResponse = {
            statusCode: commonConstants_1.ERROR_CODES.ACCESS_DENIED, message: commonConstants_1.ErrorMessages.NOT_AUTHORIZED, name: ""
        };
        const payload = req['userPayload'];
        if (payload.user_group != userContants_1.USER_GROUP.SUPER_ADMIN) {
            this.ResponseHandler.sendErrorResponse(res, errorResponse);
        }
        else
            next();
    }
};
exports.checkIfAdmin = checkIfAdmin;
exports.checkIfAdmin = checkIfAdmin = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _m : Object])
], checkIfAdmin);
let checkIfAdminUser = class checkIfAdminUser {
    constructor(ResponseHandler) {
        this.ResponseHandler = ResponseHandler;
    }
    use(req, res, next) {
        const errorResponse = {
            statusCode: commonConstants_1.ERROR_CODES.ACCESS_DENIED, message: commonConstants_1.ErrorMessages.NOT_AUTHORIZED, name: ""
        };
        console.log("payload", req['userPayload']);
        const payload = req['userPayload'];
        if (payload.user_group != userContants_1.USER_GROUP.SUPER_ADMIN && payload.user_group != userContants_1.USER_GROUP.ADMIN) {
            this.ResponseHandler.sendErrorResponse(res, errorResponse);
        }
        next();
    }
};
exports.checkIfAdminUser = checkIfAdminUser;
exports.checkIfAdminUser = checkIfAdminUser = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _o : Object])
], checkIfAdminUser);


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt = tslib_1.__importStar(__webpack_require__(113));
const config_service_1 = __webpack_require__(6);
const commonConstants_1 = __webpack_require__(19);
let JwtService = class JwtService {
    constructor(configService) {
        this.configService = configService;
    }
    getJWTTokenInfo() {
        const expiryTimeInSecs = this.configService.get().JWT_EXPIRY_TIME;
        const JWTSecretKey = this.configService.get().JWT_SECRET_KEY;
        if (!JWTSecretKey) {
            throw new Error('JWT secret-key not provided');
        }
        return { expiryTimeInSecs, JWTSecretKey };
    }
    generateJWTToken(payload) {
        const { expiryTimeInSecs, JWTSecretKey } = this.getJWTTokenInfo();
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWTSecretKey, { expiresIn: expiryTimeInSecs, algorithm: 'HS512' }, (err, token) => {
                if (err || !token) {
                    const error = new Error('Error while creating JWT token');
                    error.statusCode = commonConstants_1.ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER;
                    error.extraError = err;
                    reject(error);
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    generateRefreshToken(payload) {
        const { JWTSecretKey } = this.getJWTTokenInfo();
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWTSecretKey, { expiresIn: '30d', algorithm: 'HS512' }, (err, token) => {
                if (err || !token) {
                    const error = new Error('Error while creating Refresh token');
                    reject(error);
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    generateGuestJWTToken(payload) {
        const { expiryTimeInSecs, JWTSecretKey } = this.getJWTTokenInfo();
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWTSecretKey, { expiresIn: expiryTimeInSecs, algorithm: 'HS512' }, (err, token) => {
                if (err || !token) {
                    const error = new Error('Error while creating JWT token');
                    error.statusCode = commonConstants_1.ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER;
                    error.extraError = err;
                    reject(error);
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    generateJWTNeverExpToken(payload) {
        const { JWTSecretKey } = this.getJWTTokenInfo();
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWTSecretKey, { algorithm: 'HS512' }, (err, token) => {
                if (err || !token) {
                    const error = new Error('Error while creating JWT token');
                    error.statusCode = commonConstants_1.ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER;
                    error.extraError = err;
                    reject(error);
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    verifyJWTToken(token) {
        return new Promise((resolve) => {
            if (!token) {
                resolve({ verified: false, errorMessage: commonConstants_1.ErrorMessages.NOT_AUTHORIZED, errorCode: commonConstants_1.ERROR_CODES.NOT_AUTHORIZED, payload: null });
                return;
            }
            const { JWTSecretKey } = this.getJWTTokenInfo();
            jwt.verify(token, JWTSecretKey, { algorithms: ['HS512'] }, (err, decoded) => {
                if (err || !decoded) {
                    if (err instanceof jwt.TokenExpiredError) {
                        resolve({ verified: false, errorMessage: commonConstants_1.ErrorMessages.JWT_TOKEN_EXPIRED, errorCode: commonConstants_1.ERROR_CODES.JWT_TOKEN_EXPIRED, payload: null });
                    }
                    else {
                        resolve({ verified: false, errorMessage: commonConstants_1.ErrorMessages.JWT_TOKEN_INVALID, errorCode: commonConstants_1.ERROR_CODES.JWT_TOKEN_INVALID, payload: null });
                    }
                }
                else {
                    resolve({ verified: true, errorMessage: null, errorCode: 0, payload: decoded });
                }
            });
        });
    }
    getJWTTokenPayload(token) {
        if (!token) {
            return null;
        }
        return jwt.decode(token);
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_service_1.ConfigService !== "undefined" && config_service_1.ConfigService) === "function" ? _a : Object])
], JwtService);


/***/ }),
/* 113 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(72), exports);
tslib_1.__exportStar(__webpack_require__(5), exports);
tslib_1.__exportStar(__webpack_require__(115), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
let DatabaseService = class DatabaseService {
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], DatabaseService);


/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LOGOUT_MSG = exports.SIGNUP_MSG = exports.LOGIN_MSG = exports.OTP_VERIFY_MSG = exports.COMMON_MSG = void 0;
exports.COMMON_MSG = {
    USER_NOT_EXIST: "User doesn't exist",
    INVALID_EMAIL: "Please provide a valid Email",
    INVALID_PHONE: "Please provide a valid phone number",
    REQUEST_NOT_FOUND: "Request not found",
    INVALID_REQUEST: "Invalid Request",
    EMAIL_ALREADY_EXIST: "An account with this Email already exists.",
    PHONE_ALREADY_EXIST: "An account with this phone number already exists.",
    PHONE_WTH_COUNTRY_CODE: "Please provide phone no with country code",
    BLOCKED_USER: "You have been blocked by administrator, please contact the administrator for further assistance"
};
exports.OTP_VERIFY_MSG = {
    INVALID_REQUEST: "Invalid Request",
    OTP_EXPIRE: "Your OTP has expired.",
    INCORRECT_OTP: "Incorrect OTP",
    OTP_VERIFY_SUCCESS: "Verification successful",
    OTP_SEND: "OTP has been sent to",
    PASSWORD_RESET: "Password reset successful",
};
exports.LOGIN_MSG = {
    INVALID_EMAIL_PASSWORD: "Invalid email or password",
    INACTIVE_ACCOUNT: "Inactive account",
    LOGIN_SUCCESS: "Login Successful",
    INVALID_EMAIL_PHONE: "Please provide a valid Email or Phone Number",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_PHONE_PASSWORD: "Invalid phone number or password" // Added new message
};
exports.SIGNUP_MSG = {
    INVALID_ROLE: "Invalid user roles",
    LINK_SEND: "Verification link has been sent to ",
    PROFILE_UPDATE: "Profile updated",
    EMAIL_VERIFIED: "Verification successful",
    PHONE_VERIFIED: "Verification successful",
    PERMISSION_NOT_FOUND: "Invalid permission"
};
exports.LOGOUT_MSG = {
    LOGOUT_CURRENT: "Logout successful",
    LOGOUT_ALL: "Successfully logged out from all devices."
};


/***/ }),
/* 117 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var S3Module_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3Module = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_module_1 = __webpack_require__(10);
const config_service_1 = __webpack_require__(6);
const aws_sdk_1 = __webpack_require__(104);
const s3File_service_1 = __webpack_require__(103);
let S3Module = S3Module_1 = class S3Module {
    static s3Configure(configData) {
        const { access_key_id, region, secret_access_key } = configData;
        aws_sdk_1.config.update({
            accessKeyId: access_key_id,
            secretAccessKey: secret_access_key,
            region: region,
        });
    }
    static forRoot() {
        return {
            module: S3Module_1,
            imports: [config_module_1.ConfigModule],
            providers: [
                {
                    provide: s3File_service_1.S3FileService,
                    useFactory: (configService) => {
                        // Optionally configure global aws-sdk here
                        const s3Config = configService.get().S3_bucket;
                        if (s3Config) {
                            S3Module_1.s3Configure(s3Config);
                        }
                        // Return an instance; DI will treat it as a provider
                        return new s3File_service_1.S3FileService(configService);
                    },
                    inject: [config_service_1.ConfigService],
                },
            ],
            exports: [s3File_service_1.S3FileService],
        };
    }
};
exports.S3Module = S3Module;
exports.S3Module = S3Module = S3Module_1 = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_module_1.ConfigModule],
        providers: [s3File_service_1.S3FileService],
        exports: [s3File_service_1.S3FileService],
    })
], S3Module);


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClosureModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const proposal_acceptance_entity_1 = __webpack_require__(66);
const proposal_entity_1 = __webpack_require__(41);
const lead_entity_1 = __webpack_require__(39);
const project_entity_1 = __webpack_require__(67);
const department_entity_1 = __webpack_require__(22);
const closure_service_1 = __webpack_require__(121);
const closure_controller_1 = __webpack_require__(122);
const database_module_1 = __webpack_require__(5);
const config_module_1 = __webpack_require__(10);
const response_handler_module_1 = __webpack_require__(89);
const jwt_service_1 = __webpack_require__(112);
const authMiddleware_1 = __webpack_require__(111);
const authMiddleware_guard_1 = __webpack_require__(110);
const s3_module_1 = __webpack_require__(119);
let ClosureModule = class ClosureModule {
};
exports.ClosureModule = ClosureModule;
exports.ClosureModule = ClosureModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            config_module_1.ConfigModule,
            response_handler_module_1.ResponseHandlerModule,
            s3_module_1.S3Module,
            typeorm_1.TypeOrmModule.forFeature([proposal_acceptance_entity_1.ProposalAcceptance, proposal_entity_1.Proposal, lead_entity_1.Lead, project_entity_1.Project, department_entity_1.Department])
        ],
        providers: [
            closure_service_1.ClosureService,
            jwt_service_1.JwtService,
            authMiddleware_1.TokenValidationMiddleware,
            authMiddleware_guard_1.TokenValidationGuard,
            authMiddleware_guard_1.CheckIfAdminGuard,
            authMiddleware_1.checkIfAdmin
        ],
        controllers: [closure_controller_1.ClosureController],
        exports: [closure_service_1.ClosureService]
    })
], ClosureModule);


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClosureService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(11);
const proposal_acceptance_entity_1 = __webpack_require__(66);
const proposal_entity_1 = __webpack_require__(41);
const lead_entity_1 = __webpack_require__(39);
const project_entity_1 = __webpack_require__(67);
const department_entity_1 = __webpack_require__(22);
const salesConstants_1 = __webpack_require__(48);
const s3File_service_1 = __webpack_require__(103);
let ClosureService = class ClosureService {
    constructor(acceptanceRepo, projectRepo, departmentRepo, dataSource, s3Service) {
        this.acceptanceRepo = acceptanceRepo;
        this.projectRepo = projectRepo;
        this.departmentRepo = departmentRepo;
        this.dataSource = dataSource;
        this.s3Service = s3Service;
    }
    async generateProjectCode(manager) {
        const year = new Date().getFullYear();
        const count = await manager.createQueryBuilder(project_entity_1.Project, 'project')
            .select('COUNT(project.id)', 'count')
            .where('project.projectCode LIKE :projectCode', { projectCode: `PRJ/${year}%` })
            .getRawOne();
        const countVal = count ? Number(count.count) : 0;
        const seq = String(countVal + 1).padStart(3, '0');
        return `PRJ/${year}/${seq}`;
    }
    async uploadProposalFiles(proposalId, files) {
        const proposal = await this.dataSource.manager.findOne(proposal_entity_1.Proposal, {
            where: { id: proposalId },
            relations: ['lead', 'lead.customer']
        });
        if (!proposal) {
            throw new common_1.NotFoundException('Proposal not found');
        }
        const companyName = proposal.lead?.customer?.name || 'Unknown_Company';
        const year = new Date().getFullYear().toString();
        const uploadResults = [];
        for (const file of files) {
            const uploadResult = await this.s3Service.uploadProposalPdf(file.buffer, file.originalname, year, companyName);
            uploadResults.push(uploadResult);
        }
        return uploadResults;
    }
    async acceptProposal(dto) {
        return this.dataSource.transaction(async (manager) => {
            // Handle poFileUrl (singular) from frontend for backward compatibility
            const poFileUrls = dto.poFileUrls || dto.poFileUrl;
            if (poFileUrls && !Array.isArray(poFileUrls)) {
                dto.poFileUrls = [poFileUrls];
            }
            else if (Array.isArray(poFileUrls)) {
                dto.poFileUrls = poFileUrls;
            }
            const proposal = await manager.findOne(proposal_entity_1.Proposal, {
                where: { id: Number(dto.proposalId) },
                relations: [
                    'lead',
                    'lead.customer',
                    'items',
                    'items.leadService',
                    'items.leadService.service',
                    'items.leadService.service.department'
                ]
            });
            if (!proposal)
                throw new common_1.NotFoundException('Proposal not found');
            const existing = await manager.findOne(proposal_acceptance_entity_1.ProposalAcceptance, {
                where: { proposalId: Number(dto.proposalId) }
            });
            // If a closure record already exists, we update it (Upsert behavior)
            if (existing) {
                Object.assign(existing, {
                    awardDate: dto.awardDate,
                    poNumber: dto.poNumber,
                    poFileUrls: dto.poFileUrls,
                    billingNameSameAsCustomer: dto.billingNameSameAsCustomer,
                    billToCompanyName: dto.billToCompanyName || proposal.lead?.customer?.name,
                    billToAddress: dto.billToAddress,
                    gstNumber: dto.gstNumber,
                    gstType: dto.gstType,
                    billingEmailIds: dto.billingEmailIds,
                    billingContactPerson: dto.billingContactPerson,
                    raisedFromEntity: dto.raisedFromEntity,
                    invoiceServices: dto.invoiceServices,
                    department: dto.department,
                    notes: dto.notes,
                    assignmentGroupId: proposal.assignmentGroupId || null,
                });
                return await manager.save(proposal_acceptance_entity_1.ProposalAcceptance, existing);
            }
            // If no closure exists, we proceed with creation even if proposal status is already APPROVED
            // (This handles cases where the status was updated but the closure record is missing)
            if (dto.poFileUrls && dto.poFileUrls.length > 5) {
                throw new common_1.BadRequestException('Maximum 5 PO files are allowed');
            }
            const acceptance = manager.create(proposal_acceptance_entity_1.ProposalAcceptance, {
                proposalId: Number(dto.proposalId),
                leadId: Number(proposal.leadId),
                awardDate: dto.awardDate,
                poNumber: dto.poNumber,
                poFileUrls: dto.poFileUrls,
                billingNameSameAsCustomer: dto.billingNameSameAsCustomer,
                billToCompanyName: dto.billToCompanyName || proposal.lead?.customer?.name,
                billToAddress: dto.billToAddress,
                gstNumber: dto.gstNumber,
                gstType: dto.gstType,
                billingEmailIds: dto.billingEmailIds,
                billingContactPerson: dto.billingContactPerson,
                raisedFromEntity: dto.raisedFromEntity,
                invoiceServices: dto.invoiceServices,
                department: dto.department,
                notes: dto.notes
            });
            const savedAcceptance = await manager.save(proposal_acceptance_entity_1.ProposalAcceptance, acceptance);
            proposal.status = proposal_entity_1.PROPOSAL_STATUS.APPROVED;
            await manager.save(proposal_entity_1.Proposal, proposal);
            const lead = proposal.lead;
            if (lead) {
                lead.status = salesConstants_1.LEAD_STATUS.AWARDED;
                await manager.save(lead_entity_1.Lead, lead);
            }
            const assignmentMap = new Map();
            if (dto.departmentAssignments && dto.departmentAssignments.length > 0) {
                for (const assignment of dto.departmentAssignments) {
                    assignmentMap.set(assignment.departmentId, {
                        teamId: assignment.teamId,
                        assignedToUserId: assignment.assignedToUserId
                    });
                }
            }
            const departmentIds = new Set();
            for (const item of proposal.items) {
                const service = item.leadService?.service;
                const department = service?.department;
                if (department && !departmentIds.has(Number(department.id))) {
                    departmentIds.add(Number(department.id));
                    const projectCode = await this.generateProjectCode(manager);
                    const overrides = assignmentMap.get(Number(department.id));
                    const project = manager.create(project_entity_1.Project, {
                        projectCode,
                        name: `${service.name} Project - ${lead?.enquiryId || lead?.id}`,
                        department,
                        departmentId: Number(department.id),
                        teamId: overrides?.teamId || null,
                        assignedToUserId: overrides?.assignedToUserId || null,
                        lead,
                        leadId: lead?.id,
                        proposal,
                        proposalId: proposal.id,
                        closureId: savedAcceptance.id,
                        startDate: dto.awardDate,
                        status: salesConstants_1.PROJECT_STATUS.PENDING
                    });
                    await manager.save(project_entity_1.Project, project);
                }
            }
            const result = await manager.findOne(proposal_acceptance_entity_1.ProposalAcceptance, {
                where: { id: savedAcceptance.id },
                relations: [
                    'proposal',
                    'proposal.items',
                    'proposal.items.leadService',
                    'proposal.items.leadService.service',
                    'proposal.paymentTerms',
                    'lead',
                    'lead.customer',
                    'lead.customer.contacts'
                ]
            });
            return result ?? savedAcceptance;
        });
    }
    async getClosures(query) {
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        const qb = this.acceptanceRepo.createQueryBuilder('closure')
            .leftJoinAndSelect('closure.proposal', 'proposal')
            .leftJoinAndSelect('proposal.items', 'proposalItems')
            .leftJoinAndSelect('proposalItems.leadService', 'leadService')
            .leftJoinAndSelect('leadService.service', 'service')
            .leftJoinAndSelect('proposal.paymentTerms', 'paymentTerms')
            .leftJoinAndSelect('closure.lead', 'lead')
            .leftJoinAndSelect('closure.accountDepartment', 'accountDepartment')
            .leftJoinAndSelect('lead.customer', 'customer')
            .orderBy('closure.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        if (query?.leadId) {
            qb.where('closure.leadId = :leadId', { leadId: query.leadId });
        }
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async getClosure(id) {
        const closure = await this.acceptanceRepo.findOne({
            where: { id },
            relations: [
                'proposal',
                'proposal.items',
                'proposal.items.leadService',
                'proposal.items.leadService.service',
                'proposal.paymentTerms',
                'lead',
                'lead.customer',
                'lead.customer.contacts',
                'accountDepartment'
            ]
        });
        if (!closure)
            throw new common_1.NotFoundException('Closure not found');
        return closure;
    }
    async updateClosure(id, dto) {
        const closure = await this.acceptanceRepo.findOne({ where: { id } });
        if (!closure)
            throw new common_1.NotFoundException('Closure not found');
        if (dto.poFileUrls && dto.poFileUrls.length > 5) {
            throw new common_1.BadRequestException('Maximum 5 PO files are allowed');
        }
        Object.assign(closure, dto);
        await this.acceptanceRepo.save(closure);
        return this.getClosure(id);
    }
    async deleteClosure(id) {
        const closure = await this.acceptanceRepo.findOne({ where: { id } });
        if (!closure)
            throw new common_1.NotFoundException('Closure not found');
        await this.acceptanceRepo.delete(id);
    }
    async assignDepartmentsToProjects(closureId, dto) {
        const closure = await this.acceptanceRepo.findOne({
            where: { id: closureId },
            relations: ['lead', 'proposal']
        });
        if (!closure)
            throw new common_1.NotFoundException('Closure not found');
        const departments = await this.departmentRepo.find({
            where: { id: (0, typeorm_1.In)(dto.departmentIds) }
        });
        if (departments.length === 0) {
            throw new common_1.BadRequestException('No valid departments found for the provided IDs');
        }
        const foundIds = new Set(departments.map((d) => d.id));
        const missingIds = dto.departmentIds.filter((id) => !foundIds.has(id));
        if (missingIds.length > 0) {
            throw new common_1.BadRequestException(`Departments not found: ${missingIds.join(', ')}`);
        }
        const assignmentMap = new Map();
        if (dto.teamAssignments && dto.teamAssignments.length > 0) {
            for (const assignment of dto.teamAssignments) {
                assignmentMap.set(assignment.departmentId, {
                    teamId: assignment.teamId,
                    assignedToUserId: assignment.assignedToUserId
                });
            }
        }
        const existingProjects = await this.projectRepo.find({
            where: { closureId, department: { id: (0, typeorm_1.In)(dto.departmentIds) } },
            relations: ['department']
        });
        const alreadyAssignedDeptIds = new Set(existingProjects.map((p) => p.departmentId));
        const created = [];
        const skipped = [];
        for (const department of departments) {
            if (alreadyAssignedDeptIds.has(department.id)) {
                skipped.push(department.id);
                continue;
            }
            const projectCode = await this.generateProjectCode(this.dataSource.manager);
            const overrides = assignmentMap.get(department.id);
            const project = this.projectRepo.create({
                projectCode,
                name: `${department.name} Project - ${closure.lead?.enquiryId || closure.leadId}`,
                departmentId: department.id,
                department,
                leadId: closure.leadId,
                proposalId: closure.proposalId,
                closureId,
                teamId: overrides?.teamId || null,
                assignedToUserId: overrides?.assignedToUserId || null,
                startDate: closure.awardDate,
                status: salesConstants_1.PROJECT_STATUS.PENDING
            });
            const saved = await this.projectRepo.save(project);
            created.push(saved);
        }
        return { created, skipped };
    }
    async getClosureDepartments(closureId) {
        const closure = await this.acceptanceRepo.findOne({ where: { id: closureId } });
        if (!closure)
            throw new common_1.NotFoundException('Closure not found');
        const projects = await this.projectRepo.find({
            where: { closureId },
            relations: ['department', 'team', 'assignedToUser'],
            order: { createdAt: 'ASC' }
        });
        const departments = projects.map((p) => ({
            id: p.department?.id,
            name: p.department?.name,
            code: p.department?.code,
            projectId: p.id,
            projectCode: p.projectCode,
            teamId: p.teamId,
            teamName: p.team?.name || null,
            assignedToUserId: p.assignedToUserId,
            status: p.status
        }));
        return { projects, departments };
    }
    async assignToAccount(id, dto) {
        const closure = await this.acceptanceRepo.findOne({ where: { id } });
        if (!closure)
            throw new common_1.NotFoundException('Closure not found');
        closure.accountDepartmentId = dto.accountDepartmentId;
        if (dto.billFromEntity !== undefined) {
            closure.raisedFromEntity = dto.billFromEntity;
        }
        if (dto.notes !== undefined) {
            closure.notes = dto.notes;
        }
        await this.acceptanceRepo.save(closure);
        return this.acceptanceRepo.findOne({
            where: { id },
            relations: [
                'proposal',
                'proposal.items',
                'proposal.items.leadService',
                'proposal.items.leadService.service',
                'proposal.paymentTerms',
                'lead',
                'lead.customer',
                'lead.customer.contacts',
                'accountDepartment'
            ]
        });
    }
};
exports.ClosureService = ClosureService;
exports.ClosureService = ClosureService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(proposal_acceptance_entity_1.ProposalAcceptance)),
    tslib_1.__param(1, (0, typeorm_2.InjectRepository)(project_entity_1.Project)),
    tslib_1.__param(2, (0, typeorm_2.InjectRepository)(department_entity_1.Department)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _d : Object, typeof (_e = typeof s3File_service_1.S3FileService !== "undefined" && s3File_service_1.S3FileService) === "function" ? _e : Object])
], ClosureService);


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClosureController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const closure_service_1 = __webpack_require__(121);
const create_closure_dto_1 = __webpack_require__(123);
const express_1 = __webpack_require__(109);
const response_handler_service_1 = __webpack_require__(90);
const authMiddleware_guard_1 = __webpack_require__(110);
const platform_express_1 = __webpack_require__(117);
let ClosureController = class ClosureController {
    constructor(closureService, responseHandler) {
        this.closureService = closureService;
        this.responseHandler = responseHandler;
    }
    async create(res, dto) {
        try {
            const closure = await this.closureService.acceptProposal(dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Closure created successfully',
                data: closure
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async uploadPO(res, files, proposalId) {
        try {
            if (!files || files.length === 0) {
                throw new common_1.BadRequestException('No files uploaded');
            }
            for (const file of files) {
                if (!file.originalname.match(/\.(pdf)$/)) {
                    throw new common_1.BadRequestException('Only PDF files are allowed!');
                }
            }
            const results = await this.closureService.uploadProposalFiles(proposalId, files);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Files uploaded successfully',
                data: results,
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async findAll(res, leadId, page, limit) {
        try {
            const result = await this.closureService.getClosures({ leadId, page, limit });
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Closures fetched successfully',
                data: result
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async findOne(res, id) {
        try {
            const closure = await this.closureService.getClosure(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Closure fetched successfully',
                data: closure
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async update(res, id, dto) {
        try {
            const closure = await this.closureService.updateClosure(id, dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Closure updated successfully',
                data: closure
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async remove(res, id) {
        try {
            await this.closureService.deleteClosure(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Closure deleted successfully'
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async assignDepartments(res, id, dto) {
        try {
            const result = await this.closureService.assignDepartmentsToProjects(id, dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: `${result.created.length} department(s) assigned as projects. ${result.skipped.length} already existed.`,
                data: result
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getClosureDepartments(res, id) {
        try {
            const result = await this.closureService.getClosureDepartments(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Closure departments fetched successfully',
                data: result
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async assignToAccount(res, id, dto) {
        try {
            const closure = await this.closureService.assignToAccount(id, dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Closure assigned to account department successfully',
                data: closure
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
};
exports.ClosureController = ClosureController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof create_closure_dto_1.CreateClosureDto !== "undefined" && create_closure_dto_1.CreateClosureDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClosureController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload-pdf'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        limits: {
            fileSize: 10 * 1024 * 1024 // 10MB per file
        }
    })),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.UploadedFiles)()),
    tslib_1.__param(2, (0, common_1.Query)('proposalId', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, Array, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ClosureController.prototype, "uploadPO", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Query)('leadId')),
    tslib_1.__param(2, (0, common_1.Query)('page')),
    tslib_1.__param(3, (0, common_1.Query)('limit')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ClosureController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ClosureController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, Number, typeof (_j = typeof create_closure_dto_1.UpdateClosureDto !== "undefined" && create_closure_dto_1.UpdateClosureDto) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClosureController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ClosureController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/assign-departments'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object, Number, typeof (_m = typeof create_closure_dto_1.AssignDepartmentsDto !== "undefined" && create_closure_dto_1.AssignDepartmentsDto) === "function" ? _m : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClosureController.prototype, "assignDepartments", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/departments'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ClosureController.prototype, "getClosureDepartments", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/assign-account'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object, Number, typeof (_q = typeof create_closure_dto_1.AssignToAccountDto !== "undefined" && create_closure_dto_1.AssignToAccountDto) === "function" ? _q : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClosureController.prototype, "assignToAccount", null);
exports.ClosureController = ClosureController = tslib_1.__decorate([
    (0, common_1.Controller)('closures')
    // @UseGuards(TokenValidationGuard)
    ,
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof closure_service_1.ClosureService !== "undefined" && closure_service_1.ClosureService) === "function" ? _a : Object, typeof (_b = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _b : Object])
], ClosureController);


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateClosureDto = exports.AssignDepartmentsDto = exports.AssignToAccountDto = exports.CreateClosureDto = exports.DepartmentTeamAssignmentDto = exports.BillingContactPersonDto = exports.BillToAddressDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_transformer_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(17);
const mapped_types_1 = __webpack_require__(108);
class BillToAddressDto {
}
exports.BillToAddressDto = BillToAddressDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BillToAddressDto.prototype, "addressLine1", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BillToAddressDto.prototype, "addressLine2", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BillToAddressDto.prototype, "city", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BillToAddressDto.prototype, "state", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BillToAddressDto.prototype, "country", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BillToAddressDto.prototype, "postalCode", void 0);
class BillingContactPersonDto {
}
exports.BillingContactPersonDto = BillingContactPersonDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BillingContactPersonDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BillingContactPersonDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BillingContactPersonDto.prototype, "phone", void 0);
class DepartmentTeamAssignmentDto {
}
exports.DepartmentTeamAssignmentDto = DepartmentTeamAssignmentDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], DepartmentTeamAssignmentDto.prototype, "departmentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], DepartmentTeamAssignmentDto.prototype, "teamId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], DepartmentTeamAssignmentDto.prototype, "assignedToUserId", void 0);
class CreateClosureDto {
}
exports.CreateClosureDto = CreateClosureDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateClosureDto.prototype, "proposalId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateClosureDto.prototype, "awardDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClosureDto.prototype, "poNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateClosureDto.prototype, "poFileUrls", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateClosureDto.prototype, "billingNameSameAsCustomer", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClosureDto.prototype, "billToCompanyName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BillToAddressDto),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", BillToAddressDto)
], CreateClosureDto.prototype, "billToAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClosureDto.prototype, "gstNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClosureDto.prototype, "gstType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateClosureDto.prototype, "billingEmailIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BillingContactPersonDto),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", BillingContactPersonDto)
], CreateClosureDto.prototype, "billingContactPerson", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClosureDto.prototype, "raisedFromEntity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClosureDto.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateClosureDto.prototype, "invoiceServices", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClosureDto.prototype, "department", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DepartmentTeamAssignmentDto),
    tslib_1.__metadata("design:type", Array)
], CreateClosureDto.prototype, "departmentAssignments", void 0);
class AssignToAccountDto {
}
exports.AssignToAccountDto = AssignToAccountDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], AssignToAccountDto.prototype, "accountDepartmentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], AssignToAccountDto.prototype, "billFromEntity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], AssignToAccountDto.prototype, "notes", void 0);
class AssignDepartmentsDto {
}
exports.AssignDepartmentsDto = AssignDepartmentsDto;
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    tslib_1.__metadata("design:type", Array)
], AssignDepartmentsDto.prototype, "departmentIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DepartmentTeamAssignmentDto),
    tslib_1.__metadata("design:type", Array)
], AssignDepartmentsDto.prototype, "teamAssignments", void 0);
class UpdateClosureDto extends (0, mapped_types_1.PartialType)(CreateClosureDto) {
}
exports.UpdateClosureDto = UpdateClosureDto;


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const project_service_1 = __webpack_require__(125);
const project_controller_1 = __webpack_require__(126);
const project_entity_1 = __webpack_require__(67);
const user_entity_1 = __webpack_require__(13);
const team_entity_1 = __webpack_require__(26);
const config_module_1 = __webpack_require__(10);
const database_module_1 = __webpack_require__(5);
const response_handler_module_1 = __webpack_require__(89);
const jwt_service_1 = __webpack_require__(112);
const authMiddleware_1 = __webpack_require__(111);
const authMiddleware_guard_1 = __webpack_require__(110);
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            config_module_1.ConfigModule,
            response_handler_module_1.ResponseHandlerModule,
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project, user_entity_1.User, team_entity_1.Team])
        ],
        providers: [
            project_service_1.ProjectService,
            jwt_service_1.JwtService,
            authMiddleware_1.TokenValidationMiddleware,
            authMiddleware_guard_1.TokenValidationGuard
        ],
        controllers: [project_controller_1.ProjectController],
        exports: [project_service_1.ProjectService]
    })
], ProjectModule);


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectService = exports.AssignProjectTeamDto = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const project_entity_1 = __webpack_require__(67);
const user_entity_1 = __webpack_require__(13);
const team_entity_1 = __webpack_require__(26);
class AssignProjectTeamDto {
}
exports.AssignProjectTeamDto = AssignProjectTeamDto;
let ProjectService = class ProjectService {
    constructor(projectRepo, userRepo, teamRepo) {
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
        this.teamRepo = teamRepo;
    }
    async getProjectsForUser(userId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['departments', 'teams', 'teams.department', 'permission']
        });
        if (!user)
            return [];
        const isAdmin = user.roleName === 'Admin' || user.roleName === 'Super Admin';
        if (isAdmin) {
            return this.projectRepo.find({
                relations: ['department', 'lead', 'lead.customer', 'proposal', 'team', 'assignedToUser']
            });
        }
        const allowedDeptIds = new Set();
        if (user.departments) {
            user.departments.forEach((d) => allowedDeptIds.add(d.id));
        }
        const userTeams = user.teams;
        if (userTeams) {
            userTeams.forEach((t) => {
                if (t.department) {
                    allowedDeptIds.add(t.department.id);
                }
            });
        }
        if (allowedDeptIds.size === 0) {
            return [];
        }
        return this.projectRepo.find({
            where: {
                department: { id: (0, typeorm_2.In)([...allowedDeptIds]) }
            },
            relations: ['department', 'lead', 'lead.customer', 'proposal', 'team', 'assignedToUser']
        });
    }
    async getProject(id) {
        const project = await this.projectRepo.findOne({
            where: { id },
            relations: [
                'department',
                'lead',
                'lead.customer',
                'proposal',
                'proposal.items',
                'proposal.paymentTerms',
                'team',
                'team.members',
                'assignedToUser'
            ]
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    async getProjectsByClosure(closureId) {
        return this.projectRepo.find({
            where: { closureId },
            relations: ['department', 'team', 'assignedToUser', 'lead', 'lead.customer']
        });
    }
    async assignTeamToProject(projectId, dto) {
        const project = await this.projectRepo.findOne({ where: { id: projectId } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (dto.teamId !== undefined) {
            if (dto.teamId === null) {
                project.teamId = null;
            }
            else {
                const team = await this.teamRepo.findOne({
                    where: { id: dto.teamId, departmentId: project.departmentId }
                });
                if (!team) {
                    throw new common_1.BadRequestException(`Team ${dto.teamId} does not belong to the project department`);
                }
                project.teamId = dto.teamId;
            }
        }
        if (dto.assignedToUserId !== undefined) {
            project.assignedToUserId = dto.assignedToUserId || null;
        }
        if (dto.status !== undefined) {
            project.status = dto.status;
        }
        if (dto.notes !== undefined) {
            project.notes = dto.notes;
        }
        if (dto.endDate !== undefined) {
            project.endDate = dto.endDate;
        }
        await this.projectRepo.save(project);
        return this.getProject(projectId);
    }
    async updateProjectStatus(projectId, status) {
        const project = await this.projectRepo.findOne({ where: { id: projectId } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        project.status = status;
        await this.projectRepo.save(project);
        return this.getProject(projectId);
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], ProjectService);


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const express_1 = __webpack_require__(109);
const project_service_1 = __webpack_require__(125);
const response_handler_service_1 = __webpack_require__(90);
const authMiddleware_guard_1 = __webpack_require__(110);
const salesConstants_1 = __webpack_require__(48);
let ProjectController = class ProjectController {
    constructor(projectService, responseHandler) {
        this.projectService = projectService;
        this.responseHandler = responseHandler;
    }
    async getProjects(res, req) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return this.responseHandler.sendErrorResponse(res, {
                    message: 'Unauthorized',
                    status: 401
                });
            }
            const projects = await this.projectService.getProjectsForUser(Number(userId));
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Projects fetched successfully',
                data: projects
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getProjectsByClosure(res, closureId) {
        try {
            const projects = await this.projectService.getProjectsByClosure(closureId);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Projects fetched successfully',
                data: projects
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getProject(res, id) {
        try {
            const project = await this.projectService.getProject(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Project fetched successfully',
                data: project
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async assignTeam(res, id, dto) {
        try {
            const project = await this.projectService.assignTeamToProject(id, dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Project assigned successfully',
                data: project
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateStatus(res, id, status) {
        try {
            const project = await this.projectService.updateProjectStatus(id, status);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Project status updated successfully',
                data: project
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
};
exports.ProjectController = ProjectController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjects", null);
tslib_1.__decorate([
    (0, common_1.Get)('closure/:closureId'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('closureId', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectsByClosure", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "getProject", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/assign'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, Number, typeof (_h = typeof project_service_1.AssignProjectTeamDto !== "undefined" && project_service_1.AssignProjectTeamDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "assignTeam", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/status'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)('status')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object, Number, typeof (_k = typeof salesConstants_1.PROJECT_STATUS !== "undefined" && salesConstants_1.PROJECT_STATUS) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "updateStatus", null);
exports.ProjectController = ProjectController = tslib_1.__decorate([
    (0, common_1.Controller)('projects'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof project_service_1.ProjectService !== "undefined" && project_service_1.ProjectService) === "function" ? _a : Object, typeof (_b = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _b : Object])
], ProjectController);


/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const dashboard_controller_1 = __webpack_require__(128);
const dashboard_service_1 = __webpack_require__(129);
const lead_entity_1 = __webpack_require__(39);
const proposal_acceptance_entity_1 = __webpack_require__(66);
const project_entity_1 = __webpack_require__(67);
const proposal_entity_1 = __webpack_require__(41);
const lead_service_entity_1 = __webpack_require__(40);
const database_module_1 = __webpack_require__(5);
const config_module_1 = __webpack_require__(10);
const response_handler_module_1 = __webpack_require__(89);
const jwt_service_1 = __webpack_require__(112);
const authMiddleware_1 = __webpack_require__(111);
const authMiddleware_guard_1 = __webpack_require__(110);
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            config_module_1.ConfigModule,
            response_handler_module_1.ResponseHandlerModule,
            typeorm_1.TypeOrmModule.forFeature([lead_entity_1.Lead, proposal_acceptance_entity_1.ProposalAcceptance, project_entity_1.Project, proposal_entity_1.Proposal, lead_service_entity_1.LeadService]),
        ],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [
            dashboard_service_1.DashboardService,
            jwt_service_1.JwtService,
            authMiddleware_1.TokenValidationMiddleware,
            authMiddleware_guard_1.TokenValidationGuard,
            authMiddleware_guard_1.CheckIfAdminGuard,
            authMiddleware_1.checkIfAdmin,
        ],
        exports: [dashboard_service_1.DashboardService],
    })
], DashboardModule);


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const express_1 = __webpack_require__(109);
const dashboard_service_1 = __webpack_require__(129);
const response_handler_service_1 = __webpack_require__(90);
const authMiddleware_guard_1 = __webpack_require__(110);
const authenticated_request_interface_1 = __webpack_require__(130);
let DashboardController = class DashboardController {
    constructor(dashboardService, responseHandler) {
        this.dashboardService = dashboardService;
        this.responseHandler = responseHandler;
    }
    async getCounts(req, res) {
        try {
            const counts = await this.dashboardService.getDashboardCounts(req.user);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Dashboard counts fetched successfully',
                data: counts,
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
};
exports.DashboardController = DashboardController;
tslib_1.__decorate([
    (0, common_1.Get)('counts'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DashboardController.prototype, "getCounts", null);
exports.DashboardController = DashboardController = tslib_1.__decorate([
    (0, common_1.Controller)('dashboard'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof dashboard_service_1.DashboardService !== "undefined" && dashboard_service_1.DashboardService) === "function" ? _a : Object, typeof (_b = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _b : Object])
], DashboardController);


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const lead_entity_1 = __webpack_require__(39);
const proposal_acceptance_entity_1 = __webpack_require__(66);
const project_entity_1 = __webpack_require__(67);
const proposal_entity_1 = __webpack_require__(41);
const proposal_item_entity_1 = __webpack_require__(42);
const lead_service_entity_1 = __webpack_require__(40);
const salesConstants_1 = __webpack_require__(48);
const userContants_1 = __webpack_require__(16);
let DashboardService = class DashboardService {
    constructor(leadRepo, acceptanceRepo, projectRepo, proposalRepo, leadServiceRepo) {
        this.leadRepo = leadRepo;
        this.acceptanceRepo = acceptanceRepo;
        this.projectRepo = projectRepo;
        this.proposalRepo = proposalRepo;
        this.leadServiceRepo = leadServiceRepo;
    }
    async getDashboardCounts(actor) {
        const isAdmin = actor && [userContants_1.USER_GROUP.SUPER_ADMIN, userContants_1.USER_GROUP.ADMIN].includes(actor.user_group);
        // 1. Total Client = Count of active leads (Matches Client List API)
        const leadWhere = { isActive: true };
        if (!isAdmin && actor?.id) {
            leadWhere.createdBy = { id: actor.id };
        }
        const totalClient = await this.leadRepo.count({
            where: leadWhere
        });
        // 2. Completed Lead = Count of Closure List (ProposalAcceptance)
        const completedLeadQuery = this.acceptanceRepo.createQueryBuilder('acceptance')
            .innerJoin('acceptance.lead', 'lead');
        if (!isAdmin && actor?.id) {
            completedLeadQuery.andWhere('lead.createdBy = :actorId', { actorId: actor.id });
        }
        const completedLead = await completedLeadQuery.getCount();
        // 3. Pending Leads = Service List Count + Proposal List Count
        // Service List Count (Unique Lead + Batch pairs in LeadService not in any non-dropped Proposal)
        const serviceListQuery = this.leadServiceRepo.createQueryBuilder('ls')
            .innerJoin('ls.lead', 'lead')
            .where('lead.isActive = :isActive', { isActive: true })
            .andWhere('ls.status != :droppedStatus', { droppedStatus: lead_service_entity_1.SERVICE_STATUS.DROPPED })
            .andWhere(qb => {
            const subQuery = qb.subQuery()
                .select('pi.leadServiceId')
                .from(proposal_item_entity_1.ProposalItem, 'pi')
                .innerJoin(proposal_entity_1.Proposal, 'p', 'p.id = pi.proposalId')
                .where('p.status != :droppedProposalStatus', { droppedProposalStatus: proposal_entity_1.PROPOSAL_STATUS.DROPPED })
                .getQuery();
            return 'ls.id NOT IN ' + subQuery;
        });
        if (!isAdmin && actor?.id) {
            serviceListQuery.andWhere('lead.createdBy = :actorId', { actorId: actor.id });
        }
        const serviceListItems = await serviceListQuery
            .select('ls.leadId, ls.assignmentGroupId')
            .groupBy('ls.leadId, ls.assignmentGroupId')
            .getRawMany();
        const proposalListQuery = this.proposalRepo.createQueryBuilder('p')
            .innerJoin('p.lead', 'lead')
            .where('lead.isActive = :isActive', { isActive: true })
            .andWhere('p.status != :droppedStatus', { droppedStatus: proposal_entity_1.PROPOSAL_STATUS.DROPPED });
        if (!isAdmin && actor?.id) {
            proposalListQuery.andWhere('lead.createdBy = :actorId', { actorId: actor.id });
        }
        const proposalListCount = await proposalListQuery.getCount();
        const pendingClients = serviceListItems.length + proposalListCount;
        // 4. Drop Leads = Count of leads in the dropped list (Matches Dropped List API)
        const dropClientsQuery = this.leadRepo.createQueryBuilder('lead')
            .leftJoin('lead.leadServices', 'ls')
            .leftJoin('lead.proposals', 'p')
            .where(new typeorm_2.Brackets(qb => {
            qb.where('lead.status = :leadLostStatus', { leadLostStatus: salesConstants_1.LEAD_STATUS.LOST })
                .orWhere('p.status = :proposalDroppedStatus', { proposalDroppedStatus: proposal_entity_1.PROPOSAL_STATUS.DROPPED })
                .orWhere('ls.status = :serviceDroppedStatus', { serviceDroppedStatus: lead_service_entity_1.SERVICE_STATUS.DROPPED });
        }));
        if (!isAdmin && actor?.id) {
            dropClientsQuery.andWhere('lead.createdBy = :actorId', { actorId: actor.id });
        }
        const dropClientsCount = await dropClientsQuery
            .select('COUNT(DISTINCT lead.id)', 'count')
            .getRawOne();
        const dropClients = parseInt(dropClientsCount?.count || '0', 10);
        // 5. Pending Actions = 0 (Static for now)
        const pendingActions = 0;
        // 6. Pending to send invoices to A/C = 0 (Static for now)
        const pendingInvoices = 0;
        // --- Dynamic Sales Report (Last 6 Months) ---
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);
        sixMonthsAgo.setHours(0, 0, 0, 0);
        const salesData = await this.acceptanceRepo
            .createQueryBuilder('acceptance')
            .innerJoin('acceptance.proposal', 'proposal')
            .select("DATE_FORMAT(acceptance.awardDate, '%Y-%m')", 'monthKey')
            .addSelect('SUM(proposal.grandTotal)', 'total')
            .where('acceptance.awardDate >= :startDate', { startDate: sixMonthsAgo })
            .groupBy('monthKey')
            .orderBy('monthKey', 'ASC')
            .getRawMany();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const salesReport = [];
        for (let i = 0; i < 6; i++) {
            const d = new Date();
            d.setMonth(d.getMonth() - (5 - i));
            const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const found = salesData.find((s) => s.monthKey === monthStr);
            salesReport.push({
                month: months[d.getMonth()],
                value: found ? Number(found.total) : 0,
            });
        }
        // --- Overall Progress Metrics ---
        const totalProjects = await this.projectRepo.count();
        const completedProjectsCount = await this.projectRepo.count({
            where: { status: salesConstants_1.PROJECT_STATUS.COMPLETED },
        });
        const completedPercentage = totalProjects > 0 ? (completedProjectsCount / totalProjects) * 100 : 0;
        const distributedCount = await this.leadServiceRepo.count({
            where: { department: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
        });
        const returnCount = await this.proposalRepo.count({
            where: { status: (0, typeorm_2.In)([proposal_entity_1.PROPOSAL_STATUS.REJECTED, proposal_entity_1.PROPOSAL_STATUS.REVISED, proposal_entity_1.PROPOSAL_STATUS.EXPIRED]) },
        });
        // Recently Added Enquiries
        const recentEnquiries = await this.leadRepo.find({
            where: { isDraft: false },
            relations: ['customer', 'customer.contacts', 'customer.addresses'],
            order: { createdAt: 'DESC' },
            take: 5,
        });
        return {
            totalClient,
            completedLead,
            pendingClients,
            dropClients,
            pendingActions,
            pendingInvoices,
            overallProgress: {
                completedPercentage: Math.round(completedPercentage),
                sales: completedLead,
                distributed: distributedCount,
                return: returnCount,
            },
            recentEnquiries: recentEnquiries.map((lead) => ({
                enquiryId: lead.enquiryId,
                companyName: lead.customer?.name || 'N/A',
                created: lead.createdAt,
                status: lead.status,
                contacts: lead.customer?.contacts || [],
                addresses: lead.customer?.addresses || [],
            })),
            salesReport,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(proposal_acceptance_entity_1.ProposalAcceptance)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(proposal_entity_1.Proposal)),
    tslib_1.__param(4, (0, typeorm_1.InjectRepository)(lead_service_entity_1.LeadService)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], DashboardService);


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoiceModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const invoice_controller_1 = __webpack_require__(132);
const invoice_service_1 = __webpack_require__(133);
const invoice_report_service_1 = __webpack_require__(134);
const invoice_entity_1 = __webpack_require__(68);
const invoice_item_entity_1 = __webpack_require__(69);
const payment_record_entity_1 = __webpack_require__(70);
const proposal_acceptance_entity_1 = __webpack_require__(66);
const proposal_payment_term_entity_1 = __webpack_require__(43);
const database_module_1 = __webpack_require__(5);
const config_module_1 = __webpack_require__(10);
const response_handler_module_1 = __webpack_require__(89);
const jwt_service_1 = __webpack_require__(112);
const authMiddleware_1 = __webpack_require__(111);
const authMiddleware_guard_1 = __webpack_require__(110);
let InvoiceModule = class InvoiceModule {
};
exports.InvoiceModule = InvoiceModule;
exports.InvoiceModule = InvoiceModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            config_module_1.ConfigModule,
            response_handler_module_1.ResponseHandlerModule,
            typeorm_1.TypeOrmModule.forFeature([
                invoice_entity_1.Invoice,
                invoice_item_entity_1.InvoiceItem,
                payment_record_entity_1.PaymentRecord,
                proposal_acceptance_entity_1.ProposalAcceptance,
                proposal_payment_term_entity_1.ProposalPaymentTerm
            ])
        ],
        providers: [
            invoice_service_1.InvoiceService,
            invoice_report_service_1.InvoiceReportService,
            jwt_service_1.JwtService,
            authMiddleware_1.TokenValidationMiddleware,
            authMiddleware_guard_1.TokenValidationGuard
        ],
        controllers: [invoice_controller_1.InvoiceController],
        exports: [invoice_service_1.InvoiceService]
    })
], InvoiceModule);


/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoiceController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const express_1 = __webpack_require__(109);
const invoice_service_1 = __webpack_require__(133);
const response_handler_service_1 = __webpack_require__(90);
const authMiddleware_guard_1 = __webpack_require__(110);
const invoice_dto_1 = __webpack_require__(135);
const salesConstants_1 = __webpack_require__(48);
let InvoiceController = class InvoiceController {
    constructor(invoiceService, responseHandler) {
        this.invoiceService = invoiceService;
        this.responseHandler = responseHandler;
    }
    async create(res, dto) {
        try {
            const invoice = await this.invoiceService.createInvoice(dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Invoice created successfully',
                data: invoice
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async findAll(res, closureId, leadId, status, page, limit) {
        try {
            const result = await this.invoiceService.getInvoices({
                closureId,
                leadId,
                status,
                page,
                limit
            });
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Invoices fetched successfully',
                data: result
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async financeWindow(res, status, search, page, limit) {
        try {
            const result = await this.invoiceService.getFinanceWindowInvoices({
                status,
                search,
                page,
                limit
            });
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Finance window data fetched successfully',
                data: result
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async closureSummary(res, closureId) {
        try {
            const result = await this.invoiceService.getClosureInvoiceSummary(closureId);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Closure invoice summary fetched successfully',
                data: result
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async downloadPdf(res, id) {
        try {
            const buffer = await this.invoiceService.generateInvoicePdf(id);
            const invoice = await this.invoiceService.getInvoice(id);
            const filename = `Invoice_${invoice.invoiceNumber.replace(/\//g, '-')}.pdf`;
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': buffer.length
            });
            return res.status(200).send(buffer);
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async findOne(res, id) {
        try {
            const invoice = await this.invoiceService.getInvoice(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Invoice fetched successfully',
                data: invoice
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async update(res, id, dto) {
        try {
            const invoice = await this.invoiceService.updateInvoice(id, dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Invoice updated successfully',
                data: invoice
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateTax(res, id, dto) {
        try {
            const invoice = await this.invoiceService.updateInvoiceTax(id, dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Invoice tax updated successfully',
                data: invoice
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async markSent(res, id) {
        try {
            const invoice = await this.invoiceService.markInvoiceSent(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Invoice marked as sent',
                data: invoice
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async cancel(res, id) {
        try {
            const invoice = await this.invoiceService.cancelInvoice(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Invoice cancelled successfully',
                data: invoice
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async recordPayment(res, dto) {
        try {
            const invoice = await this.invoiceService.recordPayment(dto);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Payment recorded successfully',
                data: invoice
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getPayments(res, id) {
        try {
            const payments = await this.invoiceService.getInvoicePayments(id);
            return this.responseHandler.sendSuccessResponse(res, {
                message: 'Payments fetched successfully',
                data: payments
            });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
};
exports.InvoiceController = InvoiceController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof invoice_dto_1.CreateInvoiceDto !== "undefined" && invoice_dto_1.CreateInvoiceDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Query)('closureId')),
    tslib_1.__param(2, (0, common_1.Query)('leadId')),
    tslib_1.__param(3, (0, common_1.Query)('status')),
    tslib_1.__param(4, (0, common_1.Query)('page')),
    tslib_1.__param(5, (0, common_1.Query)('limit')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, Number, Number, typeof (_f = typeof salesConstants_1.INVOICE_STATUS !== "undefined" && salesConstants_1.INVOICE_STATUS) === "function" ? _f : Object, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('finance-window'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Query)('status')),
    tslib_1.__param(2, (0, common_1.Query)('search')),
    tslib_1.__param(3, (0, common_1.Query)('page')),
    tslib_1.__param(4, (0, common_1.Query)('limit')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, typeof (_h = typeof salesConstants_1.INVOICE_STATUS !== "undefined" && salesConstants_1.INVOICE_STATUS) === "function" ? _h : Object, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "financeWindow", null);
tslib_1.__decorate([
    (0, common_1.Get)('closure/:closureId/summary'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('closureId', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "closureSummary", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/pdf'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "downloadPdf", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object, Number, typeof (_o = typeof invoice_dto_1.UpdateInvoiceDto !== "undefined" && invoice_dto_1.UpdateInvoiceDto) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/tax'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object, Number, typeof (_q = typeof invoice_dto_1.InvoiceTaxUpdateDto !== "undefined" && invoice_dto_1.InvoiceTaxUpdateDto) === "function" ? _q : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "updateTax", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/send'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "markSent", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/cancel'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_s = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _s : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "cancel", null);
tslib_1.__decorate([
    (0, common_1.Post)('payments/record'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_t = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _t : Object, typeof (_u = typeof invoice_dto_1.RecordPaymentDto !== "undefined" && invoice_dto_1.RecordPaymentDto) === "function" ? _u : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "recordPayment", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/payments'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_v = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _v : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "getPayments", null);
exports.InvoiceController = InvoiceController = tslib_1.__decorate([
    (0, common_1.Controller)('invoices'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof invoice_service_1.InvoiceService !== "undefined" && invoice_service_1.InvoiceService) === "function" ? _a : Object, typeof (_b = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _b : Object])
], InvoiceController);


/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoiceService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(11);
const invoice_entity_1 = __webpack_require__(68);
const invoice_item_entity_1 = __webpack_require__(69);
const payment_record_entity_1 = __webpack_require__(70);
const invoice_report_service_1 = __webpack_require__(134);
const proposal_acceptance_entity_1 = __webpack_require__(66);
const proposal_payment_term_entity_1 = __webpack_require__(43);
const salesConstants_1 = __webpack_require__(48);
let InvoiceService = class InvoiceService {
    constructor(invoiceRepo, invoiceItemRepo, paymentRepo, closureRepo, paymentTermRepo, invoiceReportService, dataSource) {
        this.invoiceRepo = invoiceRepo;
        this.invoiceItemRepo = invoiceItemRepo;
        this.paymentRepo = paymentRepo;
        this.closureRepo = closureRepo;
        this.paymentTermRepo = paymentTermRepo;
        this.invoiceReportService = invoiceReportService;
        this.dataSource = dataSource;
    }
    async generateInvoiceNumber() {
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        const count = await this.invoiceRepo
            .createQueryBuilder('invoice')
            .select('COUNT(invoice.id)', 'count')
            .where('invoice.invoiceNumber LIKE :prefix', {
            prefix: `INV/${year}/${month}%`
        })
            .getRawOne();
        const seq = String((count ? Number(count.count) : 0) + 1).padStart(4, '0');
        return `INV/${year}/${month}/${seq}`;
    }
    calculateItemAmounts(item) {
        const lineTotal = item.qty * item.unitPrice;
        const discountPct = item.discount || 0;
        const discountAmount = (lineTotal * discountPct) / 100;
        const taxableAmount = lineTotal - discountAmount;
        const taxPct = item.taxPercentage || 0;
        const taxAmount = (taxableAmount * taxPct) / 100;
        const netAmount = taxableAmount + taxAmount;
        return {
            discountAmount: Number(discountAmount.toFixed(2)),
            taxableAmount: Number(taxableAmount.toFixed(2)),
            taxAmount: Number(taxAmount.toFixed(2)),
            netAmount: Number(netAmount.toFixed(2))
        };
    }
    calculateInvoiceTotals(items, taxType, cgstPct, sgstPct, igstPct, advancePaid) {
        const subTotal = items.reduce((sum, i) => sum + Number(i.unitPrice) * Number(i.qty), 0);
        const totalDiscount = items.reduce((sum, i) => sum + Number(i.discountAmount), 0);
        const taxableBase = subTotal - totalDiscount;
        let cgstAmount = 0;
        let sgstAmount = 0;
        let igstAmount = 0;
        if (taxType === salesConstants_1.INVOICE_TAX_TYPE.CGST_SGST) {
            cgstAmount = Number(((taxableBase * cgstPct) / 100).toFixed(2));
            sgstAmount = Number(((taxableBase * sgstPct) / 100).toFixed(2));
        }
        else if (taxType === salesConstants_1.INVOICE_TAX_TYPE.IGST) {
            igstAmount = Number(((taxableBase * igstPct) / 100).toFixed(2));
        }
        const totalTaxAmount = cgstAmount + sgstAmount + igstAmount;
        const grandTotal = Number((taxableBase + totalTaxAmount).toFixed(2));
        const netPayable = Number((grandTotal - advancePaid).toFixed(2));
        const remainingBalance = netPayable;
        return {
            subTotal: Number(subTotal.toFixed(2)),
            totalDiscount: Number(totalDiscount.toFixed(2)),
            cgstAmount,
            sgstAmount,
            igstAmount,
            totalTaxAmount: Number(totalTaxAmount.toFixed(2)),
            grandTotal,
            netPayable,
            remainingBalance
        };
    }
    async createInvoice(dto) {
        return this.dataSource.transaction(async (manager) => {
            const closure = await manager.findOne(proposal_acceptance_entity_1.ProposalAcceptance, {
                where: { id: dto.closureId },
                relations: [
                    'proposal',
                    'proposal.paymentTerms',
                    'lead',
                    'lead.customer'
                ]
            });
            if (!closure)
                throw new common_1.NotFoundException('Closure not found');
            if (!dto.items || dto.items.length === 0) {
                throw new common_1.BadRequestException('At least one invoice item is required');
            }
            const invoiceNumber = await this.generateInvoiceNumber();
            const taxType = dto.taxType || salesConstants_1.INVOICE_TAX_TYPE.NONE;
            const cgstPct = dto.cgstPercentage || 0;
            const sgstPct = dto.sgstPercentage || 0;
            const igstPct = dto.igstPercentage || 0;
            const advancePaid = dto.advancePaid || 0;
            const savedItems = [];
            for (const itemDto of dto.items) {
                const calcs = this.calculateItemAmounts(itemDto);
                const item = manager.create(invoice_item_entity_1.InvoiceItem, {
                    proposalItemId: itemDto.proposalItemId,
                    serviceName: itemDto.serviceName,
                    serviceDescription: itemDto.serviceDescription,
                    qty: itemDto.qty,
                    unitPrice: itemDto.unitPrice,
                    discount: itemDto.discount || 0,
                    discountAmount: calcs.discountAmount,
                    taxableAmount: calcs.taxableAmount,
                    taxPercentage: itemDto.taxPercentage || 0,
                    taxAmount: calcs.taxAmount,
                    netAmount: calcs.netAmount,
                    currency: itemDto.currency || dto.currency || closure.proposal?.currency || 'INR'
                });
                savedItems.push(item);
            }
            const totals = this.calculateInvoiceTotals(savedItems, taxType, cgstPct, sgstPct, igstPct, advancePaid);
            const invoice = manager.create(invoice_entity_1.Invoice, {
                invoiceNumber,
                closureId: dto.closureId,
                projectId: dto.projectId || null,
                leadId: closure.leadId,
                paymentTermId: dto.paymentTermId || null,
                accountDepartmentId: dto.accountDepartmentId || null,
                billFromEntity: dto.billFromEntity || closure.raisedFromEntity,
                billToCompanyName: closure.billToCompanyName,
                billToAddress: closure.billToAddress,
                billToGstNumber: closure.gstNumber,
                billToPan: dto.billToPan,
                customerPoNumber: dto.customerPoNumber || closure.poNumber,
                accountManager: dto.accountManager,
                businessNumber: dto.businessNumber,
                sacCode: dto.sacCode,
                bankDetails: dto.bankDetails,
                invoiceDate: dto.invoiceDate,
                dueDate: dto.dueDate || null,
                taxType,
                cgstPercentage: cgstPct,
                sgstPercentage: sgstPct,
                igstPercentage: igstPct,
                advancePaid,
                currency: dto.currency || closure.proposal?.currency || 'INR',
                status: salesConstants_1.INVOICE_STATUS.DRAFT,
                notes: dto.notes,
                ...totals
            });
            const savedInvoice = await manager.save(invoice_entity_1.Invoice, invoice);
            for (const item of savedItems) {
                item.invoiceId = savedInvoice.id;
                await manager.save(invoice_item_entity_1.InvoiceItem, item);
            }
            return this.getInvoice(savedInvoice.id);
        });
    }
    async getInvoice(id) {
        const invoice = await this.invoiceRepo.findOne({
            where: { id },
            relations: [
                'closure',
                'closure.lead',
                'closure.lead.customer',
                'project',
                'project.department',
                'project.team',
                'lead',
                'lead.customer',
                'paymentTerm',
                'accountDepartment',
                'items',
                'payments'
            ]
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        return invoice;
    }
    async getInvoices(query) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const qb = this.invoiceRepo
            .createQueryBuilder('invoice')
            .leftJoinAndSelect('invoice.closure', 'closure')
            .leftJoinAndSelect('invoice.lead', 'lead')
            .leftJoinAndSelect('lead.customer', 'customer')
            .leftJoinAndSelect('invoice.accountDepartment', 'accountDepartment')
            .leftJoinAndSelect('invoice.payments', 'payments')
            .orderBy('invoice.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        if (query.closureId) {
            qb.andWhere('invoice.closureId = :closureId', {
                closureId: query.closureId
            });
        }
        if (query.leadId) {
            qb.andWhere('invoice.leadId = :leadId', { leadId: query.leadId });
        }
        if (query.status) {
            qb.andWhere('invoice.status = :status', { status: query.status });
        }
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async updateInvoice(id, dto) {
        const invoice = await this.invoiceRepo.findOne({ where: { id } });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (invoice.status === salesConstants_1.INVOICE_STATUS.PAID &&
            dto.status !== salesConstants_1.INVOICE_STATUS.PAID) {
            throw new common_1.BadRequestException('Cannot modify a fully paid invoice');
        }
        Object.assign(invoice, {
            ...(dto.accountDepartmentId !== undefined && {
                accountDepartmentId: dto.accountDepartmentId
            }),
            ...(dto.billFromEntity !== undefined && {
                billFromEntity: dto.billFromEntity
            }),
            ...(dto.invoiceDate !== undefined && { invoiceDate: dto.invoiceDate }),
            ...(dto.dueDate !== undefined && { dueDate: dto.dueDate }),
            ...(dto.notes !== undefined && { notes: dto.notes }),
            ...(dto.status !== undefined && { status: dto.status }),
            ...(dto.pdfUrl !== undefined && { pdfUrl: dto.pdfUrl }),
            ...(dto.billToPan !== undefined && { billToPan: dto.billToPan }),
            ...(dto.customerPoNumber !== undefined && { customerPoNumber: dto.customerPoNumber }),
            ...(dto.accountManager !== undefined && { accountManager: dto.accountManager }),
            ...(dto.businessNumber !== undefined && { businessNumber: dto.businessNumber }),
            ...(dto.sacCode !== undefined && { sacCode: dto.sacCode }),
            ...(dto.bankDetails !== undefined && { bankDetails: dto.bankDetails }),
            ...(dto.projectId !== undefined && { projectId: dto.projectId }),
            ...(dto.paymentTermId !== undefined && { paymentTermId: dto.paymentTermId }),
        });
        await this.invoiceRepo.save(invoice);
        return this.getInvoice(id);
    }
    async generateInvoicePdf(id) {
        const invoice = await this.getInvoice(id);
        return this.invoiceReportService.generateInvoicePdf(invoice);
    }
    async updateInvoiceTax(id, dto) {
        return this.dataSource.transaction(async (manager) => {
            const invoice = await manager.findOne(invoice_entity_1.Invoice, {
                where: { id },
                relations: ['items']
            });
            if (!invoice)
                throw new common_1.NotFoundException('Invoice not found');
            if (invoice.status === salesConstants_1.INVOICE_STATUS.PAID) {
                throw new common_1.BadRequestException('Cannot update tax on a fully paid invoice');
            }
            const cgstPct = dto.cgstPercentage || 0;
            const sgstPct = dto.sgstPercentage || 0;
            const igstPct = dto.igstPercentage || 0;
            const totals = this.calculateInvoiceTotals(invoice.items, dto.taxType, cgstPct, sgstPct, igstPct, Number(invoice.advancePaid));
            Object.assign(invoice, {
                taxType: dto.taxType,
                cgstPercentage: cgstPct,
                sgstPercentage: sgstPct,
                igstPercentage: igstPct,
                ...totals
            });
            await manager.save(invoice_entity_1.Invoice, invoice);
            return this.getInvoice(id);
        });
    }
    async recordPayment(dto) {
        return this.dataSource.transaction(async (manager) => {
            const invoice = await manager.findOne(invoice_entity_1.Invoice, {
                where: { id: dto.invoiceId },
                relations: ['payments']
            });
            if (!invoice)
                throw new common_1.NotFoundException('Invoice not found');
            if (invoice.status === salesConstants_1.INVOICE_STATUS.PAID) {
                throw new common_1.BadRequestException('Invoice is already fully paid');
            }
            if (invoice.status === salesConstants_1.INVOICE_STATUS.CANCELLED) {
                throw new common_1.BadRequestException('Cannot record payment on a cancelled invoice');
            }
            const currentRemaining = Number(invoice.remainingBalance);
            if (dto.amount > currentRemaining + 0.01) {
                throw new common_1.BadRequestException(`Payment amount (${dto.amount}) exceeds remaining balance (${currentRemaining})`);
            }
            const newRemaining = Number((currentRemaining - dto.amount).toFixed(2));
            const payment = manager.create(payment_record_entity_1.PaymentRecord, {
                invoiceId: dto.invoiceId,
                orderId: dto.orderId,
                paymentDate: dto.paymentDate,
                amount: dto.amount,
                paymentMethod: dto.paymentMethod,
                bankName: dto.bankName,
                transactionId: dto.transactionId,
                chequeNumber: dto.chequeNumber,
                remainingBalance: newRemaining,
                notes: dto.notes
            });
            await manager.save(payment_record_entity_1.PaymentRecord, payment);
            const newAmountReceived = Number((Number(invoice.amountReceived) + dto.amount).toFixed(2));
            invoice.amountReceived = newAmountReceived;
            invoice.remainingBalance = newRemaining;
            if (newRemaining <= 0) {
                invoice.status = salesConstants_1.INVOICE_STATUS.PAID;
            }
            else if (newAmountReceived > 0) {
                invoice.status = salesConstants_1.INVOICE_STATUS.PARTIAL;
            }
            await manager.save(invoice_entity_1.Invoice, invoice);
            return this.getInvoice(dto.invoiceId);
        });
    }
    async getInvoicePayments(invoiceId) {
        const invoice = await this.invoiceRepo.findOne({ where: { id: invoiceId } });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        return this.paymentRepo.find({
            where: { invoiceId },
            order: { createdAt: 'DESC' }
        });
    }
    async getClosureInvoiceSummary(closureId) {
        const closure = await this.closureRepo.findOne({
            where: { id: closureId },
            relations: [
                'proposal',
                'proposal.items',
                'proposal.paymentTerms',
                'lead',
                'lead.customer'
            ]
        });
        if (!closure)
            throw new common_1.NotFoundException('Closure not found');
        const invoices = await this.invoiceRepo.find({
            where: { closureId },
            relations: ['items', 'payments', 'accountDepartment'],
            order: { createdAt: 'DESC' }
        });
        const totalInvoiced = invoices.reduce((sum, inv) => sum + Number(inv.grandTotal), 0);
        const totalReceived = invoices.reduce((sum, inv) => sum + Number(inv.amountReceived), 0);
        const totalPending = invoices.reduce((sum, inv) => inv.status !== salesConstants_1.INVOICE_STATUS.CANCELLED
            ? sum + Number(inv.remainingBalance)
            : sum, 0);
        return {
            closure,
            invoices,
            totalInvoiced: Number(totalInvoiced.toFixed(2)),
            totalReceived: Number(totalReceived.toFixed(2)),
            totalPending: Number(totalPending.toFixed(2))
        };
    }
    async markInvoiceSent(id) {
        const invoice = await this.invoiceRepo.findOne({ where: { id } });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (invoice.status !== salesConstants_1.INVOICE_STATUS.DRAFT) {
            throw new common_1.BadRequestException(`Invoice is already in ${invoice.status} status`);
        }
        invoice.status = salesConstants_1.INVOICE_STATUS.SENT;
        await this.invoiceRepo.save(invoice);
        return this.getInvoice(id);
    }
    async cancelInvoice(id) {
        const invoice = await this.invoiceRepo.findOne({ where: { id } });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (invoice.status === salesConstants_1.INVOICE_STATUS.PAID) {
            throw new common_1.BadRequestException('Cannot cancel a paid invoice');
        }
        invoice.status = salesConstants_1.INVOICE_STATUS.CANCELLED;
        await this.invoiceRepo.save(invoice);
        return this.getInvoice(id);
    }
    async getFinanceWindowInvoices(query) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const qb = this.invoiceRepo
            .createQueryBuilder('invoice')
            .leftJoinAndSelect('invoice.lead', 'lead')
            .leftJoinAndSelect('lead.customer', 'customer')
            .leftJoinAndSelect('invoice.accountDepartment', 'accountDepartment')
            .leftJoinAndSelect('invoice.project', 'project')
            .leftJoinAndSelect('project.department', 'department')
            .leftJoinAndSelect('invoice.payments', 'payments')
            .orderBy('invoice.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        if (query.status) {
            qb.andWhere('invoice.status = :status', { status: query.status });
        }
        if (query.search) {
            qb.andWhere('(invoice.invoiceNumber LIKE :search OR customer.name LIKE :search)', { search: `%${query.search}%` });
        }
        await this.updateOverdueStatuses();
        const [data, total] = await qb.getManyAndCount();
        const summaryQb = this.invoiceRepo
            .createQueryBuilder('invoice')
            .select('invoice.status', 'status')
            .addSelect('COUNT(invoice.id)', 'count')
            .groupBy('invoice.status');
        const summaryRows = await summaryQb.getRawMany();
        const summary = {
            totalDraft: 0,
            totalSent: 0,
            totalPaid: 0,
            totalPartial: 0,
            totalOverdue: 0
        };
        for (const row of summaryRows) {
            switch (row.status) {
                case salesConstants_1.INVOICE_STATUS.DRAFT:
                    summary.totalDraft = Number(row.count);
                    break;
                case salesConstants_1.INVOICE_STATUS.SENT:
                    summary.totalSent = Number(row.count);
                    break;
                case salesConstants_1.INVOICE_STATUS.PAID:
                    summary.totalPaid = Number(row.count);
                    break;
                case salesConstants_1.INVOICE_STATUS.PARTIAL:
                    summary.totalPartial = Number(row.count);
                    break;
                case salesConstants_1.INVOICE_STATUS.OVERDUE:
                    summary.totalOverdue = Number(row.count);
                    break;
            }
        }
        return { data, total, page, limit, summary };
    }
    async updateOverdueStatuses() {
        const today = new Date();
        await this.invoiceRepo
            .createQueryBuilder()
            .update(invoice_entity_1.Invoice)
            .set({ status: salesConstants_1.INVOICE_STATUS.OVERDUE })
            .where('status IN (:...statuses)', {
            statuses: [salesConstants_1.INVOICE_STATUS.SENT, salesConstants_1.INVOICE_STATUS.PARTIAL]
        })
            .andWhere('dueDate < :today', { today })
            .execute();
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(invoice_entity_1.Invoice)),
    tslib_1.__param(1, (0, typeorm_2.InjectRepository)(invoice_item_entity_1.InvoiceItem)),
    tslib_1.__param(2, (0, typeorm_2.InjectRepository)(payment_record_entity_1.PaymentRecord)),
    tslib_1.__param(3, (0, typeorm_2.InjectRepository)(proposal_acceptance_entity_1.ProposalAcceptance)),
    tslib_1.__param(4, (0, typeorm_2.InjectRepository)(proposal_payment_term_entity_1.ProposalPaymentTerm)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _e : Object, typeof (_f = typeof invoice_report_service_1.InvoiceReportService !== "undefined" && invoice_report_service_1.InvoiceReportService) === "function" ? _f : Object, typeof (_g = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _g : Object])
], InvoiceService);


/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var InvoiceReportService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoiceReportService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const pdfkit_1 = tslib_1.__importDefault(__webpack_require__(96));
const path = tslib_1.__importStar(__webpack_require__(97));
const fs = tslib_1.__importStar(__webpack_require__(98));
let InvoiceReportService = InvoiceReportService_1 = class InvoiceReportService {
    constructor() {
        this.logger = new common_1.Logger(InvoiceReportService_1.name);
        this.PRIMARY_COLOR = '#0047AB';
        this.SECONDARY_COLOR = '#555555';
        this.GRID_COLOR = '#DDDDDD';
        this.TEXT_COLOR = '#333333';
    }
    async generateInvoicePdf(invoice) {
        return new Promise((resolve, reject) => {
            try {
                const doc = new pdfkit_1.default({ margin: 40, size: 'A4', bufferPages: true });
                const buffers = [];
                doc.on('data', (chunk) => buffers.push(chunk));
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                doc.on('end', () => resolve(Buffer.concat(buffers)));
                doc.on('error', (err) => reject(err));
                const isIndiaInvoice = invoice.billFromEntity?.toLowerCase().includes('india') ||
                    invoice.billFromEntity?.toLowerCase().includes('private limited') ||
                    invoice.currency === 'INR';
                if (isIndiaInvoice) {
                    this.generateIndiaTaxInvoice(doc, invoice);
                }
                else {
                    this.generateGlobalInvoice(doc, invoice);
                }
                doc.end();
            }
            catch (error) {
                this.logger.error('Error generating Invoice PDF:', error);
                reject(error);
            }
        });
    }
    generateGlobalInvoice(doc, invoice) {
        this.drawHeader(doc, 'INVOICE', invoice.billFromEntity || 'INTERCERT INC');
        const startY = 110;
        // Invoice To & Information Table
        this.drawInfoTable(doc, startY, invoice);
        // Wire Transfer Details
        this.drawWireTransferDetails(doc, doc.y + 20, invoice);
        // Item Details Table
        this.drawItemsTable(doc, doc.y + 20, invoice);
        // Totals
        this.drawTotals(doc, doc.y + 10, invoice, false);
        // Footer
        this.drawFooter(doc);
    }
    generateIndiaTaxInvoice(doc, invoice) {
        this.drawHeader(doc, 'TAX INVOICE', invoice.billFromEntity || 'INTER CERT PRIVATE LIMITED');
        const startY = 110;
        // India specific info (GST, PAN, SAC)
        this.drawIndiaInfoTable(doc, startY, invoice);
        // Item Details Table
        this.drawItemsTable(doc, doc.y + 20, invoice);
        // Totals (with GST breakdown)
        this.drawTotals(doc, doc.y + 10, invoice, true);
        // Bank Details
        this.drawWireTransferDetails(doc, doc.y + 20, invoice);
        // Terms & Signature
        this.drawIndiaFooter(doc);
    }
    drawHeader(doc, title, companyName) {
        const logoPath = path.join(process.cwd(), 'libs', 'templates', 'Logo_Blue.png');
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 40, 30, { width: 150 });
        }
        else {
            doc.fillColor(this.PRIMARY_COLOR).fontSize(20).font('Helvetica-Bold').text('INTERCERT', 40, 40);
        }
        doc.fillColor(this.TEXT_COLOR).fontSize(12).font('Helvetica-Bold').text(companyName, 400, 40, { align: 'right' });
        doc.moveTo(40, 80).lineTo(555, 80).strokeColor(this.GRID_COLOR).stroke();
        doc.fillColor(this.TEXT_COLOR).fontSize(14).font('Helvetica-Bold').text(title, 40, 85, { align: 'center', width: 515 });
        doc.moveTo(40, 105).lineTo(555, 105).strokeColor(this.GRID_COLOR).stroke();
    }
    drawInfoTable(doc, y, invoice) {
        doc.font('Helvetica-Bold').fontSize(10);
        doc.rect(40, y, 257, 15).fill(this.GRID_COLOR).stroke();
        doc.rect(297, y, 258, 15).fill(this.GRID_COLOR).stroke();
        doc.fillColor(this.TEXT_COLOR).text('Invoice To:', 45, y + 3);
        doc.text('Invoice Information', 302, y + 3);
        const tableHeight = 120;
        doc.rect(40, y + 15, 257, tableHeight).stroke();
        doc.rect(297, y + 15, 258, tableHeight).stroke();
        // Bill To content
        doc.font('Helvetica').fontSize(9);
        let billToY = y + 25;
        doc.text(invoice.billToCompanyName || '', 50, billToY);
        billToY += 15;
        if (invoice.billToAddress) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const addr = invoice.billToAddress;
            doc.text(`${addr.addressLine1}${addr.addressLine2 ? ', ' + addr.addressLine2 : ''}`, 50, billToY);
            billToY += 12;
            doc.text(`${addr.city}, ${addr.state || ''} ${addr.postalCode || ''}`, 50, billToY);
            billToY += 12;
            doc.text(addr.country || '', 50, billToY);
        }
        // Info content
        let infoY = y + 25;
        const drawInfoLine = (label, value) => {
            doc.font('Helvetica-Bold').text(label, 302, infoY);
            doc.font('Helvetica').text(value || '', 420, infoY);
            infoY += 15;
        };
        drawInfoLine('Invoice #', invoice.invoiceNumber);
        drawInfoLine('Invoice Date', new Date(invoice.invoiceDate).toLocaleDateString());
        drawInfoLine('Customer PO #', invoice.customerPoNumber);
        drawInfoLine('Account Manager', invoice.accountManager);
        drawInfoLine('Currency', invoice.currency);
        drawInfoLine('Business #', invoice.businessNumber);
        doc.y = y + 15 + tableHeight;
    }
    drawIndiaInfoTable(doc, y, invoice) {
        // Similar to drawInfoTable but with GST/PAN fields
        doc.font('Helvetica-Bold').fontSize(9);
        const rows = [
            ['Invoice No.', invoice.invoiceNumber, 'Invoice Date', new Date(invoice.invoiceDate).toLocaleDateString()],
            ['GSTIN', '09AAGCM0083J1ZC', 'PAN', 'AAGCM0083J'],
            ['SAC Code', invoice.sacCode || '998349', 'State', 'Uttar Pradesh']
        ];
        let currentY = y;
        rows.forEach(row => {
            doc.rect(40, currentY, 128, 15).stroke();
            doc.rect(168, currentY, 129, 15).stroke();
            doc.rect(297, currentY, 128, 15).stroke();
            doc.rect(425, currentY, 130, 15).stroke();
            doc.text(row[0], 45, currentY + 3);
            doc.font('Helvetica').text(row[1], 173, currentY + 3);
            doc.font('Helvetica-Bold').text(row[2], 302, currentY + 3);
            doc.font('Helvetica').text(row[3], 430, currentY + 3);
            currentY += 15;
        });
        // Bill To
        doc.rect(40, currentY, 515, 15).fill(this.GRID_COLOR).stroke();
        doc.fillColor(this.TEXT_COLOR).font('Helvetica-Bold').text('Bill To:', 45, currentY + 3);
        currentY += 15;
        doc.rect(40, currentY, 515, 60).stroke();
        doc.font('Helvetica').text(invoice.billToCompanyName || '', 45, currentY + 5);
        if (invoice.billToAddress) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const addr = invoice.billToAddress;
            doc.text(`${addr.addressLine1}, ${addr.city}, ${addr.state || ''}`, 45, currentY + 17);
        }
        doc.font('Helvetica-Bold').text(`GSTIN: ${invoice.billToGstNumber || 'Not Available'}`, 45, currentY + 29);
        doc.text(`PAN: ${invoice.billToPan || 'Not Available'}`, 302, currentY + 29);
        doc.y = currentY + 60;
    }
    drawWireTransferDetails(doc, y, invoice) {
        doc.font('Helvetica-Bold').fontSize(10);
        doc.rect(40, y, 515, 15).fill(this.GRID_COLOR).stroke();
        doc.fillColor(this.TEXT_COLOR).text('Bank Details for Payment Remittance', 45, y + 3);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const details = invoice.bankDetails || {};
        const rows = [
            ['Beneficiary Name', details.beneficiaryName || 'INTERCERT INC'],
            ['Bank Name', details.bankName || 'Texas First Bank'],
            ['Account #', details.accountNumber || '10392033'],
            ['IFSC / Routing', details.ifscCode || details.abaRoutingNumber || '113110256']
        ];
        let currentY = y + 15;
        doc.font('Helvetica').fontSize(9);
        rows.forEach(row => {
            doc.rect(40, currentY, 150, 15).stroke();
            doc.rect(190, currentY, 365, 15).stroke();
            doc.font('Helvetica-Bold').text(row[0], 45, currentY + 3);
            doc.font('Helvetica').text(row[1], 195, currentY + 3);
            currentY += 15;
        });
        doc.y = currentY;
    }
    drawItemsTable(doc, y, invoice) {
        doc.font('Helvetica-Bold').fontSize(9);
        const headers = ['#', 'Service Description', 'Qty', 'Unit Price', 'Amount'];
        const colWidths = [30, 285, 40, 80, 80];
        let currentX = 40;
        headers.forEach((h, i) => {
            doc.rect(currentX, y, colWidths[i], 20).fill(this.GRID_COLOR).stroke();
            doc.fillColor(this.TEXT_COLOR).text(h, currentX + 5, y + 6, { width: colWidths[i] - 10, align: i > 1 ? 'right' : 'left' });
            currentX += colWidths[i];
        });
        let currentY = y + 20;
        doc.font('Helvetica').fontSize(9);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (invoice.items || []).forEach((item, index) => {
            const rowHeight = 20;
            doc.rect(40, currentY, colWidths[0], rowHeight).stroke();
            doc.rect(70, currentY, colWidths[1], rowHeight).stroke();
            doc.rect(355, currentY, colWidths[2], rowHeight).stroke();
            doc.rect(395, currentY, colWidths[3], rowHeight).stroke();
            doc.rect(475, currentY, colWidths[4], rowHeight).stroke();
            doc.text((index + 1).toString(), 45, currentY + 6);
            doc.text(item.serviceName, 75, currentY + 6, { width: colWidths[1] - 10 });
            doc.text(item.qty.toString(), 355, currentY + 6, { width: colWidths[2] - 10, align: 'right' });
            doc.text(item.unitPrice.toLocaleString(), 395, currentY + 6, { width: colWidths[3] - 10, align: 'right' });
            doc.text((item.qty * item.unitPrice).toLocaleString(), 475, currentY + 6, { width: colWidths[4] - 10, align: 'right' });
            currentY += rowHeight;
        });
        doc.y = currentY;
    }
    drawTotals(doc, y, invoice, isIndia) {
        const labelWidth = 435;
        const valueWidth = 80;
        let currentY = y;
        const drawTotalLine = (label, value, isBold = false) => {
            doc.font(isBold ? 'Helvetica-Bold' : 'Helvetica').fontSize(10);
            doc.text(label, 40, currentY, { width: labelWidth, align: 'right' });
            doc.text(value.toLocaleString(undefined, { minimumFractionDigits: 2 }), 475, currentY, { width: valueWidth, align: 'right' });
            currentY += 15;
        };
        drawTotalLine('Subtotal', Number(invoice.subTotal));
        if (Number(invoice.totalDiscount) > 0) {
            drawTotalLine('Discount', Number(invoice.totalDiscount));
        }
        if (isIndia) {
            if (Number(invoice.cgstAmount) > 0)
                drawTotalLine(`CGST @ ${invoice.cgstPercentage}%`, Number(invoice.cgstAmount));
            if (Number(invoice.sgstAmount) > 0)
                drawTotalLine(`SGST @ ${invoice.sgstPercentage}%`, Number(invoice.sgstAmount));
            if (Number(invoice.igstAmount) > 0)
                drawTotalLine(`IGST @ ${invoice.igstPercentage}%`, Number(invoice.igstAmount));
        }
        else if (Number(invoice.totalTaxAmount) > 0) {
            drawTotalLine('Tax', Number(invoice.totalTaxAmount));
        }
        doc.moveTo(430, currentY).lineTo(555, currentY).stroke();
        currentY += 5;
        drawTotalLine('Grand Total', Number(invoice.grandTotal), true);
        if (Number(invoice.advancePaid) > 0) {
            drawTotalLine('Less: Advance / Adjustments', Number(invoice.advancePaid));
            doc.moveTo(430, currentY).lineTo(555, currentY).stroke();
            currentY += 5;
            doc.fillColor(this.PRIMARY_COLOR);
            drawTotalLine('Final Payable', Number(invoice.netPayable), true);
            doc.fillColor(this.TEXT_COLOR);
        }
        doc.y = currentY;
    }
    drawFooter(doc) {
        const bottomY = 750;
        doc.moveTo(40, bottomY).lineTo(555, bottomY).strokeColor(this.GRID_COLOR).stroke();
        doc.fontSize(8).fillColor(this.SECONDARY_COLOR);
        doc.text('INTERCERT Inc. | 2001 Timberloch Place, Suite 500, The Woodlands, Texas 77380, U.S.A.', 40, bottomY + 10, { align: 'center' });
        doc.text('www.intercert.com | info@intercert.com | +1 (281) 720-3261', 40, bottomY + 22, { align: 'center' });
    }
    drawIndiaFooter(doc) {
        const bottomY = 700;
        doc.fontSize(8).font('Helvetica').text('The Invoice shall be settled within 15 days of receipt or on completion of the services, whichever is earlier otherwise an interest @18% per annum will be charged as per INTERCERT general terms of services or payment terms as per the agreed contract shall be applicable.', 40, bottomY, { width: 515, align: 'justify' });
        doc.font('Helvetica-Bold').fontSize(10).text('For INTER CERT PVT LTD', 400, bottomY + 50);
        doc.text('Authorised Signatory', 400, bottomY + 80);
        const footerY = 800;
        doc.rect(0, footerY, 600, 42).fill(this.PRIMARY_COLOR);
        doc.fillColor('white').fontSize(8);
        doc.text('Email: info@intercert.com', 50, footerY + 15);
        doc.text('Phone: +91-120-4258833', 250, footerY + 15);
        doc.text('Website: www.intercert.com', 450, footerY + 15);
    }
};
exports.InvoiceReportService = InvoiceReportService;
exports.InvoiceReportService = InvoiceReportService = InvoiceReportService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)()
], InvoiceReportService);


/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoiceTaxUpdateDto = exports.RecordPaymentDto = exports.UpdateInvoiceDto = exports.CreateInvoiceDto = exports.InvoiceItemDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_transformer_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(17);
const mapped_types_1 = __webpack_require__(108);
const salesConstants_1 = __webpack_require__(48);
class InvoiceItemDto {
}
exports.InvoiceItemDto = InvoiceItemDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], InvoiceItemDto.prototype, "proposalItemId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InvoiceItemDto.prototype, "serviceName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], InvoiceItemDto.prototype, "serviceDescription", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], InvoiceItemDto.prototype, "qty", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], InvoiceItemDto.prototype, "unitPrice", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], InvoiceItemDto.prototype, "discount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], InvoiceItemDto.prototype, "taxPercentage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], InvoiceItemDto.prototype, "currency", void 0);
class CreateInvoiceDto {
}
exports.CreateInvoiceDto = CreateInvoiceDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateInvoiceDto.prototype, "closureId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateInvoiceDto.prototype, "projectId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateInvoiceDto.prototype, "paymentTermId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateInvoiceDto.prototype, "accountDepartmentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateInvoiceDto.prototype, "billFromEntity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateInvoiceDto.prototype, "invoiceDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CreateInvoiceDto.prototype, "dueDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(salesConstants_1.INVOICE_TAX_TYPE),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof salesConstants_1.INVOICE_TAX_TYPE !== "undefined" && salesConstants_1.INVOICE_TAX_TYPE) === "function" ? _c : Object)
], CreateInvoiceDto.prototype, "taxType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateInvoiceDto.prototype, "cgstPercentage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateInvoiceDto.prototype, "sgstPercentage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateInvoiceDto.prototype, "igstPercentage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateInvoiceDto.prototype, "advancePaid", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateInvoiceDto.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateInvoiceDto.prototype, "billToPan", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateInvoiceDto.prototype, "customerPoNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateInvoiceDto.prototype, "accountManager", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateInvoiceDto.prototype, "businessNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateInvoiceDto.prototype, "sacCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Object)
], CreateInvoiceDto.prototype, "bankDetails", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InvoiceItemDto),
    tslib_1.__metadata("design:type", Array)
], CreateInvoiceDto.prototype, "items", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateInvoiceDto.prototype, "notes", void 0);
class UpdateInvoiceDto extends (0, mapped_types_1.PartialType)(CreateInvoiceDto) {
}
exports.UpdateInvoiceDto = UpdateInvoiceDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(salesConstants_1.INVOICE_STATUS),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof salesConstants_1.INVOICE_STATUS !== "undefined" && salesConstants_1.INVOICE_STATUS) === "function" ? _d : Object)
], UpdateInvoiceDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateInvoiceDto.prototype, "pdfUrl", void 0);
class RecordPaymentDto {
}
exports.RecordPaymentDto = RecordPaymentDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], RecordPaymentDto.prototype, "invoiceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], RecordPaymentDto.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], RecordPaymentDto.prototype, "paymentDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    tslib_1.__metadata("design:type", Number)
], RecordPaymentDto.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(salesConstants_1.PAYMENT_METHOD),
    tslib_1.__metadata("design:type", typeof (_f = typeof salesConstants_1.PAYMENT_METHOD !== "undefined" && salesConstants_1.PAYMENT_METHOD) === "function" ? _f : Object)
], RecordPaymentDto.prototype, "paymentMethod", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], RecordPaymentDto.prototype, "bankName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], RecordPaymentDto.prototype, "transactionId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], RecordPaymentDto.prototype, "chequeNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], RecordPaymentDto.prototype, "notes", void 0);
class InvoiceTaxUpdateDto {
}
exports.InvoiceTaxUpdateDto = InvoiceTaxUpdateDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(salesConstants_1.INVOICE_TAX_TYPE),
    tslib_1.__metadata("design:type", typeof (_g = typeof salesConstants_1.INVOICE_TAX_TYPE !== "undefined" && salesConstants_1.INVOICE_TAX_TYPE) === "function" ? _g : Object)
], InvoiceTaxUpdateDto.prototype, "taxType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], InvoiceTaxUpdateDto.prototype, "cgstPercentage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], InvoiceTaxUpdateDto.prototype, "sgstPercentage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], InvoiceTaxUpdateDto.prototype, "igstPercentage", void 0);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(4);
const config_service_1 = __webpack_require__(6);
const express = tslib_1.__importStar(__webpack_require__(109));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Increase payload size limits for large PDF uploads (up to 50MB)
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    // Load environment configuration
    const config = new config_service_1.ConfigService();
    config.loadFromEnv();
    // const corsOrigins = (process.env.CORS_ORIGINS || '').split(',');
    // app.enableCors({
    //   origin: corsOrigins.length > 0 ? corsOrigins : true, // Default to true if no CORS_ORIGINS are defined
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //   allowedHeaders: ['Content-Type', 'authorisation', 'ngrok-skip-browser-warning'],
    //   credentials: true,
    // });
    const corsOrigins = process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
        : [];
    console.log('CORS Origins Inside Master Management Module:', corsOrigins);
    // NEW:
    app.enableCors({
        origin: (origin, callback) => {
            // Allow non-browser requests (Postman, server-to-server)
            if (!origin)
                return callback(null, true);
            // If no origins defined in .env, allow all (useful for local development)
            if (corsOrigins.length === 0) {
                return callback(null, true);
            }
            if (corsOrigins.includes(origin) || origin.startsWith('http://localhost')) {
                return callback(null, true);
            }
            return callback(new Error(`CORS blocked for origin: ${origin}`), false);
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'authorization',
            'authorisation',
            'Accept',
            'accesstoken',
            'ngrok-skip-browser-warning',
        ],
        credentials: true,
    });
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        exceptionFactory: (validationErrors = []) => {
            let msg = '';
            for (const error of validationErrors) {
                msg += `Invalid ${error.property} - ${Object.values(error.constraints || {}).join(', ')}, `;
            }
            return new common_1.BadRequestException(msg.trim());
        },
    }));
    const port = parseInt(process.env.SALES_MANAGEMENT_PORT || '8095', 10);
    await app.listen(port);
    // Log application status
    common_1.Logger.log(`🚀 Application is running at http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map