import {
  Body, Controller, Get, Param, Post, Query, Res,
  UseGuards, Patch, Delete, ParseIntPipe, HttpStatus
} from '@nestjs/common';

import { ProposalService } from './proposal.service';
import { CreateProposalDto, UpdateProposalDto, UpdateProposalStatusDto } from '../../../../../libs/dtos/sales/create-proposal.dto';
import { Response } from 'express';
import { ResponseHandlerService } from '../../../../../libs/response-handler/response-handler.service';
import { TokenValidationGuard } from '../../../../../libs/middlewares/authMiddleware.guard';
import { PROPOSAL_STATUS } from '../../../../../libs/database/src/entities/proposal.entity';
//import { CreateProposalWithServicesDto } from '../../../../../libs/dtos/sales/create-proposal-with-services.dto';
@Controller('proposals')
export class ProposalController {
  constructor(
    private readonly proposalService: ProposalService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Post()
  @UseGuards(TokenValidationGuard)
  async create(@Res() res: Response, @Body() dto: CreateProposalDto) {
    try {
      const proposal = await this.proposalService.createProposal(dto);
      const templateData = this.proposalService.getTemplateDataForProposal(proposal);

      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Proposal created successfully',
        data: { proposal, templateData }
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post('preview')
  @UseGuards(TokenValidationGuard)
  async preview(@Res() res: Response, @Body() dto: CreateProposalDto) {
    try {
      const preview = await this.proposalService.previewProposal(dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Proposal preview generated successfully',
        data: preview
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  // @Post('with-services')
  // @UseGuards(TokenValidationGuard)
  // async createWithServices(@Res() res: Response, @Body() dto: CreateProposalWithServicesDto) {
  //   try {
  //     const proposal = await this.proposalService.createProposalWithServices(dto);
  //     return this.responseHandler.sendSuccessResponse(res, {
  //       message: 'Proposal created successfully',
  //       data: proposal
  //     });
  //   } catch (error) {
  //     return this.responseHandler.sendErrorResponse(res, error);
  //   }
  // }

  @Post('/with-pdf')
  @UseGuards(TokenValidationGuard)
  async createWithPdf(@Res() res: Response, @Body() dto: CreateProposalDto) {
    try {
      const result = await this.proposalService.createProposalWithPdf(dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Proposal created and PDF generated successfully',
        data: result
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Post('with-pdf-download')
  @UseGuards(TokenValidationGuard)
  async createWithPdfDownload(@Res() res: Response, @Body() dto: CreateProposalDto) {
    try {
      const { proposal, pdfBuffer } = await this.proposalService.createProposalWithPdfBuffer(dto);
      const filename = `Proposal_${proposal.proposalReference.replace(/\//g, '-')}_V${proposal.version}.pdf`;

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length,
        'Content-Transfer-Encoding': 'binary',
      });

      return res.status(HttpStatus.OK).send(pdfBuffer);
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get()
  @UseGuards(TokenValidationGuard)
  async findAll(
    @Res() res: Response,
    @Query('leadId') leadId?: number,
    @Query('status') status?: PROPOSAL_STATUS,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    try {
      const result = await this.proposalService.getProposals({ leadId, status, search, page, limit });
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Proposals fetched successfully',
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
      const proposal = await this.proposalService.getProposal(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Proposal fetched successfully',
        data: proposal
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id/pdf-meta')
  @UseGuards(TokenValidationGuard)
  async getPdfMeta(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const meta = await this.proposalService.getPdfMeta(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'PDF metadata fetched successfully',
        data: meta
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id/template-tags')
  @UseGuards(TokenValidationGuard)
  async getTemplateTags(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const tags = await this.proposalService.getTemplateTagsForProposal(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Template tags fetched successfully',
        data: tags
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id/pdf')
  @UseGuards(TokenValidationGuard)
  async downloadPdf(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const proposal = await this.proposalService.getProposal(id);
      const pdfBuffer = await this.proposalService.generatePdfFromTemplate(id);

      const filename = `Proposal_${proposal.proposalReference.replace(/\//g, '-')}_V${proposal.version}.pdf`;

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length,
        'Content-Transfer-Encoding': 'binary',
      });

      return res.status(HttpStatus.OK).send(pdfBuffer);
    } catch (error) {
      console.error('downloadPdf error:', error);
      // convert to ApiErrorType if necessary
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Patch(':id/status')
  @UseGuards(TokenValidationGuard)
  async updateStatus(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProposalStatusDto,
  ) {
    try {
      const proposal = await this.proposalService.updateStatus(id, dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Proposal status updated successfully',
        data: proposal
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
    @Body() dto: UpdateProposalDto,
  ) {
    try {
      const proposal = await this.proposalService.updateProposal(id, dto);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Proposal updated successfully',
        data: proposal
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      await this.proposalService.deleteProposal(id);
      return this.responseHandler.sendSuccessResponse(res, {
        message: 'Proposal deleted successfully'
      });
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }

  @Get(':id/generate-pdf')
  //@UseGuards(TokenValidationGuard)
  async generatePdf(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const buffer = await this.proposalService.generatePdfFromTemplate(id);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="proposal-${id}.pdf"`,
        'Content-Length': buffer.length,
        'Content-Transfer-Encoding': 'binary',
      });
      return res.status(HttpStatus.OK).send(buffer);
    } catch (error) {
      return this.responseHandler.sendErrorResponse(res, error);
    }
  }
}
