import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LeadManagementService } from './lead.service';
import { CreateLeadDto } from '../../../../../libs/dtos/master_management/lead.dto';
import { UpdateLeadServiceDetailsDto } from '../../../../../libs/dtos/sales/update-lead-service.dto';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadManagementService) {}

  @Post('/create')
  create(@Body() dto: CreateLeadDto) {

    return this.leadService.createLead(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.getLead(+id);
  }

  @Patch('service/:id')
  updateServiceDetails(@Param('id') id: string, @Body() body: UpdateLeadServiceDetailsDto) {
    return this.leadService.updateLeadServiceDetails(id.toString(), body); 
  }
}
