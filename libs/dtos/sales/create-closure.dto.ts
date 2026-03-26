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

export class DepartmentTeamAssignmentDto {
  @IsNumber()
  departmentId: number;

  @IsNumber()
  @IsOptional()
  teamId?: number;

  @IsNumber()
  @IsOptional()
  assignedToUserId?: number;
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

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  poFileUrls?: string[];

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

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsOptional()
  invoiceServices?: string[];

  @IsString()
  @IsOptional()
  department?: string;

  /**
   * Optional: override team/user assignment per department.
   * Key = departmentId, value = teamId and/or assignedToUserId.
   * If not provided, projects are created with department only.
   * Example: [{ departmentId: 2, teamId: 5, assignedToUserId: 12 }]
   */
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DepartmentTeamAssignmentDto)
  departmentAssignments?: DepartmentTeamAssignmentDto[];
}

export class AssignToAccountDto {
  @IsNumber()
  accountDepartmentId: number;

  @IsString()
  @IsOptional()
  billFromEntity?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class AssignDepartmentsDto {
  @IsArray()
  @IsNumber({}, { each: true })
  departmentIds: number[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DepartmentTeamAssignmentDto)
  teamAssignments?: DepartmentTeamAssignmentDto[];
}

export class UpdateClosureDto extends PartialType(CreateClosureDto) {}
