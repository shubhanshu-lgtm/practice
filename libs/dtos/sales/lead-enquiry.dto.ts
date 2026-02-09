import { IsString, IsEmail, IsOptional, IsArray, ValidateNested, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLeadContactDto {
  @IsString()
  contactName: string;

  @IsOptional()
  @IsString()
  designation: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsBoolean()
  isPrimary: boolean = false;
}

export class CreateLeadAddressDto {
  @IsString()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  postalCode: string;

  @IsOptional()
  @IsString()
  addressType: string; // Head Office, Branch, Billing, Shipping
}

export class CreateLeadEnquiryDto {
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  enquiryReference: string;

  @IsString()
  leadSource: string; // Google Ads, LinkedIn, Website, etc.

  @IsOptional()
  @IsString()
  sourceDescription: string;

  @IsOptional()
  @IsString()
  businessActivities: string;

  @IsOptional()
  @IsString()
  headcount: string; // 1-10, 11-50, etc.

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLeadContactDto)
  contacts: CreateLeadContactDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLeadAddressDto)
  addresses: CreateLeadAddressDto[];

  @IsOptional()
  @IsString()
  notes: string;
}

export class UpdateLeadEnquiryDto {
  @IsOptional()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  leadSource: string;

  @IsOptional()
  @IsString()
  businessActivities: string;

  @IsOptional()
  @IsString()
  headcount: string;

  @IsOptional()
  @IsString()
  leadStatus: string;

  @IsOptional()
  @IsString()
  notes: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLeadContactDto)
  contacts: CreateLeadContactDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLeadAddressDto)
  addresses: CreateLeadAddressDto[];
}
