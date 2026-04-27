/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const database_module_1 = __webpack_require__(5);
const app_controller_1 = __webpack_require__(82);
const app_service_1 = __webpack_require__(83);
const config_module_1 = __webpack_require__(10);
const response_handler_module_1 = __webpack_require__(84);
const world_data_module_1 = __webpack_require__(86);
const auth_module_1 = __webpack_require__(103);
const department_module_1 = __webpack_require__(118);
const module_management_module_1 = __webpack_require__(124);
const lead_module_1 = __webpack_require__(128);
const user_management_module_1 = __webpack_require__(135);
const team_module_1 = __webpack_require__(138);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            config_module_1.ConfigModule,
            response_handler_module_1.ResponseHandlerModule,
            world_data_module_1.WorldDataModule,
            auth_module_1.AuthModule,
            user_management_module_1.UserManagementModule,
            department_module_1.DepartmentModule,
            team_module_1.TeamModule,
            module_management_module_1.ModuleManagementModule,
            lead_module_1.LeadModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DBModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DBModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_service_1 = __webpack_require__(6);
const config_module_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(11);
const entities_1 = __webpack_require__(12);
const repositories_1 = __webpack_require__(66);
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
                entities_1.Proposal,
                entities_1.ProposalItem,
                entities_1.ProposalPaymentTerm,
                entities_1.ProposalAcceptance,
                entities_1.Project,
                entities_1.ServiceMaster
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
                    entities_1.ProposalAcceptance,
                    entities_1.Project,
                    entities_1.ServiceMaster,
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
                repositories_1.LeadServiceRepository,
                repositories_1.PermissionManagerRepository,
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
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_interface_1 = __webpack_require__(7);
const config_default_1 = __webpack_require__(8);
const dotenv_1 = __webpack_require__(9);
(0, dotenv_1.config)();
let ConfigService = class ConfigService {
    constructor(data = config_default_1.DEFAULT_CONFIG) {
        this.config = data;
    }
    loadFromEnv() {
        this.config = this.parseConfigFromEnv(process.env);
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
        masterManagement: 8090,
        sales: 8091,
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
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
const tslib_1 = __webpack_require__(4);
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
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(45), exports);
// Duplicate removed - loginSession.entity already exported above
// export * from './session.entity'; // DEPRECATED - Use LoginSession instead
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
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
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(64), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
], ServiceDeliverable.prototype, "description", void 0);
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
exports.SERVICE_CATEGORY_ACCESS = exports.SERVICE_ACCESS_LEVEL = exports.SERVICE_TYPE = exports.SERVICE_CATEGORY = void 0;
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
var SERVICE_TYPE;
(function (SERVICE_TYPE) {
    // VAPT Types
    SERVICE_TYPE["WEB_VAPT"] = "WEB_VAPT";
    SERVICE_TYPE["MOBILE_VAPT"] = "MOBILE_VAPT";
    SERVICE_TYPE["NETWORK_VAPT"] = "NETWORK_VAPT";
    SERVICE_TYPE["API_VAPT"] = "API_VAPT";
    SERVICE_TYPE["CLOUD_VAPT"] = "CLOUD_VAPT";
    SERVICE_TYPE["IOT_VAPT"] = "IOT_VAPT";
    // Mobile VAPT Sub-types
    SERVICE_TYPE["ANDROID_VAPT"] = "ANDROID_VAPT";
    SERVICE_TYPE["IOS_VAPT"] = "IOS_VAPT";
    SERVICE_TYPE["HYBRID_VAPT"] = "HYBRID_VAPT";
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
    SERVICE_ACCESS_LEVEL["ROLE_BASED"] = "ROLE_BASED";
    SERVICE_ACCESS_LEVEL["RESTRICTED"] = "RESTRICTED"; // Specific users only
})(SERVICE_ACCESS_LEVEL || (exports.SERVICE_ACCESS_LEVEL = SERVICE_ACCESS_LEVEL = {}));
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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
const tslib_1 = __webpack_require__(4);
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


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lead = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const customer_entity_1 = __webpack_require__(36);
const user_entity_1 = __webpack_require__(13);
const lead_service_entity_1 = __webpack_require__(40);
const proposal_entity_1 = __webpack_require__(41);
const lead_contact_entity_1 = __webpack_require__(44);
const lead_address_entity_1 = __webpack_require__(45);
const salesConstants_1 = __webpack_require__(46);
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
        type: 'enum',
        enum: salesConstants_1.LEAD_SOURCE,
        default: salesConstants_1.LEAD_SOURCE.WEBSITE
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof salesConstants_1.LEAD_SOURCE !== "undefined" && salesConstants_1.LEAD_SOURCE) === "function" ? _b : Object)
], Lead.prototype, "source", void 0);
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
    tslib_1.__metadata("design:type", typeof (_c = typeof salesConstants_1.LEAD_STATUS !== "undefined" && salesConstants_1.LEAD_STATUS) === "function" ? _c : Object)
], Lead.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: salesConstants_1.LEAD_QUALITY,
        default: salesConstants_1.LEAD_QUALITY.WARM
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof salesConstants_1.LEAD_QUALITY !== "undefined" && salesConstants_1.LEAD_QUALITY) === "function" ? _d : Object)
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
    tslib_1.__metadata("design:type", typeof (_e = typeof customer_entity_1.Customer !== "undefined" && customer_entity_1.Customer) === "function" ? _e : Object)
], Lead.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.id, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdBy' }),
    tslib_1.__metadata("design:type", typeof (_f = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _f : Object)
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
exports.Lead = Lead = tslib_1.__decorate([
    (0, typeorm_1.Entity)('lead')
], Lead);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadService = exports.SERVICE_STATUS = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const lead_entity_1 = __webpack_require__(39);
const service_master_entity_1 = __webpack_require__(33);
const user_entity_1 = __webpack_require__(13);
const department_entity_1 = __webpack_require__(22);
var SERVICE_STATUS;
(function (SERVICE_STATUS) {
    SERVICE_STATUS["REQUIREMENT_CONFIRMED"] = "Requirement Confirmed";
    SERVICE_STATUS["IN_PROGRESS"] = "In Progress";
    SERVICE_STATUS["ON_HOLD"] = "On Hold";
    SERVICE_STATUS["DROPPED"] = "Dropped";
})(SERVICE_STATUS || (exports.SERVICE_STATUS = SERVICE_STATUS = {}));
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
    (0, typeorm_1.ManyToOne)(() => service_master_entity_1.ServiceMaster),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof service_master_entity_1.ServiceMaster !== "undefined" && service_master_entity_1.ServiceMaster) === "function" ? _b : Object)
], LeadService.prototype, "service", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _c : Object)
], LeadService.prototype, "department", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'ownerId' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _d : Object)
], LeadService.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SERVICE_STATUS,
        default: SERVICE_STATUS.REQUIREMENT_CONFIRMED
    }),
    tslib_1.__metadata("design:type", String)
], LeadService.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], LeadService.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
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
exports.Proposal = exports.PROPOSAL_STATUS = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
const lead_entity_1 = __webpack_require__(39);
const proposal_item_entity_1 = __webpack_require__(42);
var PROPOSAL_STATUS;
(function (PROPOSAL_STATUS) {
    PROPOSAL_STATUS["DRAFT"] = "Draft";
    PROPOSAL_STATUS["SUBMITTED"] = "Submitted";
    PROPOSAL_STATUS["APPROVED"] = "Approved";
    PROPOSAL_STATUS["REJECTED"] = "Rejected";
    PROPOSAL_STATUS["REVISED"] = "Revised";
})(PROPOSAL_STATUS || (exports.PROPOSAL_STATUS = PROPOSAL_STATUS = {}));
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
    (0, typeorm_1.Column)(),
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
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Proposal.prototype, "totalAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Proposal.prototype, "taxAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Proposal.prototype, "grandTotal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 3, default: 'USD' }),
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
    (0, typeorm_1.OneToMany)(() => proposal_item_entity_1.ProposalItem, (item) => item.proposal, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Proposal.prototype, "items", void 0);
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


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalItem = void 0;
const tslib_1 = __webpack_require__(4);
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
    (0, typeorm_1.ManyToOne)(() => lead_service_entity_1.LeadService),
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
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalItem.prototype, "description", void 0);
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
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], ProposalItem.prototype, "netAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_payment_term_entity_1.ProposalPaymentTerm, (term) => term.proposalItem, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], ProposalItem.prototype, "paymentTerms", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProposalItem.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ProposalItem.prototype, "updatedAt", void 0);
exports.ProposalItem = ProposalItem = tslib_1.__decorate([
    (0, typeorm_1.Entity)('proposal_item')
], ProposalItem);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalPaymentTerm = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
const proposal_item_entity_1 = __webpack_require__(42);
let ProposalPaymentTerm = class ProposalPaymentTerm {
};
exports.ProposalPaymentTerm = ProposalPaymentTerm;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ProposalPaymentTerm.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => proposal_item_entity_1.ProposalItem, (item) => item.paymentTerms, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'proposalItemId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof proposal_item_entity_1.ProposalItem !== "undefined" && proposal_item_entity_1.ProposalItem) === "function" ? _a : Object)
], ProposalPaymentTerm.prototype, "proposalItem", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
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
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ProposalPaymentTerm.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProposalPaymentTerm.prototype, "updatedAt", void 0);
exports.ProposalPaymentTerm = ProposalPaymentTerm = tslib_1.__decorate([
    (0, typeorm_1.Entity)('proposal_payment_term')
], ProposalPaymentTerm);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadContact = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadAddress = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 46 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PROJECT_STATUS = exports.PROPOSAL_STATUS = exports.LEAD_QUALITY = exports.LEAD_STATUS = exports.LEAD_SOURCE = void 0;
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
    LEAD_SOURCE["B2B"] = "B2B";
    LEAD_SOURCE["SPRINTO"] = "Sprinto";
    LEAD_SOURCE["SCYTALE"] = "Scytale";
    LEAD_SOURCE["OTHERS"] = "Others";
})(LEAD_SOURCE || (exports.LEAD_SOURCE = LEAD_SOURCE = {}));
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
})(PROPOSAL_STATUS || (exports.PROPOSAL_STATUS = PROPOSAL_STATUS = {}));
var PROJECT_STATUS;
(function (PROJECT_STATUS) {
    PROJECT_STATUS["PENDING"] = "Pending";
    PROJECT_STATUS["IN_PROGRESS"] = "In Progress";
    PROJECT_STATUS["ON_HOLD"] = "On Hold";
    PROJECT_STATUS["COMPLETED"] = "Completed";
    PROJECT_STATUS["CANCELLED"] = "Cancelled";
})(PROJECT_STATUS || (exports.PROJECT_STATUS = PROJECT_STATUS = {}));


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadEnquiry = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const user_entity_1 = __webpack_require__(13);
const lead_contact_entity_1 = __webpack_require__(44);
// @ts-ignore - Circular dependency resolution
const lead_address_entity_1 = __webpack_require__(45);
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
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Countries = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.States = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cities = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nationalities = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Company = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const branch_entity_1 = __webpack_require__(53);
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
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Branch = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const company_entity_1 = __webpack_require__(52);
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
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkRequest = exports.WORK_REQUEST_PRIORITY = exports.WORK_REQUEST_STATUS = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const work_request_type_entity_1 = __webpack_require__(55);
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
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkRequestType = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlaRule = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationRule = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EscalationRule = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoutingRule = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const work_request_type_entity_1 = __webpack_require__(55);
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
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApprovalLevel = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApprovalStatus = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLog = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentClassification = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalAcceptance = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
const proposal_entity_1 = __webpack_require__(41);
const lead_entity_1 = __webpack_require__(39);
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
    (0, typeorm_1.Column)({ type: 'date' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProposalAcceptance.prototype, "awardDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalAcceptance.prototype, "poNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProposalAcceptance.prototype, "poFileUrl", void 0);
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
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ProposalAcceptance.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], ProposalAcceptance.prototype, "updatedAt", void 0);
exports.ProposalAcceptance = ProposalAcceptance = tslib_1.__decorate([
    (0, typeorm_1.Entity)('proposal_acceptance')
], ProposalAcceptance);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Project = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
__webpack_require__(15);
const department_entity_1 = __webpack_require__(22);
const lead_entity_1 = __webpack_require__(39);
const proposal_entity_1 = __webpack_require__(41);
const salesConstants_1 = __webpack_require__(46);
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
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: salesConstants_1.PROJECT_STATUS,
        default: salesConstants_1.PROJECT_STATUS.PENDING
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof salesConstants_1.PROJECT_STATUS !== "undefined" && salesConstants_1.PROJECT_STATUS) === "function" ? _b : Object)
], Project.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _c : Object)
], Project.prototype, "department", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "departmentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_entity_1.Lead),
    (0, typeorm_1.JoinColumn)({ name: 'leadId' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof lead_entity_1.Lead !== "undefined" && lead_entity_1.Lead) === "function" ? _d : Object)
], Project.prototype, "lead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => proposal_entity_1.Proposal),
    (0, typeorm_1.JoinColumn)({ name: 'proposalId' }),
    tslib_1.__metadata("design:type", typeof (_e = typeof proposal_entity_1.Proposal !== "undefined" && proposal_entity_1.Proposal) === "function" ? _e : Object)
], Project.prototype, "proposal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "proposalId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Project.prototype, "createdAt", void 0);
exports.Project = Project = tslib_1.__decorate([
    (0, typeorm_1.Entity)('project')
], Project);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
// export * from './session.repository'; // DEPRECATED - Use LoginSessionRepository instead
tslib_1.__exportStar(__webpack_require__(67), exports);
// export * from './role.repository'; // Removed as Role entity does not exist
tslib_1.__exportStar(__webpack_require__(68), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);
tslib_1.__exportStar(__webpack_require__(70), exports);
tslib_1.__exportStar(__webpack_require__(71), exports);
tslib_1.__exportStar(__webpack_require__(74), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);
tslib_1.__exportStar(__webpack_require__(77), exports);
tslib_1.__exportStar(__webpack_require__(78), exports);
tslib_1.__exportStar(__webpack_require__(79), exports);
tslib_1.__exportStar(__webpack_require__(80), exports);
tslib_1.__exportStar(__webpack_require__(81), exports);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemModuleRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const lead_enquiry_entity_1 = __webpack_require__(47);
const lead_contact_entity_1 = __webpack_require__(44);
const lead_address_entity_1 = __webpack_require__(45);
let LeadRepository = class LeadRepository {
    constructor(leadEnquiryRepo, leadContactRepo, leadAddressRepo) {
        this.leadEnquiryRepo = leadEnquiryRepo;
        this.leadContactRepo = leadContactRepo;
        this.leadAddressRepo = leadAddressRepo;
    }
    /**
     * Generate enquiry ID: IS/YY/MM/DD/Sequence
     */
    async generateEnquiryId() {
        const today = new Date();
        const yy = today.getFullYear().toString().slice(-2);
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
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
        return `IS/${yy}/${mm}/${dd}/${sequence}`;
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
        const enquiryId = await this.generateEnquiryId();
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
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(13);
const userContants_1 = __webpack_require__(16);
const permissionManager_entity_1 = __webpack_require__(20);
const basicUtils_1 = __webpack_require__(72);
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
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isValidVIN = exports.getOTP = exports.getRandomInt = exports.validPhoneNo = exports.paginate = exports.removeSpecialCharacter = exports.isValidEmail = exports.validateEmail = exports.isNumber = exports.getRandomNumber = exports.getRandomString = void 0;
const tslib_1 = __webpack_require__(4);
const mobile_1 = tslib_1.__importDefault(__webpack_require__(73));
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
/* 73 */
/***/ ((module) => {

module.exports = require("libphonenumber-js/mobile");

/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionManagerRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginSessionRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadServiceRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalItemRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalPaymentTermRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalAcceptanceRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const proposal_acceptance_entity_1 = __webpack_require__(64);
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
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const project_entity_1 = __webpack_require__(65);
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
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(83);
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
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseHandlerModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const response_handler_service_1 = __webpack_require__(85);
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
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseHandlerService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const commonConstants_1 = __webpack_require__(19);
let ResponseHandlerService = class ResponseHandlerService {
    sendSuccessResponse(res, response) {
        res.status(200).json(response);
    }
    sendErrorResponse(res, errorBody) {
        console.error('Error Response: ', JSON.stringify(errorBody));
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
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorldDataModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const src_1 = __webpack_require__(87);
const config_module_1 = __webpack_require__(10);
const response_handler_module_1 = __webpack_require__(84);
const typeorm_1 = __webpack_require__(11);
const s3_module_1 = __webpack_require__(89);
const world_data_controller_1 = __webpack_require__(93);
const world_data_services_1 = __webpack_require__(95);
const world_data_repository_1 = __webpack_require__(96);
let WorldDataModule = class WorldDataModule {
};
exports.WorldDataModule = WorldDataModule;
exports.WorldDataModule = WorldDataModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            src_1.DBModule.forRoot(),
            config_module_1.ConfigModule,
            s3_module_1.S3Module,
            response_handler_module_1.ResponseHandlerModule,
            typeorm_1.TypeOrmModule.forFeature([
                src_1.Countries,
                src_1.States,
                src_1.Cities,
                src_1.Nationalities,
                src_1.User,
                src_1.LoginSession,
            ]),
        ],
        controllers: [
            world_data_controller_1.WorldDataController,
        ],
        providers: [
            world_data_services_1.WorldDataService,
            world_data_repository_1.WorldDataRepository
        ],
    })
], WorldDataModule);


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(5), exports);
tslib_1.__exportStar(__webpack_require__(88), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let DatabaseService = class DatabaseService {
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], DatabaseService);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var S3Module_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3Module = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_module_1 = __webpack_require__(10);
const config_service_1 = __webpack_require__(6);
const aws_sdk_1 = __webpack_require__(90);
const s3File_service_1 = __webpack_require__(91);
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
                    // imports: [ConfigModule],
                    provide: s3File_service_1.S3FileService,
                    useFactory: (configService1) => {
                        const config = new config_service_1.ConfigService();
                        config.loadFromEnv();
                        return S3Module_1.s3Configure(config.get().S3_bucket);
                    },
                    Inject: [],
                },
            ],
            controllers: [],
            exports: [s3File_service_1.S3FileService],
        };
    }
};
exports.S3Module = S3Module;
exports.S3Module = S3Module = S3Module_1 = tslib_1.__decorate([
    (0, common_1.Module)({
    // imports: [ConfigModule],
    })
], S3Module);


/***/ }),
/* 90 */
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3FileService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_service_1 = __webpack_require__(6);
const aws_sdk_1 = __webpack_require__(90);
const node_crypto_1 = __webpack_require__(92);
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
/* 92 */
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorldDataController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
// import { ApiOperation, ApiResponse } from '@nestjs/swagger';
const response_handler_service_1 = __webpack_require__(85);
const express_1 = __webpack_require__(94);
const world_data_services_1 = __webpack_require__(95);
const src_1 = __webpack_require__(97);
let WorldDataController = class WorldDataController {
    constructor(worldDataService, responseHandler) {
        this.worldDataService = worldDataService;
        this.responseHandler = responseHandler;
    }
    async getCountries(res) {
        try {
            const countries = await this.worldDataService.getCountries();
            return this.responseHandler.sendSuccessResponse(res, { message: 'All Countries List Fetched Successfully', data: countries });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getStates(res, countryId) {
        try {
            const states = await this.worldDataService.getStates(countryId);
            return this.responseHandler.sendSuccessResponse(res, { message: 'All States List of Particular Countries.', data: states });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getCities(res, stateId) {
        try {
            const cities = await this.worldDataService.getCities(stateId);
            return this.responseHandler.sendSuccessResponse(res, { message: 'All Cities List of this State Fetched Successfully', data: cities });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
};
exports.WorldDataController = WorldDataController;
tslib_1.__decorate([
    (0, common_1.Get)('countries'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WorldDataController.prototype, "getCountries", null);
tslib_1.__decorate([
    (0, common_1.Get)('countries/:countryId/states'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('countryId', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WorldDataController.prototype, "getStates", null);
tslib_1.__decorate([
    (0, common_1.Get)('states/:stateId/cities'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('stateId', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WorldDataController.prototype, "getCities", null);
exports.WorldDataController = WorldDataController = tslib_1.__decorate([
    (0, common_1.Controller)('world-data'),
    (0, common_1.UseGuards)(src_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof world_data_services_1.WorldDataService !== "undefined" && world_data_services_1.WorldDataService) === "function" ? _a : Object, typeof (_b = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _b : Object])
], WorldDataController);


/***/ }),
/* 94 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorldDataService = void 0;
const tslib_1 = __webpack_require__(4);
// world-data.service.ts
const common_1 = __webpack_require__(1);
const world_data_repository_1 = __webpack_require__(96);
let WorldDataService = class WorldDataService {
    constructor(worldDataRepo) {
        this.worldDataRepo = worldDataRepo;
    }
    async getCountries() {
        try {
            return await this.worldDataRepo.getCountries();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getStates(countryId) {
        if (!countryId) {
            throw new common_1.BadRequestException('Country ID is required');
        }
        try {
            return await this.worldDataRepo.getStates(countryId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getCities(stateId) {
        if (!stateId) {
            throw new common_1.BadRequestException('State ID is required');
        }
        try {
            return await this.worldDataRepo.getCities(stateId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.WorldDataService = WorldDataService;
exports.WorldDataService = WorldDataService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof world_data_repository_1.WorldDataRepository !== "undefined" && world_data_repository_1.WorldDataRepository) === "function" ? _a : Object])
], WorldDataService);


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorldDataRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
let WorldDataRepository = class WorldDataRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.countriesRepo = this.dataSource.getRepository(entities_1.Countries);
        this.statesRepo = this.dataSource.getRepository(entities_1.States);
        this.citiesRepo = this.dataSource.getRepository(entities_1.Cities);
        this.nationalitiesRepo = this.dataSource.getRepository(entities_1.Nationalities);
    }
    async getCountries() {
        try {
            // Get all countries
            const countries = await this.countriesRepo
                .createQueryBuilder('country')
                .select([
                'country.id',
                'country.name',
                'country.iso2',
                'country.phonecode',
                'country.latitude',
                'country.longitude',
                'country.capital',
                'country.currency',
            ])
                .orderBy('country.name', 'ASC')
                .getMany();
            // Get all nationalities
            const nationalities = await this.nationalitiesRepo
                .createQueryBuilder('nationality')
                .select([
                'nationality.alpha_2Code',
                'nationality.nationality',
                'nationality.enShortName',
            ])
                .getMany();
            // Create nationality map for quick lookup
            const nationalityMap = new Map();
            nationalities.forEach(nat => {
                if (nat.alpha_2Code) {
                    nationalityMap.set(nat.alpha_2Code, {
                        nationality: nat.nationality,
                        enShortName: nat.enShortName,
                    });
                }
            });
            // Map nationalities to countries
            return countries.map(country => {
                const nationality = nationalityMap.get(country.iso2);
                return {
                    ...country,
                    nationality: nationality?.nationality || null,
                    nationality_en_short_name: nationality?.enShortName || null,
                };
            });
        }
        catch (error) {
            throw new Error(`Failed to fetch countries: ${error.message}`);
        }
    }
    // Repository for World Data
    async getStates(countryId) {
        try {
            return await this.statesRepo
                .createQueryBuilder('state')
                .select([
                'state.id',
                'state.name',
                'state.countryId',
                'state.countryCode',
                'state.latitude',
                'state.longitude'
            ])
                .where('state.countryId = :countryId', { countryId })
                .orderBy('state.name', 'ASC')
                .getMany();
        }
        catch (error) {
            throw new Error(`Failed to fetch states: ${error.message}`);
        }
    }
    async getCities(stateId) {
        try {
            return await this.citiesRepo
                .createQueryBuilder('city')
                .select([
                'city.id',
                'city.name',
                'city.stateId',
                'city.stateCode',
                'city.countryId',
                'city.countryCode',
                'city.latitude',
                'city.longitude'
            ])
                .where('city.stateId = :stateId', { stateId })
                .orderBy('city.name', 'ASC')
                .getMany();
        }
        catch (error) {
            throw new Error(`Failed to fetch cities: ${error.message}`);
        }
    }
};
exports.WorldDataRepository = WorldDataRepository;
exports.WorldDataRepository = WorldDataRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], WorldDataRepository);


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(98), exports);
tslib_1.__exportStar(__webpack_require__(99), exports);
tslib_1.__exportStar(__webpack_require__(102), exports);
tslib_1.__exportStar(__webpack_require__(101), exports);


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const jwt_auth_guard_1 = __webpack_require__(99);
const module_access_guard_1 = __webpack_require__(101);
const src_1 = __webpack_require__(87);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([src_1.User, src_1.LoginSession])],
        providers: [jwt_auth_guard_1.JwtAuthGuard, module_access_guard_1.ModuleAccessGuard],
        exports: [jwt_auth_guard_1.JwtAuthGuard, module_access_guard_1.ModuleAccessGuard],
    })
], AuthModule);


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt = tslib_1.__importStar(__webpack_require__(100));
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const src_1 = __webpack_require__(87);
const config_service_1 = __webpack_require__(6);
let JwtAuthGuard = class JwtAuthGuard {
    constructor(userRepository, loginSessionRepository, configService) {
        this.userRepository = userRepository;
        this.loginSessionRepository = loginSessionRepository;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'] || request.headers['authorisation'];
        if (!authHeader?.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('authorisation token missing');
        }
        const token = authHeader.split(' ')[1];
        const secret = this.configService.get().JWT_SECRET_KEY;
        if (!secret) {
            throw new common_1.UnauthorizedException('JWT secret not configured');
        }
        try {
            const decoded = jwt.verify(token, secret);
            const user = await this.userRepository.findOne({ where: { id: decoded.referenceId }, relations: ['permission', 'modules', 'departments'] });
            if (!user)
                throw new common_1.UnauthorizedException('User not found');
            const loginSession = await this.loginSessionRepository.findOne({ where: { id: decoded.sessionId }, relations: ['user'] });
            if (loginSession)
                request.session = loginSession;
            request.user = user;
            request.user_group = decoded.user_group;
            request.department = user.departments;
            request.permissionId = decoded.permissionId;
            request.permission = user.permission;
            // expose modules for downstream guards
            try {
                request.modules = (user.modules || []).map((m) => (m.code ? m.code : m.id));
            }
            catch (e) {
                request.modules = [];
            }
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(src_1.User)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(src_1.LoginSession)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof config_service_1.ConfigService !== "undefined" && config_service_1.ConfigService) === "function" ? _c : Object])
], JwtAuthGuard);


/***/ }),
/* 100 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleAccessGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const module_access_decorator_1 = __webpack_require__(102);
const userContants_1 = __webpack_require__(16);
let ModuleAccessGuard = class ModuleAccessGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredModule = this.reflector.getAllAndOverride(module_access_decorator_1.MODULE_ACCESS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredModule)
            return true;
        const req = context.switchToHttp().getRequest();
        if ([userContants_1.USER_GROUP.SUPER_ADMIN, userContants_1.USER_GROUP.ADMIN].includes(req.user_group))
            return true;
        const modules = req.modules || [];
        if (!modules || modules.length === 0) {
            throw new common_1.ForbiddenException('Module access denied');
        }
        const ok = modules.some((m) => {
            if (typeof m === 'string')
                return m === requiredModule;
            return (m.code && m.code === requiredModule) || (m.id && String(m.id) === String(requiredModule));
        });
        if (!ok)
            throw new common_1.ForbiddenException('Module access denied');
        return true;
    }
};
exports.ModuleAccessGuard = ModuleAccessGuard;
exports.ModuleAccessGuard = ModuleAccessGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], ModuleAccessGuard);


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleAccess = exports.MODULE_ACCESS_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.MODULE_ACCESS_KEY = 'module_access';
const ModuleAccess = (moduleCode) => (0, common_1.SetMetadata)(exports.MODULE_ACCESS_KEY, moduleCode);
exports.ModuleAccess = ModuleAccess;


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const passport_1 = __webpack_require__(104);
const src_1 = __webpack_require__(87);
const auth_service_1 = __webpack_require__(105);
const auth_controller_1 = __webpack_require__(110);
const google_strategy_1 = __webpack_require__(115);
const jwt_service_1 = __webpack_require__(106);
const jwt_auth_guard_1 = __webpack_require__(112);
const response_handler_module_1 = __webpack_require__(84);
const defaultUser_service_1 = __webpack_require__(117);
const user_repository_1 = __webpack_require__(71);
const permissionManager_repository_1 = __webpack_require__(74);
let AuthModule = class AuthModule {
    constructor(defaultUserService) {
        this.defaultUserService = defaultUserService;
    }
    async onModuleInit() {
        if (process.env.CREATE_DEFAULT_SUPER_ADMIN === 'true') {
            await this.defaultUserService.addDefaultUser();
        }
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            src_1.DBModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([src_1.User, src_1.LoginSession, src_1.PermissionManager, src_1.Department, src_1.SystemModule]),
            passport_1.PassportModule.register({ defaultStrategy: 'google' }),
            response_handler_module_1.ResponseHandlerModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            google_strategy_1.GoogleStrategy,
            jwt_service_1.JwtService,
            jwt_auth_guard_1.JwtAuthGuard,
            defaultUser_service_1.DefaultUserService,
            user_repository_1.UserRepository,
            permissionManager_repository_1.PermissionManagerRepository,
            src_1.LoginSessionRepository,
        ],
        exports: [auth_service_1.AuthService, jwt_auth_guard_1.JwtAuthGuard, defaultUser_service_1.DefaultUserService, user_repository_1.UserRepository, permissionManager_repository_1.PermissionManagerRepository, src_1.LoginSessionRepository],
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof defaultUser_service_1.DefaultUserService !== "undefined" && defaultUser_service_1.DefaultUserService) === "function" ? _a : Object])
], AuthModule);


/***/ }),
/* 104 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const src_1 = __webpack_require__(87);
const jwt_service_1 = __webpack_require__(106);
const commonConstants_1 = __webpack_require__(19);
const userContants_1 = __webpack_require__(16);
const bcryptUtil_1 = __webpack_require__(107);
const messageConstants_1 = __webpack_require__(109);
const bcrypt = tslib_1.__importStar(__webpack_require__(108));
let AuthService = class AuthService {
    constructor(userRepository, loginSessionRepository, departmentRepository, systemModuleRepository, jwtService, loginSessionRepo) {
        this.userRepository = userRepository;
        this.loginSessionRepository = loginSessionRepository;
        this.departmentRepository = departmentRepository;
        this.systemModuleRepository = systemModuleRepository;
        this.jwtService = jwtService;
        this.loginSessionRepo = loginSessionRepo;
    }
    async loginWithEmailOrPhonePassword(input, deviceType = commonConstants_1.DEVICE_TYPE.WEB) {
        try {
            const { identity, password } = input;
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.permission', 'permission')
                .leftJoinAndSelect('user.modules', 'modules')
                .leftJoinAndSelect('user.departments', 'departments')
                .leftJoinAndSelect('user.teams', 'teams')
                .addSelect('user.password')
                .where('LOWER(user.email) = LOWER(:email)', { email: identity })
                .getOne();
            if (!user) {
                throw { message: messageConstants_1.LOGIN_MSG.INVALID_CREDENTIALS, statusCode: commonConstants_1.ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER };
            }
            if (user.status !== userContants_1.USER_ACCOUNT_STATUS.ACTIVE) {
                throw { message: messageConstants_1.LOGIN_MSG.INACTIVE_ACCOUNT, statusCode: commonConstants_1.ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER };
            }
            const isMatch = await (0, bcryptUtil_1.checkPasswordHash)(password, user.password);
            if (!isMatch) {
                throw { message: messageConstants_1.LOGIN_MSG.INVALID_CREDENTIALS, statusCode: commonConstants_1.ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER };
            }
            return this.generateAuthResponse(user, deviceType);
        }
        catch (error) {
            console.log("Error login", error);
            throw error;
        }
    }
    async createUser(createUser, user) {
        try {
            const email = createUser.email.toLowerCase().trim();
            if (!email.endsWith('@intercert.com')) {
                throw new common_1.UnauthorizedException('Only @intercert.com email addresses are allowed.');
            }
            const existingUser = await this.userRepository.findOne({ where: { email } });
            if (existingUser) {
                throw new common_1.UnauthorizedException('User with this email already exists.');
            }
            const defaultPassword = "Intercert@OPMS123";
            const passwordToHash = createUser.password || defaultPassword;
            const hashedPassword = await bcrypt.hash(passwordToHash, 10);
            const newUser = await this.userRepository.save({
                name: createUser.name,
                email: email,
                password: hashedPassword,
                roleName: createUser.role,
                user_group: createUser.user_group || userContants_1.USER_GROUP.USER,
                status: userContants_1.USER_ACCOUNT_STATUS.ACTIVE,
                verifyStatus: userContants_1.USER_VERIFY_STATUS.VERIFIED,
                loginSource: userContants_1.USER_LOGIN_SOURCE.LOCAL,
                addedBy: user,
            });
            return {
                message: "User registered successfully",
                data: newUser,
                tempPassword: createUser.password ? undefined : defaultPassword
            };
        }
        catch (error) {
            console.log("Error in createUser Service: ", error);
            throw error;
        }
    }
    async validateGoogleUser(googleUser) {
        const { email, picture } = googleUser;
        if (!email.endsWith('@intercert.com')) {
            throw new common_1.UnauthorizedException('Access denied. Only @intercert.com email addresses are allowed.');
        }
        const user = await this.userRepository.findOne({
            where: { email: email.toLowerCase() },
            relations: ['permission', 'modules', 'departments', 'teams']
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not registered. Please contact admin to create your account first.');
        }
        if (user.status !== userContants_1.USER_ACCOUNT_STATUS.ACTIVE) {
            throw new common_1.UnauthorizedException('Your account is inactive. Please contact admin.');
        }
        if (picture && user.avatar !== picture) {
            user.avatar = picture;
            await this.userRepository.save(user);
        }
        return this.generateAuthResponse(user, commonConstants_1.DEVICE_TYPE.WEB);
    }
    async deleteIntercertUser(payload) {
        const normalizedEmail = payload.email.trim().toLowerCase();
        if (!normalizedEmail.endsWith('@intercert.com')) {
            throw new common_1.ForbiddenException('Only @intercert.com users can be deleted through this endpoint.');
        }
        const user = await this.userRepository.findOne({
            where: { email: normalizedEmail },
            relations: ['permission', 'modules', 'departments']
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${normalizedEmail} not found`);
        }
        console.log(`[Delete User] Starting deletion process for user: ${normalizedEmail} (ID: ${user.id})`);
        if (user.user_group === userContants_1.USER_GROUP.SUPER_ADMIN) {
            console.log(`[Delete User] Attempt to delete Super Admin user blocked: ${normalizedEmail}`);
            throw new common_1.ForbiddenException("Cannot delete Super Admin users. This action is not permitted.");
        }
        let sessionCountBeforeDeletion = 0;
        let sessionsBeforeDeletion = [];
        try {
            sessionsBeforeDeletion = await this.loginSessionRepository.find({
                where: { user: { id: user.id } }
            });
            sessionCountBeforeDeletion = sessionsBeforeDeletion.length;
            console.log(`[Delete User] Active sessions found before deletion: ${sessionCountBeforeDeletion}`);
        }
        catch (error) {
            console.log(`[Delete User] Error checking sessions for user ${normalizedEmail}:`, error);
        }
        try {
            if (sessionCountBeforeDeletion > 0) {
                await this.loginSessionRepository.delete({ user: { id: user.id } });
                console.log(`[Delete User] Sessions deleted for user ${normalizedEmail}: ${sessionCountBeforeDeletion}`);
            }
        }
        catch (error) {
            console.log(`[Delete User] Error deleting sessions for user ${normalizedEmail}:`, error);
        }
        try {
            if (payload.hard) {
                console.log(`[Delete User] Hard delete initiated for user: ${normalizedEmail}`);
                await this.userRepository.remove(user);
            }
            else {
                console.log(`[Delete User] Soft delete (deactivation) initiated for user: ${normalizedEmail}`);
                user.status = userContants_1.USER_ACCOUNT_STATUS.INACTIVE;
                await this.userRepository.save(user);
            }
        }
        catch (error) {
            console.log(`[Delete User] Error deleting/deactivating user ${normalizedEmail}:`, error);
            throw error;
        }
        const deletionType = payload.hard ? "hard deleted" : "deactivated";
        console.log(`[Delete User] User ${normalizedEmail} has been ${deletionType} successfully`);
        return {
            message: payload.hard
                ? "User deleted successfully. All associated sessions have been cleared."
                : "User deactivated successfully. All active sessions have been cleared.",
            data: {
                email: normalizedEmail,
                userId: user.id,
                deletionType: payload.hard ? "hard_delete" : "soft_delete",
                activeSessions: {
                    before: sessionCountBeforeDeletion,
                    after: 0,
                    cleared: true
                },
                timestamp: new Date().toISOString()
            }
        };
    }
    async generateAuthResponse(user, deviceType = commonConstants_1.DEVICE_TYPE.WEB) {
        // Generate refresh token for session
        const refreshToken = await this.jwtService.generateRefreshToken({ referenceId: user.id });
        const refreshTokenExpiry = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days
        // Create login session
        const session = this.loginSessionRepository.create({
            user: user,
            loginBy: userContants_1.LOGIN_BY.EMAIL,
            loginIdentity: user.email,
            loginStatus: userContants_1.SESSION_STATUS.LOGGED_IN,
            refreshToken: refreshToken,
            refreshTokenExpiry: refreshTokenExpiry,
            deviceType: deviceType,
        });
        const savedSession = await this.loginSessionRepository.save(session);
        const payload = {
            referenceId: user.id,
            userRole: user.roleName,
            user_group: user.user_group,
            sessionId: savedSession.id,
            permissionId: user.permission?.id,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            modules: (user.modules || []).map(m => m.code || m.id),
            tokenType: commonConstants_1.TOKEN_TYPE.USER_LOGIN,
        };
        const token = await this.jwtService.generateJWTToken(payload);
        const isSuperAdmin = user.user_group === userContants_1.USER_GROUP.SUPER_ADMIN;
        const modules = isSuperAdmin ? await this.systemModuleRepository.find() : (user.modules || []);
        const departments = isSuperAdmin ? await this.departmentRepository.find() : (user.departments || []);
        const moduleNames = modules.map(m => m.name).filter(Boolean);
        const departmentNames = departments.map(d => d.name).filter(Boolean);
        return {
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    user_group: user.user_group,
                    roleName: user.roleName,
                    departments: departmentNames,
                    modules: moduleNames,
                },
                token
            }
        };
    }
    async logout(token) {
        if (!token) {
            throw new common_1.BadRequestException('Token is required for logout');
        }
        const decoded = await this.jwtService.verifyJWTToken(token);
        if (!decoded.verified || !decoded.payload) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
        const sessionId = decoded.payload.sessionId;
        if (!sessionId) {
            throw new common_1.BadRequestException('No session found in token');
        }
        console.log(`[Logout] Deleting session: ${sessionId} for user: ${decoded.payload.referenceId}`);
        try {
            await this.loginSessionRepo.logoutCurrentSession(sessionId);
            console.log(`[Logout] Session ${sessionId} successfully deleted`);
            return {
                message: 'Logged out successfully. Session has been terminated.'
            };
        }
        catch (error) {
            console.error('[Logout] Error deleting session:', error);
            throw error;
        }
    }
    async getUsers() {
        return this.userRepository.find({
            relations: ['permission', 'modules', 'departments', 'teams']
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(src_1.User)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(src_1.LoginSession)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(src_1.Department)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(src_1.SystemModule)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof jwt_service_1.JwtService !== "undefined" && jwt_service_1.JwtService) === "function" ? _e : Object, typeof (_f = typeof src_1.LoginSessionRepository !== "undefined" && src_1.LoginSessionRepository) === "function" ? _f : Object])
], AuthService);


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt = tslib_1.__importStar(__webpack_require__(100));
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
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkPasswordHash = exports.generatePasswordHash = void 0;
const tslib_1 = __webpack_require__(4);
const bcrypt = tslib_1.__importStar(__webpack_require__(108));
const generatePasswordHash = async (password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    }
    catch (err) {
        throw err;
    }
};
exports.generatePasswordHash = generatePasswordHash;
const checkPasswordHash = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    }
    catch (err) {
        console.log(" becrypt error check password error", err);
        return false;
    }
};
exports.checkPasswordHash = checkPasswordHash;


/***/ }),
/* 108 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 109 */
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
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(104);
const express_1 = __webpack_require__(94);
const auth_service_1 = __webpack_require__(105);
const config_service_1 = __webpack_require__(6);
const response_handler_service_1 = __webpack_require__(85);
const user_dto_1 = __webpack_require__(111);
const jwt_auth_guard_1 = __webpack_require__(112);
const user_management_dto_1 = __webpack_require__(113);
const authenticated_request_interface_1 = __webpack_require__(114);
const userContants_1 = __webpack_require__(16);
let AuthController = class AuthController {
    constructor(authService, configService, responseHandler) {
        this.authService = authService;
        this.configService = configService;
        this.responseHandler = responseHandler;
    }
    async login(res, req, body) {
        try {
            const deviceType = req.headers['devicetype'];
            const result = await this.authService.loginWithEmailOrPhonePassword(body, deviceType);
            return this.responseHandler.sendSuccessResponse(res, result);
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async googleAuth() {
        // Initiates Google OAuth2 login flow
    }
    // @Get('google/callback')
    // @UseGuards(AuthGuard('google'))
    // async googleAuthRedirect(@Req() req: GoogleUserRequest, @Res() res: Response) {
    //   try {
    //     const user = req.user;
    //     const frontendUrl = this.configService.get().FRONTEND_BASE_URL || 'http://localhost:4200';
    //     return res.redirect(`${frontendUrl}/auth-callback?token=${user}`);
    //   } catch (error) {
    //     console.error('Google login error:', error);
    //     const frontendUrl = this.configService.get().FRONTEND_BASE_URL || 'http://localhost:4200';
    //     const errorMessage = encodeURIComponent(error.message || 'Login failed');
    //     return res.redirect(`${frontendUrl}/login?error=${errorMessage}`);
    //   }
    // }
    // For testing protected route with JWT
    async googleAuthRedirect(req, res) {
        try {
            const googleUser = req.user;
            console.log('Google user attempting login:', googleUser.email);
            const frontendUrl = this.configService.get().FRONTEND_BASE_URL || 'http://localhost:4200';
            const result = await this.authService.validateGoogleUser(googleUser);
            return res.redirect(`${frontendUrl}/auth-callback?token=${result.data.token}`);
        }
        catch (err) {
            console.error('Google login error:', err);
            const frontendUrl = this.configService.get().FRONTEND_BASE_URL || 'http://localhost:4200';
            const errorMessage = encodeURIComponent(err.message || 'Login failed');
            return res.redirect(`${frontendUrl}/login?error=${errorMessage}`);
        }
    }
    //  @Get('google/callback')
    // @UseGuards(AuthGuard('google'))
    // async googleAuthRedirect(@Req() req, @Res() res: Response) {
    //   try {
    //     const googleUser = req.user;
    //     console.log('[Google Auth] Google user attempting login:', {
    //       email: googleUser.email,
    //       name: googleUser.name,
    //       id: googleUser.id
    //     });
    //     // Validate FRONTEND_URL environment variable
    //     const frontendUrl = process.env.FRONTEND_URL;
    //     if (!frontendUrl) {
    //       console.error('[Google Auth] FRONTEND_URL environment variable is not set');
    //       return res.status(500).json({
    //         success: false,
    //         error: 'Server configuration error',
    //         message: 'Frontend URL not configured'
    //       });
    //     }
    //     // 1️⃣ Check if email domain is whitelisted (@intercert.com only)
    //     const allowedDomains = ['@intercert.com', '@accric.com'];
    //     const isAllowedDomain = googleUser.email && allowedDomains.some(domain => googleUser.email.endsWith(domain));
    //     if (!googleUser.email || !isAllowedDomain) {
    //       console.log('[Google Auth] Unauthorized email domain:', googleUser.email);
    //       console.log('[Google Auth] Allowed domains:', allowedDomains.join(', '));
    //       return res.redirect(`${frontendUrl}/login?error=unauthorized_email&email=${encodeURIComponent(googleUser.email || 'unknown')}`);
    //     }
    //     // 2️⃣ Check if user exists in DB
    //     const existingUser = await this.userRepository.findOneByEmail(googleUser.email);
    //     if (!existingUser) {
    //       console.log('[Google Auth] User not found in database:', googleUser.email);
    //       console.log('[Google Auth] User must be created by administrator first');
    //       return res.redirect(`${frontendUrl}/login?error=user_not_registered&email=${encodeURIComponent(googleUser.email)}`);
    //     }
    //     console.log('[Google Auth] User found in database:', {
    //       email: existingUser.email,
    //       name: existingUser.name,
    //       role: existingUser.role,
    //       isActive: existingUser.isActive,
    //       provider: existingUser.provider
    //     });
    //     // Check if user is active (soft delete protection)
    //     if (!existingUser.isActive) {
    //       console.log('[Google Auth] User is inactive/deleted and cannot login:', existingUser.email);
    //       return res.redirect(`${frontendUrl}/login?error=user_inactive_or_deleted&email=${encodeURIComponent(googleUser.email)}`);
    //     }
    //     // 3️⃣ Generate JWT for your app
    //     const payload: JWTPayload = {
    //       userId: this.convertUUIDToNumber(existingUser.user_id),
    //       email: existingUser.email,
    //       role: existingUser.role,
    //     };
    //     const jwtToken = await this.jwtService.generateJWTToken(payload);
    //     console.log('[Google Auth] JWT token generated successfully for:', existingUser.email);
    //     console.log('[Google Auth] JWT payload:', payload);
    //     // 4️⃣ Save session in DB
    //     try {
    //       await this.sessionRepository.createOrUpdateSession(
    //         existingUser.user_id,
    //         existingUser.email,
    //         jwtToken,
    //         googleUser,
    //         new Date(Date.now() + 60 * 60 * 1000),
    //       );
    //       console.log('[Google Auth] Session created for user:', existingUser.email);
    //     } catch (sessionError) {
    //       console.error('[Google Auth] Session creation failed, but continuing:', sessionError);
    //       // Continue even if session creation fails
    //     }
    //     // 5️⃣ Redirect to auth-callback with JWT as query param
    //     const redirectUrl = `${frontendUrl}/auth-callback?token=${encodeURIComponent(jwtToken)}`;
    //     console.log('[Google Auth] Redirecting to:', redirectUrl);
    //     return res.redirect(redirectUrl);
    //   } catch (err) {
    //     console.error('[Google Auth] Unexpected error during Google authentication:', err);
    //     const frontendUrl = process.env.FRONTEND_URL || 'https://opms.intercert.com';
    //     return res.redirect(`${frontendUrl}/login?error=login_failed&details=${encodeURIComponent(err.message || 'Unknown error')}`);
    //   }
    // }
    async createUser(createUser, req, res) {
        try {
            const user = req.user;
            if (![userContants_1.USER_GROUP.SUPER_ADMIN, userContants_1.USER_GROUP.ADMIN].includes(user.user_group)) {
                throw new Error('Access denied. Only SUPER_ADMIN and ADMIN can create users.');
            }
            const response = await this.authService.createUser(createUser, user);
            return this.responseHandler.sendSuccessResponse(res, response);
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async logout(req, res) {
        try {
            const token = this.extractTokenFromRequest(req);
            if (!token) {
                throw new common_1.ForbiddenException('No token provided');
            }
            const response = await this.authService.logout(token);
            return this.responseHandler.sendSuccessResponse(res, response);
        }
        catch (error) {
            console.error('Logout error:', error);
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getUsers(res) {
        try {
            const users = await this.authService.getUsers();
            return this.responseHandler.sendSuccessResponse(res, { data: users, message: 'Users retrieved successfully' });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async deleteIntercertUser(payload, req, res) {
        try {
            const userdata = req.user;
            console.log('Delete user request by:', userdata.email, 'User Group:', userdata.user_group);
            if (![userContants_1.USER_GROUP.SUPER_ADMIN, userContants_1.USER_GROUP.ADMIN].includes(userdata.user_group)) {
                throw new common_1.ForbiddenException('Access denied. Only SUPER_ADMIN and ADMIN can delete users.');
            }
            const response = await this.authService.deleteIntercertUser(payload);
            return this.responseHandler.sendSuccessResponse(res, response);
        }
        catch (error) {
            console.log('Error in deleteIntercertUser: ', error);
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    extractTokenFromRequest(req) {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7);
        }
        if (req.query.token && typeof req.query.token === 'string') {
            return req.query.token;
        }
        return null;
    }
    convertUUIDToNumber(uuid) {
        // Convert UUID to a consistent number for JWT
        return Number.parseInt(uuid.replace('-', ''), 16) % 2147483647;
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)(new common_1.ValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof user_dto_1.LoginDto !== "undefined" && user_dto_1.LoginDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
tslib_1.__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof authenticated_request_interface_1.GoogleUserRequest !== "undefined" && authenticated_request_interface_1.GoogleUserRequest) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
tslib_1.__decorate([
    (0, common_1.Post)('create-user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof user_management_dto_1.CreateUserDto !== "undefined" && user_management_dto_1.CreateUserDto) === "function" ? _j : Object, typeof (_k = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _k : Object, typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, common_1.Post)('logout'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _m : Object, typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
tslib_1.__decorate([
    (0, common_1.Get)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, common_1.Delete)('intercert-user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_q = typeof user_dto_1.DeleteIntercertUserDto !== "undefined" && user_dto_1.DeleteIntercertUserDto) === "function" ? _q : Object, typeof (_r = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _r : Object, typeof (_s = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _s : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "deleteIntercertUser", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof config_service_1.ConfigService !== "undefined" && config_service_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _c : Object])
], AuthController);


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteIntercertUserDto = exports.SimpleEmployeeDto = exports.EmployeeRegisterDto = exports.ArtisanRegisterDto = exports.CustomLoginDto = exports.RegisterDto = exports.RegisterWithEmailPasswordDto = exports.ChangePasswordDto = exports.RenewTokenDto = exports.UpdatePersonalDetailDto = exports.VerifyPhoneNoDto = exports.AddPhoneDto = exports.AddEmailDto = exports.VerifyDto = exports.AddUpdateRolesAndPermissions = exports.LoginOrRegisterDto = exports.notificationData = exports.UserFilterDto = exports.PaginationDto = exports.UserQueryDto = exports.LoginDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(17);
const userContants_1 = __webpack_require__(16);
const commonConstants_1 = __webpack_require__(19);
class LoginDto {
}
exports.LoginDto = LoginDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "countryCode", void 0);
class UserQueryDto {
}
exports.UserQueryDto = UserQueryDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _a : Object)
], UserQueryDto.prototype, "user_group", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UserQueryDto.prototype, "page", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UserQueryDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserQueryDto.prototype, "search", void 0);
class PaginationDto {
}
exports.PaginationDto = PaginationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
class UserFilterDto {
}
exports.UserFilterDto = UserFilterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_GROUP),
    tslib_1.__metadata("design:type", typeof (_b = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _b : Object)
], UserFilterDto.prototype, "user_group", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserFilterDto.prototype, "search", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_ACCOUNT_STATUS),
    tslib_1.__metadata("design:type", typeof (_c = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _c : Object)
], UserFilterDto.prototype, "status", void 0);
class notificationData {
}
exports.notificationData = notificationData;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], notificationData.prototype, "fcmToken", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof commonConstants_1.DEVICE_TYPE !== "undefined" && commonConstants_1.DEVICE_TYPE) === "function" ? _d : Object)
], notificationData.prototype, "deviceType", void 0);
// loginOrRegister.dto.ts
class LoginOrRegisterDto {
}
exports.LoginOrRegisterDto = LoginOrRegisterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginOrRegisterDto.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginOrRegisterDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(userContants_1.USER_GROUP),
    tslib_1.__metadata("design:type", typeof (_e = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _e : Object)
], LoginOrRegisterDto.prototype, "user_group", void 0);
class AddUpdateRolesAndPermissions {
}
exports.AddUpdateRolesAndPermissions = AddUpdateRolesAndPermissions;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AddUpdateRolesAndPermissions.prototype, "roleName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(userContants_1.USER_GROUP),
    tslib_1.__metadata("design:type", typeof (_f = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _f : Object)
], AddUpdateRolesAndPermissions.prototype, "user_group", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], AddUpdateRolesAndPermissions.prototype, "isUpdate", void 0);
// verify.dto.ts
class VerifyDto {
}
exports.VerifyDto = VerifyDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'OTP must be at least 6 characters long' }),
    tslib_1.__metadata("design:type", String)
], VerifyDto.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], VerifyDto.prototype, "referenceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_g = typeof commonConstants_1.DEVICE_TYPE !== "undefined" && commonConstants_1.DEVICE_TYPE) === "function" ? _g : Object)
], VerifyDto.prototype, "deviceType", void 0);
// addEmail.dto.ts
class AddEmailDto {
}
exports.AddEmailDto = AddEmailDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], AddEmailDto.prototype, "email", void 0);
// addPhone.dto.ts
class AddPhoneDto {
}
exports.AddPhoneDto = AddPhoneDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AddPhoneDto.prototype, "phoneNo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AddPhoneDto.prototype, "countryCode", void 0);
// verifyPhoneNo.dto.ts
class VerifyPhoneNoDto {
}
exports.VerifyPhoneNoDto = VerifyPhoneNoDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], VerifyPhoneNoDto.prototype, "referenceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{6}$/),
    tslib_1.__metadata("design:type", String)
], VerifyPhoneNoDto.prototype, "otp", void 0);
// updatePersonalDetail.dto.ts
class UpdatePersonalDetailDto {
}
exports.UpdatePersonalDetailDto = UpdatePersonalDetailDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePersonalDetailDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePersonalDetailDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePersonalDetailDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePersonalDetailDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], UpdatePersonalDetailDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePersonalDetailDto.prototype, "avatar", void 0);
// renewToken.dto.ts
class RenewTokenDto {
}
exports.RenewTokenDto = RenewTokenDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RenewTokenDto.prototype, "accessToken", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RenewTokenDto.prototype, "refreshToken", void 0);
// changePassword.dto.ts
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Old password is required' }),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "oldPassword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'New password is required' }),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ChangePasswordDto.prototype, "referenceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_h = typeof commonConstants_1.DEVICE_TYPE !== "undefined" && commonConstants_1.DEVICE_TYPE) === "function" ? _h : Object)
], ChangePasswordDto.prototype, "deviceType", void 0);
// registerWithEmailPassword.dto.ts
class RegisterWithEmailPasswordDto {
}
exports.RegisterWithEmailPasswordDto = RegisterWithEmailPasswordDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], RegisterWithEmailPasswordDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^.{4,16}$/),
    tslib_1.__metadata("design:type", String)
], RegisterWithEmailPasswordDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^.{2,50}$/),
    tslib_1.__metadata("design:type", String)
], RegisterWithEmailPasswordDto.prototype, "name", void 0);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(userContants_1.USER_GROUP),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_j = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _j : Object)
], RegisterDto.prototype, "user_group", void 0);
class CustomLoginDto {
}
exports.CustomLoginDto = CustomLoginDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
    // @Matches(/^.{2,50}$/)
    ,
    tslib_1.__metadata("design:type", String)
], CustomLoginDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], CustomLoginDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CustomLoginDto.prototype, "phoneNo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CustomLoginDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", typeof (_k = typeof userContants_1.LOGIN_BY !== "undefined" && userContants_1.LOGIN_BY) === "function" ? _k : Object)
], CustomLoginDto.prototype, "verifyBy", void 0);
class ArtisanRegisterDto {
}
exports.ArtisanRegisterDto = ArtisanRegisterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], ArtisanRegisterDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ArtisanRegisterDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ArtisanRegisterDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ArtisanRegisterDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone number is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 10, { message: 'Phone number must be exactly 10 digits long' }),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Phone number must contain only digits' }),
    tslib_1.__metadata("design:type", String)
], ArtisanRegisterDto.prototype, "phoneNo", void 0);
class EmployeeRegisterDto {
}
exports.EmployeeRegisterDto = EmployeeRegisterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], EmployeeRegisterDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EmployeeRegisterDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EmployeeRegisterDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EmployeeRegisterDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone number is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 10, { message: 'Phone number must be exactly 10 digits long' }),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Phone number must contain only digits' }),
    tslib_1.__metadata("design:type", String)
], EmployeeRegisterDto.prototype, "phoneNo", void 0);
class SimpleEmployeeDto {
}
exports.SimpleEmployeeDto = SimpleEmployeeDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SimpleEmployeeDto.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SimpleEmployeeDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone number is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 10, { message: 'Phone number must be exactly 10 digits long' }),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Phone number must contain only digits' }),
    tslib_1.__metadata("design:type", String)
], SimpleEmployeeDto.prototype, "phoneNo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_GROUP),
    tslib_1.__metadata("design:type", typeof (_l = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _l : Object)
], SimpleEmployeeDto.prototype, "user_group", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SimpleEmployeeDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SimpleEmployeeDto.prototype, "name", void 0);
class DeleteIntercertUserDto {
}
exports.DeleteIntercertUserDto = DeleteIntercertUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DeleteIntercertUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], DeleteIntercertUserDto.prototype, "hard", void 0);


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt = tslib_1.__importStar(__webpack_require__(100));
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const src_1 = __webpack_require__(87);
let JwtAuthGuard = class JwtAuthGuard {
    constructor(userRepository, loginSessionRepository, permissionRepository) {
        this.userRepository = userRepository;
        this.loginSessionRepository = loginSessionRepository;
        this.permissionRepository = permissionRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'] ||
            request.headers['authorisation'] ||
            request.headers['accesstoken'] ||
            request.headers['accessToken'];
        if (!authHeader) {
            throw new common_1.UnauthorizedException('authorisation token missing');
        }
        let token = authHeader;
        if (authHeader.toLowerCase().startsWith('bearer')) {
            token = authHeader.slice(6).trim();
        }
        if (!token) {
            throw new common_1.UnauthorizedException('authorisation token missing');
        }
        const secret = process.env.JWT_SECRET_KEY;
        if (!secret) {
            throw new common_1.UnauthorizedException('JWT secret not configured');
        }
        try {
            // Verify token and extract payload
            console.log("Verifying token...");
            const decoded = jwt.verify(token, secret);
            console.log("Decoded JWT Token: ", decoded);
            // Look up user in database using referenceId (userId) from JWT payload
            console.log("Looking for user with ID:", decoded.referenceId);
            const user = await this.userRepository.findOne({
                where: { id: decoded.referenceId },
                relations: ['permission', 'modules', 'departments'],
            });
            console.log("Authenticated User from DB: ", user);
            if (!user) {
                console.log("User not found with ID:", decoded.referenceId);
                throw new common_1.UnauthorizedException('User not found');
            }
            // Verify session exists and is active
            console.log("Looking for login session with ID:", decoded.sessionId);
            const loginSession = await this.loginSessionRepository.findOne({
                where: { id: decoded.sessionId },
                relations: ['user'],
            });
            if (loginSession) {
                console.log("Valid login session found:", loginSession.id);
                request.session = loginSession;
            }
            else {
                console.warn('Login session not found in DB, but JWT is valid. Proceeding for Postman/Dev compatibility.');
            }
            // Fallback for missing permissions: If user has no permission assigned, try to find a group-level permission
            if (!user.permission) {
                console.log(`User ${user.email} has no permission assigned. Looking for group-level permission for: ${decoded.user_group}`);
                const groupPermission = await this.permissionRepository.findOne({
                    where: { user_group: decoded.user_group }
                });
                if (groupPermission) {
                    console.log(`Found group-level permission (ID: ${groupPermission.id}) for user group: ${decoded.user_group}`);
                    user.permission = groupPermission;
                }
            }
            // Attach user, user_group, department, and permission to request object
            request.userEmail = user.email;
            request.userRole = decoded.userRole;
            request.user = user;
            request.user_group = decoded.user_group;
            request.department = user.departments;
            request.modules = user.modules;
            request.permissionId = decoded.permissionId;
            request.permission = user.permission;
            // Allow request to proceed
            return true;
        }
        catch (error) {
            console.error('JWT verification failed:', error.message);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(src_1.User)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(src_1.LoginSession)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(src_1.PermissionManager)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], JwtAuthGuard);


/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginUserDto = exports.UpdateUserDto = exports.CreateUserDto = exports.MasterUserListRequestDto = exports.DataTableSearchDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(17);
const userContants_1 = __webpack_require__(16);
class DataTableSearchDto {
}
exports.DataTableSearchDto = DataTableSearchDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], DataTableSearchDto.prototype, "value", void 0);
class MasterUserListRequestDto {
}
exports.MasterUserListRequestDto = MasterUserListRequestDto;
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], MasterUserListRequestDto.prototype, "draw", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], MasterUserListRequestDto.prototype, "start", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], MasterUserListRequestDto.prototype, "length", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataTableSearchDto),
    tslib_1.__metadata("design:type", DataTableSearchDto)
], MasterUserListRequestDto.prototype, "search", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], MasterUserListRequestDto.prototype, "searchname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], MasterUserListRequestDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], MasterUserListRequestDto.prototype, "user_type", void 0);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_GROUP),
    tslib_1.__metadata("design:type", typeof (_a = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _a : Object)
], CreateUserDto.prototype, "user_group", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateUserDto.prototype, "modules", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateUserDto.prototype, "departments", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateUserDto.prototype, "teams", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_GROUP),
    tslib_1.__metadata("design:type", typeof (_b = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _b : Object)
], UpdateUserDto.prototype, "user_group", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdateUserDto.prototype, "modules", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdateUserDto.prototype, "departments", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdateUserDto.prototype, "teams", void 0);
class LoginUserDto {
}
exports.LoginUserDto = LoginUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleStrategy = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(104);
const passport_google_oauth20_1 = __webpack_require__(116);
const config_service_1 = __webpack_require__(6);
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(configService) {
        const config = configService.get();
        const serverBasePath = config.SERVER_BASE_PATH;
        const callbackURL = config.GoogleAuth.GOOGLE_CALLBACK_URL ||
            (serverBasePath ? `${serverBasePath}/api/auth/google/callback` : `${config.FRONTEND_BASE_URL}/api/auth/google/callback`);
        super({
            clientID: config.GoogleAuth.GOOGLE_CLIENT_ID,
            clientSecret: config.GoogleAuth.GOOGLE_CLIENT_SECRET,
            callbackURL,
            scope: ['email', 'profile'],
            prompt: 'select_account',
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { emails, photos, provider } = profile;
        const user = {
            email: emails[0].value,
            name: profile.displayName,
            picture: photos[0].value,
            provider,
            accessToken,
            // department: profile._json.department,
            // team: profile._json.team,
        };
        done(null, user);
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_service_1.ConfigService !== "undefined" && config_service_1.ConfigService) === "function" ? _a : Object])
], GoogleStrategy);


/***/ }),
/* 116 */
/***/ ((module) => {

module.exports = require("passport-google-oauth20");

/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultUserService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const userContants_1 = __webpack_require__(16);
const user_repository_1 = __webpack_require__(71);
const permissionManager_repository_1 = __webpack_require__(74);
const bcryptUtil_1 = __webpack_require__(107);
const defaultUser = {
    email: 'shubhanshu@intercert.com',
    password: 'Pass@123',
    userRole: 'SUPER_ADMIN',
    name: 'Shubhanshu Kumar',
};
let DefaultUserService = class DefaultUserService {
    constructor(userModel, permissionModel) {
        this.userModel = userModel;
        this.permissionModel = permissionModel;
    }
    async addDefaultUser() {
        try {
            const checkIfExist = await this.userModel.checkUserEmailExist(defaultUser.email);
            if (checkIfExist) {
                console.log('Default user already exists.');
                return;
            }
            console.log('Creating default user...');
            const passwordHash = await (0, bcryptUtil_1.generatePasswordHash)(defaultUser.password);
            const userObj = {
                password: passwordHash,
                email: defaultUser.email.toLowerCase().trim(),
                verifyStatus: userContants_1.USER_VERIFY_STATUS.VERIFIED,
                status: userContants_1.USER_ACCOUNT_STATUS.ACTIVE,
                user_group: userContants_1.USER_GROUP.SUPER_ADMIN,
                loginSource: userContants_1.USER_LOGIN_SOURCE.LOCAL,
                name: defaultUser.name,
            };
            const user = await this.userModel.insertDefaultUser(userObj);
            console.log('Default user created with ID:', user.id);
            return;
        }
        catch (error) {
            console.log("Error adding admin user", error);
            throw error;
        }
    }
};
exports.DefaultUserService = DefaultUserService;
exports.DefaultUserService = DefaultUserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof permissionManager_repository_1.PermissionManagerRepository !== "undefined" && permissionManager_repository_1.PermissionManagerRepository) === "function" ? _b : Object])
], DefaultUserService);


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const database_module_1 = __webpack_require__(5);
const src_1 = __webpack_require__(87);
const response_handler_module_1 = __webpack_require__(84);
const department_controller_1 = __webpack_require__(119);
const department_service_1 = __webpack_require__(121);
let DepartmentModule = class DepartmentModule {
};
exports.DepartmentModule = DepartmentModule;
exports.DepartmentModule = DepartmentModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            response_handler_module_1.ResponseHandlerModule,
            typeorm_1.TypeOrmModule.forFeature([src_1.Department, src_1.User, src_1.LoginSession]),
        ],
        controllers: [department_controller_1.DepartmentController],
        providers: [department_service_1.DepartmentService],
    })
], DepartmentModule);


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const express_1 = __webpack_require__(94);
const response_handler_service_1 = __webpack_require__(85);
const department_dto_1 = __webpack_require__(120);
const department_service_1 = __webpack_require__(121);
const authMiddleware_guard_1 = __webpack_require__(122);
let DepartmentController = class DepartmentController {
    constructor(departmentService, responseHandler) {
        this.departmentService = departmentService;
        this.responseHandler = responseHandler;
    }
    async createDepartment(res, payload) {
        try {
            const department = await this.departmentService.createDepartment(payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Department created successfully', data: department });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getDepartments(res) {
        try {
            const departments = await this.departmentService.getDepartments();
            return this.responseHandler.sendSuccessResponse(res, { message: 'Departments fetched successfully', data: departments });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getDepartmentById(res, id) {
        try {
            const department = await this.departmentService.getDepartmentById(id);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Department fetched successfully', data: department });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateDepartment(res, id, payload) {
        try {
            const department = await this.departmentService.updateDepartment(id, payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Department updated successfully', data: department });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateDepartmentStatus(res, id, payload) {
        try {
            const department = await this.departmentService.updateDepartmentStatus(id, payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Department status updated successfully', data: department });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
};
exports.DepartmentController = DepartmentController;
tslib_1.__decorate([
    (0, common_1.Post)('create_department'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof department_dto_1.CreateDepartmentDto !== "undefined" && department_dto_1.CreateDepartmentDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DepartmentController.prototype, "createDepartment", null);
tslib_1.__decorate([
    (0, common_1.Get)("/list"),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartments", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartmentById", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, Number, typeof (_h = typeof department_dto_1.UpdateDepartmentDto !== "undefined" && department_dto_1.UpdateDepartmentDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DepartmentController.prototype, "updateDepartment", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/status'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object, Number, typeof (_k = typeof department_dto_1.UpdateDepartmentStatusDto !== "undefined" && department_dto_1.UpdateDepartmentStatusDto) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DepartmentController.prototype, "updateDepartmentStatus", null);
exports.DepartmentController = DepartmentController = tslib_1.__decorate([
    (0, common_1.Controller)('departments'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof department_service_1.DepartmentService !== "undefined" && department_service_1.DepartmentService) === "function" ? _a : Object, typeof (_b = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _b : Object])
], DepartmentController);


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateDepartmentStatusDto = exports.UpdateDepartmentDto = exports.CreateDepartmentDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(17);
const userContants_1 = __webpack_require__(16);
class CreateDepartmentDto {
}
exports.CreateDepartmentDto = CreateDepartmentDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateDepartmentDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateDepartmentDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_ACCOUNT_STATUS),
    tslib_1.__metadata("design:type", typeof (_a = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _a : Object)
], CreateDepartmentDto.prototype, "status", void 0);
class UpdateDepartmentDto {
}
exports.UpdateDepartmentDto = UpdateDepartmentDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateDepartmentDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateDepartmentDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_ACCOUNT_STATUS),
    tslib_1.__metadata("design:type", typeof (_b = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _b : Object)
], UpdateDepartmentDto.prototype, "status", void 0);
class UpdateDepartmentStatusDto {
}
exports.UpdateDepartmentStatusDto = UpdateDepartmentStatusDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(userContants_1.USER_ACCOUNT_STATUS),
    tslib_1.__metadata("design:type", typeof (_c = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _c : Object)
], UpdateDepartmentStatusDto.prototype, "status", void 0);


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const src_1 = __webpack_require__(87);
let DepartmentService = class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async createDepartment(payload) {
        try {
            const department = this.departmentRepository.create(payload);
            return await this.departmentRepository.save(department);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getDepartments() {
        try {
            return await this.departmentRepository.find({ order: { name: 'ASC' } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getDepartmentById(id) {
        try {
            const department = await this.departmentRepository.findOne({ where: { id } });
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            return department;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateDepartment(id, payload) {
        try {
            const existing = await this.departmentRepository.findOne({ where: { id } });
            if (!existing) {
                throw new common_1.NotFoundException('Department not found');
            }
            await this.departmentRepository.update({ id }, payload);
            return await this.getDepartmentById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateDepartmentStatus(id, payload) {
        try {
            const existing = await this.departmentRepository.findOne({ where: { id } });
            if (!existing) {
                throw new common_1.NotFoundException('Department not found');
            }
            await this.departmentRepository.update({ id }, payload);
            return await this.getDepartmentById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(src_1.Department)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DepartmentService);


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckIfAdminGuard = exports.KeyValidationGuard = exports.OptionalTokenValidationAndGuestUserGuard = exports.TokenValidationAndGuestUserGuard = exports.TokenValidationGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const authMiddleware_1 = __webpack_require__(123);
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
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkIfAdminUser = exports.checkIfAdmin = exports.KeyValidationMiddleware = exports.OptionalTokenValidationAndGuestMiddleware = exports.TokenValidationAndGuestMiddleware = exports.TokenValidationMiddleware = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const commonConstants_1 = __webpack_require__(19);
const jwt_service_1 = __webpack_require__(106);
const src_1 = __webpack_require__(87);
const response_handler_service_1 = __webpack_require__(85);
const userContants_1 = __webpack_require__(16);
const config_service_1 = __webpack_require__(6);
const messageConstants_1 = __webpack_require__(109);
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
        if (payload.user_group != userContants_1.USER_GROUP.ADMIN) {
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
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleManagementModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const database_module_1 = __webpack_require__(5);
const src_1 = __webpack_require__(87);
const response_handler_module_1 = __webpack_require__(84);
const module_management_controller_1 = __webpack_require__(125);
const module_management_service_1 = __webpack_require__(127);
let ModuleManagementModule = class ModuleManagementModule {
};
exports.ModuleManagementModule = ModuleManagementModule;
exports.ModuleManagementModule = ModuleManagementModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            response_handler_module_1.ResponseHandlerModule,
            typeorm_1.TypeOrmModule.forFeature([src_1.SystemModule, src_1.Menu, src_1.User, src_1.LoginSession]),
        ],
        controllers: [module_management_controller_1.ModuleManagementController],
        providers: [module_management_service_1.ModuleManagementService],
    })
], ModuleManagementModule);


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleManagementController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const express_1 = __webpack_require__(94);
const response_handler_service_1 = __webpack_require__(85);
const module_management_dto_1 = __webpack_require__(126);
const module_management_service_1 = __webpack_require__(127);
const authMiddleware_guard_1 = __webpack_require__(122);
let ModuleManagementController = class ModuleManagementController {
    constructor(moduleManagementService, responseHandler) {
        this.moduleManagementService = moduleManagementService;
        this.responseHandler = responseHandler;
    }
    async createSystemModule(res, payload) {
        try {
            const module = await this.moduleManagementService.createSystemModule(payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Module created successfully', data: module });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getSystemModules(res) {
        try {
            const modules = await this.moduleManagementService.getSystemModules();
            return this.responseHandler.sendSuccessResponse(res, { message: 'Modules fetched successfully', data: modules });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getSystemModuleById(res, id) {
        try {
            const module = await this.moduleManagementService.getSystemModuleById(id);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Module fetched successfully', data: module });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateSystemModule(res, id, payload) {
        try {
            const module = await this.moduleManagementService.updateSystemModule(id, payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Module updated successfully', data: module });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async createMenu(res, payload) {
        try {
            const menu = await this.moduleManagementService.createMenu(payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Menu created successfully', data: menu });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getMenus(res) {
        try {
            const menus = await this.moduleManagementService.getMenus();
            return this.responseHandler.sendSuccessResponse(res, { message: 'Menus fetched successfully', data: menus });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getMenuById(res, id) {
        try {
            const menu = await this.moduleManagementService.getMenuById(id);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Menu fetched successfully', data: menu });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateMenu(res, id, payload) {
        try {
            const menu = await this.moduleManagementService.updateMenu(id, payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Menu updated successfully', data: menu });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateMenuStatus(res, id, payload) {
        try {
            const menu = await this.moduleManagementService.updateMenuStatus(id, payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Menu status updated successfully', data: menu });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
};
exports.ModuleManagementController = ModuleManagementController;
tslib_1.__decorate([
    (0, common_1.Post)('/create'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof module_management_dto_1.CreateSystemModuleDto !== "undefined" && module_management_dto_1.CreateSystemModuleDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleManagementController.prototype, "createSystemModule", null);
tslib_1.__decorate([
    (0, common_1.Get)('/list'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleManagementController.prototype, "getSystemModules", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleManagementController.prototype, "getSystemModuleById", null);
tslib_1.__decorate([
    (0, common_1.Patch)('/:id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, Number, typeof (_h = typeof module_management_dto_1.UpdateSystemModuleDto !== "undefined" && module_management_dto_1.UpdateSystemModuleDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleManagementController.prototype, "updateSystemModule", null);
tslib_1.__decorate([
    (0, common_1.Post)('/menus'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object, typeof (_k = typeof module_management_dto_1.CreateMenuDto !== "undefined" && module_management_dto_1.CreateMenuDto) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleManagementController.prototype, "createMenu", null);
tslib_1.__decorate([
    (0, common_1.Get)('/menus'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleManagementController.prototype, "getMenus", null);
tslib_1.__decorate([
    (0, common_1.Get)('menus/:id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleManagementController.prototype, "getMenuById", null);
tslib_1.__decorate([
    (0, common_1.Patch)('menus/:id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object, Number, typeof (_p = typeof module_management_dto_1.UpdateMenuDto !== "undefined" && module_management_dto_1.UpdateMenuDto) === "function" ? _p : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleManagementController.prototype, "updateMenu", null);
tslib_1.__decorate([
    (0, common_1.Patch)('menus/:id/status'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_q = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _q : Object, Number, typeof (_r = typeof module_management_dto_1.UpdateMenuStatusDto !== "undefined" && module_management_dto_1.UpdateMenuStatusDto) === "function" ? _r : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleManagementController.prototype, "updateMenuStatus", null);
exports.ModuleManagementController = ModuleManagementController = tslib_1.__decorate([
    (0, common_1.Controller)('modules'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof module_management_service_1.ModuleManagementService !== "undefined" && module_management_service_1.ModuleManagementService) === "function" ? _a : Object, typeof (_b = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _b : Object])
], ModuleManagementController);


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMenuStatusDto = exports.UpdateMenuDto = exports.CreateMenuDto = exports.UpdateSystemModuleDto = exports.CreateSystemModuleDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(17);
const userContants_1 = __webpack_require__(16);
class CreateSystemModuleDto {
}
exports.CreateSystemModuleDto = CreateSystemModuleDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateSystemModuleDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateSystemModuleDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_ACCOUNT_STATUS),
    tslib_1.__metadata("design:type", typeof (_a = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _a : Object)
], CreateSystemModuleDto.prototype, "status", void 0);
class UpdateSystemModuleDto {
}
exports.UpdateSystemModuleDto = UpdateSystemModuleDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateSystemModuleDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateSystemModuleDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_ACCOUNT_STATUS),
    tslib_1.__metadata("design:type", typeof (_b = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _b : Object)
], UpdateSystemModuleDto.prototype, "status", void 0);
class CreateMenuDto {
}
exports.CreateMenuDto = CreateMenuDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateMenuDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateMenuDto.prototype, "moduleId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateMenuDto.prototype, "path", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateMenuDto.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateMenuDto.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_ACCOUNT_STATUS),
    tslib_1.__metadata("design:type", typeof (_c = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _c : Object)
], CreateMenuDto.prototype, "status", void 0);
class UpdateMenuDto {
}
exports.UpdateMenuDto = UpdateMenuDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateMenuDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateMenuDto.prototype, "moduleId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateMenuDto.prototype, "path", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateMenuDto.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateMenuDto.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_ACCOUNT_STATUS),
    tslib_1.__metadata("design:type", typeof (_d = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _d : Object)
], UpdateMenuDto.prototype, "status", void 0);
class UpdateMenuStatusDto {
}
exports.UpdateMenuStatusDto = UpdateMenuStatusDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(userContants_1.USER_ACCOUNT_STATUS),
    tslib_1.__metadata("design:type", typeof (_e = typeof userContants_1.USER_ACCOUNT_STATUS !== "undefined" && userContants_1.USER_ACCOUNT_STATUS) === "function" ? _e : Object)
], UpdateMenuStatusDto.prototype, "status", void 0);


/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleManagementService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const src_1 = __webpack_require__(87);
let ModuleManagementService = class ModuleManagementService {
    constructor(
    // @InjectRepository(SystemModule)
    systemModuleRepository, menuRepository) {
        this.systemModuleRepository = systemModuleRepository;
        this.menuRepository = menuRepository;
    }
    async createSystemModule(payload) {
        try {
            const module = await this.systemModuleRepository.create(payload);
            return module;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getSystemModules() {
        try {
            const modules = await this.systemModuleRepository.findAll({ order: { name: 'ASC' } });
            return modules;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getSystemModuleById(id) {
        try {
            const module = await this.systemModuleRepository.findOne(id);
            if (!module) {
                throw new common_1.NotFoundException('Module not found');
            }
            return module;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateSystemModule(id, payload) {
        try {
            const module = await this.systemModuleRepository.findOne(id);
            if (!module) {
                throw new common_1.NotFoundException('Module not found');
            }
            await this.systemModuleRepository.update(id, payload);
            return await this.getSystemModuleById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createMenu(payload) {
        try {
            const module = await this.systemModuleRepository.findOne(payload.moduleId);
            if (!module) {
                throw new common_1.NotFoundException('Module not found');
            }
            const menu = this.menuRepository.create({
                name: payload.name,
                path: payload.path,
                sortOrder: payload.sortOrder,
                status: payload.status,
                module,
            });
            if (payload.parentId) {
                const parent = await this.menuRepository.findOne({ where: { id: payload.parentId } });
                if (!parent) {
                    throw new common_1.NotFoundException('Parent menu not found');
                }
                menu.parent = parent;
            }
            return await this.menuRepository.save(menu);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getMenus() {
        try {
            const menus = await this.menuRepository.find({
                relations: ['module', 'parent'],
                order: { sortOrder: 'ASC' },
            });
            return menus;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getMenuById(id) {
        try {
            const menu = await this.menuRepository.findOne({ where: { id }, relations: ['module', 'parent'] });
            if (!menu) {
                throw new common_1.NotFoundException('Menu not found');
            }
            return menu;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateMenu(id, payload) {
        try {
            const menu = await this.menuRepository.findOne({ where: { id }, relations: ['module', 'parent'] });
            if (!menu) {
                throw new common_1.NotFoundException('Menu not found');
            }
            if (payload.moduleId) {
                const module = await this.systemModuleRepository.findOne(payload.moduleId);
                if (!module) {
                    throw new common_1.NotFoundException('Module not found');
                }
                menu.module = module;
            }
            if (payload.parentId) {
                const parent = await this.menuRepository.findOne({ where: { id: payload.parentId } });
                if (!parent) {
                    throw new common_1.NotFoundException('Parent menu not found');
                }
                menu.parent = parent;
            }
            menu.name = payload.name ?? menu.name;
            menu.path = payload.path ?? menu.path;
            menu.sortOrder = payload.sortOrder ?? menu.sortOrder;
            menu.status = payload.status ?? menu.status;
            await this.menuRepository.save(menu);
            return await this.getMenuById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateMenuStatus(id, payload) {
        try {
            const menu = await this.menuRepository.findOne({ where: { id }, relations: ['module', 'parent'] });
            if (!menu) {
                throw new common_1.NotFoundException('Menu not found');
            }
            await this.menuRepository.update(id, payload);
            return await this.getMenuById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.ModuleManagementService = ModuleManagementService;
exports.ModuleManagementService = ModuleManagementService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(src_1.Menu)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof src_1.SystemModuleRepository !== "undefined" && src_1.SystemModuleRepository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ModuleManagementService);


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const database_module_1 = __webpack_require__(5);
const customer_entity_1 = __webpack_require__(36);
const customerAddress_entity_1 = __webpack_require__(37);
const customerContact_entity_1 = __webpack_require__(38);
const lead_entity_1 = __webpack_require__(39);
const lead_contact_entity_1 = __webpack_require__(44);
const lead_address_entity_1 = __webpack_require__(45);
const lead_service_entity_1 = __webpack_require__(40);
const user_entity_1 = __webpack_require__(13);
const permissionManager_entity_1 = __webpack_require__(20);
const src_1 = __webpack_require__(87);
const service_master_entity_1 = __webpack_require__(33);
const service_deliverable_entity_1 = __webpack_require__(34);
const response_handler_module_1 = __webpack_require__(84);
const config_module_1 = __webpack_require__(10);
const lead_controller_1 = __webpack_require__(129);
const lead_service_1 = __webpack_require__(134);
const jwt_service_1 = __webpack_require__(106);
const authMiddleware_1 = __webpack_require__(123);
const authMiddleware_guard_1 = __webpack_require__(122);
let LeadModule = class LeadModule {
};
exports.LeadModule = LeadModule;
exports.LeadModule = LeadModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            response_handler_module_1.ResponseHandlerModule,
            config_module_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([lead_entity_1.Lead, lead_contact_entity_1.LeadContact, lead_address_entity_1.LeadAddress, customer_entity_1.Customer, customerAddress_entity_1.CustomerAddress, customerContact_entity_1.CustomerContact, user_entity_1.User, src_1.LoginSession, service_master_entity_1.ServiceMaster, service_deliverable_entity_1.ServiceDeliverable, lead_service_entity_1.LeadService, permissionManager_entity_1.PermissionManager]),
        ],
        controllers: [lead_controller_1.LeadController],
        providers: [lead_service_1.LeadService, lead_service_entity_1.LeadService, src_1.LeadServiceRepository, jwt_service_1.JwtService, authMiddleware_1.TokenValidationMiddleware, authMiddleware_1.checkIfAdmin, authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard],
    })
], LeadModule);


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const platform_express_1 = __webpack_require__(130);
const express_1 = __webpack_require__(94);
const fileUpload_1 = __webpack_require__(131);
const response_handler_service_1 = __webpack_require__(85);
const lead_dto_1 = __webpack_require__(133);
const lead_service_1 = __webpack_require__(134);
const authenticated_request_interface_1 = __webpack_require__(114);
const userContants_1 = __webpack_require__(16);
const authMiddleware_guard_1 = __webpack_require__(122);
let LeadController = class LeadController {
    constructor(leadService, responseHandler) {
        this.leadService = leadService;
        this.responseHandler = responseHandler;
    }
    async createService(req, res, payload, file) {
        try {
            const isRootService = !payload.parentId;
            const isSuperAdmin = req.user_group === userContants_1.USER_GROUP.SUPER_ADMIN;
            if (isRootService && !isSuperAdmin) {
                throw new common_1.ForbiddenException('Only SUPER_ADMIN can create root services');
            }
            if (file?.originalname) {
                payload.logo = file.originalname;
            }
            const service = await this.leadService.createService(payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Service created successfully', data: service });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async addServiceCategory(req, res, payload, file) {
        try {
            const isSuperAdmin = req.user_group === userContants_1.USER_GROUP.SUPER_ADMIN;
            if (!isSuperAdmin) {
                throw new common_1.ForbiddenException('Only SUPER_ADMIN can create service categories');
            }
            const result = await this.leadService.addServiceCategory(payload, file);
            return this.responseHandler.sendSuccessResponse(res, result);
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateService(res, id, payload) {
        try {
            const service = await this.leadService.updateService(id, payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Service updated successfully', data: service });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async deleteService(res, id, hard) {
        try {
            await this.leadService.deleteService(id, hard);
            const action = hard ? 'permanently deleted' : 'deactivated';
            return this.responseHandler.sendSuccessResponse(res, { message: `Service ${action} successfully` });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async createLead(req, res, payload) {
        try {
            const userId = req.user?.id;
            const lead = await this.leadService.createLead(payload, userId);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Lead created successfully', data: lead });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getLeads(req, res) {
        try {
            const leads = await this.leadService.getLeads(req.user);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Leads fetched successfully', data: leads });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getServices(res, query) {
        try {
            const services = await this.leadService.getServices(query);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Services fetched successfully', data: services });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getServicesTree(res, query) {
        try {
            const tree = await this.leadService.getServicesTree(query);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Service tree fetched successfully', data: tree });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getServiceChildren(res, id) {
        try {
            const children = await this.leadService.getServiceChildren(id);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Service children fetched successfully', data: children });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async searchCustomers(res, name) {
        try {
            const customers = await this.leadService.searchCustomers(name);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Customers fetched successfully', data: customers });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getLeadById(req, res, id) {
        try {
            const lead = await this.leadService.getLeadById(id, req.user);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Lead fetched successfully', data: lead });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateLead(req, res, id, payload) {
        try {
            const updatedLead = await this.leadService.updateLead(id, payload, req.user);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Lead updated successfully', data: updatedLead });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async deleteLead(req, res, id, hard) {
        try {
            await this.leadService.deleteLead(id, hard, req.user);
            const action = hard ? 'permanently deleted' : 'deactivated';
            return this.responseHandler.sendSuccessResponse(res, { message: `Lead ${action} successfully` });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async assignServicesToLead(req, res, id, payload) {
        try {
            const lead = await this.leadService.assignServices(id, payload.serviceIds, req.user);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Services assigned to lead successfully', data: lead });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async createPermission(req, res, payload) {
        try {
            const actor = req.user;
            const permission = await this.leadService.createPermission(payload, actor.id);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Permission created successfully', data: permission });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getPermissions(res, query) {
        try {
            const permissions = await this.leadService.getPermissions(query);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Permissions fetched successfully', data: permissions });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async createDeliverable(res, serviceId, payload) {
        try {
            payload.serviceId = serviceId;
            const deliverable = await this.leadService.createDeliverable(payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverable created successfully', data: deliverable });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getAllDeliverables(res, serviceId) {
        try {
            const deliverables = await this.leadService.getDeliverables(serviceId);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverables fetched successfully', data: deliverables });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getServiceDeliverables(res, serviceId) {
        try {
            const deliverables = await this.leadService.getDeliverables(serviceId);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Service deliverables fetched successfully', data: deliverables });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getDeliverable(res, id) {
        try {
            const deliverable = await this.leadService.getDeliverableById(id);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverable fetched successfully', data: deliverable });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateDeliverable(res, id, payload) {
        try {
            const deliverable = await this.leadService.updateDeliverable(id, payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverable updated successfully', data: deliverable });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async deleteDeliverable(res, id, hard) {
        try {
            await this.leadService.deleteDeliverable(id, hard);
            const action = hard ? 'permanently deleted' : 'deactivated';
            return this.responseHandler.sendSuccessResponse(res, { message: `Deliverable ${action} successfully` });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
};
exports.LeadController = LeadController;
tslib_1.__decorate([
    (0, common_1.Post)('services'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('service_logo', { fileFilter: fileUpload_1.imageFileFilter })),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__param(3, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, typeof (_e = typeof lead_dto_1.CreateServiceDto !== "undefined" && lead_dto_1.CreateServiceDto) === "function" ? _e : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "createService", null);
tslib_1.__decorate([
    (0, common_1.Post)('services/category'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('category_logo', { fileFilter: fileUpload_1.imageFileFilter })),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__param(3, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _f : Object, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, typeof (_h = typeof lead_dto_1.CreateServiceDto !== "undefined" && lead_dto_1.CreateServiceDto) === "function" ? _h : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "addServiceCategory", null);
tslib_1.__decorate([
    (0, common_1.Patch)('services/:id'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object, Number, typeof (_k = typeof lead_dto_1.UpdateServiceDto !== "undefined" && lead_dto_1.UpdateServiceDto) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "updateService", null);
tslib_1.__decorate([
    (0, common_1.Delete)('services/:id'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)('hard')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object, Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "deleteService", null);
tslib_1.__decorate([
    (0, common_1.Post)('leads'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _m : Object, typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object, typeof (_p = typeof lead_dto_1.CreateLeadDto !== "undefined" && lead_dto_1.CreateLeadDto) === "function" ? _p : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "createLead", null);
tslib_1.__decorate([
    (0, common_1.Get)('leads'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_q = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _q : Object, typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "getLeads", null);
tslib_1.__decorate([
    (0, common_1.Get)('services'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_s = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _s : Object, typeof (_t = typeof lead_dto_1.GetServicesFilterDto !== "undefined" && lead_dto_1.GetServicesFilterDto) === "function" ? _t : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "getServices", null);
tslib_1.__decorate([
    (0, common_1.Get)('services/tree'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_u = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _u : Object, typeof (_v = typeof lead_dto_1.GetServicesFilterDto !== "undefined" && lead_dto_1.GetServicesFilterDto) === "function" ? _v : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "getServicesTree", null);
tslib_1.__decorate([
    (0, common_1.Get)('services/:id/children'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_w = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _w : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "getServiceChildren", null);
tslib_1.__decorate([
    (0, common_1.Get)('/customers/search'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Query)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_x = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _x : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "searchCustomers", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_y = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _y : Object, typeof (_z = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _z : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "getLeadById", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_0 = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _0 : Object, typeof (_1 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _1 : Object, Number, typeof (_2 = typeof lead_dto_1.UpdateLeadDto !== "undefined" && lead_dto_1.UpdateLeadDto) === "function" ? _2 : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "updateLead", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Body)('hard')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_3 = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _3 : Object, typeof (_4 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _4 : Object, Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "deleteLead", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/services'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_5 = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _5 : Object, typeof (_6 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _6 : Object, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "assignServicesToLead", null);
tslib_1.__decorate([
    (0, common_1.Post)('permissions'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_7 = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _7 : Object, typeof (_8 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _8 : Object, typeof (_9 = typeof lead_dto_1.CreatePermissionDto !== "undefined" && lead_dto_1.CreatePermissionDto) === "function" ? _9 : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "createPermission", null);
tslib_1.__decorate([
    (0, common_1.Get)('permissions/list'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_10 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _10 : Object, typeof (_11 = typeof lead_dto_1.GetPermissionDto !== "undefined" && lead_dto_1.GetPermissionDto) === "function" ? _11 : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "getPermissions", null);
tslib_1.__decorate([
    (0, common_1.Post)('leads/services/:serviceId/deliverables'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('serviceId', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_12 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _12 : Object, Number, typeof (_13 = typeof lead_dto_1.CreateDeliverableDto !== "undefined" && lead_dto_1.CreateDeliverableDto) === "function" ? _13 : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "createDeliverable", null);
tslib_1.__decorate([
    (0, common_1.Get)('deliverables'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Query)('serviceId', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_14 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _14 : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "getAllDeliverables", null);
tslib_1.__decorate([
    (0, common_1.Get)('leads/services/:serviceId/deliverables'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('serviceId', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_15 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _15 : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "getServiceDeliverables", null);
tslib_1.__decorate([
    (0, common_1.Get)('deliverables/:id'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_16 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _16 : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "getDeliverable", null);
tslib_1.__decorate([
    (0, common_1.Patch)('leads/deliverables/:id'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_17 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _17 : Object, Number, typeof (_18 = typeof lead_dto_1.UpdateDeliverableDto !== "undefined" && lead_dto_1.UpdateDeliverableDto) === "function" ? _18 : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "updateDeliverable", null);
tslib_1.__decorate([
    (0, common_1.Delete)('leads/deliverables/:id'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)('hard')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_19 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _19 : Object, Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "deleteDeliverable", null);
exports.LeadController = LeadController = tslib_1.__decorate([
    (0, common_1.Controller)('leads'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof lead_service_1.LeadService !== "undefined" && lead_service_1.LeadService) === "function" ? _a : Object, typeof (_b = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _b : Object])
], LeadController);


/***/ }),
/* 130 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.editFileName = exports.imageFileFilter = void 0;
const node_path_1 = __webpack_require__(132);
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, node_path_1.extname)(file.originalname);
    const randomName = new Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;


/***/ }),
/* 132 */
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateDeliverableDto = exports.CreateDeliverableDto = exports.GetServicesFilterDto = exports.UpdateServiceDto = exports.CreateServiceDto = exports.UpdateLeadDto = exports.CreateLeadDto = exports.CreateCustomerContactDto = exports.CreateCustomerAddressDto = exports.CreateCustomerDto = exports.GetPermissionDto = exports.CreatePermissionDto = exports.PermissionModuleDto = exports.PermissionActionDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(17);
const salesConstants_1 = __webpack_require__(46);
const serviceConstants_1 = __webpack_require__(35);
const userContants_1 = __webpack_require__(16);
const permissionManagerConstants_1 = __webpack_require__(21);
class PermissionActionDto {
}
exports.PermissionActionDto = PermissionActionDto;
_a = permissionManagerConstants_1.PERMISSIONS.ADD, _b = permissionManagerConstants_1.PERMISSIONS.READ, _c = permissionManagerConstants_1.PERMISSIONS.UPDATE, _d = permissionManagerConstants_1.PERMISSIONS.DELETE;
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], PermissionActionDto.prototype, _a, void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], PermissionActionDto.prototype, _b, void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], PermissionActionDto.prototype, _c, void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], PermissionActionDto.prototype, _d, void 0);
class PermissionModuleDto {
}
exports.PermissionModuleDto = PermissionModuleDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], PermissionModuleDto.prototype, "module", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PermissionActionDto),
    tslib_1.__metadata("design:type", PermissionActionDto)
], PermissionModuleDto.prototype, "action", void 0);
class CreatePermissionDto {
}
exports.CreatePermissionDto = CreatePermissionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreatePermissionDto.prototype, "roleName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(userContants_1.USER_GROUP),
    tslib_1.__metadata("design:type", typeof (_e = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _e : Object)
], CreatePermissionDto.prototype, "user_group", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PermissionModuleDto),
    tslib_1.__metadata("design:type", Array)
], CreatePermissionDto.prototype, "permissions", void 0);
class GetPermissionDto {
}
exports.GetPermissionDto = GetPermissionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], GetPermissionDto.prototype, "roleName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.USER_GROUP),
    tslib_1.__metadata("design:type", typeof (_f = typeof userContants_1.USER_GROUP !== "undefined" && userContants_1.USER_GROUP) === "function" ? _f : Object)
], GetPermissionDto.prototype, "user_group", void 0);
class CreateCustomerDto {
}
exports.CreateCustomerDto = CreateCustomerDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerDto.prototype, "businessActivities", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerDto.prototype, "headcount", void 0);
class CreateCustomerAddressDto {
}
exports.CreateCustomerAddressDto = CreateCustomerAddressDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerAddressDto.prototype, "addressLine1", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerAddressDto.prototype, "addressLine2", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerAddressDto.prototype, "city", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerAddressDto.prototype, "state", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerAddressDto.prototype, "country", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerAddressDto.prototype, "postalCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userContants_1.ADDRESS_TYPE),
    tslib_1.__metadata("design:type", typeof (_g = typeof userContants_1.ADDRESS_TYPE !== "undefined" && userContants_1.ADDRESS_TYPE) === "function" ? _g : Object)
], CreateCustomerAddressDto.prototype, "addressType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateCustomerAddressDto.prototype, "isPrimary", void 0);
class CreateCustomerContactDto {
}
exports.CreateCustomerContactDto = CreateCustomerContactDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerContactDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerContactDto.prototype, "designation", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerContactDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerContactDto.prototype, "phoneNo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerContactDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateCustomerContactDto.prototype, "isPrimary", void 0);
class CreateLeadDto {
}
exports.CreateLeadDto = CreateLeadDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateLeadDto.prototype, "enquiryReference", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(salesConstants_1.LEAD_SOURCE),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_h = typeof salesConstants_1.LEAD_SOURCE !== "undefined" && salesConstants_1.LEAD_SOURCE) === "function" ? _h : Object)
], CreateLeadDto.prototype, "source", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateLeadDto.prototype, "sourceDescription", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(salesConstants_1.LEAD_STATUS),
    tslib_1.__metadata("design:type", typeof (_j = typeof salesConstants_1.LEAD_STATUS !== "undefined" && salesConstants_1.LEAD_STATUS) === "function" ? _j : Object)
], CreateLeadDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateLeadDto.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateLeadDto.prototype, "isDraft", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateLeadDto.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateLeadDto.prototype, "serviceIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateCustomerDto),
    tslib_1.__metadata("design:type", CreateCustomerDto)
], CreateLeadDto.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateCustomerAddressDto),
    tslib_1.__metadata("design:type", Array)
], CreateLeadDto.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateCustomerContactDto),
    tslib_1.__metadata("design:type", Array)
], CreateLeadDto.prototype, "contacts", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateLeadDto.prototype, "createdBy", void 0);
class UpdateLeadDto {
}
exports.UpdateLeadDto = UpdateLeadDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateLeadDto.prototype, "enquiryReference", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(salesConstants_1.LEAD_SOURCE),
    tslib_1.__metadata("design:type", typeof (_k = typeof salesConstants_1.LEAD_SOURCE !== "undefined" && salesConstants_1.LEAD_SOURCE) === "function" ? _k : Object)
], UpdateLeadDto.prototype, "source", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateLeadDto.prototype, "sourceDescription", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(salesConstants_1.LEAD_STATUS),
    tslib_1.__metadata("design:type", typeof (_l = typeof salesConstants_1.LEAD_STATUS !== "undefined" && salesConstants_1.LEAD_STATUS) === "function" ? _l : Object)
], UpdateLeadDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateLeadDto.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateLeadDto.prototype, "isDraft", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdateLeadDto.prototype, "serviceIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateCustomerDto),
    tslib_1.__metadata("design:type", CreateCustomerDto)
], UpdateLeadDto.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateCustomerAddressDto),
    tslib_1.__metadata("design:type", Array)
], UpdateLeadDto.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateCustomerContactDto),
    tslib_1.__metadata("design:type", Array)
], UpdateLeadDto.prototype, "contacts", void 0);
class CreateServiceDto {
}
exports.CreateServiceDto = CreateServiceDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateServiceDto.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateServiceDto.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceDto.prototype, "service_category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(serviceConstants_1.SERVICE_TYPE),
    tslib_1.__metadata("design:type", typeof (_m = typeof serviceConstants_1.SERVICE_TYPE !== "undefined" && serviceConstants_1.SERVICE_TYPE) === "function" ? _m : Object)
], CreateServiceDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(serviceConstants_1.SERVICE_ACCESS_LEVEL),
    tslib_1.__metadata("design:type", typeof (_o = typeof serviceConstants_1.SERVICE_ACCESS_LEVEL !== "undefined" && serviceConstants_1.SERVICE_ACCESS_LEVEL) === "function" ? _o : Object)
], CreateServiceDto.prototype, "accessLevel", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateServiceDto.prototype, "allowedUserGroups", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateServiceDto.prototype, "allowedDepartments", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateServiceDto.prototype, "departmentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateServiceDto.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceDto.prototype, "logo", void 0);
class UpdateServiceDto {
}
exports.UpdateServiceDto = UpdateServiceDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceDto.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateServiceDto.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateServiceDto.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceDto.prototype, "service_category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(serviceConstants_1.SERVICE_TYPE),
    tslib_1.__metadata("design:type", typeof (_p = typeof serviceConstants_1.SERVICE_TYPE !== "undefined" && serviceConstants_1.SERVICE_TYPE) === "function" ? _p : Object)
], UpdateServiceDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(serviceConstants_1.SERVICE_ACCESS_LEVEL),
    tslib_1.__metadata("design:type", typeof (_q = typeof serviceConstants_1.SERVICE_ACCESS_LEVEL !== "undefined" && serviceConstants_1.SERVICE_ACCESS_LEVEL) === "function" ? _q : Object)
], UpdateServiceDto.prototype, "accessLevel", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdateServiceDto.prototype, "allowedUserGroups", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdateServiceDto.prototype, "allowedDepartments", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateServiceDto.prototype, "departmentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateServiceDto.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceDto.prototype, "logo", void 0);
class GetServicesFilterDto {
}
exports.GetServicesFilterDto = GetServicesFilterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], GetServicesFilterDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], GetServicesFilterDto.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], GetServicesFilterDto.prototype, "includeChildren", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], GetServicesFilterDto.prototype, "rootOnly", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], GetServicesFilterDto.prototype, "userGroup", void 0);
class CreateDeliverableDto {
}
exports.CreateDeliverableDto = CreateDeliverableDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateDeliverableDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateDeliverableDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateDeliverableDto.prototype, "dueDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateDeliverableDto.prototype, "isCompleted", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateDeliverableDto.prototype, "serviceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateDeliverableDto.prototype, "sortOrder", void 0);
class UpdateDeliverableDto {
}
exports.UpdateDeliverableDto = UpdateDeliverableDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateDeliverableDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateDeliverableDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateDeliverableDto.prototype, "dueDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateDeliverableDto.prototype, "isCompleted", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateDeliverableDto.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateDeliverableDto.prototype, "sortOrder", void 0);


/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const customer_entity_1 = __webpack_require__(36);
const customerAddress_entity_1 = __webpack_require__(37);
const customerContact_entity_1 = __webpack_require__(38);
const lead_entity_1 = __webpack_require__(39);
const lead_contact_entity_1 = __webpack_require__(44);
const lead_address_entity_1 = __webpack_require__(45);
const lead_service_entity_1 = __webpack_require__(40);
const user_entity_1 = __webpack_require__(13);
const service_master_entity_1 = __webpack_require__(33);
const service_deliverable_entity_1 = __webpack_require__(34);
const permissionManager_entity_1 = __webpack_require__(20);
const salesConstants_1 = __webpack_require__(46);
const userContants_1 = __webpack_require__(16);
const serviceConstants_1 = __webpack_require__(35);
let LeadService = class LeadService {
    constructor(leadRepository, leadContactRepository, leadAddressRepository, customerRepository, addressRepository, contactRepository, userRepository, serviceRepository, leadServiceEntityRepository, permissionRepository, deliverableRepository) {
        this.leadRepository = leadRepository;
        this.leadContactRepository = leadContactRepository;
        this.leadAddressRepository = leadAddressRepository;
        this.customerRepository = customerRepository;
        this.addressRepository = addressRepository;
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
        this.leadServiceEntityRepository = leadServiceEntityRepository;
        this.permissionRepository = permissionRepository;
        this.deliverableRepository = deliverableRepository;
    }
    buildServiceTree(services) {
        const nodes = new Map();
        for (const s of services) {
            nodes.set(s.id, { ...s, children: [] });
        }
        const roots = [];
        for (const node of nodes.values()) {
            const parentId = node.parentId;
            if (parentId && nodes.has(parentId)) {
                nodes.get(parentId).children.push(node);
            }
            else {
                roots.push(node);
            }
        }
        return roots;
    }
    async generateEnquiryId() {
        const today = new Date();
        const yy = today.getFullYear().toString().slice(-2);
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const count = await this.leadRepository.count({
            where: {
                createdAt: (0, typeorm_2.Between)(todayStart, todayEnd),
            },
        });
        const sequence = String(count + 1).padStart(2, '0');
        return `IS/${yy}/${mm}/${dd}/${sequence}`;
    }
    generateCustomerId(companyName, country) {
        const comp = companyName.substring(0, 4).toUpperCase().replace(/\s/g, '');
        const cnt = country.substring(0, 3).toUpperCase();
        return `IS/${comp}/${cnt}`;
    }
    async generateUniqueCustomerId(companyName, country, excludeCustomerId) {
        const base = this.generateCustomerId(companyName, country);
        const existing = await this.customerRepository.find({
            where: excludeCustomerId
                ? { customerId: (0, typeorm_2.Like)(`${base}%`), id: (0, typeorm_2.Not)(excludeCustomerId) }
                : { customerId: (0, typeorm_2.Like)(`${base}%`) }
        });
        if (existing.length === 0)
            return base;
        let maxSuffix = 0;
        for (const c of existing) {
            if (c.customerId === base) {
                maxSuffix = Math.max(maxSuffix, 1);
                continue;
            }
            if (c.customerId.startsWith(`${base}/`)) {
                const suffix = Number(c.customerId.split('/').pop());
                if (!Number.isNaN(suffix)) {
                    maxSuffix = Math.max(maxSuffix, suffix);
                }
            }
        }
        return `${base}/${maxSuffix + 1}`;
    }
    async createLead(payload, userId) {
        try {
            const enquiryId = await this.generateEnquiryId();
            let customer = null;
            if (payload.customerId) {
                customer = await this.customerRepository.findOne({ where: { id: payload.customerId } });
                if (!customer) {
                    throw new common_1.BadRequestException(`Customer with ID ${payload.customerId} not found`);
                }
            }
            else if (payload.customer) {
                const existingCustomer = await this.customerRepository.findOne({
                    where: { name: payload.customer.name }
                });
                if (existingCustomer) {
                    customer = existingCustomer;
                }
                else {
                    const primaryAddress = payload.addresses?.find(addr => addr.isPrimary) || payload.addresses?.[0];
                    const country = primaryAddress?.country || 'IND';
                    const customerId = await this.generateUniqueCustomerId(payload.customer.name, country);
                    const newCustomer = this.customerRepository.create({
                        ...payload.customer,
                        customerId
                    });
                    customer = await this.customerRepository.save(newCustomer);
                    if (!customer || !customer.id) {
                        throw new common_1.BadRequestException('Failed to create customer');
                    }
                    if (payload.addresses && payload.addresses.length > 0) {
                        const addresses = payload.addresses.map(addr => this.addressRepository.create({ ...addr, customer }));
                        await this.addressRepository.save(addresses);
                    }
                }
                if (payload.contacts && payload.contacts.length > 0) {
                    const contacts = payload.contacts.map((contact) => this.contactRepository.create({
                        ...contact,
                        customer,
                    }));
                    await this.contactRepository.save(contacts);
                }
            }
            else {
                throw new common_1.BadRequestException('Either customerId or customer data must be provided');
            }
            let createdBy = null;
            const createdById = userId || payload.createdBy;
            if (createdById) {
                createdBy = await this.userRepository.findOne({ where: { id: createdById } });
            }
            let services = [];
            if (payload.serviceIds && payload.serviceIds.length > 0) {
                services = await this.serviceRepository.find({ where: { id: (0, typeorm_2.In)(payload.serviceIds) } });
            }
            const lead = this.leadRepository.create({
                enquiryId,
                enquiryReference: payload.enquiryReference,
                source: payload.source,
                sourceDescription: payload.sourceDescription,
                status: payload.status || salesConstants_1.LEAD_STATUS.NEW,
                notes: payload.notes,
                isDraft: payload.isDraft || false,
                customer,
                createdBy,
            });
            const savedLead = await this.leadRepository.save(lead);
            if (payload.contacts && payload.contacts.length > 0) {
                const leadContacts = payload.contacts.map(contact => this.leadContactRepository.create({
                    ...contact,
                    lead: savedLead,
                    leadId: savedLead.id
                }));
                await this.leadContactRepository.save(leadContacts);
            }
            if (payload.addresses && payload.addresses.length > 0) {
                const leadAddresses = payload.addresses.map(addr => {
                    const { addressType, ...rest } = addr;
                    return this.leadAddressRepository.create({
                        ...rest,
                        addressType: addressType,
                        lead: savedLead,
                        leadId: savedLead.id
                    });
                });
                await this.leadAddressRepository.save(leadAddresses);
            }
            if (services.length > 0) {
                const leadServices = services.map(service => this.leadServiceEntityRepository.create({
                    lead: savedLead,
                    service: service
                }));
                await this.leadServiceEntityRepository.save(leadServices);
            }
            return this.leadRepository.findOne({
                where: { id: savedLead.id },
                relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getLeads(actor) {
        try {
            const isAdmin = actor && [userContants_1.USER_GROUP.SUPER_ADMIN, userContants_1.USER_GROUP.ADMIN].includes(actor.user_group);
            const where = { isActive: true };
            if (!isAdmin && actor?.id) {
                where.createdBy = { id: actor.id };
            }
            return await this.leadRepository.find({
                where,
                relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getServices(filter) {
        try {
            const where = { isActive: true };
            if (filter?.parentId !== undefined && filter.parentId !== null) {
                where.parentId = filter.parentId;
            }
            else if (filter?.rootOnly) {
                where.parentId = (0, typeorm_2.IsNull)();
            }
            if (filter?.category) {
                where.category = filter.category;
            }
            const relations = filter?.includeChildren
                ? ['parent', 'children', 'department', 'deliverables']
                : ['parent', 'department', 'deliverables'];
            let services = await this.serviceRepository.find({
                where,
                relations,
                order: { sortOrder: 'ASC', name: 'ASC' }
            });
            if (filter?.userGroup) {
                const group = filter.userGroup;
                services = services.filter(s => s.accessLevel === serviceConstants_1.SERVICE_ACCESS_LEVEL.PUBLIC || (s.allowedUserGroups || []).includes(group));
            }
            return services;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getServicesTree(filter) {
        try {
            const where = { isActive: true };
            if (filter?.category) {
                where.category = filter.category;
            }
            const services = await this.serviceRepository.find({
                where,
                relations: ['parent'],
                order: { sortOrder: 'ASC', name: 'ASC' }
            });
            const filtered = filter?.userGroup
                ? services.filter(s => s.accessLevel === serviceConstants_1.SERVICE_ACCESS_LEVEL.PUBLIC || (s.allowedUserGroups || []).includes(filter.userGroup))
                : services;
            return this.buildServiceTree(filtered);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getServiceChildren(parentId) {
        try {
            const services = await this.serviceRepository.find({
                where: { parentId, isActive: true },
                relations: ['parent', 'department', 'deliverables'],
                order: { sortOrder: 'ASC', name: 'ASC' }
            });
            return services;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async addServiceCategory(payload, file) {
        try {
            const categoryValue = payload.service_category || payload.category;
            if (!categoryValue) {
                throw new common_1.BadRequestException('service_category is required');
            }
            const servicePayload = {
                ...payload,
                parentId: null,
                category: categoryValue,
                logo: file?.originalname || payload.logo
            };
            const created = await this.createService(servicePayload);
            return { message: 'Service category created successfully', data: created };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getLeadById(id, actor) {
        try {
            const lead = await this.leadRepository.findOne({
                where: { id },
                relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
            });
            if (!lead || !lead.isActive) {
                throw new common_1.NotFoundException('Lead not found');
            }
            if (actor && ![userContants_1.USER_GROUP.SUPER_ADMIN, userContants_1.USER_GROUP.ADMIN].includes(actor.user_group)) {
                if (!lead.createdBy || lead.createdBy.id !== actor.id) {
                    throw new common_1.NotFoundException('Lead not found');
                }
            }
            return lead;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteLead(id, hard = false, actor) {
        try {
            const lead = await this.leadRepository.findOne({ where: { id }, relations: ['createdBy'] });
            if (!lead || !lead.isActive) {
                throw new common_1.NotFoundException('Lead not found');
            }
            if (actor && ![userContants_1.USER_GROUP.SUPER_ADMIN, userContants_1.USER_GROUP.ADMIN].includes(actor.user_group)) {
                if (!lead.createdBy || lead.createdBy.id !== actor.id) {
                    throw new common_1.NotFoundException('Lead not found');
                }
            }
            if (hard) {
                // Manually delete lead services as they don't have cascade delete
                await this.leadServiceEntityRepository.delete({ lead: { id } });
                await this.leadRepository.remove(lead);
            }
            else {
                lead.isActive = false;
                await this.leadRepository.save(lead);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateLead(id, payload, actor) {
        try {
            const lead = await this.leadRepository.findOne({ where: { id }, relations: ['leadServices', 'customer', 'customer.contacts', 'customer.addresses', 'contacts', 'addresses'] });
            if (!lead || !lead.isActive) {
                throw new common_1.NotFoundException('Lead not found');
            }
            if (actor && ![userContants_1.USER_GROUP.SUPER_ADMIN, userContants_1.USER_GROUP.ADMIN].includes(actor.user_group)) {
                if (!lead.createdBy || lead.createdBy.id !== actor.id) {
                    throw new common_1.NotFoundException('Lead not found');
                }
            }
            const { serviceIds, contacts, addresses, customer, ...updateData } = payload;
            if (customer && lead.customer) {
                const primaryAddress = addresses?.find(a => a.isPrimary) || addresses?.[0];
                const currentCountry = lead.customer.addresses?.[0]?.country || 'IND';
                const country = primaryAddress?.country || currentCountry;
                const name = customer.name || lead.customer.name;
                const currentBase = this.generateCustomerId(lead.customer.name, currentCountry);
                const nextBase = this.generateCustomerId(name, country);
                const nextCustomerId = nextBase === currentBase
                    ? lead.customer.customerId
                    : await this.generateUniqueCustomerId(name, country, lead.customer.id);
                Object.assign(lead.customer, {
                    ...customer,
                    customerId: nextCustomerId
                });
                await this.customerRepository.save(lead.customer);
            }
            if (contacts) {
                await this.contactRepository.delete({ customer: { id: lead.customer?.id } });
                await this.leadContactRepository.delete({ lead: { id: lead.id } });
                if (contacts.length > 0) {
                    const customerContacts = contacts.map(contact => this.contactRepository.create({
                        ...contact,
                        customer: lead.customer
                    }));
                    await this.contactRepository.save(customerContacts);
                    const leadContacts = contacts.map(contact => this.leadContactRepository.create({
                        ...contact,
                        lead: lead,
                        leadId: lead.id
                    }));
                    await this.leadContactRepository.save(leadContacts);
                }
            }
            if (addresses) {
                await this.addressRepository.delete({ customer: { id: lead.customer?.id } });
                await this.leadAddressRepository.delete({ lead: { id: lead.id } });
                if (addresses.length > 0) {
                    const customerAddresses = addresses.map(addr => this.addressRepository.create({
                        ...addr,
                        customer: lead.customer
                    }));
                    await this.addressRepository.save(customerAddresses);
                    const leadAddresses = addresses.map(addr => {
                        const { addressType, ...rest } = addr;
                        return this.leadAddressRepository.create({
                            ...rest,
                            addressType,
                            lead: lead,
                            leadId: lead.id
                        });
                    });
                    await this.leadAddressRepository.save(leadAddresses);
                }
            }
            if (serviceIds) {
                // Remove existing lead services - strategy: delete all and recreate
                await this.leadServiceEntityRepository.delete({ lead: { id: lead.id } });
                const services = await this.serviceRepository.find({ where: { id: (0, typeorm_2.In)(serviceIds) } });
                const leadServices = services.map(service => this.leadServiceEntityRepository.create({
                    lead: lead,
                    service: service
                }));
                await this.leadServiceEntityRepository.save(leadServices);
            }
            Object.assign(lead, updateData);
            await this.leadRepository.save(lead);
            return await this.leadRepository.findOne({
                where: { id: lead.id },
                relations: ['customer', 'customer.contacts', 'customer.addresses', 'createdBy', 'leadServices', 'leadServices.service']
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async searchCustomers(name) {
        try {
            if (!name) {
                return [];
            }
            return await this.customerRepository.find({ where: { name: (0, typeorm_2.Like)(`%${name}%`) }, order: { name: 'ASC' } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async assignServices(leadId, serviceIds, actor) {
        try {
            const lead = await this.leadRepository.findOne({ where: { id: leadId }, relations: ['leadServices', 'createdBy'] });
            if (!lead || !lead.isActive) {
                throw new common_1.NotFoundException('Lead not found');
            }
            if (actor && ![userContants_1.USER_GROUP.SUPER_ADMIN, userContants_1.USER_GROUP.ADMIN].includes(actor.user_group)) {
                if (!lead.createdBy || lead.createdBy.id !== actor.id) {
                    throw new common_1.NotFoundException('Lead not found');
                }
            }
            await this.leadServiceEntityRepository.delete({ lead: { id: leadId } });
            if (serviceIds && serviceIds.length > 0) {
                const services = await this.serviceRepository.find({ where: { id: (0, typeorm_2.In)(serviceIds) } });
                if (services.length !== serviceIds.length) {
                    throw new common_1.BadRequestException('One or more service IDs are invalid');
                }
                const leadServices = services.map(service => this.leadServiceEntityRepository.create({
                    lead: lead,
                    service: service
                }));
                await this.leadServiceEntityRepository.save(leadServices);
            }
            return await this.leadRepository.findOne({
                where: { id: leadId },
                relations: ['customer', 'createdBy', 'leadServices', 'leadServices.service']
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createService(payload) {
        try {
            let level = 0;
            let parent = null;
            let category = null;
            let type = null;
            let accessLevel = serviceConstants_1.SERVICE_ACCESS_LEVEL.PUBLIC;
            if (payload.parentId) {
                parent = await this.serviceRepository.findOne({
                    where: { id: payload.parentId },
                    relations: ['parent']
                });
                if (!parent) {
                    throw new common_1.BadRequestException(`Parent service with ID ${payload.parentId} not found`);
                }
                level = parent.level + 1;
            }
            const categoryValue = payload.category || payload.service_category;
            if (categoryValue) {
                category = categoryValue;
            }
            if (payload.type) {
                const castType = payload.type;
                if (!Object.values(serviceConstants_1.SERVICE_TYPE).includes(castType)) {
                    throw new common_1.BadRequestException(`Invalid service type: ${payload.type}`);
                }
                type = castType;
            }
            if (payload.accessLevel) {
                const castAccess = payload.accessLevel;
                if (!Object.values(serviceConstants_1.SERVICE_ACCESS_LEVEL).includes(castAccess)) {
                    throw new common_1.BadRequestException(`Invalid access level: ${payload.accessLevel}`);
                }
                accessLevel = castAccess;
            }
            const service = this.serviceRepository.create({
                ...payload,
                level,
                parent,
                category,
                type,
                accessLevel,
            });
            const savedService = await this.serviceRepository.save(service);
            return await this.serviceRepository.findOne({
                where: { id: savedService.id },
                relations: ['parent', 'department', 'deliverables']
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateService(id, payload) {
        try {
            const service = await this.serviceRepository.findOne({ where: { id } });
            if (!service) {
                throw new common_1.NotFoundException('Service not found');
            }
            if (payload.service_category && !payload.category) {
                payload.category = payload.service_category;
            }
            Object.assign(service, payload);
            return await this.serviceRepository.save(service);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteService(id, hard = false) {
        try {
            const service = await this.serviceRepository.findOne({ where: { id } });
            if (!service) {
                throw new common_1.NotFoundException('Service not found');
            }
            if (hard) {
                await this.serviceRepository.remove(service);
            }
            else {
                service.isActive = false;
                await this.serviceRepository.save(service);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createPermission(payload, actorId) {
        try {
            const permission = this.permissionRepository.create(payload);
            if (actorId) {
                const actor = new user_entity_1.User();
                actor.id = actorId;
                permission.createdBy = actor;
            }
            return await this.permissionRepository.save(permission);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getPermissions(payload) {
        try {
            console.log(`[GetPermissions] Received payload:`, JSON.stringify(payload));
            const queryBuilder = this.permissionRepository.createQueryBuilder('permission');
            if (payload?.roleName && payload.roleName !== 'undefined' && payload.roleName.trim() !== '') {
                queryBuilder.andWhere('permission.roleName LIKE :roleName', { roleName: `%${payload.roleName.trim()}%` });
            }
            if (payload?.user_group) {
                queryBuilder.andWhere('permission.user_group = :user_group', { user_group: payload.user_group });
            }
            console.log(`[GetPermissions] Executing query:`, queryBuilder.getSql());
            const permissions = await queryBuilder
                .orderBy('permission.id', 'DESC')
                .getMany();
            console.log(`[GetPermissions] Found ${permissions.length} records`);
            if (permissions.length === 0) {
                console.log(`[GetPermissions] No records found. Checking all records for debug...`);
                const all = await this.permissionRepository.find({ take: 5, order: { id: 'DESC' } });
                console.log(`[GetPermissions] Current records in DB:`, JSON.stringify(all.map(r => ({ id: r.id, role: r.roleName, group: r.user_group }))));
            }
            return permissions;
        }
        catch (error) {
            console.error(`[GetPermissions] Error:`, error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createDeliverable(payload) {
        try {
            const service = await this.serviceRepository.findOne({ where: { id: payload.serviceId } });
            if (!service) {
                throw new common_1.NotFoundException(`Service with ID ${payload.serviceId} not found`);
            }
            const deliverable = this.deliverableRepository.create({
                ...payload,
                service,
                dueDate: payload.dueDate ? new Date(payload.dueDate) : null,
            });
            return await this.deliverableRepository.save(deliverable);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getDeliverables(serviceId) {
        try {
            const queryBuilder = this.deliverableRepository.createQueryBuilder('deliverable')
                .leftJoinAndSelect('deliverable.service', 'service')
                .where('deliverable.isActive = :isActive', { isActive: true });
            if (serviceId) {
                queryBuilder.andWhere('deliverable.serviceId = :serviceId', { serviceId });
            }
            return await queryBuilder
                .orderBy('deliverable.sortOrder', 'ASC')
                .addOrderBy('deliverable.createdAt', 'DESC')
                .getMany();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getDeliverableById(id) {
        try {
            const deliverable = await this.deliverableRepository.findOne({
                where: { id },
                relations: ['service']
            });
            if (!deliverable) {
                throw new common_1.NotFoundException('Deliverable not found');
            }
            return deliverable;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateDeliverable(id, payload) {
        try {
            const deliverable = await this.deliverableRepository.findOne({ where: { id } });
            if (!deliverable) {
                throw new common_1.NotFoundException('Deliverable not found');
            }
            Object.assign(deliverable, {
                ...payload,
                dueDate: payload.dueDate ? new Date(payload.dueDate) : deliverable.dueDate,
            });
            return await this.deliverableRepository.save(deliverable);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteDeliverable(id, hard = false) {
        try {
            const deliverable = await this.deliverableRepository.findOne({ where: { id } });
            if (!deliverable) {
                throw new common_1.NotFoundException('Deliverable not found');
            }
            if (hard) {
                await this.deliverableRepository.remove(deliverable);
            }
            else {
                deliverable.isActive = false;
                await this.deliverableRepository.save(deliverable);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.LeadService = LeadService;
exports.LeadService = LeadService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(lead_contact_entity_1.LeadContact)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(lead_address_entity_1.LeadAddress)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    tslib_1.__param(4, (0, typeorm_1.InjectRepository)(customerAddress_entity_1.CustomerAddress)),
    tslib_1.__param(5, (0, typeorm_1.InjectRepository)(customerContact_entity_1.CustomerContact)),
    tslib_1.__param(6, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__param(7, (0, typeorm_1.InjectRepository)(service_master_entity_1.ServiceMaster)),
    tslib_1.__param(8, (0, typeorm_1.InjectRepository)(lead_service_entity_1.LeadService)),
    tslib_1.__param(9, (0, typeorm_1.InjectRepository)(permissionManager_entity_1.PermissionManager)),
    tslib_1.__param(10, (0, typeorm_1.InjectRepository)(service_deliverable_entity_1.ServiceDeliverable)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _g : Object, typeof (_h = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _h : Object, typeof (_j = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _j : Object, typeof (_k = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _k : Object, typeof (_l = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _l : Object])
], LeadService);


/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserManagementModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const src_1 = __webpack_require__(87);
const systemModule_entity_1 = __webpack_require__(23);
const user_management_controller_1 = __webpack_require__(136);
const user_management_service_1 = __webpack_require__(137);
const user_repository_1 = __webpack_require__(71);
const config_module_1 = __webpack_require__(10);
const s3_module_1 = __webpack_require__(89);
const response_handler_module_1 = __webpack_require__(84);
let UserManagementModule = class UserManagementModule {
};
exports.UserManagementModule = UserManagementModule;
exports.UserManagementModule = UserManagementModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            src_1.DBModule.forRoot(),
            config_module_1.ConfigModule,
            s3_module_1.S3Module,
            response_handler_module_1.ResponseHandlerModule, typeorm_1.TypeOrmModule.forFeature([src_1.User, systemModule_entity_1.SystemModule, src_1.Department, src_1.Team, src_1.LoginSession, src_1.PermissionManager])
        ],
        controllers: [user_management_controller_1.UserManagementController],
        providers: [user_management_service_1.UserManagementService, user_repository_1.UserRepository],
    })
], UserManagementModule);


/***/ }),
/* 136 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserManagementController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const authenticated_request_interface_1 = __webpack_require__(114);
const user_management_service_1 = __webpack_require__(137);
const authMiddleware_guard_1 = __webpack_require__(122);
const user_management_dto_1 = __webpack_require__(113);
let UserManagementController = class UserManagementController {
    constructor(svc) {
        this.svc = svc;
    }
    async listUsers() {
        const users = await this.svc.listUsers();
        return {
            success: true,
            message: 'Users retrieved successfully',
            data: users
        };
    }
    async getUser(id) {
        const user = await this.svc.getUser(Number(id));
        return {
            success: true,
            message: 'User retrieved successfully',
            data: user
        };
    }
    async createUser(req, body) {
        const actor = req.user;
        const user = await this.svc.createUser(body, actor.id);
        return {
            success: true,
            message: 'User created successfully',
            data: user
        };
    }
    async updateUser(req, id, body) {
        const actor = req.user;
        const user = await this.svc.updateUser(Number(id), body, actor.id);
        return {
            success: true,
            message: 'User updated successfully',
            data: user
        };
    }
    //
    async assignModules(req, id, body) {
        const result = await this.svc.assignModules(Number(id), body.modules);
        return {
            success: true,
            message: 'Modules assigned successfully',
            data: result
        };
    }
    async assignPermission(id, body) {
        const result = await this.svc.assignPermission(Number(id), body.permissionId);
        return {
            success: true,
            message: 'Permission assigned successfully',
            data: result
        };
    }
    async grantFullModuleAccess(id, body) {
        const result = await this.svc.grantFullModuleAccess(Number(id), body.moduleIds);
        return {
            success: true,
            message: 'Full module access granted successfully',
            data: result
        };
    }
    async revokeModuleAccess(id, body) {
        const result = await this.svc.revokeModuleAccess(Number(id), body.moduleIds);
        return {
            success: true,
            message: 'Module access revoked successfully',
            data: result
        };
    }
    async revokeAllModuleAccess(id) {
        const result = await this.svc.revokeAllModuleAccess(Number(id));
        return {
            success: true,
            message: 'All module access revoked successfully',
            data: result
        };
    }
    async assignSalesFullPermissions(body) {
        const result = await this.svc.assignSalesFullPermissionsToUsers(body.emails);
        return {
            success: true,
            message: 'Sales permissions assigned successfully',
            data: result
        };
    }
    async assignDepartments(id, body) {
        const result = await this.svc.assignDepartments(Number(id), body.departments);
        return {
            success: true,
            message: 'Departments assigned successfully',
            data: result
        };
    }
    async assignTeams(id, body) {
        const result = await this.svc.assignTeams(Number(id), body.teams);
        return {
            success: true,
            message: 'Teams assigned successfully',
            data: result
        };
    }
    async deleteUser(req, id) {
        const actor = req.user;
        const result = await this.svc.deleteUser(Number(id), actor.id);
        return {
            success: true,
            message: 'User deleted successfully',
            data: result
        };
    }
};
exports.UserManagementController = UserManagementController;
tslib_1.__decorate([
    (0, common_1.Get)('users'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "listUsers", null);
tslib_1.__decorate([
    (0, common_1.Get)('users/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "getUser", null);
tslib_1.__decorate([
    (0, common_1.Post)('add-user'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _b : Object, typeof (_c = typeof user_management_dto_1.CreateUserDto !== "undefined" && user_management_dto_1.CreateUserDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, common_1.Put)('users/:id'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _d : Object, Number, typeof (_e = typeof user_management_dto_1.UpdateUserDto !== "undefined" && user_management_dto_1.UpdateUserDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "updateUser", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/:id/modules'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _f : Object, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "assignModules", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/:id/permission'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "assignPermission", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/:id/access/grant-full'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "grantFullModuleAccess", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/:id/access/revoke'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "revokeModuleAccess", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/:id/access/revoke-full'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "revokeAllModuleAccess", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/permissions/sales-full'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "assignSalesFullPermissions", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/:id/departments'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "assignDepartments", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/:id/teams'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "assignTeams", null);
tslib_1.__decorate([
    (0, common_1.Delete)('users/:id'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof authenticated_request_interface_1.AuthenticatedRequest !== "undefined" && authenticated_request_interface_1.AuthenticatedRequest) === "function" ? _g : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UserManagementController.prototype, "deleteUser", null);
exports.UserManagementController = UserManagementController = tslib_1.__decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_management_service_1.UserManagementService !== "undefined" && user_management_service_1.UserManagementService) === "function" ? _a : Object])
], UserManagementController);


/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserManagementService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const src_1 = __webpack_require__(87);
const user_repository_1 = __webpack_require__(71);
const userContants_1 = __webpack_require__(16);
const permissionManagerConstants_1 = __webpack_require__(21);
const bcryptUtil_1 = __webpack_require__(107);
let UserManagementService = class UserManagementService {
    constructor(userRepo, moduleRepo, deptRepo, teamRepo, permissionRepo, userService) {
        this.userRepo = userRepo;
        this.moduleRepo = moduleRepo;
        this.deptRepo = deptRepo;
        this.teamRepo = teamRepo;
        this.permissionRepo = permissionRepo;
        this.userService = userService;
    }
    async listUsers() {
        return this.userRepo.find({ relations: ['permission', 'modules', 'departments', 'teams'] });
    }
    async getUser(id) {
        const u = await this.userRepo.findOne({ where: { id }, relations: ['permission', 'modules', 'departments', 'teams'] });
        if (!u)
            throw new common_1.NotFoundException('User not found');
        return u;
    }
    async createUser(payload, addedBy) {
        const { modules, departments, teams, role, password, ...rest } = payload;
        // const { modules, departments, teams, role, password, permissionId, ...rest } = payload;
        const email = payload.email.toLowerCase().trim();
        if (!email.endsWith('@intercert.com')) {
            throw new common_1.BadRequestException('Only @intercert.com email addresses are allowed.');
        }
        const existingUser = await this.userRepo.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException(`User with email ${email} already exists.`);
        }
        let hashedPassword = undefined;
        if (password) {
            hashedPassword = await (0, bcryptUtil_1.generatePasswordHash)(password);
        }
        else {
            const defaultPassword = "Intercert@OPMS123";
            hashedPassword = await (0, bcryptUtil_1.generatePasswordHash)(defaultPassword);
        }
        const userGroup = rest.user_group || userContants_1.USER_GROUP.USER;
        const id = await this.userService.addOrUpdateUser({
            ...rest,
            email,
            password: hashedPassword,
            roleName: role || 'User',
            user_group: userGroup,
            status: userContants_1.USER_ACCOUNT_STATUS.ACTIVE,
            verifyStatus: userContants_1.USER_VERIFY_STATUS.VERIFIED,
            loginSource: userContants_1.USER_LOGIN_SOURCE.LOCAL,
            addedBy,
        });
        if (!id)
            throw new Error('Unable to create user');
        if (modules && modules.length > 0)
            await this.assignModules(id, modules);
        if (departments && departments.length > 0)
            await this.assignDepartments(id, departments);
        if (teams && teams.length > 0)
            await this.assignTeams(id, teams);
        return this.getUser(id);
    }
    async updateUser(id, payload, updatedBy) {
        const { modules, departments, teams, role, email, ...rest } = payload;
        if (email) {
            const normalizedEmail = email.toLowerCase().trim();
            if (!normalizedEmail.endsWith('@intercert.com')) {
                throw new common_1.BadRequestException('Only @intercert.com email addresses are allowed.');
            }
            const existingUser = await this.userRepo.findOne({ where: { email: normalizedEmail } });
            if (existingUser && existingUser.id !== id) {
                throw new common_1.ConflictException(`User with email ${normalizedEmail} already exists.`);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData = { ...rest, id, addedBy: updatedBy };
        if (role)
            updateData.roleName = role;
        if (email)
            updateData.email = email.toLowerCase().trim();
        await this.userService.addOrUpdateUser(updateData);
        if (modules)
            await this.assignModules(id, modules);
        if (departments)
            await this.assignDepartments(id, departments);
        if (teams)
            await this.assignTeams(id, teams);
        return this.getUser(id);
    }
    async assignModules(userId, moduleIds) {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['modules'] });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!moduleIds || moduleIds.length === 0) {
            user.modules = [];
        }
        else {
            const modules = await this.moduleRepo.find({ where: { id: (0, typeorm_2.In)(moduleIds) } });
            if (modules.length !== moduleIds.length) {
                throw new common_1.NotFoundException('One or more modules not found');
            }
            user.modules = modules;
        }
        await this.userRepo.save(user);
        return this.getUser(userId);
    }
    async assignDepartments(userId, deptIds) {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['departments'] });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!deptIds || deptIds.length === 0) {
            user.departments = [];
        }
        else {
            const depts = await this.deptRepo.find({ where: { id: (0, typeorm_2.In)(deptIds) } });
            if (depts.length !== deptIds.length) {
                throw new common_1.NotFoundException('One or more departments not found');
            }
            user.departments = depts;
        }
        await this.userRepo.save(user);
        return this.getUser(userId);
    }
    async assignTeams(userId, teamIds) {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['teams'] });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!teamIds || teamIds.length === 0) {
            user.teams = [];
        }
        else {
            const teams = await this.teamRepo.find({ where: { id: (0, typeorm_2.In)(teamIds) } });
            if (teams.length !== teamIds.length) {
                throw new common_1.NotFoundException('One or more teams not found');
            }
            user.teams = teams;
        }
        await this.userRepo.save(user);
        return this.getUser(userId);
    }
    async assignPermission(userId, permissionId) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        // Validate permission exists
        const permission = await this.permissionRepo.findOne({ where: { id: permissionId } });
        if (!permission)
            throw new common_1.NotFoundException(`Permission with ID ${permissionId} not found`);
        user.permission = permission;
        await this.userRepo.save(user);
        return this.getUser(userId);
    }
    async deleteUser(userId, deletedBy) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        // Prevent self-deletion
        if (userId === deletedBy) {
            throw new common_1.BadRequestException('You cannot delete your own account');
        }
        // Soft delete or hard delete based on your requirement
        await this.userRepo.remove(user);
        return { success: true, message: `User ${user.email} deleted successfully` };
    }
    async ensureSalesFullPermissionRole(userGroup) {
        const roleName = 'SALES_MANAGEMENT_FULL';
        const existing = await this.permissionRepo.findOne({ where: { roleName, user_group: userGroup } });
        if (existing)
            return existing;
        const permission = this.permissionRepo.create({
            roleName,
            user_group: userGroup,
            permissions: [
                {
                    module: 1,
                    action: {
                        [permissionManagerConstants_1.PERMISSIONS.ADD]: true,
                        [permissionManagerConstants_1.PERMISSIONS.READ]: true,
                        [permissionManagerConstants_1.PERMISSIONS.UPDATE]: true,
                        [permissionManagerConstants_1.PERMISSIONS.DELETE]: true,
                    }
                }
            ]
        });
        return this.permissionRepo.save(permission);
    }
    async assignSalesFullPermissionsToUsers(emails) {
        if (!emails || emails.length === 0)
            throw new common_1.BadRequestException('emails required');
        const users = await this.userRepo.find({ where: { email: (0, typeorm_2.In)(emails) }, relations: ['modules'] });
        const foundEmails = new Set(users.map(u => u.email));
        const missing = emails.filter(e => !foundEmails.has(e));
        if (missing.length > 0) {
            throw new common_1.NotFoundException(`Users not found: ${missing.join(', ')}`);
        }
        const salesModule = await this.moduleRepo.findOne({ where: { id: 1 } });
        if (!salesModule) {
            throw new common_1.NotFoundException('Sales module not found');
        }
        const permissionsByGroup = new Map();
        for (const u of users) {
            const group = u.user_group || userContants_1.USER_GROUP.USER;
            let permission = permissionsByGroup.get(group);
            if (!permission) {
                permission = await this.ensureSalesFullPermissionRole(group);
                permissionsByGroup.set(group, permission);
            }
            u.permission = permission;
            const modules = u.modules || [];
            if (!modules.some(m => m.id === salesModule.id)) {
                modules.push(salesModule);
            }
            u.modules = modules;
        }
        await this.userRepo.save(users);
        return { success: true, assignedCount: users.length };
    }
    async getOrCreateUserPermission(user) {
        const roleName = `USER_${user.id}_CUSTOM`;
        if (user.permission && user.permission.roleName === roleName) {
            return this.permissionRepo.findOne({ where: { id: user.permission.id } });
        }
        const permission = this.permissionRepo.create({
            roleName,
            user_group: user.user_group || userContants_1.USER_GROUP.USER,
            permissions: []
        });
        const saved = await this.permissionRepo.save(permission);
        user.permission = saved;
        await this.userRepo.save(user);
        return saved;
    }
    async grantFullModuleAccess(userId, moduleIds) {
        if (!moduleIds || moduleIds.length === 0) {
            throw new common_1.BadRequestException('moduleIds required');
        }
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['modules', 'permission'] });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const modules = await this.moduleRepo.find({ where: { id: (0, typeorm_2.In)(moduleIds) } });
        if (modules.length !== moduleIds.length) {
            throw new common_1.NotFoundException('One or more modules not found');
        }
        const permission = await this.getOrCreateUserPermission(user);
        const permissionRecords = permission.permissions || [];
        const permissionMap = new Map(permissionRecords.map(p => [Number(p.module), p]));
        for (const moduleId of moduleIds) {
            permissionMap.set(moduleId, {
                module: moduleId,
                action: {
                    [permissionManagerConstants_1.PERMISSIONS.ADD]: true,
                    [permissionManagerConstants_1.PERMISSIONS.READ]: true,
                    [permissionManagerConstants_1.PERMISSIONS.UPDATE]: true,
                    [permissionManagerConstants_1.PERMISSIONS.DELETE]: true,
                }
            });
        }
        permission.permissions = Array.from(permissionMap.values());
        await this.permissionRepo.save(permission);
        const currentModules = user.modules || [];
        const existingIds = new Set(currentModules.map(m => m.id));
        for (const m of modules) {
            if (!existingIds.has(m.id)) {
                currentModules.push(m);
            }
        }
        user.modules = currentModules;
        await this.userRepo.save(user);
        return this.getUser(userId);
    }
    async revokeModuleAccess(userId, moduleIds) {
        if (!moduleIds || moduleIds.length === 0) {
            throw new common_1.BadRequestException('moduleIds required');
        }
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['modules', 'permission'] });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.permission) {
            const permission = await this.permissionRepo.findOne({ where: { id: user.permission.id } });
            if (permission) {
                permission.permissions = (permission.permissions || []).filter(p => !moduleIds.includes(Number(p.module)));
                await this.permissionRepo.save(permission);
            }
        }
        user.modules = (user.modules || []).filter(m => !moduleIds.includes(m.id));
        await this.userRepo.save(user);
        return this.getUser(userId);
    }
    async revokeAllModuleAccess(userId) {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['modules', 'permission'] });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.permission) {
            const permission = await this.permissionRepo.findOne({ where: { id: user.permission.id } });
            if (permission && permission.roleName === `USER_${user.id}_CUSTOM`) {
                permission.permissions = [];
                await this.permissionRepo.save(permission);
            }
        }
        user.modules = [];
        await this.userRepo.save(user);
        return this.getUser(userId);
    }
};
exports.UserManagementService = UserManagementService;
exports.UserManagementService = UserManagementService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(src_1.User)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(src_1.SystemModule)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(src_1.Department)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(src_1.Team)),
    tslib_1.__param(4, (0, typeorm_1.InjectRepository)(src_1.PermissionManager)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _f : Object])
], UserManagementService);


/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const team_service_1 = __webpack_require__(139);
const team_controller_1 = __webpack_require__(140);
const src_1 = __webpack_require__(87);
const response_handler_module_1 = __webpack_require__(84);
let TeamModule = class TeamModule {
};
exports.TeamModule = TeamModule;
exports.TeamModule = TeamModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([src_1.Team, src_1.Department, src_1.User, src_1.LoginSession]),
            src_1.DBModule,
            response_handler_module_1.ResponseHandlerModule
        ],
        controllers: [team_controller_1.TeamController],
        providers: [team_service_1.TeamService],
        exports: [team_service_1.TeamService],
    })
], TeamModule);


/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const src_1 = __webpack_require__(87);
let TeamService = class TeamService {
    constructor(teamRepository, departmentRepository, userRepository) {
        this.teamRepository = teamRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }
    async createTeam(payload) {
        try {
            // Validate Department
            const department = await this.departmentRepository.findOne({ where: { id: Number(payload.departmentId) } });
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            // Validate Team Lead if provided
            if (payload.teamLeadId) {
                const lead = await this.userRepository.findOne({ where: { id: Number(payload.teamLeadId) } });
                if (!lead) {
                    throw new common_1.NotFoundException('Team Lead user not found');
                }
            }
            const team = this.teamRepository.create(payload);
            return await this.teamRepository.save(team);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getTeams() {
        try {
            return await this.teamRepository.find({
                relations: ['department', 'teamLead', 'members'],
                order: { name: 'ASC' }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getTeamById(id) {
        try {
            const team = await this.teamRepository.findOne({
                where: { id },
                relations: ['department', 'teamLead', 'members']
            });
            if (!team) {
                throw new common_1.NotFoundException('Team not found');
            }
            return team;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateTeam(id, payload) {
        try {
            const existing = await this.teamRepository.findOne({ where: { id } });
            if (!existing) {
                throw new common_1.NotFoundException('Team not found');
            }
            if (payload.departmentId) {
                const department = await this.departmentRepository.findOne({ where: { id: Number(payload.departmentId) } });
                if (!department) {
                    throw new common_1.NotFoundException('Department not found');
                }
            }
            await this.teamRepository.update({ id }, payload);
            return await this.getTeamById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteTeam(id) {
        try {
            const result = await this.teamRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException('Team not found');
            }
            return { success: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(src_1.Team)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(src_1.Department)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(src_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], TeamService);


/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const express_1 = __webpack_require__(94);
const response_handler_service_1 = __webpack_require__(85);
const team_dto_1 = __webpack_require__(141);
const team_service_1 = __webpack_require__(139);
const authMiddleware_guard_1 = __webpack_require__(122);
let TeamController = class TeamController {
    constructor(teamService, responseHandler) {
        this.teamService = teamService;
        this.responseHandler = responseHandler;
    }
    async createTeam(res, payload) {
        try {
            const team = await this.teamService.createTeam(payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Team created successfully', data: team });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getTeams(res) {
        try {
            const teams = await this.teamService.getTeams();
            return this.responseHandler.sendSuccessResponse(res, { message: 'Teams fetched successfully', data: teams });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async getTeamById(res, id) {
        try {
            const team = await this.teamService.getTeamById(id);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Team fetched successfully', data: team });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async updateTeam(res, id, payload) {
        try {
            const team = await this.teamService.updateTeam(id, payload);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Team updated successfully', data: team });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
    async deleteTeam(res, id) {
        try {
            const result = await this.teamService.deleteTeam(id);
            return this.responseHandler.sendSuccessResponse(res, { message: 'Team deleted successfully', data: result });
        }
        catch (error) {
            return this.responseHandler.sendErrorResponse(res, error);
        }
    }
};
exports.TeamController = TeamController;
tslib_1.__decorate([
    (0, common_1.Post)('/create'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof team_dto_1.CreateTeamDto !== "undefined" && team_dto_1.CreateTeamDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TeamController.prototype, "createTeam", null);
tslib_1.__decorate([
    (0, common_1.Get)('/list'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TeamController.prototype, "getTeams", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], TeamController.prototype, "getTeamById", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, Number, typeof (_h = typeof team_dto_1.UpdateTeamDto !== "undefined" && team_dto_1.UpdateTeamDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TeamController.prototype, "updateTeam", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], TeamController.prototype, "deleteTeam", null);
exports.TeamController = TeamController = tslib_1.__decorate([
    (0, common_1.Controller)('teams'),
    (0, common_1.UseGuards)(authMiddleware_guard_1.TokenValidationGuard, authMiddleware_guard_1.CheckIfAdminGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof team_service_1.TeamService !== "undefined" && team_service_1.TeamService) === "function" ? _a : Object, typeof (_b = typeof response_handler_service_1.ResponseHandlerService !== "undefined" && response_handler_service_1.ResponseHandlerService) === "function" ? _b : Object])
], TeamController);


/***/ }),
/* 141 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTeamDto = exports.CreateTeamDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(17);
class CreateTeamDto {
}
exports.CreateTeamDto = CreateTeamDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateTeamDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTeamDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateTeamDto.prototype, "departmentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateTeamDto.prototype, "teamLeadId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateTeamDto.prototype, "active", void 0);
class UpdateTeamDto {
}
exports.UpdateTeamDto = UpdateTeamDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateTeamDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateTeamDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateTeamDto.prototype, "departmentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateTeamDto.prototype, "teamLeadId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateTeamDto.prototype, "active", void 0);


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
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const config_service_1 = __webpack_require__(6);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
    const port = Number.parseInt(process.env.MASTER_MANAGEMENT_PORT || process.env.MASTER_MANAGEMENT || '', 10) || config.get().servicePorts.masterManagement;
    await app.listen(port);
    // Log application status
    common_1.Logger.log(`🚀 Application is running at http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map