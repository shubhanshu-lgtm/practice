import { Injectable, UnauthorizedException, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, LoginSession, Department, SystemModule, LoginSessionRepository } from '../../../../../libs/database/src';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { TOKEN_TYPE, ERROR_CODES, DEVICE_TYPE } from '../../../../../libs/constants/commonConstants';
import { JWTPayload } from '../../../../../libs/interfaces/jwtPayload.interface';
import { LOGIN_BY, SESSION_STATUS, USER_ACCOUNT_STATUS, USER_GROUP, USER_VERIFY_STATUS, USER_LOGIN_SOURCE } from '../../../../../libs/constants/autenticationConstants/userContants';
import { LoginDto, DeleteIntercertUserDto } from '../../../../../libs/dtos/authentication/user.dto';
import { checkPasswordHash } from '../../../../../libs/utils/bcryptUtil';
import { LOGIN_MSG } from '../../../../../libs/constants/autenticationConstants/messageConstants';
import { CreateUserDto } from '../../../../../libs/dtos/master_management/user_management.dto';
import * as bcrypt from 'bcrypt';

// interface GoogleUser {
//     email: string;
//     picture?: string;
//     name?: string;
// }

interface GoogleUser {
  id?: string;
  email: string;
  name?: string;
  provider?: string;
  accessToken?: string;
  picture?: string;
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(LoginSession)
        private readonly loginSessionRepository: Repository<LoginSession>,
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
        @InjectRepository(SystemModule)
        private readonly systemModuleRepository: Repository<SystemModule>,
        private readonly jwtService: JwtService,
        private readonly loginSessionRepo: LoginSessionRepository,
    ) { }

    async loginWithEmailOrPhonePassword(input: LoginDto, deviceType: string = DEVICE_TYPE.WEB) {
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
                 throw { message: LOGIN_MSG.INVALID_CREDENTIALS, statusCode: ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER };
            }
            
            if (user.status !== USER_ACCOUNT_STATUS.ACTIVE) {
                 throw { message: LOGIN_MSG.INACTIVE_ACCOUNT, statusCode: ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER };
            }
            
            const isMatch = await checkPasswordHash(password, user.password);
            if (!isMatch) {
                 throw { message: LOGIN_MSG.INVALID_CREDENTIALS, statusCode: ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER };
            }

            return this.generateAuthResponse(user, deviceType);

        } catch (error) {
            console.log("Error login", error);
            throw error;
        }
    }

     async createUser(createUser: CreateUserDto, user: User) {
        try {
            const email = createUser.email.toLowerCase().trim();
            
            if (!email.endsWith('@intercert.com')) {
                throw new UnauthorizedException('Only @intercert.com email addresses are allowed.');
            }

            const existingUser = await this.userRepository.findOne({ where: { email } });
            if (existingUser) {
                throw new UnauthorizedException('User with this email already exists.');
            }

            const defaultPassword = "Intercert@OPMS123";
            const passwordToHash = createUser.password || defaultPassword;
            const hashedPassword = await bcrypt.hash(passwordToHash, 10);

            const newUser = await this.userRepository.save({
                name: createUser.name,
                email: email,
                password: hashedPassword,
                roleName: createUser.role,
                user_group: createUser.user_group || USER_GROUP.USER,
                status: USER_ACCOUNT_STATUS.ACTIVE,
                verifyStatus: USER_VERIFY_STATUS.VERIFIED,
                loginSource: USER_LOGIN_SOURCE.LOCAL,
                addedBy: user,
            });

            return { 
                message: "User registered successfully", 
                data: newUser,
                tempPassword: createUser.password ? undefined : defaultPassword 
            };
        } catch (error) {
            console.log("Error in createUser Service: ", error);
            throw error;
        }
    }

    async validateGoogleUser(googleUser: GoogleUser) {
        const { email, picture } = googleUser;
        
        if (!email.endsWith('@intercert.com')) {
            throw new UnauthorizedException('Access denied. Only @intercert.com email addresses are allowed.');
        }
        
        const user = await this.userRepository.findOne({ 
            where: { email: email.toLowerCase() },
            relations: ['permission', 'modules', 'departments', 'teams']
        });

        if (!user) {
            throw new UnauthorizedException('User not registered. Please contact admin to create your account first.');
        }

        if (user.status !== USER_ACCOUNT_STATUS.ACTIVE) {
            throw new UnauthorizedException('Your account is inactive. Please contact admin.');
        }

        if (picture && user.avatar !== picture) {
            user.avatar = picture;
            await this.userRepository.save(user);
        }

        return this.generateAuthResponse(user, DEVICE_TYPE.WEB);
    }

    async deleteIntercertUser(payload: DeleteIntercertUserDto) {
        const normalizedEmail = payload.email.trim().toLowerCase();
        
        if (!normalizedEmail.endsWith('@intercert.com')) {
            throw new ForbiddenException('Only @intercert.com users can be deleted through this endpoint.');
        }

        const user = await this.userRepository.findOne({ 
            where: { email: normalizedEmail },
            relations: ['permission', 'modules', 'departments']
        });

        if (!user) {
            throw new NotFoundException(`User with email ${normalizedEmail} not found`);
        }

        console.log(`[Delete User] Starting deletion process for user: ${normalizedEmail} (ID: ${user.id})`);

        if (user.user_group === USER_GROUP.SUPER_ADMIN) {
            console.log(`[Delete User] Attempt to delete Super Admin user blocked: ${normalizedEmail}`);
            throw new ForbiddenException("Cannot delete Super Admin users. This action is not permitted.");
        }

        let sessionCountBeforeDeletion = 0;
        let sessionsBeforeDeletion = [];
        try {
            sessionsBeforeDeletion = await this.loginSessionRepository.find({ 
                where: { user: { id: user.id } }
            });
            sessionCountBeforeDeletion = sessionsBeforeDeletion.length;
            console.log(`[Delete User] Active sessions found before deletion: ${sessionCountBeforeDeletion}`);
        } catch (error) {
            console.log(`[Delete User] Error checking sessions for user ${normalizedEmail}:`, error);
        }
        
        try {
            if (sessionCountBeforeDeletion > 0) {
                await this.loginSessionRepository.delete({ user: { id: user.id } });
                console.log(`[Delete User] Sessions deleted for user ${normalizedEmail}: ${sessionCountBeforeDeletion}`);
            }
        } catch (error) {
            console.log(`[Delete User] Error deleting sessions for user ${normalizedEmail}:`, error);
        }

        try {
            if (payload.hard) {
                console.log(`[Delete User] Hard delete initiated for user: ${normalizedEmail}`);
                await this.userRepository.remove(user);
            } else {
                console.log(`[Delete User] Soft delete (deactivation) initiated for user: ${normalizedEmail}`);
                user.status = USER_ACCOUNT_STATUS.INACTIVE;
                await this.userRepository.save(user);
            }
        } catch (error) {
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
    
    async generateAuthResponse(user: User, deviceType: string = DEVICE_TYPE.WEB) {
        // Generate refresh token for session
        const refreshToken = await this.jwtService.generateRefreshToken({ referenceId: user.id });
        const refreshTokenExpiry = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days

        // Create login session
        const session = this.loginSessionRepository.create({
            user: user,
            loginBy: LOGIN_BY.EMAIL,
            loginIdentity: user.email,
            loginStatus: SESSION_STATUS.LOGGED_IN,
            refreshToken: refreshToken,
            refreshTokenExpiry: refreshTokenExpiry,
            deviceType: deviceType as DEVICE_TYPE,
        });

        const savedSession = await this.loginSessionRepository.save(session);

        const payload: Partial<JWTPayload> = {
            referenceId: user.id,
            userRole: user.roleName,
            user_group: user.user_group,
            sessionId: savedSession.id,
            permissionId: user.permission?.id,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            modules: (user.modules || []).map(m => m.code || m.id) as (number | string)[],
            tokenType: TOKEN_TYPE.USER_LOGIN,
        };

        const token = await this.jwtService.generateJWTToken(payload);
        const isSuperAdmin = user.user_group === USER_GROUP.SUPER_ADMIN;
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

    async logout(token: string): Promise<{ message: string }> {
        if (!token) {
            throw new BadRequestException('Token is required for logout');
        }

        const decoded = await this.jwtService.verifyJWTToken(token);
        
        if (!decoded.verified || !decoded.payload) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        const sessionId = decoded.payload.sessionId;
        
        if (!sessionId) {
            throw new BadRequestException('No session found in token');
        }

        console.log(`[Logout] Deleting session: ${sessionId} for user: ${decoded.payload.referenceId}`);

        try {
            await this.loginSessionRepo.logoutCurrentSession(sessionId);
            console.log(`[Logout] Session ${sessionId} successfully deleted`);
            
            return {
                message: 'Logged out successfully. Session has been terminated.'
            };
        } catch (error) {
            console.error('[Logout] Error deleting session:', error);
            throw error;
        }
    }

    async getUsers() {
        return this.userRepository.find({
            relations: ['permission', 'modules', 'departments', 'teams']
        });
    }
}

