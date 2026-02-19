import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { CreateMenuDto, CreateSystemModuleDto, UpdateMenuDto, UpdateMenuStatusDto, UpdateSystemModuleDto } from '../../../../../libs/dtos/master_management/module_management.dto';
import { ModuleManagementService } from './module_management.service';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';

@Controller('modules')
export class ModuleManagementController {
  constructor(
    private readonly moduleManagementService: ModuleManagementService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post('/create')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async createSystemModule(@Res() res: Response, @Body() payload: CreateSystemModuleDto) {
    try {
      const module = await this.moduleManagementService.createSystemModule(payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Module created successfully', data: module });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('/list')
  @UseGuards(TokenValidationGuard)
  async getSystemModules(@Res() res: Response) {
    try {
      const modules = await this.moduleManagementService.getSystemModules();
      return this.responseHandler.sendSuccessResponse(res, { message: 'Modules fetched successfully', data: modules });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('/:id')
  @UseGuards(TokenValidationGuard)
  async getSystemModuleById(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const module = await this.moduleManagementService.getSystemModuleById(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Module fetched successfully', data: module });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch('/:id')
  @UseGuards(TokenValidationGuard)
  async updateSystemModule(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSystemModuleDto,
  ) {
    try {
      const module = await this.moduleManagementService.updateSystemModule(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Module updated successfully', data: module });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post('/menus')
  async createMenu(@Res() res: Response, @Body() payload: CreateMenuDto) {
    try {
      const menu = await this.moduleManagementService.createMenu(payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Menu created successfully', data: menu });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('/menus')
  async getMenus(@Res() res: Response) {
    try {
      const menus = await this.moduleManagementService.getMenus();
      return this.responseHandler.sendSuccessResponse(res, { message: 'Menus fetched successfully', data: menus });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('menus/:id')
  async getMenuById(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const menu = await this.moduleManagementService.getMenuById(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Menu fetched successfully', data: menu });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch('menus/:id')
  async updateMenu(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateMenuDto,
  ) {
    try {
      const menu = await this.moduleManagementService.updateMenu(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Menu updated successfully', data: menu });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch('menus/:id/status')
  async updateMenuStatus(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateMenuStatusDto,
  ) {
    try {
      const menu = await this.moduleManagementService.updateMenuStatus(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Menu status updated successfully', data: menu });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
