import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ProjectService, AssignProjectTeamDto } from './project.service';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { TokenValidationGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { PROJECT_STATUS } from '../../../../../libs/constants/salesConstants';

@Controller('projects')
@UseGuards(TokenValidationGuard)
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly responseHandler: ResponseHandlerService
  ) {}

  @Get()
  async getProjects(@Res() res: Response, @Req() req: Request) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return this.responseHandler.sendErrorResponse(res, {
          message: 'Unauthorized',
          status: 401
        });
      }
      const projects = await this.projectService.getProjectsForUser(Number(userId));
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Projects fetched successfully',
        data: projects
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('closure/:closureId')
  async getProjectsByClosure(
    @Res() res: Response,
    @Param('closureId', ParseIntPipe) closureId: number
  ) {
    try {
      const projects = await this.projectService.getProjectsByClosure(closureId);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Projects fetched successfully',
        data: projects
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id')
  async getProject(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const project = await this.projectService.getProject(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Project fetched successfully',
        data: project
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id/assign')
  async assignTeam(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignProjectTeamDto
  ) {
    try {
      const project = await this.projectService.assignTeamToProject(id, dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Project assigned successfully',
        data: project
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id/status')
  async updateStatus(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: PROJECT_STATUS
  ) {
    try {
      const project = await this.projectService.updateProjectStatus(id, status);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Project status updated successfully',
        data: project
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
