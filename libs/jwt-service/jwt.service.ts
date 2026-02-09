



import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { ERROR_CODES, ErrorMessages } from '../constants/commonConstants';
import { JWTPayload, VerifyJWTTokenResult } from '../interfaces/authentication/jwtPayload.interface';



@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  private getJWTTokenInfo() {
    const expiryTimeInSecs = this.configService.get().JWT_EXPIRY_TIME;
    const JWTSecretKey = this.configService.get().JWT_SECRET_KEY;

    if (!JWTSecretKey) {
      throw new Error('JWT secret-key not provided');
    }

    return { expiryTimeInSecs, JWTSecretKey };
  }



  public generateJWTToken(payload: Partial<JWTPayload>): Promise<string> {
    const { expiryTimeInSecs, JWTSecretKey } = this.getJWTTokenInfo();

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        JWTSecretKey,
        { expiresIn: expiryTimeInSecs, algorithm: 'HS512' },
        (err: Error | null, token?: string) => {
          if (err || !token) {
            const error = new Error('Error while creating JWT token');
            (error as any).statusCode = ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER;
            (error as any).extraError = err;
            reject(error);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  public generateRefreshToken(payload: Partial<JWTPayload>): Promise<string> {
    const { JWTSecretKey } = this.getJWTTokenInfo();

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        JWTSecretKey,
        { expiresIn: '30d', algorithm: 'HS512' },
        (err: Error | null, token?: string) => {
          if (err || !token) {
            const error = new Error('Error while creating Refresh token');
            reject(error);
          } else {
            resolve(token);
          }
        }
      );
    });
  }


  public generateGuestJWTToken(payload: Partial<JWTPayload>): Promise<string> {
    const { expiryTimeInSecs, JWTSecretKey } = this.getJWTTokenInfo();

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        JWTSecretKey,
        { expiresIn: expiryTimeInSecs, algorithm: 'HS512' },
        (err: Error | null, token?: string) => {
          if (err || !token) {
            const error = new Error('Error while creating JWT token');
            (error as any).statusCode = ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER;
            (error as any).extraError = err;
            reject(error);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  public generateJWTNeverExpToken(payload: Partial<JWTPayload>): Promise<string> {
    const { JWTSecretKey } = this.getJWTTokenInfo();

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        JWTSecretKey,
        { algorithm: 'HS512' },
        (err: Error | null, token?: string) => {
          if (err || !token) {
            const error = new Error('Error while creating JWT token');
            (error as any).statusCode = ERROR_CODES.ERROR_UNKNOWN_SHOW_TO_USER;
            (error as any).extraError = err;
            reject(error);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  public verifyJWTToken(token: string | null): Promise<VerifyJWTTokenResult> {
    return new Promise((resolve) => {
      if (!token) {
        resolve({ verified: false, errorMessage: ErrorMessages.NOT_AUTHORIZED, errorCode: ERROR_CODES.NOT_AUTHORIZED, payload: null as any });
        return;
      }

      const { JWTSecretKey } = this.getJWTTokenInfo();

      jwt.verify(token, JWTSecretKey, { algorithms: ['HS512'] }, (err, decoded: any) => {
        if (err || !decoded) {
          if (err instanceof jwt.TokenExpiredError) {
            resolve({ verified: false, errorMessage: ErrorMessages.JWT_TOKEN_EXPIRED, errorCode: ERROR_CODES.JWT_TOKEN_EXPIRED, payload: null as any });
          } else {
            resolve({ verified: false, errorMessage: ErrorMessages.JWT_TOKEN_INVALID, errorCode: ERROR_CODES.JWT_TOKEN_INVALID, payload: null as any });
          }
        } else {
          resolve({ verified: true, errorMessage: null, errorCode: 0 as any, payload: decoded as JWTPayload });
        }
      });
    });
  }

  public getJWTTokenPayload(token: string): JWTPayload | null {
    if (!token) {
      return null;
    }
    return jwt.decode(token) as JWTPayload;
  }
}