import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsNotEmpty, IsIn } from 'class-validator';

/**
 * DTO for creating a new education area
 */
export class CreateEducationAreaDto {
  @IsOptional()
  @IsString({ message: 'TC code must be a string' })
  tcCode?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Standard ID must be a number' })
  @IsNotEmpty({ message: 'Standard ID is required' })
  standardId: number;

  @Type(() => Number)
  @IsIn([0, 1], { message: 'Is education must be 0 (No) or 1 (Yes)' })
  @IsOptional()
  isEducation?: number;

  @Type(() => Number)
  @IsIn([0, 1], { message: 'Is work must be 0 (No) or 1 (Yes)' })
  @IsOptional()
  isWork?: number;

  @IsString({ message: 'Area name must be a string' })
  @IsNotEmpty({ message: 'Area name is required' })
  areaName: string;
}

/**
 * DTO for updating an existing education area
 */
export class UpdateEducationAreaDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'ID must be a number' })
  @IsNotEmpty({ message: 'ID is required' })
  id: number;

  @IsOptional()
  @IsString({ message: 'TC code must be a string' })
  tcCode?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'Standard ID must be a number' })
  standardId?: number;

  @Type(() => Number)
  @IsIn([0, 1], { message: 'Is education must be 0 (No) or 1 (Yes)' })
  @IsOptional()
  isEducation?: number;

  @Type(() => Number)
  @IsIn([0, 1], { message: 'Is work must be 0 (No) or 1 (Yes)' })
  @IsOptional()
  isWork?: number;

  @IsOptional()
  @IsString({ message: 'Area name must be a string' })
  areaName?: string;
}

/**
 * DTO for getting education area by ID
 */
export class GetEducationAreaDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'ID must be a number' })
  @IsNotEmpty({ message: 'ID is required' })
  id: number;
}

/**
 * DTO for getting education areas by standard
 */
export class GetEducationAreasByStandardDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'Standard ID must be a number' })
  @IsNotEmpty({ message: 'Standard ID is required' })
  standardId: number;
}

/**
 * DTO for deleting education area
 */
export class DeleteEducationAreaDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'ID must be a number' })
  @IsNotEmpty({ message: 'ID is required' })
  id: number;
}

/**
 * DTO for filtering education areas by type
 */
export class FilterEducationAreasDto {
  @IsOptional()
  @IsIn(['education', 'work', 'all'], { message: 'Type must be education, work, or all' })
  type?: 'education' | 'work' | 'all';
}

/**
 * DTO for data table search functionality
 */
export class EducationAreaSearchDto {
  @IsOptional()
  @IsString({ message: 'Search value must be a string' })
  value?: string;
}

/**
 * DTO for education area list request with pagination
 */
export class EducationAreaListRequestDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'Draw must be a number' })
  draw?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'Start must be a number' })
  start?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'Length must be a number' })
  length?: number;

  @IsOptional()
  @IsString({ message: 'Search area name must be a string' })
  areaName?: string;

  @IsOptional()
  @IsString({ message: 'Search TC code must be a string' })
  tcCode?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'Standard ID must be a number' })
  standardId?: number;

  @Type(() => Number)
  @IsIn([0, 1], { message: 'Is education must be 0 (No) or 1 (Yes)' })
  @IsOptional()
  isEducation?: number;

  @Type(() => Number)
  @IsIn([0, 1], { message: 'Is work must be 0 (No) or 1 (Yes)' })
  @IsOptional()
  isWork?: number;
}
