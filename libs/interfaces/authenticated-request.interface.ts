import { Request } from 'express';
import { User } from '../../libs/database/src';
import { USER_GROUP } from '../constants/autenticationConstants/userContants';

export interface AuthenticatedRequest extends Request {
    user: User;
    user_group: USER_GROUP;
    department: string;
    team: string;
    modules: any[]; // This can be typed more specifically based on your module structure
    permissionId: number;
    permission: any;
}

export interface GoogleUserRequest extends Request {
    user: {
        email: string;
        firstName: string;
        lastName: string;
        picture: string;
        accessToken: string;
    }
}
