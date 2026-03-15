import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested, Min, Max } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PROPOSAL_STATUS, PROPOSAL_DIVISION, SUBMITTED_BY } from '../../database/src/entities/proposal.entity';

export class CreateProposalPaymentTermDto {
  @IsString()
  milestoneName: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  percentage: number;

  @IsString()
  @IsOptional()
  triggerEvent?: string;
}

export class CreateProposalItemDto {
  @IsNumber()
  leadServiceId: number;

  @IsString()
  @IsOptional()
  serviceName?: string;

  @IsString()
  @IsOptional()
  serviceType?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  discount?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  taxPercentage?: number;
}

export class CreateProposalDto {
  @IsNumber()
  leadId: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  proposalDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  validUntil?: Date;

  @IsEnum(SUBMITTED_BY)
  @IsOptional()
  submittedBy?: SUBMITTED_BY;

  @IsEnum(PROPOSAL_DIVISION)
  @IsOptional()
  division?: PROPOSAL_DIVISION;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsOptional()
  introduction?: string;

  @IsString()
  @IsOptional()
  termsAndConditions?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProposalItemDto)
  items: CreateProposalItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProposalPaymentTermDto)
  @IsOptional()
  paymentTerms?: CreateProposalPaymentTermDto[];
}

export class UpdateProposalDto extends PartialType(CreateProposalDto) {
  @IsEnum(PROPOSAL_STATUS)
  @IsOptional()
  status?: PROPOSAL_STATUS;
}

export class UpdateProposalStatusDto {
  @IsEnum(PROPOSAL_STATUS)
  status: PROPOSAL_STATUS;

  @IsString()
  @IsOptional()
  notes?: string;
}
