import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { DashboardService } from './dashboard.service';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { TokenValidationGuard } from '../../../../../libs/middlewares/authMiddleware.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Get('counts')
  @UseGuards(TokenValidationGuard)
  async getCounts(@Res() res: Response) {
    try {
      const counts = await this.dashboardService.getDashboardCounts();
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Dashboard counts fetched successfully',
        data: counts,
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
