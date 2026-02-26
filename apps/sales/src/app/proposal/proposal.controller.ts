import { Body, Controller, Get, Param, Post, Query, Res, UseGuards, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto, UpdateProposalDto } from '../../../../../libs/dtos/sales/create-proposal.dto';
import { Response } from 'express';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
//import { AuthenticatedRequest } from '../../../../../libs/interfaces/authenticated-request.interface';
import { TokenValidationGuard, CheckIfAdminGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { PROPOSAL_STATUS } from '../../../../../libs/database/src/entities/proposal.entity';

@Controller('proposals')
@UseGuards(TokenValidationGuard)
export class ProposalController {
  constructor(
    private readonly proposalService: ProposalService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post()
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async create(@Res() res: Response, @Body() dto: CreateProposalDto) {
    try {
      const proposal = await this.proposalService.createProposal(dto);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Proposal created successfully', data: proposal });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('leadId') leadId?: number,
    @Query('status') status?: PROPOSAL_STATUS,
  ) {
    try {
      const proposals = await this.proposalService.getProposals({ leadId, status });
      return this.responseHandler.sendSuccessResponse(res, { message: 'Proposals fetched successfully', data: proposals });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const proposal = await this.proposalService.getProposal(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Proposal fetched successfully', data: proposal });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProposalDto,
  ) {
    try {
      const proposal = await this.proposalService.updateProposal(id, dto);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Proposal updated successfully', data: proposal });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete(':id')
  @UseGuards(TokenValidationGuard, CheckIfAdminGuard)
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      await this.proposalService.deleteProposal(id);
      return this.responseHandler.sendSuccessResponse(res, { message: 'Proposal deleted successfully' });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
