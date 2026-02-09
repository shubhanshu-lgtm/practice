import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateProposalPaymentTermDto {
  @IsString()
  milestoneName: string;

  @IsNumber()
  percentage: number;

  @IsString()
  @IsOptional()
  triggerEvent: string;
}

export class CreateProposalItemDto {
  @IsNumber()
  leadServiceId: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsNumber()
  @IsOptional()
  taxPercentage: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProposalPaymentTermDto)
  paymentTerms: CreateProposalPaymentTermDto[];
}

export class CreateProposalDto {
  @IsNumber()
  leadId: number;

  @IsDate()
  @Type(() => Date)
  proposalDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  validUntil: Date;

  @IsString()
  submittedBy: string;

  @IsString()
  @IsOptional()
  subject: string;

  @IsString()
  @IsOptional()
  introduction: string;

  @IsString()
  @IsOptional()
  termsAndConditions: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProposalItemDto)
  items: CreateProposalItemDto[];
}
