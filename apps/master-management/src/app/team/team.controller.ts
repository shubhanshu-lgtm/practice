import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { CreateTeamDto, UpdateTeamDto } from '../../../../../libs/dtos/master_management/team.dto';
import { TeamService } from './team.service';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';

@Controller('teams')
@UseGuards(TokenValidationGuard, CheckIfAdminGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post('/create')
  async createTeam(@Res() res: Response, @Body() payload: CreateTeamDto) {
    try {
      const team = await this.teamService.createTeam(payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Team created successfully', data: team });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('/list')
  async getTeams(@Res() res: Response) {
    try {
      const teams = await this.teamService.getTeams();
      return this.responseHandler.sendSuccessResponse(res, { message: 'Teams fetched successfully', data: teams });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id')
  async getTeamById(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const team = await this.teamService.getTeamById(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Team fetched successfully', data: team });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id')
  async updateTeam(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTeamDto,
  ) {
    try {
      const team = await this.teamService.updateTeam(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Team updated successfully', data: team });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete(':id')
  async deleteTeam(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.teamService.deleteTeam(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Team deleted successfully', data: result });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
