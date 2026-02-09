import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from '../../../../../libs/dtos/sales/create-proposal.dto';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post()
  create(@Body() dto: CreateProposalDto) {
    return this.proposalService.createProposal(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proposalService.getProposal(+id);
  }

  @Get('lead/:leadId')
  findByLead(@Param('leadId') leadId: string) {
    return this.proposalService.getProposalsByLead(+leadId);
  }
}
