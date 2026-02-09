  import { Controller, Get, Req, Res, UseGuards, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '../../../../../libs/config/config.service';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { LoginDto } from '../../../../../libs/dtos/authentication/user.dto';
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

   @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: GoogleUserRequest, @Res() res: Response) {
    try {
      const googleUser = req.user;
      console.log('Google user info: >>>>>>>>>>>>kkkk', googleUser);
      const frontendUrl = this.configService.get().FRONTEND_BASE_URL || 'http://localhost:4200';
      if (!googleUser.email || !googleUser.email.endsWith('@intercert.com')) {
        return res.redirect(`${frontendUrl}/login?error=unauthorized_email`);
      }

      const result = await this.authService.validateGoogleUser(googleUser);
      return res.redirect(`${frontendUrl}/auth-callback?token=${result.data.token}`);

      // Set httpOnly cookie
      // res.cookie('jwt', jwtToken, {
      //   httpOnly: false,
      //   secure: true,
    } catch (err) {
      const frontendUrl = this.configService.get().FRONTEND_BASE_URL || 'http://localhost:4200';
      return res.redirect(`${frontendUrl}/login?error=login_failed`);
    }
  }

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
}
