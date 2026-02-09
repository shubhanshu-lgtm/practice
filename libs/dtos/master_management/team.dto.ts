import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  departmentId: number;

  @IsOptional()
  @IsNumber()
  teamLeadId?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsNumber()
  teamLeadId?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
