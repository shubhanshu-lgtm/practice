import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Res, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { CreateDepartmentDto, UpdateDepartmentDto, UpdateDepartmentStatusDto } from '../../../../../libs/dtos/master_management/department.dto';
import { DepartmentService } from './department.service';
import { CheckIfAdminGuard, TokenValidationGuard } from '../../../../../libs/middlewares/authMiddleware.guard';

@Controller('departments')
@UsePipes(new ValidationPipe({ transform: true }))
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post('create_department')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async createDepartment(@Res() res: Response, @Body() payload: CreateDepartmentDto) {
    try {
      const department = await this.departmentService.createDepartment(payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Department created successfully', data: department });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get("/list")
  @UseGuards(TokenValidationGuard)
  async getDepartments(@Res() res: Response) {
    try {
      const departments = await this.departmentService.getDepartments();
      return this.responseHandler.sendSuccessResponse(res, { message: 'Departments fetched successfully', data: departments });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id')
  @UseGuards(TokenValidationGuard)
  async getDepartmentById(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const department = await this.departmentService.getDepartmentById(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Department fetched successfully', data: department });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async updateDepartment(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDepartmentDto,
  ) {
    try {
      const department = await this.departmentService.updateDepartment(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Department updated successfully', data: department });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id/status')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async updateDepartmentStatus(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDepartmentStatusDto,
  ) {
    try {
      const department = await this.departmentService.updateDepartmentStatus(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Department status updated successfully', data: department });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
