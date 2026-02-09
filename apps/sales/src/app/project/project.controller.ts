import { Controller, Get, Query } from '@nestjs/common';
import { ProjectService } from './project.service';

// Mocking an Auth Guard or assuming user ID is passed for demonstration
// In a real app, you would extract userId from the JWT token in the request
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects(@Query('userId') userId: string) {
    // For testing purposes, we accept userId as a query param.
    // In production, use @Req() req and extract req.user.id
    return this.projectService.getProjectsForUser(Number(userId));
  }
}
