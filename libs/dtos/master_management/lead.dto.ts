import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested, IsEnum, IsNumber, IsObject, Min, Max, IsDateString } from 'class-validator';
import { LEAD_SOURCE, LEAD_STATUS, SOCIAL_MEDIA_PLATFORM } from '../../constants/salesConstants';
import { SERVICE_TYPE, SERVICE_ACCESS_LEVEL, CATEGORY_TYPE, SERVICE_STATUS } from '../../constants/serviceConstants';
import { ADDRESS_TYPE, USER_GROUP } from '../../../libs/constants/autenticationConstants/userContants';
import { PERMISSIONS } from '../../constants/autenticationConstants/permissionManagerConstants';
import { FOLLOWUP_TYPE, FOLLOWUP_PRIORITY } from '../../database/src/entities/lead-followup.entity';


export class PermissionActionDto {
  @IsBoolean()
  [PERMISSIONS.ADD]: boolean;

  @IsBoolean()
  [PERMISSIONS.READ]: boolean;

  @IsBoolean()
  [PERMISSIONS.UPDATE]: boolean;

  @IsBoolean()
  [PERMISSIONS.DELETE]: boolean;
}

export class PermissionModuleDto {
  @IsNumber()
  module: number;

  @IsObject()
  @ValidateNested()
  @Type(() => PermissionActionDto)
  action: PermissionActionDto;
}

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @IsEnum(USER_GROUP)
  user_group: USER_GROUP;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionModuleDto)
  permissions: PermissionModuleDto[];
}

export class GetPermissionDto {
  @IsOptional()
  @IsString()
  roleName?: string;

  @IsOptional()
  @IsEnum(USER_GROUP)
  user_group?: USER_GROUP;
}

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  businessActivities?: string;

  @IsOptional()
  @IsString()
  headcount?: string;
}

export class CreateCustomerAddressDto {
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsEnum(ADDRESS_TYPE)
  addressType?: ADDRESS_TYPE;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class CreateCustomerContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNo: string;

  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class CreateLeadDto {
  @IsOptional()
  @IsString()
  enquiryReference?: string;

  @IsEnum(LEAD_SOURCE)
  @IsNotEmpty()
  source: LEAD_SOURCE;

  @IsOptional()
  @IsString()
  sourceDescription?: string;

  @IsOptional()
  @IsString()
  sourceDetail?: string;

  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsNumber()
  customerId?: number;

  @IsOptional()
  @IsArray()
  serviceIds?: number[];

  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateCustomerAddressDto)
  addresses: CreateCustomerAddressDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateCustomerContactDto)
  contacts: CreateCustomerContactDto[];

  @Type(() => Number)
  @IsOptional()
  createdBy?: number;
}

export class UpdateLeadDto {
  @IsOptional()
  @IsString()
  enquiryReference?: string;

  @IsOptional()
  @IsEnum(LEAD_SOURCE)
  source?: LEAD_SOURCE;

  @IsOptional()
  @IsString()
  sourceDescription?: string;

  @IsOptional()
  @IsString()
  sourceDetail?: string;

  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;

  @IsOptional()
  @IsEnum(LEAD_STATUS)
  status?: LEAD_STATUS;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsArray()
  serviceIds?: number[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer?: CreateCustomerDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCustomerAddressDto)
  addresses?: CreateCustomerAddressDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCustomerContactDto)
  contacts?: CreateCustomerContactDto[];
}

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  service_category?: string;

  @IsOptional()
  @IsEnum(SERVICE_TYPE)
  type?: SERVICE_TYPE;

  @IsOptional()
  @IsEnum(SERVICE_ACCESS_LEVEL)
  accessLevel?: SERVICE_ACCESS_LEVEL;

  @IsOptional()
  @IsArray()
  allowedUserGroups?: string[];

  @IsOptional()
  @IsArray()
  allowedDepartments?: number[];

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsString()
  logo?: string;
}

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  service_category?: string;

  @IsOptional()
  @IsEnum(SERVICE_TYPE)
  type?: SERVICE_TYPE;

  @IsOptional()
  @IsEnum(SERVICE_ACCESS_LEVEL)
  accessLevel?: SERVICE_ACCESS_LEVEL;

  @IsOptional()
  @IsArray()
  allowedUserGroups?: string[];

  @IsOptional()
  @IsArray()
  allowedDepartments?: number[];

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsString()
  logo?: string;
}

export class GetServicesFilterDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsBoolean()
  includeChildren?: boolean;

  @IsOptional()
  @IsBoolean()
  rootOnly?: boolean;

  @IsOptional()
  @IsString()
  userGroup?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  pageSize?: number = 20;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  draw?: number;
}

export class CreateDeliverableDto {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  deliverables?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class UpdateDeliverableDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  deliverables?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class ServiceAssignmentDto {
  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  deliverables?: string[];

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsNumber()
  ownerId?: number;

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsEnum(SERVICE_STATUS)
  status?: SERVICE_STATUS;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class AssignServicesToLeadDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceAssignmentDto)
  services: ServiceAssignmentDto[];
}

export class PaginationDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  pageSize: number = 20;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  draw?: number;
}

// follow-up related DTOs
export class CreateLeadFollowUpDto {
  @IsOptional()
  @IsEnum(FOLLOWUP_TYPE)
  type?: FOLLOWUP_TYPE;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsDateString()
  followUpDate?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @IsOptional()
  @IsEnum(FOLLOWUP_PRIORITY)
  priority?: FOLLOWUP_PRIORITY;

  @IsOptional()
  @IsString()
  outcome?: string;

  @IsOptional()
  @IsString()
  nextAction?: string;
}

export class UpdateLeadFollowUpDto {
  @IsOptional()
  @IsEnum(FOLLOWUP_TYPE)
  type?: FOLLOWUP_TYPE;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  followUpDate?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @IsOptional()
  @IsEnum(FOLLOWUP_PRIORITY)
  priority?: FOLLOWUP_PRIORITY;

  @IsOptional()
  @IsString()
  outcome?: string;

  @IsOptional()
  @IsString()
  nextAction?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class GetAssignedServicesFilterDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  serviceId?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  leadId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  pageSize?: number = 20;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  draw?: number;
}

export class DropLeadDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class GetLeadFollowUpsDto {
  @IsOptional()
  @IsEnum(FOLLOWUP_TYPE)
  type?: FOLLOWUP_TYPE;

  @IsOptional()
  @IsEnum(FOLLOWUP_PRIORITY)
  priority?: FOLLOWUP_PRIORITY;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  pageSize?: number = 20;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  draw?: number;
}

export class RollbackLeadDto {
  @IsString()
  @IsOptional()
  reason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}





