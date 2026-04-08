// import { IsString, IsEmail, IsNumber, IsArray, IsOptional, Min, IsDateString } from 'class-validator';
// import { FileUpload } from '../../../libs/interfaces/commonTypes/custom.interface';

// export class StepOneDto {
//   @IsString({ message: 'Auditor name must be a string' })
//   auditor_name: string;

//   @IsString({ message: 'Organization must be a string' })
//   auditor_organization: string;

//   @IsString({ message: 'Nationality must be a string' })
//   auditor_nationality: string;

//   @IsString({ message: 'Registration number must be a string' })
//   registration_no: string;

//   @IsEmail({}, { message: 'Please provide a valid email' })
//   auditor_emailID: string;

//   @IsNumber({}, { message: 'Country ID must be a number' })
//   @Min(1)
//   pcountry_id: number;

//   @IsOptional()
//   @IsNumber({}, { message: 'State ID must be a number' })
//   state_id?: number;

//   @IsOptional()
//   @IsNumber({}, { message: 'City ID must be a number' })
//   city_id?: number;

//   @IsString({ message: 'Status must be a string' })
//   auditor_status: string;

//   @IsString({ message: 'Grade must be a string' })
//   grade: string;

//   @IsString({ message: 'Address must be a string' })
//   auditor_address: string;

//   @IsArray({ message: 'Standards must be an array' })
//   auditor_standards: number[];

//   @IsNumber({}, { message: 'Associated user ID must be a number' })
//   @Min(1)
//   associated_user_id: number;

//   @IsOptional()
//   @IsNumber({}, { message: 'Pin code must be a number' })
//   pin_code?: number;

//   @IsOptional()
//   @IsString({ message: 'Mobile number must be a string' })
//   auditor_mobile_no?: string;

//   @IsOptional()
//   @IsString({ message: 'Password must be a string' })
//   auditor_password?: string;

//   @IsOptional()
//   @IsString({ message: 'Signature image path must be a string' })
//   signature_image?: string;

//   @IsOptional()
//   @IsString({ message: 'AU number must be a string' })
//   au_number?: string;
// }


// export class EducationalQualificationDto {
//   @IsString({ message: 'Educational qualification must be a string' })
//   educational_qualification: string;

//   @IsString({ message: 'Qualification field must be a string' })
//   qualification_field: string;

//   @IsOptional()
//   @IsString({ message: 'Duration of education must be a string' })
//   duration_of_education?: string;

//   @IsDateString({}, { message: 'Date of start must be a valid date' })
//   date_of_start: string;

//   @IsDateString({}, { message: 'Date of completion must be a valid date' })
//   date_of_completion: string;

//   @IsString({ message: 'University name must be a string' })
//   name_of_the_university: string;

//   @IsOptional()
//   @IsString({ message: 'Upload file must be a string' })
//   education_qualification_uploads?: string;

//   @IsOptional()
//   @IsString({ message: 'Certificate file must be a string' })
//   certificate_file?: string;

//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   technical_codes?: string[];

//   @IsOptional()
//   @IsArray()
//   @IsNumber({}, { each: true })
//   technical_durations?: number[];
// }

// export class WorkExperienceDto {
//   @IsString({ message: 'Organization name must be a string' })
//   name_of_the_organization: string;

//   @IsDateString({}, { message: 'Duration from must be a valid date' })
//   duration_from: string;

//   @IsDateString({}, { message: 'Duration to must be a valid date' })
//   duration_to: string;

//   @IsString({ message: 'Position must be a string' })
//   position: string;

//   @IsString({ message: 'Process of organization must be a string' })
//   process_of_the_organization: string;

//   @IsString({ message: 'Role in management must be a string' })
//   role_in_management: string;

//   @IsOptional()
//   @IsString({ message: 'Work experience upload must be a string' })
//   work_experience_uploads?: string;

//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   technical_codes?: string[];

//   @IsOptional()
//   @IsArray()
//   @IsNumber({}, { each: true })
//   technical_durations?: number[];
// }

// export class StepTwoDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   @Min(1)
//   auditor_id: number;

//   @IsArray({ message: 'Educational qualifications must be an array' })
//   educational_qualification: EducationalQualificationDto[];

//   @IsArray({ message: 'Work experiences must be an array' })
//   work_experience: WorkExperienceDto[];
// }


// export class TrainingCertificateDto {
//   @IsNumber({}, { message: 'Training standard ID must be a number' })
//   training_standard: number;

//   @IsString({ message: 'Training period must be a string' })
//   training_period: string;

//   @IsString({ message: 'Training provider must be a string' })
//   training_provider: string;

//   @IsString({ message: 'Certificate number must be a string' })
//   certificate_no: string;

//   @IsOptional()
//   @IsDateString({}, { message: 'Certificate date must be a valid date' })
//   certificate_date?: string;
// }

// export class AuditExperienceDto {
//   @IsNumber({}, { message: 'Audit standard ID must be a number' })
//   audit_exp_standard: number;

//   @IsString({ message: 'Name of auditee must be a string' })
//   name_of_the_auditee: string;

//   @IsDateString({}, { message: 'Audit start date must be a valid date' })
//   audit_dates_from: string;

//   @IsDateString({}, { message: 'Audit end date must be a valid date' })
//   audit_dates_to: string;

//   @IsNumber({}, { message: 'Man days must be a number' })
//   man_days: number;

//   @IsString({ message: 'Audit type must be a string' })
//   audit_type: string;

//   @IsString({ message: 'Audit role must be a string' })
//   audit_role: string;

//   @IsOptional()
//   @IsString({ message: 'Technical area must be a string' })
//   tech_area?: string;

//   @IsString({ message: 'Process of auditee must be a string' })
//   process_of_the_auditee: string;
// }

// export class StepThreeDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   @Min(1)
//   auditor_id: number;

//   @IsArray({ message: 'Training certificates must be an array' })
//   training_certificates: TrainingCertificateDto[];

//   @IsArray({ message: 'Audit experiences must be an array' })
//   audit_experiences: AuditExperienceDto[];
// }


// export class FileUploadDto {
//   auditor_id: number;
//   file_type: string; // 'document' | 'evaluation' | 'certificate'
//   file: FileUpload;
// }
