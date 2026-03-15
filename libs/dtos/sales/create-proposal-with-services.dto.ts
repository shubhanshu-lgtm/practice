import { CreateProposalDto, CreateProposalItemDto, CreateProposalPaymentTermDto } from './create-proposal.dto';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AssignServiceDto {
  @IsNotEmpty()
  serviceId?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  amount?: number;

  @IsArray()
  @IsOptional()
  deliverables?: string[];
}

export class CreateProposalWithServicesDto extends CreateProposalDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignServiceDto)
  services: AssignServiceDto[];
}
