import { IsString, IsEmail, IsNumber, Min, Max, Matches, IsOptional, IsNotEmpty, MinLength, IsEnum, isEmail, IsInt, IsBoolean, ValidateIf, Length } from 'class-validator';
import { DEFAULT_USER_ROLES, LOGIN_BY, USER_ACCOUNT_STATUS, USER_CASTE_CATEGORY, USER_GROUP } from '../../constants/autenticationConstants/userContants';
import { DEVICE_TYPE } from '../../constants/commonConstants';
import { Type } from 'class-transformer';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  identity: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  countryCode: string;
}

export class UserQueryDto {
  @IsOptional()
  @IsString()
  user_group?: USER_GROUP;

  @IsOptional()
  @IsInt()
  @Min(1)
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}
export class UserFilterDto {
  @IsOptional()
  @IsEnum(USER_GROUP)
  user_group: USER_GROUP; // Make status optional

  @IsOptional()
  @IsString()
  search: string; // To search by name, email, or phone number

  @IsOptional()
  @IsEnum(USER_ACCOUNT_STATUS)
  status: USER_ACCOUNT_STATUS;
}

export class notificationData {

  @IsString()
  @IsOptional()
  fcmToken: string;

  @IsString()
  @IsOptional()
  deviceType: DEVICE_TYPE

}
// loginOrRegister.dto.ts
export class LoginOrRegisterDto {
  @IsString()
  identity: string;

  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsEnum(USER_GROUP)
  user_group: USER_GROUP;

}

export class AddUpdateRolesAndPermissions {
  @IsEnum(DEFAULT_USER_ROLES)
  roleName: DEFAULT_USER_ROLES;

  @IsEnum(USER_GROUP)
  user_group: USER_GROUP

  @IsBoolean()
  isUpdate: boolean
}


// verify.dto.ts
export class VerifyDto {
  @IsString()
  @MinLength(6, { message: 'OTP must be at least 6 characters long' })
  otp: string;

  @IsNumber()
  referenceId: number;

  @IsString()
  @IsOptional()
  deviceType: DEVICE_TYPE
}

// addEmail.dto.ts
export class AddEmailDto {
  @IsEmail()
  email: string;
}

// addPhone.dto.ts
export class AddPhoneDto {
  @IsString()
  phoneNo: string;

  @IsString()
  countryCode: string;
}

// verifyPhoneNo.dto.ts
export class VerifyPhoneNoDto {
  @IsNumber()
  referenceId: number;

  @IsString()
  @Matches(/^\d{6}$/)
  otp: string;
}

// updatePersonalDetail.dto.ts
export class UpdatePersonalDetailDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  firstName: string

  @IsOptional()
  @IsString()
  lastName: string

  @IsOptional()
  @IsString()
  countryCode: string

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  avatar: string;

}

// renewToken.dto.ts
export class RenewTokenDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

// changePassword.dto.ts
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Old password is required' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'New password is required' })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  readonly otp: string;

  @IsString()
  @IsNotEmpty()
  referenceId: number;


  @IsString()
  @IsOptional()
  deviceType: DEVICE_TYPE

}

// registerWithEmailPassword.dto.ts
export class RegisterWithEmailPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^.{4,16}$/)
  password: string;

  @IsString()
  @Matches(/^.{2,50}$/)
  name: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // userRole: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(USER_GROUP)
  @IsOptional()
  user_group: USER_GROUP;
}

export class CustomLoginDto {

  @IsOptional()
  @IsString()
  // @Matches(/^.{2,50}$/)
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phoneNo: string;

  @IsOptional()
  @IsString()
  countryCode: string;

  @IsOptional()
  @IsString()
  verifyBy: LOGIN_BY
}

export class ArtisanRegisterDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  countryCode: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits long' })
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits' })
  phoneNo: string;
}

export class EmployeeRegisterDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  countryCode: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits long' })
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits' })
  phoneNo: string;
}

export class SimpleEmployeeDto {
    @IsOptional()
    @IsString()
    identity?: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsNotEmpty({ message: 'Phone number is required' })
    @IsString()
    @Length(10, 10, { message: 'Phone number must be exactly 10 digits long' })
    @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits' })
    phoneNo: string;

    @IsNotEmpty()
    @IsEnum(USER_GROUP)
    user_group: USER_GROUP;

    @IsNotEmpty()
    @IsString()
    countryCode: string;

    @IsOptional()
    @IsString()
    name?: string;
}

