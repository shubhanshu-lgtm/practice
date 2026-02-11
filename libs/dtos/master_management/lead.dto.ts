import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested, IsEnum, IsNumber } from 'class-validator';
import { LEAD_SOURCE, LEAD_STATUS } from '../../constants/salesConstants';
import { ADDRESS_TYPE } from '../../../libs/constants/autenticationConstants/userContants';

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
}
