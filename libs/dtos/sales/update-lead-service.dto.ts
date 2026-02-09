import { IsNumber, IsOptional, IsObject, IsString } from 'class-validator';

export class UpdateLeadServiceDetailsDto {
  @IsOptional()
  @IsObject()
  deliverables?: Record<string, any>;

  @IsOptional()
  @IsString()
  timeline?: string;

  @IsOptional()
  @IsString()
  accreditationBody?: string;

  @IsOptional()
  @IsNumber()
  fees?: number;
}
