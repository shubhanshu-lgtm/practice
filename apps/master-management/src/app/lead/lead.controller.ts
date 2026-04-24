import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UsePipes, ValidationPipe, UseGuards, Req, Delete, UseInterceptors, ForbiddenException, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
// import { existsSync, createReadStream } from 'fs';
// import { join, normalize } from 'path';
import { imageFileFilter } from '../../../../../libs/utils/fileUpload';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { CreateLeadDto, UpdateLeadDto, CreateServiceDto, UpdateServiceDto, CreatePermissionDto, GetPermissionDto, CreateDeliverableDto, UpdateDeliverableDto, GetServicesFilterDto, AssignServicesToLeadDto, PaginationDto, CreateLeadFollowUpDto, UpdateLeadFollowUpDto, GetLeadFollowUpsDto, GetAssignedServicesFilterDto, DropLeadDto, RollbackLeadDto, CreateBulkDeliverablesDto } from '../../../../../libs/dtos/master_management/lead.dto';
import { LeadService } from './lead.service';
import { AuthenticatedRequest } from '../../../../../libs/interfaces/authenticated-request.interface';
import { USER_GROUP } from '../../../../../libs/constants/autenticationConstants/userContants';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { CATEGORY_TYPE } from '../../../../../libs/constants/serviceConstants';

@Controller('leads')
@UseGuards(TokenValidationGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class LeadController {
  constructor(
    private readonly leadService: LeadService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post('services/category')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  @UseInterceptors(FileInterceptor('category_logo', { fileFilter: imageFileFilter }))
  async addServiceCategory(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Body() payload: CreateServiceDto,
    @Query('type') type: CATEGORY_TYPE,
    @UploadedFile() file?: { originalname?: string },
  ) {
    try {
      const isSuperAdmin = req.user_group === USER_GROUP.SUPER_ADMIN;
      if (!isSuperAdmin) {
        throw new ForbiddenException('Only SUPER_ADMIN can create service categories');
      }
      // payload.parentId may specify a parent category id for sub-category creation
      const result = await this.leadService.addServiceCategory(payload, type, file);
      return this.responseHandler.sendSuccessResponse(res, result);
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('services/category')
  @UseGuards(TokenValidationGuard)
  async getServicesByCategory(
    @Res() res: Response,
    @Query('type') type: CATEGORY_TYPE,
    @Query('parentId') parentId?: number,
    @Query('categoryName') categoryName?: string,
  ) {
    try {
      const result = await this.leadService.getServicesByCategory(type, parentId, categoryName);
      return this.responseHandler.sendSuccessResponse(res, { message: `${type} fetched successfully`, data: result });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('services/categorywithsubcat')
  async getCategoryAllList(@Res() res: Response, @Query('name') name?: string) {
    try {
      const result = await this.leadService.getCategoryAllList(name);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Categories with sub-categories fetched successfully', data: result });
    } catch (error) {
      console.log('Internal Server Error', error);
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

  // --- sub-service routes --------------------------------------------------
  @Get('subservices')
  @UseGuards(TokenValidationGuard)
  async getSubServices(@Res() res: Response, @Query() query: GetServicesFilterDto) {
    try {
      const result = await this.leadService.getServices(query);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Sub-services fetched successfully',
        data: result,
        recordsTotal: result.totalDocs,
        recordsFiltered: result.totalDocs,
        draw: query.draw,
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('subservices/:id')
  @UseGuards(TokenValidationGuard)
  async getSubServiceById(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const service = await this.leadService.getServiceById(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Sub-service fetched successfully', data: service });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch('subservices/:id')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async updateSubService(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateServiceDto,
  ) {
    try {
      const service = await this.leadService.updateService(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Sub-service updated successfully', data: service });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete('subservices/:id')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async deleteSubService(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body('hard') hard?: boolean) {
    try {
      await this.leadService.deleteService(id, hard);
      const action = hard ? 'permanently deleted' : 'deactivated';
      return this.responseHandler.sendSuccessResponse(res, { message: `Sub-service ${action} successfully` });
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
  async getLeads(@Req() req: AuthenticatedRequest, @Res() res: Response, @Query() pagination: PaginationDto) {
    try {
      const result = await this.leadService.getLeads(req.user, pagination);
      return this.responseHandler.sendSuccessResponse(res, { 
        message: 'Leads fetched successfully', 
        data: result,
        recordsTotal: result.totalDocs,
        recordsFiltered: result.totalDocs,
        draw: pagination.draw
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('dropped-list')
  @UseGuards(TokenValidationGuard)
  async getDroppedLeads(@Req() req: AuthenticatedRequest, @Res() res: Response, @Query() pagination: PaginationDto) {
    try {
      const result = await this.leadService.getDroppedLeads(req.user, pagination);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Dropped leads fetched successfully',
        data: result,
        recordsTotal: result.totalDocs,
        recordsFiltered: result.totalDocs,
        draw: pagination.draw
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('services')
  @UseGuards(TokenValidationGuard)
  async getServices(@Res() res: Response, @Query() query: GetServicesFilterDto) {
    try {
      const result = await this.leadService.getServices(query);
      return this.responseHandler.sendSuccessResponse(res, { 
        message: 'Services fetched successfully', 
        data: result,
        recordsTotal: result.totalDocs,
        recordsFiltered: result.totalDocs,
        draw: query.draw
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  // @Get('services/tree')
  // @UseGuards(TokenValidationGuard)
  // async getServicesTree(@Res() res: Response, @Query() query: GetServicesFilterDto) {
  //   try {
  //     const tree = await this.leadService.getServicesTree(query);
  //     return this.responseHandler.sendSuccessResponse(res, { message: 'Service tree fetched successfully', data: tree });
  //   } catch (error) {
  //     return this.responseHandler.sendErrorResponse(res, error);
  //   }
  // }

  // @Get('services/:id/children')
  // @UseGuards(TokenValidationGuard)
  // async getServiceChildren(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
  //   try {
  //     const children = await this.leadService.getServiceChildren(id);
  //     return this.responseHandler.sendSuccessResponse(res, { message: 'Service children fetched successfully', data: children });
  //   } catch (error) {
  //     return this.responseHandler.sendErrorResponse(res, error);
  //   }
  // }

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
  async getLeadById(@Req() req: AuthenticatedRequest, @Res() res: Response, @Param('id') id: string) {
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
    @Param('id') id: string,
    @Body() payload: UpdateLeadDto,
  ) {
    try {
      const updatedLead = await this.leadService.updateLead(id, payload, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead updated successfully', data: updatedLead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch('deliverables/:id')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async updateDeliverable(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDeliverableDto,
  ) {
    try {
      const result = await this.leadService.updateDeliverable(id, payload);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverable updated successfully', data: result });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete('deliverables/:id')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async deleteDeliverable(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      await this.leadService.deleteDeliverable(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverable permanently deleted successfully' });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  // --- lead follow-up routes ----------------------------------------------------
  @Post(':id/followups')
  @UseGuards(TokenValidationGuard)
  async createLeadFollowUp(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: CreateLeadFollowUpDto,
  ) {
    try {
      const followUp = await this.leadService.createLeadFollowUp(id, payload, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Follow-up created successfully', data: followUp });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id/followups')
  @UseGuards(TokenValidationGuard)
  async getLeadFollowUps(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
    @Query() filter: GetLeadFollowUpsDto,
    @Query() pagination: PaginationDto,
  ) {
    try {
      const result = await this.leadService.getLeadFollowUps(id, filter, pagination);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Follow-ups fetched successfully',
        data: result,
        recordsTotal: result.totalDocs,
        recordsFiltered: result.totalDocs,
        draw: pagination.draw,
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('followups/:id')
  @UseGuards(TokenValidationGuard)
  async getLeadFollowUpById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const followUp = await this.leadService.getLeadFollowUpById(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Follow-up fetched successfully', data: followUp });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Put('followups/:id')
  @UseGuards(TokenValidationGuard)
  async updateLeadFollowUp(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLeadFollowUpDto,
  ) {
    try {
      const updated = await this.leadService.updateLeadFollowUp(id, payload, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Follow-up updated successfully', data: updated });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete('followups/:id')
  @UseGuards(TokenValidationGuard)
  async deleteLeadFollowUp(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body('hard') hard?: boolean,
  ) {
    try {
      await this.leadService.deleteLeadFollowUp(id, hard, req.user);
      const action = hard ? 'permanently deleted' : 'deactivated';
      return this.responseHandler.sendSuccessResponse(res, { message: `Follow-up ${action} successfully` });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

@Post(':id/drop')
  @UseGuards(TokenValidationGuard)
  async dropLead(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: DropLeadDto,
  ) {
    try {
      const lead = await this.leadService.dropLead(id, payload, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead dropped successfully', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post(':id/rollback')
  @UseGuards(TokenValidationGuard)
  async rollbackLead(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: RollbackLeadDto,
  ) {
    try {
      const lead = await this.leadService.rollbackLead(id, payload, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead rollback successful', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }


  @Delete(':id')
  @UseGuards(TokenValidationGuard)
  async deleteLead(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
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
    @Param('id') id: string,
    @Body() payload: AssignServicesToLeadDto,
  ) {
    try {
      const lead = await this.leadService.assignServices(id, payload.services, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Services assigned to lead successfully', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Put(':id/services')
  @UseGuards(TokenValidationGuard)
  async updateLeadServices(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: AssignServicesToLeadDto,
  ) {
    try {
      const lead = await this.leadService.assignServices(id, payload.services, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead services updated successfully', data: lead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('services/all/list')
  @UseGuards(TokenValidationGuard)
  async getAllLeadsAssignedServices(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Query() pagination: PaginationDto,
  ) {
    try {
      const result = await this.leadService.getAllLeadsAssignedServices(req.user, pagination);
      return this.responseHandler.sendSuccessResponse(res, { 
        message: 'All lead services fetched successfully', 
        data: result,
        recordsTotal: result.totalDocs,
        recordsFiltered: result.totalDocs,
        draw: pagination.draw
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('assigned-services/list')
  @UseGuards(TokenValidationGuard)
  async getAssignedServicesList(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Query() filter: GetAssignedServicesFilterDto,
  ) {
    try {
      const result = await this.leadService.getAssignedServicesList(filter, req.user);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Assigned services fetched successfully',
        data: {
          docs: result.docs,
          limit: result.limit,
          totalDocs: result.totalDocs,
          totalPages: result.totalPages,
          hasNextPage: result.hasNextPage,
          hasPrevPage: result.hasPrevPage,
        },
        recordsTotal: result.totalDocs,
        recordsFiltered: result.totalDocs,
        draw: filter.draw,
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id/services')
  @UseGuards(TokenValidationGuard)
  async getLeadAssignedServices(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const leadServices = await this.leadService.getLeadAssignedServices(id, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead services fetched successfully', data: leadServices });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  // @Put(':id/services/:serviceId')
  // @UseGuards(TokenValidationGuard)

  // @Get('templates/docx')
  // @UseGuards(TokenValidationGuard)
  // async getDocxTemplate(@Res() res: Response, @Query('file') file: string) {
  //   try {
  //     if (!file || typeof file !== 'string' || !file.toLowerCase().endsWith('.docx')) {
  //       return this.responseHandler.sendErrorResponse(res, {
  //         statusCode: 400,
  //         message: 'Invalid file request',
  //         extraError: '',
  //         name: '',
  //       } as any);
  //     }
  //     const baseDir = join(process.cwd(), 'libs', 'templates');
  //     const safePath = normalize(join(baseDir, file));
  //     if (!safePath.startsWith(baseDir)) {
  //       return this.responseHandler.sendErrorResponse(res, {
  //         statusCode: 400,
  //         message: 'Invalid file path',
  //         extraError: '',
  //         name: '',
  //       } as any);
  //     }
  //     if (!existsSync(safePath)) {
  //       return this.responseHandler.sendErrorResponse(res, {
  //         statusCode: 404,
  //         message: 'File not found',
  //         extraError: '',
  //         name: '',
  //       } as any);
  //     }
  //     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  //     res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file)}"`);
  //     createReadStream(safePath).pipe(res);
  //   } catch (error) {
  //     return this.responseHandler.sendErrorResponse(res, {
  //       statusCode: 500,
  //       message: 'Unable to serve file',
  //       extraError: error?.message || '',
  //       name: '',
  //     } as any);
  //   }
  // }

  @Put(':id/services/:serviceId')
  @UseGuards(TokenValidationGuard)
  async updateLeadService(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Body() payload: AssignServicesToLeadDto,
  ) {
    try {
      const updatedLead = await this.leadService.updateLeadService(id, serviceId, payload.services[0], req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead service updated successfully', data: updatedLead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Put(':id/services/batch/:groupId')
  @UseGuards(TokenValidationGuard)
  async updateLeadServicesByGroupId(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
    @Param('groupId') groupId: string,
    @Body() payload: AssignServicesToLeadDto,
  ) {
    try {
      const updatedLead = await this.leadService.updateLeadServicesByGroupId(id, groupId, payload.services, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead services batch updated successfully', data: updatedLead });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete(':id/services/:serviceId')
  @UseGuards(TokenValidationGuard)
  async removeLeadService(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ) {
    try {
      await this.leadService.removeLeadService(id, serviceId, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead service removed successfully' });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete(':id/services/batch/:groupId')
  @UseGuards(TokenValidationGuard)
  async removeLeadServicesByGroupId(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
    @Param('groupId') groupId: string,
  ) {
    try {
      await this.leadService.removeLeadServicesByGroupId(id, groupId, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead services batch removed successfully' });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post(':id/services/batch/:groupId/rollback')
  @UseGuards(TokenValidationGuard)
  async rollbackLeadServicesByGroupId(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Param('id') id: string,
    @Param('groupId') groupId: string,
  ) {
    try {
      const lead = await this.leadService.rollbackLeadServicesByGroupId(id, groupId, req.user);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Lead services batch rollback successful', data: lead });
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

  @Post('services/deliverables')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async createDeliverable(@Res() res: Response, @Body() payload: CreateBulkDeliverablesDto | CreateDeliverableDto) {
    try {
      const deliverable = await this.leadService.createDeliverable(payload);
      const message = ('services' in payload) ? 'Global deliverables created successfully' : 'Global deliverable created successfully';
      return this.responseHandler.sendSuccessResponse(res, { message, data: deliverable });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get('deliverables')
  @UseGuards(TokenValidationGuard)
  async getAllDeliverables(@Res() res: Response, @Query('serviceId', ParseIntPipe) serviceId?: number, @Query('subserviceId', ParseIntPipe) subserviceId?: number) {
    try {
      const targetId = subserviceId || serviceId;
      const deliverables = await this.leadService.getDeliverables(targetId);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Deliverables fetched successfully', data: deliverables });
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
}
