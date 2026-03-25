import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { InvoiceService } from './invoice.service';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { TokenValidationGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  RecordPaymentDto,
  InvoiceTaxUpdateDto
} from '../../../../../libs/dtos/sales/invoice.dto';
import { INVOICE_STATUS } from '../../../../../libs/constants/salesConstants';

@Controller('invoices')
@UseGuards(TokenValidationGuard)
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly responseHandler: ResponseHandlerService
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() dto: CreateInvoiceDto) {
    try {
      const invoice = await this.invoiceService.createInvoice(dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Invoice created successfully',
        data: invoice
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('closureId') closureId?: number,
    @Query('leadId') leadId?: number,
    @Query('status') status?: INVOICE_STATUS,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    try {
      const result = await this.invoiceService.getInvoices({
        closureId,
        leadId,
        status,
        page,
        limit
      });
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Invoices fetched successfully',
        data: result
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('finance-window')
  async financeWindow(
    @Res() res: Response,
    @Query('status') status?: INVOICE_STATUS,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    try {
      const result = await this.invoiceService.getFinanceWindowInvoices({
        status,
        search,
        page,
        limit
      });
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Finance window data fetched successfully',
        data: result
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('closure/:closureId/summary')
  async closureSummary(
    @Res() res: Response,
    @Param('closureId', ParseIntPipe) closureId: number
  ) {
    try {
      const result = await this.invoiceService.getClosureInvoiceSummary(closureId);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure invoice summary fetched successfully',
        data: result
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id/pdf')
  async downloadPdf(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const buffer = await this.invoiceService.generateInvoicePdf(id);
      const invoice = await this.invoiceService.getInvoice(id);
      const filename = `Invoice_${invoice.invoiceNumber.replace(/\//g, '-')}.pdf`;

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length
      });

      return res.status(200).send(buffer);
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const invoice = await this.invoiceService.getInvoice(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Invoice fetched successfully',
        data: invoice
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInvoiceDto
  ) {
    try {
      const invoice = await this.invoiceService.updateInvoice(id, dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Invoice updated successfully',
        data: invoice
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id/tax')
  async updateTax(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: InvoiceTaxUpdateDto
  ) {
    try {
      const invoice = await this.invoiceService.updateInvoiceTax(id, dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Invoice tax updated successfully',
        data: invoice
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post(':id/send')
  async markSent(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const invoice = await this.invoiceService.markInvoiceSent(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Invoice marked as sent',
        data: invoice
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post(':id/cancel')
  async cancel(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const invoice = await this.invoiceService.cancelInvoice(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Invoice cancelled successfully',
        data: invoice
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post('payments/record')
  async recordPayment(@Res() res: Response, @Body() dto: RecordPaymentDto) {
    try {
      const invoice = await this.invoiceService.recordPayment(dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Payment recorded successfully',
        data: invoice
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id/payments')
  async getPayments(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number
  ) {
    try {
      const payments = await this.invoiceService.getInvoicePayments(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Payments fetched successfully',
        data: payments
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
