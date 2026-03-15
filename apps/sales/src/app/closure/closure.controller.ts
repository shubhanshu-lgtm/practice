import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ClosureService } from './closure.service';
import { CreateClosureDto, UpdateClosureDto } from '../../../../../libs/dtos/sales/create-closure.dto';
import { Response } from 'express';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { TokenValidationGuard } from '../../../../../libs/middlewares/authMiddleware.guard';

@Controller('closures')
// @UseGuards(TokenValidationGuard)
export class ClosureController {
  constructor(
    private readonly closureService: ClosureService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() dto: CreateClosureDto) {
    try {
      const closure = await this.closureService.acceptProposal(dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure created successfully',
        data: closure
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('leadId') leadId?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    try {
      const result = await this.closureService.getClosures({ leadId, page, limit });
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closures fetched successfully',
        data: result
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const closure = await this.closureService.getClosure(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure fetched successfully',
        data: closure
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClosureDto,
  ) {
    try {
      const closure = await this.closureService.updateClosure(id, dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure updated successfully',
        data: closure
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      await this.closureService.deleteClosure(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure deleted successfully'
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
