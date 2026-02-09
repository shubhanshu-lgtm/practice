import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { USER_ACCOUNT_STATUS } from '../../constants/autenticationConstants/userContants';

export class CreateSystemModuleDto {
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

export class UpdateSystemModuleDto {
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

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  moduleId: number;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsEnum(USER_ACCOUNT_STATUS)
  status?: USER_ACCOUNT_STATUS;
}

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  moduleId?: number;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsEnum(USER_ACCOUNT_STATUS)
  status?: USER_ACCOUNT_STATUS;
}

export class UpdateMenuStatusDto {
  @IsEnum(USER_ACCOUNT_STATUS)
  status: USER_ACCOUNT_STATUS;
}
