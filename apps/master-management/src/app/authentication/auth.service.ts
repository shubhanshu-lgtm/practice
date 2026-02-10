import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, LoginSession, Department, SystemModule } from '../../../../../libs/database/src';
import { JwtService } from '../../../../../libs/jwt-service/jwt.service';
import { TOKEN_TYPE, ERROR_CODES, DEVICE_TYPE } from '../../../../../libs/constants/commonConstants';
import { JWTPayload } from '../../../../../libs/interfaces/jwtPayload.interface';
import { LOGIN_BY, SESSION_STATUS, USER_ACCOUNT_STATUS, USER_GROUP, USER_VERIFY_STATUS, USER_LOGIN_SOURCE } from '../../../../../libs/constants/autenticationConstants/userContants';
import { LoginDto } from '../../../../../libs/dtos/authentication/user.dto';
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
    ) { }

    async loginWithEmailOrPhonePassword(input: LoginDto, deviceType: string = DEVICE_TYPE.WEB) {
        try {
            const { identity, password } = input;
            const user = await this.userRepository.findOne({ 
                where: { email: identity.toLowerCase() },
                relations: ['permission', 'modules', 'departments']
            });
            
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
            const defaultPassword = "Intercert@OPMS123";
            const passwordToHash = createUser.password || defaultPassword;
            const hashedPassword = await bcrypt.hash(passwordToHash, 10);

            const newUser = await this.userRepository.save({
                name: createUser.name,
                email: createUser.email.toLowerCase().trim(),
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
        const { email, picture, name } = googleUser;
        
        let user = await this.userRepository.findOne({ 
            where: { email: email.toLowerCase() },
            relations: ['permission', 'modules', 'departments']
        });

        if (!user) {
            if (email.endsWith('@intercert.com')) {
                console.log('User not found in database, auto-creating for intercert.com domain:', email);
                const defaultPassword = "Intercert@GoogleAuth"; 
                const hashedPassword = await bcrypt.hash(defaultPassword, 10);
                
                user = await this.userRepository.save({
                   name: name || email.split('@')[0],
                   email: email.toLowerCase(),
                   password: hashedPassword,
                   roleName: USER_GROUP.SUPER_ADMIN,
                   user_group: USER_GROUP.SUPER_ADMIN,
                   status: USER_ACCOUNT_STATUS.ACTIVE,
                   verifyStatus: USER_VERIFY_STATUS.VERIFIED,
                   loginSource: USER_LOGIN_SOURCE.GOOGLE,
                   avatar: picture
                });
            } else {
                throw new UnauthorizedException('User not found in our records. Please contact admin for pre-registration.');
            }
        } else {
             // Update user profile from Google if needed
            if (picture && user.avatar !== picture) {
                user.avatar = picture;
                await this.userRepository.save(user);
            }
        }

        return this.generateAuthResponse(user, DEVICE_TYPE.WEB);
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
}

