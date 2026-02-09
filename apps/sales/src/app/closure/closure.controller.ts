import { Body, Controller, Post } from '@nestjs/common';
import { ClosureService } from './closure.service';
import { CreateClosureDto } from '../../../../../libs/dtos/sales/create-closure.dto';

@Controller('closure')
export class ClosureController {
  constructor(private readonly closureService: ClosureService) {}

  @Post()
  acceptProposal(@Body() dto: CreateClosureDto) {
    return this.closureService.acceptProposal(dto);
  }
}
