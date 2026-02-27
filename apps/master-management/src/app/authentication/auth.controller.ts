import { Controller, Get, Req, Res, UseGuards, Post, Body, ValidationPipe, ForbiddenException, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '../../../../../libs/config/config.service';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { DeleteIntercertUserDto, LoginDto } from '../../../../../libs/dtos/authentication/user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from '../../../../../libs/dtos/master_management/user_management.dto';
import { AuthenticatedRequest, GoogleUserRequest } from '../../../../../libs/interfaces/authenticated-request.interface';
import { USER_GROUP } from '../../../../../libs/constants/autenticationConstants/userContants';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post('login')
  async login(@Res() res: Response, @Req() req: Request, @Body(new ValidationPipe()) body: LoginDto) {
      try {
          const deviceType = req.headers['devicetype'] as string;
          const result = await this.authService.loginWithEmailOrPhonePassword(body, deviceType);
          return this.responseHandler.sendSuccessResponse(res, result);
      } catch (error) {
          return this.responseHandler.sendErrorResponse(res, error);
      }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
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
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: GoogleUserRequest, @Res() res: Response) {
    try {
      const googleUser = req.user;
      console.log('Google user attempting login:', googleUser.email);
      const frontendUrl = this.configService.get().FRONTEND_BASE_URL || 'http://localhost:4200';
      //const frontendUrl = this.configService.get().FRONTEND_BASE_URL || 'https://cms.intercert.com';

      const result = await this.authService.validateGoogleUser(googleUser);
      console.log('[Google Auth] Successful login for:', googleUser.email, 'Role:', result.data.user.roleName);
      return res.redirect(`${frontendUrl}/auth-callback?token=${result.data.token}`);

    } catch (err) {
      console.error('Google login error:', err);
      const frontendUrl = this.configService.get().FRONTEND_BASE_URL || 'http://localhost:4200';
      //const frontendUrl = this.configService.get().FRONTEND_BASE_URL || 'https://cms.intercert.com';
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

  @Post('create-user')
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() createUser: CreateUserDto, @Req() req: AuthenticatedRequest, @Res() res: Response) {
    try {
      const user = req.user;
      if (![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(user.user_group)) {
        throw new Error('Access denied. Only SUPER_ADMIN and ADMIN can create users.');
      }
      
      const response = await this.authService.createUser(createUser, user);
      return this.responseHandler.sendSuccessResponse(res, response);
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const token = this.extractTokenFromRequest(req);
      
      if (!token) {
        throw new ForbiddenException('No token provided');
      }

      const response = await this.authService.logout(token);
      return this.responseHandler.sendSuccessResponse(res, response);
    } catch (error) {
      console.error('Logout error:', error);
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getUsers(@Res() res: Response) {
    try {
      const users = await this.authService.getUsers();
      return this.responseHandler.sendSuccessResponse(res, { data: users, message: 'Users retrieved successfully' });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

 
  @Delete('intercert-user')
  @UseGuards(JwtAuthGuard)
  async deleteIntercertUser(@Body() payload: DeleteIntercertUserDto, @Req() req: AuthenticatedRequest, @Res() res: Response) {
    try {
      const userdata = req.user;
      console.log('Delete user request by:', userdata.email, 'User Group:', userdata.user_group);
      
      if (![USER_GROUP.SUPER_ADMIN, USER_GROUP.ADMIN].includes(userdata.user_group)) {
        throw new ForbiddenException('Access denied. Only SUPER_ADMIN and ADMIN can delete users.');
      }
      
      const response = await this.authService.deleteIntercertUser(payload);
      return this.responseHandler.sendSuccessResponse(res, response);
    } catch (error) {
      console.log('Error in deleteIntercertUser: ', error);
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }


  private extractTokenFromRequest(req: Request): string | null {
    const headerValue =
      req.headers['authorization'] ??
      req.headers['authorisation'] ??
      req.headers['accesstoken'];

    let authHeader: string | undefined;

    if (Array.isArray(headerValue)) {
      authHeader = headerValue[0];
    } else if (typeof headerValue === 'string') {
      authHeader = headerValue;
    }

    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      return authHeader.substring(7).trim();
    }

    if (authHeader) {
      return authHeader;
    }

    if (typeof req.query.token === 'string') {
      return req.query.token;
    }

    return null;
  }

  private convertUUIDToNumber(uuid: string): number {
    // Convert UUID to a consistent number for JWT
    return Number.parseInt(uuid.replace('-', ''), 16) % 2147483647;
  }
}
