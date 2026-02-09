import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { USER_ACCOUNT_STATUS } from '../../constants/autenticationConstants/userContants';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsEnum(USER_ACCOUNT_STATUS)
  status?: USER_ACCOUNT_STATUS;
}

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsEnum(USER_ACCOUNT_STATUS)
  status?: USER_ACCOUNT_STATUS;
}

export class UpdateDepartmentStatusDto {
  @IsEnum(USER_ACCOUNT_STATUS)
  status: USER_ACCOUNT_STATUS;
}
