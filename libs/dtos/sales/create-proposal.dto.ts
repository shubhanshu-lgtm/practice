import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PROPOSAL_STATUS } from '../../database/src/entities/proposal.entity';

export class CreateProposalPaymentTermDto {
  @IsString()
  @IsOptional()
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

export class UpdateProposalDto extends PartialType(CreateProposalDto) {
  @IsEnum(PROPOSAL_STATUS)
  @IsOptional()
  status?: PROPOSAL_STATUS;
}
