import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class BillToAddressDto {
  @IsString()
  addressLine1: string;

  @IsString()
  @IsOptional()
  addressLine2?: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  postalCode?: string;
}

export class BillingContactPersonDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

export class CreateClosureDto {
  @IsNumber()
  proposalId: number;

  @IsDate()
  @Type(() => Date)
  awardDate: Date;

  @IsString()
  @IsOptional()
  poNumber?: string;

  @IsString()
  @IsOptional()
  poFileUrl?: string;

  @IsBoolean()
  billingNameSameAsCustomer: boolean;

  @IsString()
  @IsOptional()
  billToCompanyName?: string;

  @ValidateNested()
  @Type(() => BillToAddressDto)
  @IsOptional()
  billToAddress?: BillToAddressDto;

  @IsString()
  @IsOptional()
  gstNumber?: string;

  @IsString()
  @IsOptional()
  gstType?: string;

  @IsArray()
  @IsOptional()
  billingEmailIds?: string[];

  @ValidateNested()
  @Type(() => BillingContactPersonDto)
  @IsOptional()
  billingContactPerson?: BillingContactPersonDto;

  @IsString()
  @IsOptional()
  raisedFromEntity?: string;

  @IsArray()
  @IsOptional()
  invoiceServices?: string[];

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateClosureDto extends PartialType(CreateClosureDto) {}
