import { Module } from '@nestjs/common';
import { Cities, Countries, DBModule, Nationalities, States, User, LoginSession } from '../../../../../libs/database/src';
import { ConfigModule } from '../../../../../libs/config/config.module';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from '../../../../../libs/S3-Service/s3.module';
import { WorldDataController } from './world_data.controller';
import { WorldDataService } from './world_data.services';
import { WorldDataRepository } from '../../../../../libs/database/src/repositories/world-data.repository';

@Module({
   imports: [
      DBModule.forRoot(),
      ConfigModule, 
      S3Module,
      ResponseHandlerModule,
      TypeOrmModule.forFeature([
        Countries,
        States,
        Cities,
        Nationalities,
        User,
        LoginSession,
      ]),
    ],
  controllers: [
    WorldDataController,
  ],
  providers: [
    WorldDataService,
    WorldDataRepository
  ],
})
export class WorldDataModule {}
