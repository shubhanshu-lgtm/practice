import { Controller, Get, Post, Put, Delete, Param, Body, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PartnerUserService } from './partner-user.service';
import { CreatePartnerUserDto, UpdatePartnerUserDto, GetPartnerUserFilterDto } from '../../../../../libs/dtos/master_management/partner-user.dto';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';


@Controller('partner_users')
@UseGuards(TokenValidationGuard, CheckIfAdminGuard)
export class PartnerUserController {
  constructor(
    private readonly partnerUserService: PartnerUserService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post('add')
  @UseGuards(TokenValidationGuard,CheckIfAdminGuard)
  async create(@Res() res: Response, @Body() createDto: CreatePartnerUserDto) {
    try {
      const result = await this.partnerUserService.create(createDto);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Partner user created successfully', data: result });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('list')
  @UseGuards(TokenValidationGuard)
  async findAll(@Res() res: Response, @Query() filterDto: GetPartnerUserFilterDto) {
    try {
      const result = await this.partnerUserService.findAll(filterDto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Partner users fetched successfully',
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
      const result = await this.partnerUserService.findOne(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Partner user fetched successfully', data: result });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Put('update/:id')
  @UseGuards(CheckIfAdminGuard)
  async update(@Res() res: Response, @Param('id') id: number, @Body() updateDto: UpdatePartnerUserDto) {

    try {
      const result = await this.partnerUserService.update(id, updateDto);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Partner user updated successfully', data: result }); 
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete('delete/:id')
  @UseGuards(CheckIfAdminGuard)
  async remove(@Res() res: Response, @Param('id') id: number) {
    try {
      await this.partnerUserService.remove(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Partner user deleted successfully' });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
