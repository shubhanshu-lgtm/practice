import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '../../../../../../libs/config/config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const config = configService.get();
    const serverBasePath = config.SERVER_BASE_PATH;
    const callbackURL =
      config.GoogleAuth.GOOGLE_CALLBACK_URL ||
      (serverBasePath ? `${serverBasePath}/api/auth/google/callback` : `${config.FRONTEND_BASE_URL}/api/auth/google/callback`);

    super({
      clientID: config.GoogleAuth.GOOGLE_CLIENT_ID,
      clientSecret: config.GoogleAuth.GOOGLE_CLIENT_SECRET,
      callbackURL,
      scope: ['email', 'profile'],
      prompt: 'select_account',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback, 
  ): Promise<void> {
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
}
