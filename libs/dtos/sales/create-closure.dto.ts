import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateClosureDto {
  @IsUUID()
  proposalId: string;

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

  @IsObject()
  @IsOptional()
  billToAddress?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
  };

  @IsString()
  @IsOptional()
  gstNumber?: string;

  @IsString()
  @IsOptional()
  gstType?: string;

  @IsArray()
  @IsOptional()
  billingEmailIds?: string[];

  @IsObject()
  @IsOptional()
  billingContactPerson?: {
    name: string;
    email: string;
    phone?: string;
  };

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
