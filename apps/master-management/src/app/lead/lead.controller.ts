import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UsePipes, ValidationPipe, UseGuards, Req, Delete } from '@nestjs/common';
import { Response } from 'express';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { CreateLeadDto, UpdateLeadDto, CreateServiceDto, UpdateServiceDto, CreatePermissionDto, GetPermissionDto } from '../../../../../libs/dtos/master_management/lead.dto';
import { LeadService } from './lead.service';
import { JwtAuthGuard, ModuleAccessGuard, ModuleAccess } from '../../../../../libs/auth/src';
import { PermissionAccessGuard } from '../../../../../libs/auth/src/permission-access.guard';
import { PermissionAccess } from '../../../../../libs/auth/src/permission-access.decorator';
import { SYSTEM_MODULE_CODES } from '../../../../../libs/constants/moduleConstants';
import { PERMISSIONS } from '../../../../../libs/constants/autenticationConstants/permissionManagerConstants';
import { AuthenticatedRequest } from '../../../../../libs/interfaces/authenticated-request.interface';

@Controller('leads')
@UseGuards(JwtAuthGuard, ModuleAccessGuard, PermissionAccessGuard)
@ModuleAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT)
@UsePipes(new ValidationPipe({ transform: true }))
export class LeadController {
  constructor(
    private readonly leadService: LeadService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post('services')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.ADD)
  async createService(@Res() res: Response, @Body() payload: CreateServiceDto) {
    try {
      const service = await this.leadService.createService(payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Service created successfully', data: service });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch('services/:id')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.UPDATE)
  async updateService(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateServiceDto) {
    try {
      const service = await this.leadService.updateService(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Service updated successfully', data: service });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete('services/:id')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.DELETE)
  async deleteService(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body('hard') hard?: boolean) {
    try {
      await this.leadService.deleteService(id, hard);
      const action = hard ? 'permanently deleted' : 'deactivated';
      return this.responseHandler.sendSuccessResponse(res, { message: `Service ${action} successfully` });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post()
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.ADD)
  async createLead(@Req() req: AuthenticatedRequest, @Res() res: Response, @Body() payload: CreateLeadDto) {
    try {
      const userId = req.user?.id;
      const lead = await this.leadService.createLead(payload, userId);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead created successfully', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get()
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.READ)
  async getLeads(@Res() res: Response) {
    try {
      const leads = await this.leadService.getLeads();
      return this.responseHandler.sendSuccessResponse(res, { message: 'Leads fetched successfully', data: leads });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('services')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.READ)
  async getServices(@Res() res: Response) {
    try {
      const services = await this.leadService.getServices();
      return this.responseHandler.sendSuccessResponse(res, { message: 'Services fetched successfully', data: services });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('/customers/search')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.READ)
  async searchCustomers(@Res() res: Response, @Query('name') name: string) {
    try {
      const customers = await this.leadService.searchCustomers(name);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Customers fetched successfully', data: customers });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.READ)
  async getLeadById(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const lead = await this.leadService.getLeadById(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead fetched successfully', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.UPDATE)
  async updateLead(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLeadDto,
  ) {
    try {
      const lead = await this.leadService.updateLead(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead updated successfully', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete(':id')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.DELETE)
  async deleteLead(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body('hard') hard?: boolean) {
    try {
      await this.leadService.deleteLead(id, hard);
      const action = hard ? 'permanently deleted' : 'deactivated';
      return this.responseHandler.sendSuccessResponse(res, { message: `Lead ${action} successfully` });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post(':id/services')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.UPDATE)
  async assignServicesToLead(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: { serviceIds: number[] },
  ) {
    try {
      const lead = await this.leadService.assignServices(id, payload.serviceIds);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Services assigned to lead successfully', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post('permissions')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.ADD)
  async createPermission(@Req() req: AuthenticatedRequest, @Res() res: Response, @Body() payload: CreatePermissionDto) {
    try {
      const actor = req.user;
      const permission = await this.leadService.createPermission(payload, actor.id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Permission created successfully', data: permission });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('permissions/list')
  @PermissionAccess(SYSTEM_MODULE_CODES.SALES_MANAGEMENT, PERMISSIONS.READ)
  async getPermissions(@Res() res: Response, @Query() query: GetPermissionDto) {
    try {
      const permissions = await this.leadService.getPermissions(query);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Permissions fetched successfully', data: permissions });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
