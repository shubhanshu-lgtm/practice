import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { DBModule, Team, Department, User, LoginSession } from '../../../../../libs/database/src';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, Department, User, LoginSession]),
    DBModule,
    ResponseHandlerModule
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
