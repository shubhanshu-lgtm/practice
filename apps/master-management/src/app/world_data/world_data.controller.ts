import { Controller, Get, Param, ParseIntPipe,  UsePipes, ValidationPipe, Res, UseGuards } from '@nestjs/common';
// import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { Response } from 'express';
import { WorldDataService } from '../world_data/world_data.services';
import { JwtAuthGuard } from '../../../../../libs/auth/src';

@Controller('world-data')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class WorldDataController {
  constructor(
    private readonly worldDataService: WorldDataService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}


  @Get('countries')
  async getCountries(@Res() res: Response) {
    try {
      const countries = await this.worldDataService.getCountries();
      return this.responseHandler.sendSuccessResponse(res, { message:'All Countries List Fetched Successfully', data:countries });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }


  @Get('countries/:countryId/states')
  async getStates(
    @Res() res: Response,
    @Param('countryId', ParseIntPipe) countryId: number,
  ) {
    try {
      const states = await this.worldDataService.getStates(countryId);
      return this.responseHandler.sendSuccessResponse(res, { message:'All States List of Particular Countries.', data: states });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }


  @Get('states/:stateId/cities')
  async getCities(
    @Res() res: Response,
    @Param('stateId', ParseIntPipe) stateId: number,
  ) {
    try {
      const cities = await this.worldDataService.getCities(stateId);
      return this.responseHandler.sendSuccessResponse(res, { message:'All Cities List of this State Fetched Successfully', data:cities });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}