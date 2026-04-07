import { IsString, IsOptional, IsNumber, IsEmail, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize?: number;

}

export class CreatePartnerUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  active?: number; // 0 for Inactive, 1 for Active

  @IsOptional()
  @IsNumber()
  auditorCount?: number;

  @IsOptional()
  @IsString()
  status?: string; // e.g., 'Active', 'Inactive'
}

export class UpdatePartnerUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  active?: number;

  @IsOptional()
  @IsNumber()
  auditorCount?: number;

  @IsOptional()
  @IsString()
  status?: string;
}

export class GetPartnerUserFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  active?: number; // 0 or 1
}

export class PartnerUserResponseDto {
  id: number;
  username?: string;
  name: string;
  email: string;
  company?: string;
  mobile?: string;
  city?: string;
  state?: string;
  country?: string;
  active?: number;
  auditorCount?: number;
  status?: string;
}
