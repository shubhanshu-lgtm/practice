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
const config_module_1 = __webpack_require__(10);
const response_handler_module_1 = __webpack_require__(82);
const app_controller_1 = __webpack_require__(84);
const app_service_1 = __webpack_require__(85);
const proposal_module_1 = __webpack_require__(86);
const closure_module_1 = __webpack_require__(90);
const project_module_1 = __webpack_require__(94);
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
                entities_1.ServiceMaster,
                entities_1.ServiceDeliverable,
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
                    entities_1.ServiceDeliverable,
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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseHandlerModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const response_handler_service_1 = __webpack_require__(83);
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
/* 83 */
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
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(85);
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
/* 85 */
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
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const proposal_entity_1 = __webpack_require__(41);
const proposal_item_entity_1 = __webpack_require__(42);
const proposal_payment_term_entity_1 = __webpack_require__(43);
const proposal_service_1 = __webpack_require__(87);
const proposal_controller_1 = __webpack_require__(88);
const lead_entity_1 = __webpack_require__(39);
const lead_service_entity_1 = __webpack_require__(40);
const proposal_item_repository_1 = __webpack_require__(78);
const proposal_payment_term_repository_1 = __webpack_require__(79);
const config_module_1 = __webpack_require__(10);
const database_module_1 = __webpack_require__(5);
const response_handler_module_1 = __webpack_require__(82);
let ProposalModule = class ProposalModule {
};
exports.ProposalModule = ProposalModule;
exports.ProposalModule = ProposalModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DBModule.forRoot(),
            config_module_1.ConfigModule,
            response_handler_module_1.ResponseHandlerModule,
            typeorm_1.TypeOrmModule.forFeature([
                proposal_entity_1.Proposal,
                proposal_item_entity_1.ProposalItem,
                proposal_payment_term_entity_1.ProposalPaymentTerm,
                lead_entity_1.Lead,
                lead_service_entity_1.LeadService
            ])
        ],
        providers: [proposal_service_1.ProposalService, lead_service_entity_1.LeadService, proposal_item_repository_1.ProposalItemRepository, proposal_payment_term_repository_1.ProposalPaymentTermRepository],
        controllers: [proposal_controller_1.ProposalController],
        exports: [proposal_service_1.ProposalService, proposal_item_repository_1.ProposalItemRepository, proposal_payment_term_repository_1.ProposalPaymentTermRepository]
    })
], ProposalModule);


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const proposal_entity_1 = __webpack_require__(41);
const proposal_item_entity_1 = __webpack_require__(42);
const proposal_payment_term_entity_1 = __webpack_require__(43);
const lead_entity_1 = __webpack_require__(39);
let ProposalService = class ProposalService {
    constructor(proposalRepo, leadRepo, dataSource) {
        this.proposalRepo = proposalRepo;
        this.leadRepo = leadRepo;
        this.dataSource = dataSource;
    }
    async createProposal(dto) {
        return this.dataSource.transaction(async (manager) => {
            const lead = await manager.findOne(lead_entity_1.Lead, { where: { id: Number(dto.leadId) } });
            if (!lead)
                throw new common_1.NotFoundException('Lead not found');
            // Generate Reference
            const count = await manager.count(proposal_entity_1.Proposal, { where: { leadId: Number(dto.leadId) } });
            const seq = String(count + 1).padStart(2, '0');
            const reference = `PROP/${lead.enquiryId}/${seq}`;
            const proposal = manager.create(proposal_entity_1.Proposal, {
                leadId: Number(dto.leadId),
                proposalReference: reference,
                proposalDate: dto.proposalDate,
                validUntil: dto.validUntil,
                submittedBy: dto.submittedBy,
                subject: dto.subject,
                introduction: dto.introduction,
                termsAndConditions: dto.termsAndConditions,
                status: proposal_entity_1.PROPOSAL_STATUS.DRAFT
            });
            // Calculate totals
            let totalAmount = 0;
            let taxAmount = 0;
            const items = [];
            for (const itemDto of dto.items) {
                const item = new proposal_item_entity_1.ProposalItem();
                item.leadServiceId = itemDto.leadServiceId;
                item.description = itemDto.description;
                item.amount = itemDto.amount;
                item.currency = itemDto.currency;
                item.discount = itemDto.discount || 0;
                item.taxPercentage = itemDto.taxPercentage || 0;
                // Calculations
                const discountAmount = (item.amount * item.discount) / 100;
                const taxableAmount = item.amount - discountAmount;
                const itemTax = (taxableAmount * item.taxPercentage) / 100;
                item.netAmount = taxableAmount + itemTax;
                totalAmount += taxableAmount;
                taxAmount += itemTax;
                // Payment Terms
                item.paymentTerms = itemDto.paymentTerms.map(termDto => {
                    const term = new proposal_payment_term_entity_1.ProposalPaymentTerm();
                    term.milestoneName = termDto.milestoneName;
                    term.percentage = termDto.percentage;
                    term.triggerEvent = termDto.triggerEvent;
                    term.amount = (item.netAmount * term.percentage) / 100;
                    return term;
                });
                items.push(item);
            }
            proposal.items = items;
            proposal.totalAmount = totalAmount;
            proposal.taxAmount = taxAmount;
            proposal.grandTotal = totalAmount + taxAmount;
            // Assume currency from first item or default
            if (items.length > 0) {
                proposal.currency = items[0].currency;
            }
            return await manager.save(proposal_entity_1.Proposal, proposal);
        });
    }
    async getProposal(id) {
        return this.proposalRepo.findOne({
            where: { id },
            relations: ['items', 'items.paymentTerms', 'lead', 'items.leadService', 'items.leadService.service']
        });
    }
    async getProposalsByLead(leadId) {
        return this.proposalRepo.find({
            where: { leadId },
            order: { createdAt: 'DESC' }
        });
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(proposal_entity_1.Proposal)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _c : Object])
], ProposalService);


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposalController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const proposal_service_1 = __webpack_require__(87);
const create_proposal_dto_1 = __webpack_require__(89);
let ProposalController = class ProposalController {
    constructor(proposalService) {
        this.proposalService = proposalService;
    }
    create(dto) {
        return this.proposalService.createProposal(dto);
    }
    findOne(id) {
        return this.proposalService.getProposal(+id);
    }
    findByLead(leadId) {
        return this.proposalService.getProposalsByLead(+leadId);
    }
};
exports.ProposalController = ProposalController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_proposal_dto_1.CreateProposalDto !== "undefined" && create_proposal_dto_1.CreateProposalDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProposalController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProposalController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Get)('lead/:leadId'),
    tslib_1.__param(0, (0, common_1.Param)('leadId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProposalController.prototype, "findByLead", null);
exports.ProposalController = ProposalController = tslib_1.__decorate([
    (0, common_1.Controller)('proposals'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof proposal_service_1.ProposalService !== "undefined" && proposal_service_1.ProposalService) === "function" ? _a : Object])
], ProposalController);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProposalDto = exports.CreateProposalItemDto = exports.CreateProposalPaymentTermDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(17);
class CreateProposalPaymentTermDto {
}
exports.CreateProposalPaymentTermDto = CreateProposalPaymentTermDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalPaymentTermDto.prototype, "milestoneName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
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
], CreateProposalItemDto.prototype, "description", void 0);
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
    tslib_1.__metadata("design:type", Number)
], CreateProposalItemDto.prototype, "discount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateProposalItemDto.prototype, "taxPercentage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateProposalPaymentTermDto),
    tslib_1.__metadata("design:type", Array)
], CreateProposalItemDto.prototype, "paymentTerms", void 0);
class CreateProposalDto {
}
exports.CreateProposalDto = CreateProposalDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateProposalDto.prototype, "leadId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateProposalDto.prototype, "proposalDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CreateProposalDto.prototype, "validUntil", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateProposalDto.prototype, "submittedBy", void 0);
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
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateProposalItemDto),
    tslib_1.__metadata("design:type", Array)
], CreateProposalDto.prototype, "items", void 0);


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClosureModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const proposal_acceptance_entity_1 = __webpack_require__(64);
const proposal_entity_1 = __webpack_require__(41);
const lead_entity_1 = __webpack_require__(39);
const closure_service_1 = __webpack_require__(91);
const closure_controller_1 = __webpack_require__(92);
const project_entity_1 = __webpack_require__(65);
let ClosureModule = class ClosureModule {
};
exports.ClosureModule = ClosureModule;
exports.ClosureModule = ClosureModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([proposal_acceptance_entity_1.ProposalAcceptance, proposal_entity_1.Proposal, lead_entity_1.Lead, project_entity_1.Project])
        ],
        providers: [closure_service_1.ClosureService],
        controllers: [closure_controller_1.ClosureController],
        exports: [closure_service_1.ClosureService]
    })
], ClosureModule);


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClosureService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const proposal_acceptance_entity_1 = __webpack_require__(64);
const proposal_entity_1 = __webpack_require__(41);
const lead_entity_1 = __webpack_require__(39);
const project_entity_1 = __webpack_require__(65);
const salesConstants_1 = __webpack_require__(46);
let ClosureService = class ClosureService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async generateProjectCode(manager) {
        const year = new Date().getFullYear();
        const count = await manager.createQueryBuilder(project_entity_1.Project, 'project')
            .select('COUNT(project.id)', 'count')
            .where('project.projectCode LIKE :projectCode', { projectCode: `PRJ/${year}%` })
            .getRawOne();
        // Parse count safely
        const countVal = count ? Number(count.count) : 0;
        const seq = String(countVal + 1).padStart(3, '0');
        return `PRJ/${year}/${seq}`;
    }
    async acceptProposal(dto) {
        return this.dataSource.transaction(async (manager) => {
            const proposal = await manager.findOne(proposal_entity_1.Proposal, {
                where: { id: Number(dto.proposalId) },
                relations: [
                    'lead',
                    'items',
                    'items.leadService',
                    'items.leadService.service',
                    'items.leadService.service.department'
                ]
            });
            if (!proposal)
                throw new common_1.NotFoundException('Proposal not found');
            if (proposal.status === proposal_entity_1.PROPOSAL_STATUS.APPROVED) {
                throw new common_1.BadRequestException('Proposal already accepted');
            }
            // Create Acceptance
            const acceptance = manager.create(proposal_acceptance_entity_1.ProposalAcceptance, {
                proposalId: Number(dto.proposalId),
                leadId: Number(proposal.leadId),
                awardDate: dto.awardDate,
                poNumber: dto.poNumber,
                poFileUrl: dto.poFileUrl,
                billingNameSameAsCustomer: dto.billingNameSameAsCustomer,
                billToCompanyName: dto.billToCompanyName,
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
            // Update Proposal Status
            proposal.status = proposal_entity_1.PROPOSAL_STATUS.APPROVED;
            await manager.save(proposal_entity_1.Proposal, proposal);
            // Update Lead Status
            const lead = proposal.lead;
            if (lead) {
                lead.status = salesConstants_1.LEAD_STATUS.AWARDED;
                await manager.save(lead_entity_1.Lead, lead);
            }
            // Auto Create Project Record(s) based on Departments
            const createdProjects = [];
            const departmentIds = new Set();
            for (const item of proposal.items) {
                const service = item.leadService?.service;
                const department = service?.department;
                if (department && !departmentIds.has(Number(department.id))) {
                    departmentIds.add(Number(department.id));
                    const projectCode = await this.generateProjectCode(manager);
                    const project = manager.create(project_entity_1.Project, {
                        projectCode: projectCode,
                        name: `${service.name} Project - ${lead.enquiryReference || lead.id}`,
                        department: department,
                        departmentId: Number(department.id),
                        lead: lead,
                        leadId: lead.id,
                        proposal: proposal,
                        proposalId: proposal.id,
                        startDate: dto.awardDate,
                        status: salesConstants_1.PROJECT_STATUS.PENDING
                    });
                    const savedProject = await manager.save(project_entity_1.Project, project);
                    createdProjects.push(savedProject);
                }
            }
            return savedAcceptance;
        });
    }
};
exports.ClosureService = ClosureService;
exports.ClosureService = ClosureService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], ClosureService);


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClosureController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const closure_service_1 = __webpack_require__(91);
const create_closure_dto_1 = __webpack_require__(93);
let ClosureController = class ClosureController {
    constructor(closureService) {
        this.closureService = closureService;
    }
    acceptProposal(dto) {
        return this.closureService.acceptProposal(dto);
    }
};
exports.ClosureController = ClosureController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_closure_dto_1.CreateClosureDto !== "undefined" && create_closure_dto_1.CreateClosureDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ClosureController.prototype, "acceptProposal", null);
exports.ClosureController = ClosureController = tslib_1.__decorate([
    (0, common_1.Controller)('closure'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof closure_service_1.ClosureService !== "undefined" && closure_service_1.ClosureService) === "function" ? _a : Object])
], ClosureController);


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateClosureDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(17);
class CreateClosureDto {
}
exports.CreateClosureDto = CreateClosureDto;
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
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
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClosureDto.prototype, "poFileUrl", void 0);
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
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Object)
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
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Object)
], CreateClosureDto.prototype, "billingContactPerson", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClosureDto.prototype, "raisedFromEntity", void 0);
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
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClosureDto.prototype, "notes", void 0);


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const project_service_1 = __webpack_require__(95);
const project_controller_1 = __webpack_require__(96);
const project_entity_1 = __webpack_require__(65);
const user_entity_1 = __webpack_require__(13);
const team_entity_1 = __webpack_require__(26);
const config_module_1 = __webpack_require__(10);
const database_module_1 = __webpack_require__(5);
const response_handler_module_1 = __webpack_require__(82);
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
        providers: [project_service_1.ProjectService],
        controllers: [project_controller_1.ProjectController],
        exports: [project_service_1.ProjectService]
    })
], ProjectModule);


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const project_entity_1 = __webpack_require__(65);
const user_entity_1 = __webpack_require__(13);
let ProjectService = class ProjectService {
    constructor(projectRepo, userRepo) {
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
    }
    async getProjectsForUser(userId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['departments', 'teams', 'teams.department', 'permission']
        });
        if (!user)
            return [];
        // 1. Admin / Super Admin Check
        // This logic depends on how you define Admin/Super Admin. 
        // Checking roleName or permission level.
        const isAdmin = user.roleName === 'Admin' || user.roleName === 'Super Admin';
        if (isAdmin) {
            return this.projectRepo.find({
                relations: ['department', 'lead', 'proposal']
            });
        }
        // 2. Collect Department IDs
        const allowedDeptIds = new Set();
        // From direct Department assignment
        if (user.departments) {
            user.departments.forEach(d => allowedDeptIds.add(d.id));
        }
        // From Team membership
        // Note: user.teams is defined as [] in User entity for circular dependency reasons, 
        // but at runtime with TypeORM relations it will be populated with Team objects.
        const userTeams = user.teams;
        if (userTeams) {
            userTeams.forEach(t => {
                if (t.department) {
                    allowedDeptIds.add(t.department.id);
                }
            });
        }
        if (allowedDeptIds.size === 0) {
            return [];
        }
        // 3. Query Projects
        return this.projectRepo.find({
            where: {
                department: { id: (0, typeorm_2.In)([...allowedDeptIds]) }
            },
            relations: ['department', 'lead', 'proposal']
        });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ProjectService);


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const project_service_1 = __webpack_require__(95);
// Mocking an Auth Guard or assuming user ID is passed for demonstration
// In a real app, you would extract userId from the JWT token in the request
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async getProjects(userId) {
        // For testing purposes, we accept userId as a query param.
        // In production, use @Req() req and extract req.user.id
        return this.projectService.getProjectsForUser(Number(userId));
    }
};
exports.ProjectController = ProjectController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjects", null);
exports.ProjectController = ProjectController = tslib_1.__decorate([
    (0, common_1.Controller)('projects'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof project_service_1.ProjectService !== "undefined" && project_service_1.ProjectService) === "function" ? _a : Object])
], ProjectController);


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