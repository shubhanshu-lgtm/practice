import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UsePipes, ValidationPipe, UseGuards, Req, Delete, UseInterceptors, ForbiddenException, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { imageFileFilter } from '../../../../../libs/utils/fileUpload';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { CreateLeadDto, UpdateLeadDto, CreateServiceDto, UpdateServiceDto, CreatePermissionDto, GetPermissionDto, CreateDeliverableDto, UpdateDeliverableDto, GetServicesFilterDto } from '../../../../../libs/dtos/master_management/lead.dto';
import { LeadService } from './lead.service';
import { AuthenticatedRequest } from '../../../../../libs/interfaces/authenticated-request.interface';
import { USER_GROUP } from '../../../../../libs/constants/autenticationConstants/userContants';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';

@Controller('leads')
@UseGuards(TokenValidationGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class LeadController {
  constructor(
    private readonly leadService: LeadService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post('services')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  @UseInterceptors(FileInterceptor('service_logo', { fileFilter: imageFileFilter }))
  async createService(@Req() req: AuthenticatedRequest, @Res() res: Response, @Body() payload: CreateServiceDto, @UploadedFile() file?: { originalname?: string }) {
    try {
      const isRootService = !payload.parentId;
      const isSuperAdmin = req.user_group === USER_GROUP.SUPER_ADMIN;
      if (isRootService && !isSuperAdmin) {
        throw new ForbiddenException('Only SUPER_ADMIN can create root services');
      }
      if (file?.originalname) {
        payload.logo = file.originalname;
      }
      const service = await this.leadService.createService(payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Service created successfully', data: service });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post('services/category')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  //@UseInterceptors(FileInterceptor('category_logo', { fileFilter: imageFileFilter }))
  async addServiceCategory(@Req() req: AuthenticatedRequest, @Res() res: Response, @Body() payload: CreateServiceDto, @UploadedFile() file?: { originalname?: string }) {
    try {
      const isSuperAdmin = req.user_group === USER_GROUP.SUPER_ADMIN;
      if (!isSuperAdmin) {
        throw new ForbiddenException('Only SUPER_ADMIN can create service categories');
      }
      const result = await this.leadService.addServiceCategory(payload, file);
      return this.responseHandler.sendSuccessResponse(res, result);
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch('services/:id')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async updateService(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateServiceDto) {
    try {
      const service = await this.leadService.updateService(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Service updated successfully', data: service });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete('services/:id')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
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
  @UseGuards(TokenValidationGuard)
  async createLead(@Req() req: AuthenticatedRequest, @Res() res: Response, @Body() payload: CreateLeadDto) {
    try {
      const userId = req.user?.id;
      const lead = await this.leadService.createLead(payload, userId);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead created successfully', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('list')
  @UseGuards(TokenValidationGuard)
  async getLeads(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    try {
      const leads = await this.leadService.getLeads(req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Leads fetched successfully', data: leads });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('services')
  @UseGuards(TokenValidationGuard)
  async getServices(@Res() res: Response, @Query() query: GetServicesFilterDto) {
    try {
      const services = await this.leadService.getServices(query);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Services fetched successfully', data: services });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('services/tree')
  @UseGuards(TokenValidationGuard)
  async getServicesTree(@Res() res: Response, @Query() query: GetServicesFilterDto) {
    try {
      const tree = await this.leadService.getServicesTree(query);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Service tree fetched successfully', data: tree });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('services/:id/children')
  @UseGuards(TokenValidationGuard)
  async getServiceChildren(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const children = await this.leadService.getServiceChildren(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Service children fetched successfully', data: children });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('/customers/search')
  @UseGuards(TokenValidationGuard)
  async searchCustomers(@Res() res: Response, @Query('name') name: string) {
    try {
      const customers = await this.leadService.searchCustomers(name);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Customers fetched successfully', data: customers });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id')
  async getLeadById(@Req() req: AuthenticatedRequest, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const lead = await this.leadService.getLeadById(id, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead fetched successfully', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Put(':id')
  @UseGuards(TokenValidationGuard)
  async updateLead(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLeadDto,
  ) {
    try {
      const updatedLead = await this.leadService.updateLead(id, payload, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead updated successfully', data: updatedLead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete(':id')
  @UseGuards(TokenValidationGuard)
  async deleteLead(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body('hard') hard?: boolean,
  ) {
    try {
      await this.leadService.deleteLead(id, hard, req.user);
      const action = hard ? 'permanently deleted' : 'deactivated';
      return this.responseHandler.sendSuccessResponse(res, { message: `Lead ${action} successfully` });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post(':id/services')
  @UseGuards(TokenValidationGuard)  
  async assignServicesToLead(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: { serviceIds: number[] },
  ) {
    try {
      const lead = await this.leadService.assignServices(id, payload.serviceIds, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Services assigned to lead successfully', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post('permissions')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
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
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async getPermissions(@Res() res: Response, @Query() query: GetPermissionDto) {
    try {
      const permissions = await this.leadService.getPermissions(query);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Permissions fetched successfully', data: permissions });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post('leads/services/:serviceId/deliverables')
  @UseGuards(TokenValidationGuard)
  async createDeliverable(@Res() res: Response, @Param('serviceId', ParseIntPipe) serviceId: number, @Body() payload: CreateDeliverableDto) {
    try {
      payload.serviceId = serviceId;
      const deliverable = await this.leadService.createDeliverable(payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverable created successfully', data: deliverable });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('deliverables')
  @UseGuards(TokenValidationGuard)
  async getAllDeliverables(@Res() res: Response, @Query('serviceId', ParseIntPipe) serviceId?: number) {
    try {
      const deliverables = await this.leadService.getDeliverables(serviceId);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverables fetched successfully', data: deliverables });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('leads/services/:serviceId/deliverables')
  @UseGuards(TokenValidationGuard)
  async getServiceDeliverables(@Res() res: Response, @Param('serviceId', ParseIntPipe) serviceId: number) {
    try {
      const deliverables = await this.leadService.getDeliverables(serviceId);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Service deliverables fetched successfully', data: deliverables });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('deliverables/:id')
  @UseGuards(TokenValidationGuard)
  async getDeliverable(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const deliverable = await this.leadService.getDeliverableById(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverable fetched successfully', data: deliverable });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Put('leads/deliverables/:id') 
  @UseGuards(TokenValidationGuard)
  async updateDeliverable(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateDeliverableDto) {
    try {
      const deliverable = await this.leadService.updateDeliverable(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverable updated successfully', data: deliverable });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete('leads/deliverables/:id')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async deleteDeliverable(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body('hard') hard?: boolean) {
    try {
      await this.leadService.deleteDeliverable(id, hard);
      const action = hard ? 'permanently deleted' : 'deactivated';
      return this.responseHandler.sendSuccessResponse(res, { message: `Deliverable ${action} successfully` });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
