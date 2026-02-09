
import { Type } from 'class-transformer';
 import { IsString, IsNumber, IsObject, IsOptional, IsArray, IsEmail, Min, IsDate, IsNotEmpty, IsIn } from 'class-validator'; 
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

// =============================================
// LISTING & QUERY DTOs
// =============================================

/**
 * DTO for querying auditors with pagination and filtering
 */
export class ListAuditorsQueryDto {
  @ApiPropertyOptional({ description: 'Page number (1-based)', default: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number ;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
  @IsOptional()
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(1, { message: 'Limit must be at least 1' })
  limit?: number;

  @ApiPropertyOptional({ description: 'Search term for filtering auditors' })
  @IsOptional()
  @IsString({ message: 'Search term must be a string' })
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by auditor status' })
  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string;

  @ApiPropertyOptional({ description: 'Filter by organization' })
  @IsOptional()
  @IsString({ message: 'Organization must be a string' })
  organization?: string;
}

// =============================================
// AUDITOR STATUS & MANAGEMENT DTOs
// =============================================

/**
 * DTO for changing auditor status (active/inactive)
 */
export class AuditorChangeStatusDto {
  @IsNumber({}, { message: 'Auditor ID must be a number' })
  @Min(1)
  auditor_id: number;

  @IsNumber({}, { message: 'Status must be a number' })
  @Min(0)
  status: number;
}

/**
 * DTO for updating auditor information
 */
export class AuditorUpdateDto {
  @IsOptional()
  @IsString({ message: 'Auditor name must be a string' })
  auditor_name?: string;

  @IsOptional()
  @IsString({ message: 'Email must be a valid string' })
  auditor_emailID?: string;

  @IsOptional()
  @IsString({ message: 'Mobile number must be a string' })
  auditor_mobile_no?: string;

  @IsOptional()
  @IsString({ message: 'Organization must be a string' })
  auditor_organization?: string;

  @IsOptional()
  @IsString({ message: 'Nationality must be a string' })
  auditor_nationality?: string;

  @IsOptional()
  @IsString({ message: 'Registration number must be a string' })
  registration_no?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Country ID must be a number' })
  pcountry_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'State ID must be a number' })
  @Type(() => Number)
  state_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'City ID must be a number' })
  @Type(() => Number)
  city_id?: number;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  auditor_address?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Pin code must be a number' })
  pin_code?: number;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  auditor_status?: string;

  @IsOptional()
  @IsString({ message: 'Grade must be a string' })
  grade?: string;

  @IsOptional()
  @IsArray({ message: 'Standards must be an array' })
  auditor_standards?: number[];

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  auditor_password?: string;

  @IsOptional()
  @IsString({ message: 'Signature image must be a string' })
  signature_image?: string;

  @IsOptional()
  @IsString({ message: 'AU number must be a string' })
  au_number?: string;
}

/**
 * DTO for DataTable listing request with filters and sorting
 */
export class DataTableRequestDto {
  @IsOptional()
  @IsNumber({}, { message: 'Draw must be a number' })
  draw?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Start must be a number' })
  start?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Length must be a number' })
  length?: number;

  @IsOptional()
  @IsObject()
  search?: { value: string };

  @IsOptional()
  @IsArray()
  order?: Array<{ column: number; dir: string }>;

  @IsOptional()
  @IsString({ message: 'First name filter must be a string' })
  fname?: string;

  @IsOptional()
  @IsString({ message: 'Company filter must be a string' })
  company?: string;

  @IsOptional()
  @IsString({ message: 'Search name must be a string' })
  searchname?: string;
}

/**
 * DTO for evaluation form request
 */
export class EvaluationFormRequestDto {
  @IsNumber({}, { message: 'Auditor ID must be a number' })
  @Min(1)
  id: number;

  @IsString({ message: 'Type must be a string' })
  typ: string;
}

/**
 * DTO for updating master settings
 */
export class UpdateMasterSettingDto {
  @IsOptional()
  @IsNumber({}, { message: 'Max file size must be a number' })
  max_file_size?: number;

  @IsOptional()
  @IsArray({ message: 'Allowed file types must be an array' })
  allowed_file_types?: string[];

  @IsOptional()
  @IsArray({ message: 'Standards must be an array' })
  standards?: any[];

  @IsOptional()
  @IsArray({ message: 'Countries must be an array' })
  countries?: any[];

  @IsOptional()
  @IsArray({ message: 'States must be an array' })
  states?: any[];

  @IsOptional()
  @IsArray({ message: 'Cities must be an array' })
  cities?: any[];

  @IsOptional()
  @IsArray({ message: 'Auditor grades must be an array' })
  auditor_grades?: any[];

  @IsOptional()
  @IsArray({ message: 'Auditor status types must be an array' })
  auditor_status_types?: any[];

  @IsOptional()
  @IsArray({ message: 'Evaluation standards must be an array' })
  evaluation_standards?: any[];

  @IsOptional()
  @IsNumber({}, { message: 'Min work experience months must be a number' })
  min_work_experience_months?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Min audit experience days must be a number' })
  min_audit_experience_days?: number;
}

/**
 * DTO for auditor activity request
 */
export class AuditorActivityRequestDto {
  @IsNumber({}, { message: 'Auditor ID must be a number' })
  auditor_id: number;
}

//update All Educational, Workexperience dto, AuditExperience dto, LeadAuditorTraining dto details
// ---------------------------
// CRUD DTOs for Related Data
// ---------------------------

/**
 * DTO for creating/updating educational qualification
 */
export class EducationalQualificationDto {
  @IsOptional()
  @IsString({ message: 'Educational qualification must be a string' })
  educational_qualification?: string;

  @IsOptional()
  @IsString({ message: 'Qualification field must be a string' })
  qualification_field?: string;

  @IsOptional()
  @IsString({ message: 'Date of completion must be a valid date string' })
  date_of_completion?: string;

  @IsOptional()
  @IsString({ message: 'Date of start must be a valid date string' })
  date_of_start?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Duration must be a number' })
  duration?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Months must be a number' })
  months?: number;

  @IsOptional()
  @IsString({ message: 'Name of university must be a string' })
  name_of_the_university?: string;

  @IsOptional()
  @IsString({ message: 'Certificate file must be a string' })
  certificate_file?: string;

  @IsOptional()
  @IsString({ message: 'Education area must be a string' })
  education_area?: string;

  @IsOptional()
  @IsIn([0, 1], { message: 'Standard allow must be 0 (No) or 1 (Yes)' })
  @Transform(({ value }) => {
    // Handle string "yes"/"no" or boolean values
    if (typeof value === 'string') {
      return value.toLowerCase() === 'yes' || value === '1' ? 1 : 0;
    }
    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }
    return value ? 1 : 0;
  })
  standard_allow?: number;

  @IsOptional()
  @IsString({ message: 'Education qualification uploads must be a string' })
  education_qualification_uploads?: string;
}

/**
 * DTO for creating/updating work experience
 */
export class WorkExperienceDto {
  @IsOptional()
  @IsString({ message: 'Name of organization must be a string' })
  name_of_the_organization?: string;

  @IsOptional()
  @IsString({ message: 'Duration from must be a valid date string' })
  duration_form?: string;

  @IsOptional()
  @IsString({ message: 'Duration to must be a valid date string' })
  duration_to?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Duration must be a number' })
  duration?: number;

  @IsOptional()
  @IsString({ message: 'Position must be a string' })
  position?: string;

  @IsOptional()
  @IsString({ message: 'Process of organization must be a string' })
  process_of_the_organization?: string;

  @IsOptional()
  @IsString({ message: 'Role in management must be a string' })
  role_in_management?: string;

  @IsOptional()
  @IsString({ message: 'Work experience uploads must be a string' })
  work_experience_uploads?: string;

  @IsOptional()
  @IsString({ message: 'Education area must be a string' })
  education_area?: string;

  @IsOptional()
  @IsString({ message: 'Technical code must be a string' })
  tc_code?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: 'Each technical code must be a string' })
  technical_codes?: string[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true, message: 'Each duration must be a number' })
  technical_durations?: number[];

  @IsOptional()
  @IsString({ message: 'Standard must be a string' })
  standard?: string;

  @IsOptional()
  @IsIn([0, 1], { message: 'Standard allow must be 0 (No) or 1 (Yes)' })
  @Transform(({ value }) => {
    // Handle string "yes"/"no" or boolean values
    if (typeof value === 'string') {
      return value.toLowerCase() === 'yes' || value === '1' ? 1 : 0;
    }
    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }
    return value ? 1 : 0;
  })
  standard_allow?: number;
}

/**
 * DTO for creating/updating lead auditor training
 */
export class LeadAuditorTrainingDto {
  @IsOptional()
  @IsString({ message: 'Training standard must be a string' })
  training_standard?: string;

  @IsOptional()
  @IsString({ message: 'Training period must be a string' })
  training_period?: string;

  @IsOptional()
  @IsString({ message: 'Training provider must be a string' })
  training_provider?: string;

  @IsOptional()
  @IsString({ message: 'Certificate number must be a string' })
  certificate_no?: string;

  @IsOptional()
  @IsString({ message: 'Certificate date must be a valid date string' })
  certificate_date?: string;

  @IsOptional()
  @IsString({ message: 'Lead auditor uploads must be a string' })
  lead_auditor_uploads?: string;

  @IsOptional()
  @IsString({ message: 'Code must be a string' })
  code?: string;
}

/**
 * DTO for creating/updating audit experience
 */
export class AuditExperienceDto {
  @IsOptional()
  @IsString({ message: 'Audit experience standard must be a string' })
  audit_exp_standatd?: string;

  @IsOptional()
  @IsString({ message: 'Name of auditee must be a string' })
  name_of_the_auditee?: string;

  @IsOptional()
  @IsString({ message: 'Audit dates from must be a valid date string' })
  audit_dates_form?: string;

  @IsOptional()
  @IsString({ message: 'Audit dates to must be a valid date string' })
  audit_dates_to?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Man days must be a number' })
  man_days?: number;

  @IsOptional()
  @IsString({ message: 'Audit type must be a string' })
  audit_type?: string;

  @IsOptional()
  @IsString({ message: 'Audit role must be a string' })
  audit_role?: string;

  @IsOptional()
  @IsString({ message: 'Technical area must be a string' })
  tech_area?: string;

  @IsOptional()
  @IsString({ message: 'Process of auditee must be a string' })
  process_of_auditee?: string;

  @IsOptional()
  @IsString({ message: 'Code must be a string' })
  code?: string;
}

/**
 * DTO for ID parameter
 */
export class IdParamDto {
  @IsNumber({}, { message: 'ID must be a number' })
  id: number;
}
