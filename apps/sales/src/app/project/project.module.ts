import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from '../../../../../libs/database/src/entities/project.entity';
import { User } from '../../../../../libs/database/src/entities/user.entity';
import { Team } from '../../../../../libs/database/src/entities/team.entity';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';

@Module({
  imports: [
      DBModule.forRoot(),
      ConfigModule, 
      ResponseHandlerModule,
    TypeOrmModule.forFeature([Project, User, Team])
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService]
})
export class ProjectModule {}
