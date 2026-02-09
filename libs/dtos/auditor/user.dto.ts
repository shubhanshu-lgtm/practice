import { IsNumber, Min, IsOptional, IsString, IsIn } from 'class-validator'
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


export class AuditorFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ACTIVE', 'INACTIVE', 'PENDING', 'EXTERNAL', 'INTERNAL', 'FULL_TIME_INTERNAL' ])
  status?: string;

  @IsOptional()
  @IsString()
  organization?: string;
  
  @IsOptional()
  @IsString()
  startDate?: string;
  
  @IsOptional()
  @IsString()
  endDate?: string;

}
export class ListAuditorsQueryDto {
/**
 * DTO for listing auditors with pagination and filtering
 */

  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;

  @IsOptional()
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(1, { message: 'Limit must be at least 1' })
  limit?: number = 10;

  @IsOptional()
  @IsString({ message: 'Search term must be a string' })
  search?: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string;

  @IsOptional()
  @IsString({ message: 'Organization must be a string' })
  organization?: string;



}