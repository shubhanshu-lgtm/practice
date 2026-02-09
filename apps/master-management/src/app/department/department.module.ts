import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBModule } from '../../../../../libs/database/src/database.module';
import { Department, User, LoginSession } from '../../../../../libs/database/src';
import { ResponseHandlerModule } from '../../../../../libs/response-handler/response-handler.module';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

@Module({
  imports: [
    DBModule.forRoot(),
    ResponseHandlerModule,
    TypeOrmModule.forFeature([Department, User, LoginSession]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
