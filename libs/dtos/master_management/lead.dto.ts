import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested, IsEnum, IsNumber, IsObject } from 'class-validator';
import { LEAD_SOURCE, LEAD_STATUS } from '../../constants/salesConstants';
import { SERVICE_TYPE, SERVICE_ACCESS_LEVEL } from '../../constants/serviceConstants';
import { ADDRESS_TYPE, USER_GROUP } from '../../../libs/constants/autenticationConstants/userContants';
import { PERMISSIONS } from '../../constants/autenticationConstants/permissionManagerConstants';

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
  @IsEnum(LEAD_STATUS)
  status?: LEAD_STATUS;

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

  @IsString()
  @IsNotEmpty()
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
}

export class AssignServicesToLeadDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceAssignmentDto)
  services: ServiceAssignmentDto[];
}
