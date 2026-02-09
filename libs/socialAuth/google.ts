import axios from "axios";
import { GetGoogleToken, GoogleTokenResponse, GoogleUserInfo } from "../interfaces/authentication/socialLogin.interface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";

@Injectable()
export class GoogleAuthService {
  private redirectURI: string;
  private GOOGLE_CLIENT_ID: string;
  private GOOGLE_CLIENT_SECRET: string;

  constructor(private configService: ConfigService)
  {
    const cfg = this.configService.get();
    const { SERVER_BASE_PATH, GoogleAuth } = cfg as any;
    this.GOOGLE_CLIENT_ID = GoogleAuth && GoogleAuth.GOOGLE_CLIENT_ID ? GoogleAuth.GOOGLE_CLIENT_ID : '';
    this.GOOGLE_CLIENT_SECRET = GoogleAuth && GoogleAuth.GOOGLE_CLIENT_SECRET ? GoogleAuth.GOOGLE_CLIENT_SECRET : '';
    // callback should point to server endpoint that handles google callback
    this.redirectURI = (GoogleAuth && GoogleAuth.GOOGLE_CALLBACK_URL) || (SERVER_BASE_PATH ? `${SERVER_BASE_PATH}/social-auth/google/callback` : '/social-auth/google/callback');
  }

  getGoogleAuthURL(): string
{
  const {GoogleAuth} = this.configService.get(); 
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${this.redirectURI}`,
    client_id: GoogleAuth.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${new URLSearchParams(options).toString()}`;
}

async getTokens({ code, clientId, clientSecret, redirectUri }: GetGoogleToken): Promise<GoogleTokenResponse> {
  try {
    /*
   * Uses the code to get tokens
   * that can be used to fetch the user's profile
   */
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  const res = await axios.post(url,new URLSearchParams(values).toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    return res.data
  } catch (error: any) {
    console.error(`Failed to fetch auth tokens`, error.message);
    throw error;
    
  }
}
  

   async  getUserProfile(access_token:string, id_token:string): Promise<GoogleUserInfo> {
    try {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
  
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
      })
  
      return res.data
    } catch (error: any) {
      console.error(`Failed to fetch user`, error.message);
      throw error;
    }
  }
  
  
   async  googleCallbackHandler(code: string) 
  {
    try {
          const { id_token, access_token } = await this.getTokens({
            code,
            clientId: this.GOOGLE_CLIENT_ID,
            clientSecret: this.GOOGLE_CLIENT_SECRET,
            redirectUri: `${this.redirectURI}`,
          });
  
      const userInfo = await this.getUserProfile(access_token, id_token);
      return userInfo
  
    } catch (error) {
      throw error
    }
  }

}
