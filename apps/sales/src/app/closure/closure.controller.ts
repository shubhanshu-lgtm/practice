import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ClosureService } from './closure.service';
import { AssignDepartmentsDto, AssignToAccountDto, CreateClosureDto, UpdateClosureDto } from '../../../../../libs/dtos/sales/create-closure.dto';
import { Response } from 'express';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { TokenValidationGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUpload } from '../../../../../libs/interfaces/commonTypes/custom.interface';

@Controller('closures')
// @UseGuards(TokenValidationGuard)
export class ClosureController {
  constructor(
    private readonly closureService: ClosureService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post()
  @UseGuards(TokenValidationGuard)
  async create(@Res() res: Response, @Body() dto: CreateClosureDto) {
    try {
      const closure = await this.closureService.acceptProposal(dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure created successfully',
        data: closure
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post('upload-pdf')
  @UseGuards(TokenValidationGuard)
  @UseInterceptors(FilesInterceptor('files', 5, {
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB per file
    }
  }))
  async uploadPO(
    @Res() res: Response,
    @UploadedFiles() files: FileUpload[],
    @Query('proposalId', ParseIntPipe) proposalId: number,
  ) {
    try {
      if (!files || files.length === 0) {
        throw new BadRequestException('No files uploaded');
      }
      
      for (const file of files) {
        if (!file.originalname.match(/\.(pdf)$/)) {
          throw new BadRequestException('Only PDF files are allowed!');
        }
      }

      const results = await this.closureService.uploadProposalFiles(proposalId, files);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Files uploaded successfully',
        data: results,
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get()
  @UseGuards(TokenValidationGuard)
  async findAll(
    @Res() res: Response,
    @Query('leadId') leadId?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    try {
      const result = await this.closureService.getClosures({ leadId, page, limit });
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closures fetched successfully',
        data: result
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id')
  @UseGuards(TokenValidationGuard)
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const closure = await this.closureService.getClosure(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure fetched successfully',
        data: closure
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id')
  @UseGuards(TokenValidationGuard)
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClosureDto,
  ) {
    try {
      const closure = await this.closureService.updateClosure(id, dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure updated successfully',
        data: closure
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete(':id')
  @UseGuards(TokenValidationGuard)
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      await this.closureService.deleteClosure(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure deleted successfully'
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post(':id/assign-departments')
  @UseGuards(TokenValidationGuard)
  async assignDepartments(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignDepartmentsDto
  ) {
    try {
      const result = await this.closureService.assignDepartmentsToProjects(id, dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: `${result.created.length} department(s) assigned as projects. ${result.skipped.length} already existed.`,
        data: result
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id/departments')
  @UseGuards(TokenValidationGuard)
  async getClosureDepartments(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number
  ) {
    try {
      const result = await this.closureService.getClosureDepartments(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure departments fetched successfully',
        data: result
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id/assign-account')
  @UseGuards(TokenValidationGuard)
  async assignToAccount(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignToAccountDto
  ) {
    try {
      const closure = await this.closureService.assignToAccount(id, dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Closure assigned to account department successfully',
        data: closure
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
