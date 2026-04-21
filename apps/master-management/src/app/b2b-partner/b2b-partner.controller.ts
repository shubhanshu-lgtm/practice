import { Controller, Get, Post, Put, Delete, Param, Body, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { B2BPartnerService } from './b2b-partner.service';
import { CreateB2BPartnerDto, UpdateB2BPartnerDto, GetB2BPartnerFilterDto } from '../../../../../libs/dtos/master_management/b2b-partner.dto';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';

@Controller('b2b_partners')
@UseGuards(TokenValidationGuard, CheckIfAdminGuard)
export class B2BPartnerController {
  constructor(
    private readonly b2bPartnerService: B2BPartnerService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post('add')
  async create(@Res() res: Response, @Body() createDto: CreateB2BPartnerDto) {
    try {
      const result = await this.b2bPartnerService.create(createDto);
      return this.responseHandler.sendSuccessResponse(res, { message: 'B2B Partner created successfully', data: result });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('list')
  @UseGuards(TokenValidationGuard)
  async findAll(@Res() res: Response, @Query() filterDto: GetB2BPartnerFilterDto) {
    try {
      const result = await this.b2bPartnerService.findAll(filterDto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'B2B Partners fetched successfully',
        data: result,
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('detail/:id')
  @UseGuards(TokenValidationGuard)
  async findOne(@Res() res: Response, @Param('id') id: number) {
    try {
      const result = await this.b2bPartnerService.findOne(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'B2B Partner fetched successfully', data: result });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Put('update/:id')
  async update(@Res() res: Response, @Param('id') id: number, @Body() updateDto: UpdateB2BPartnerDto) {
    try {
      const result = await this.b2bPartnerService.update(id, updateDto);
      return this.responseHandler.sendSuccessResponse(res, { message: 'B2B Partner updated successfully', data: result });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete('delete/:id')
  async remove(@Res() res: Response, @Param('id') id: number) {
    try {
      await this.b2bPartnerService.remove(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'B2B Partner deleted successfully' });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
