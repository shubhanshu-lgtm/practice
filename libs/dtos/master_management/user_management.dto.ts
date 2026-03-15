import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { USER_GROUP } from '../../constants/autenticationConstants/userContants';

export class DataTableSearchDto {
  @IsOptional()
  @IsString()
  value?: string;
}

export class MasterUserListRequestDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  draw?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  start?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  length?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => DataTableSearchDto)
  search?: DataTableSearchDto;

  @IsOptional()
  @IsString()
  searchname?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  user_type?: number;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsEnum(USER_GROUP)
  user_group?: USER_GROUP;

  @IsOptional()
  @IsArray()
  modules?: number[];

  @IsOptional()
  @IsArray()
  departments?: number[];

  @IsOptional()
  @IsArray()
  teams?: number[];
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsEnum(USER_GROUP)
  user_group?: USER_GROUP;

  @IsOptional()
  @IsArray()
  modules?: number[];

  @IsOptional()
  @IsArray()
  departments?: number[];

  @IsOptional()
  @IsArray()
  teams?: number[];
}

export class UpdateUserGroupDto {
  @IsEnum(USER_GROUP)
  user_group: USER_GROUP;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
