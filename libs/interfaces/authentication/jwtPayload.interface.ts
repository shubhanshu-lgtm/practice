import { USER_GROUP } from "../../constants/autenticationConstants/userContants";
import { ERROR_CODES, ErrorMessages, TOKEN_TYPE } from "../../constants/commonConstants";

export interface JWTPayload
{
    referenceId: number,  //userId
    guestId: string,
    refreshToken: string,
    userRole: string, //roleName
    permissionId: number,
    sessionId: number,
    user_group: USER_GROUP,
    department?: string,
    modules?: (number | string)[],
    tokenType: TOKEN_TYPE
}

export interface VerifyJWTTokenResult
{
    verified: Boolean,
    errorMessage: ErrorMessages | null,
    errorCode: ERROR_CODES | 0,
    payload: JWTPayload
}

export interface AddUserPayload
{
    referenceId: number,  //userId
    memberRequestId: string,
    tokenType: TOKEN_TYPE
}