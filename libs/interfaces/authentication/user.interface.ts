import { DEFAULT_USER_ROLES, USER_ACCOUNT_STATUS, USER_GROUP, USER_LOGIN_SOURCE, USER_VERIFY_STATUS } from "../../constants/autenticationConstants/userContants";
import { IPagination } from "../commonTypes/custom.interface";

export declare namespace UserI {
    interface UserSchema {
        id: number,
        name?: string,
        avatar?: string,
        email?: string,
        phoneNo: string,
        password: string,
        status: USER_ACCOUNT_STATUS,
        verifyStatus: USER_VERIFY_STATUS,
        roleName: string, 
        permission: number // permissionId
        addedBy: number,
        user_group: USER_GROUP,
        departments?: number[],
        teams?: number[],
        loginSource: USER_LOGIN_SOURCE,
        createdAt: Date,
    }

    type UserType = UserSchema & Document

    interface InsertUserByEmail
    {
        name?: string,
        email: string,
        password?: string,
        status: USER_ACCOUNT_STATUS,
        addedBy?: number,
        roleName?: string, 
        permission?: number
        verifyStatus: USER_VERIFY_STATUS,
        user_group?: USER_GROUP,
        loginSource: USER_LOGIN_SOURCE,
        id?:number
    }

    interface InsertUserByPhone
    {
        phoneNo: string,
        status: USER_ACCOUNT_STATUS,
        verifyStatus: USER_VERIFY_STATUS,
        id?: number,
        roleName: string,
        user_group: USER_GROUP,
        permission: number
    }

    interface AddOrUpdateUser
    {
        name?: string,
        password?: string,
        phoneNo?: string,
        status?: USER_ACCOUNT_STATUS,
        verifyStatus?: USER_VERIFY_STATUS,
        id?: number,
        roleName?: string,
        user_group?: string,
        permission?: number,
        email?: string,
        avatar?:string,
        loginSource?:USER_LOGIN_SOURCE,
        addedBy?: number
    }

    interface PermissionObj {
        roleName?: string;
        user_group?: string;
        permission?: number;
    }

    interface InsertDefaultUser 
    {
        email: string,
        password: string,
        status: USER_ACCOUNT_STATUS,
        verifyStatus: USER_VERIFY_STATUS,
        user_group: USER_GROUP,
        loginSource:USER_LOGIN_SOURCE,
        name: string,
    }

    interface UpdateRoleAndPermission
    {
        roleName: string, 
        permission: number // permissionId
        userId:number
    }

    interface UpdateUserStatus
    {
        userId: number,
        status: USER_ACCOUNT_STATUS,
        verifyStatus: USER_VERIFY_STATUS,
        password?: string
    }

    interface Register 
    {
        email: string,
        password: string,
        name: string,
        user_group: USER_GROUP
    }

    interface LoginWithEmail {
        email:string,
        user_group: USER_GROUP
    }

    interface LoginWithPhone {
        phoneNo: string,
        userRole?: string,
        user_group: USER_GROUP,
        name?:string,
    }
    
    interface VerifyByOtp {
        referenceId: number,
        otp:string
    }
  
    interface LoginWithEmailOrPhone {
        identity: string
        userRole:string,
        user_group: string
    }

    interface UpdateProfile {
        userId: number,
        name: string,
        email: string,
        phoneNo: string,
        password: string,
        avatar: string,
        status: USER_ACCOUNT_STATUS,
        verifyStatus: USER_VERIFY_STATUS,
    }

    export interface UpdatePersonalDetailRequest
    {
        name: string,
        phoneNo: string,
        email: string
    }

    interface UpdateEmailById
    {
        userId: number,
        email: string,
    }

    interface UpdatePhoneById
    {
        phoneNo: string,
        userId: number,
    }

    interface AddUser
    {
        name: string,
        email: string,
        userRole: DEFAULT_USER_ROLES,
        roleId: string,
    }

    interface VerifyAddUser
    {
        userName: string,
        password: string,
        phoneNo: string,
    }

    export interface UpdateUserProfile
    {
        userId: string,
        fullName: string,
        userRole: string,
        userName: string,
        email?: string,
        phoneNo?: string,
        password?: string,
    }

    interface UpdatePasswordByUserId
    {
        userId: number,
        password: string
    }

    interface RenewAccessToken {
        accessToken: string,
        refreshToken: string
    }

    interface ChangePassword {
        oldPassword: string,
        newPassword: string,
        otp: string;
        referenceId:number
    }

    interface UpdateUserAccountStatus
    {
        userId: number,
        status: USER_ACCOUNT_STATUS
    }
    interface GetUsersByFilter extends IPagination
    {
        user_group?: USER_GROUP,
        status?: USER_ACCOUNT_STATUS,
        search?: string,
    }
}
