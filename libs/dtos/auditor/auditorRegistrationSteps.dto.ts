// import { Type } from 'class-transformer';
// import {
//   IsString,
//   IsNumber,
//   IsObject,
//   IsOptional,
//   IsArray,
//   IsEmail,
//   Min,
//   IsDateString,
//   IsNotEmpty,
// } from 'class-validator';

// // ---------------------------
// // Registration Step Wrapper
// // ---------------------------
// export class RegistrationStepDto {
//   @IsNumber()
//   auditor_id: number;

//   @IsString()
//   step: string; // 'step_one', 'step_two', 'step_three'

//   @IsObject()
//   data: Record<string, any>;
// }

// // ---------------------------
// // Step One DTO
// // ---------------------------

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


// // ---------------------------
// // Step Two DTO
// // ---------------------------

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

//   // @IsArray({ message: 'Certificates must be an array' })
//   // certificates: string[];

//   // @IsArray({ message: 'Technical areas uploads must be an array' })
//   // technical_areas: string[];
// }


// // ---------------------------
// // Step Three DTO
// // ---------------------------
// export class StepThreeDto {
//   @IsNumber()
//   auditor_id: number;

//   @IsOptional()
//   @IsArray()
//   standards?: string[];

//   @IsOptional()
//   @IsArray()
//   iaf_codes?: string[];

//   @IsOptional()
//   @IsArray()
//   nace_codes?: string[];
// }

// // ---------------------------
// // Evaluation DTO
// // ---------------------------
// export class CreateEvaluationDto {
//   @IsNumber()
//   auditor_id: number;

//   @IsString()
//   evaluated_by: number;

//   @IsObject()
//   evaluation_data: Record<string, any>;

//   remarks?: string;
// }

// // ---------------------------
// // File Upload DTO
// // ---------------------------
// // export class FileUploadDto {
// //   @IsNumber()
// //   auditor_id: number;
// //
// //   @IsString()
// //   file_type: string; // 'document' | 'evaluation' | 'certificate'
// //
// //   file: Express.Multer.File;
// // }

// // ---------------------------
// // List Auditor Two DTO
// // ---------------------------
// export class ListAuditorTwoDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsOptional()
//   @IsString({ message: 'Type must be a string' })
//   typ?: string;
// }

// // ---------------------------
// // List Auditor Three DTO
// // ---------------------------
// export class ListAuditorThreeDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsOptional()
//   @IsString({ message: 'Type must be a string' })
//   typ?: string;
// }

// // ---------------------------
// // List Auditor Four DTO
// // ---------------------------
// export class ListAuditorFourDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsOptional()
//   @IsString({ message: 'Type must be a string' })
//   typ?: string;
// }

// // ---------------------------
// // List Auditor Five DTO
// // ---------------------------
// export class ListAuditorFiveDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsOptional()
//   @IsString({ message: 'Type must be a string' })
//   typ?: string;
// }

// // ---------------------------
// // List Auditor Seven DTO
// // ---------------------------
// export class ListAuditorSevenDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsOptional()
//   @IsString({ message: 'Type must be a string' })
//   typ?: string;
// }


// // ---------------------------
// // Get Step View DTO
// // ---------------------------


// export class GetStepViewDto {
//   @IsNotEmpty({ message: 'Auditor ID is required' })
//   @Type(() => Number)
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsNotEmpty({ message: 'Step is required' })
//   @IsString({ message: 'Step must be a string' })
//   step: string;

//   @IsNotEmpty({ message: 'Type is required' })
//   @IsString({ message: 'Type must be a string' })
//   typ: string;

//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber({}, { message: 'ID must be a number' })
//   id?: number;

//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber({}, { message: 'Added by must be a number' })
//   associated_user_id?: number;
// }

// // ---------------------------
// // Save Step Request DTO
// // ---------------------------
// export class SaveStepRequestDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsString({ message: 'Step must be a string' })
//   step: string;

//   @IsObject({ message: 'Payload must be an object' })
//   payload: Record<string, any>;
// }

// // ---------------------------
// // Get Import Form DTO
// // ---------------------------
// export class GetImportFormDto {
//   @IsString({ message: 'Heading must be a string' })
//   heading: string;

//   @IsString({ message: 'Redirect URL must be a string' })
//   rurl: string;

//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsString({ message: 'Step must be a string' })
//   step: string;
// }


// // ---------------------------
// // Import DTOs
// // ---------------------------

// export class ImportEducationalQualificationDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsString({ message: 'File path must be a string' })
//   filePath: string;
// }

// export class ImportWorkExperienceDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsString({ message: 'File path must be a string' })
//   filePath: string;
// }

// export class ImportLeadAuditorTrainingDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsString({ message: 'File path must be a string' })
//   filePath: string;
// }

// export class ImportAuditExperienceDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsString({ message: 'File path must be a string' })
//   filePath: string;
// }

// export class ImportInterviewResultDto {
//   @IsNumber({}, { message: 'Auditor ID must be a number' })
//   aud_id: number;

//   @IsString({ message: 'File path must be a string' })
//   filePath: string;
// }

// // ---------------------------
// // Auditor authorisation CRUD DTOs
// // ---------------------------
// export class AuditorAuthorisationDto {
//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber()
//   audId?: number;

//   @IsString()
//   @IsNotEmpty()
//   evaluatedBy: string;

//   @IsOptional()
//   @IsString()
//   evaluatedBySign?: string;

//   @IsString()
//   @IsNotEmpty()
//   approvedBy: string;

//   @IsOptional()
//   @IsString()
//   approvedBySign?: string;

//   @IsOptional()
//   @IsDateString()
//   evaluationDate?: string;
// }

// // ---------------------------
// // Interview Result CRUD DTOs
// // ---------------------------
// export class InterviewResultDto {
//   @IsOptional()
//   @IsNumber()
//   audId?: number;

//   @IsString()
//   @IsNotEmpty()
//   auditorGrade: string;

//   @IsDateString()
//   @IsNotEmpty()
//   auditDates: string;

//   @IsNumber()
//   @IsNotEmpty()
//   resultConclution: number;

//   @IsString()
//   @IsNotEmpty()
//   interviewerName: string;

//   @IsString()
//   @IsNotEmpty()
//   comment: string;
// }
