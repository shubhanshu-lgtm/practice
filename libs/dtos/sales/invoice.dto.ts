import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { INVOICE_STATUS, INVOICE_TAX_TYPE, PAYMENT_METHOD } from '../../constants/salesConstants';

export class InvoiceItemDto {
  @IsNumber()
  @IsOptional()
  proposalItemId?: number;

  @IsString()
  serviceName: string;

  @IsString()
  @IsOptional()
  serviceDescription?: string;

  @IsNumber()
  @Min(1)
  qty: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsNumber()
  @IsOptional()
  taxPercentage?: number;

  @IsString()
  @IsOptional()
  currency?: string;
}

export class CreateInvoiceDto {
  @IsNumber()
  closureId: number;

  @IsNumber()
  @IsOptional()
  projectId?: number;

  @IsNumber()
  @IsOptional()
  paymentTermId?: number;

  @IsNumber()
  @IsOptional()
  accountDepartmentId?: number;

  @IsString()
  @IsOptional()
  billFromEntity?: string;

  @IsDate()
  @Type(() => Date)
  invoiceDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dueDate?: Date;

  @IsEnum(INVOICE_TAX_TYPE)
  @IsOptional()
  taxType?: INVOICE_TAX_TYPE;

  @IsNumber()
  @IsOptional()
  cgstPercentage?: number;

  @IsNumber()
  @IsOptional()
  sgstPercentage?: number;

  @IsNumber()
  @IsOptional()
  igstPercentage?: number;

  @IsNumber()
  @IsOptional()
  advancePaid?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  billToPan?: string;

  @IsString()
  @IsOptional()
  customerPoNumber?: string;

  @IsString()
  @IsOptional()
  accountManager?: string;

  @IsString()
  @IsOptional()
  businessNumber?: string;

  @IsString()
  @IsOptional()
  sacCode?: string;

  @IsOptional()
  bankDetails?: {
    beneficiaryName: string;
    beneficiaryAddress?: string;
    accountNumber: string;
    bankName: string;
    bankBranch?: string;
    ifscCode?: string;
    abaRoutingNumber?: string;
    swiftCode?: string;
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  @IsEnum(INVOICE_STATUS)
  @IsOptional()
  status?: INVOICE_STATUS;

  @IsString()
  @IsOptional()
  pdfUrl?: string;
}

export class RecordPaymentDto {
  @IsNumber()
  invoiceId: number;

  @IsString()
  @IsOptional()
  orderId?: string;

  @IsDate()
  @Type(() => Date)
  paymentDate: Date;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsEnum(PAYMENT_METHOD)
  paymentMethod: PAYMENT_METHOD;

  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsOptional()
  transactionId?: string;

  @IsString()
  @IsOptional()
  chequeNumber?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class InvoiceTaxUpdateDto {
  @IsEnum(INVOICE_TAX_TYPE)
  taxType: INVOICE_TAX_TYPE;

  @IsNumber()
  @IsOptional()
  cgstPercentage?: number;

  @IsNumber()
  @IsOptional()
  sgstPercentage?: number;

  @IsNumber()
  @IsOptional()
  igstPercentage?: number;
}