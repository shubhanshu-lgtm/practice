// import { ERROR_CODES, ErrorMessages, TOKEN_TYPE } from "../constants/commonConstants";

import { ERROR_CODES, ErrorMessages, TOKEN_TYPE } from "../../libs/constants/commonConstants";
import {USER_GROUP } from "../../libs/constants/autenticationConstants/userContants"

export interface JWTPayload
{
    referenceId: number,  //userId
    guestId: string,
    refreshToken: string,
    userRole: string,
    role?: string,
    permissionId: number,
    sessionId: number,
    user_group: USER_GROUP,
    email?: string,
    name?: string,
    tokenType: TOKEN_TYPE,
    modules?: (number | string)[]
}

export interface VerifyJWTTokenResult
{
    verified: boolean,
    errorMessage: ErrorMessages | null,
    errorCode: ERROR_CODES | 0,
    payload: JWTPayload
}

// export interface AddUserPayload
// {
//     referenceId: number,  //userId
//     memberRequestId: string,
//     tokenType: TOKEN_TYPE
// }


// export interface JWTPayload {
//     userId: number;
//     email: string;
//     role: string;
// }
