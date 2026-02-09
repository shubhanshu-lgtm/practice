import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ModuleAccessGuard } from './module-access.guard';
import { User, LoginSession } from '../../database/src';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, LoginSession])],
  providers: [JwtAuthGuard, ModuleAccessGuard],
  exports: [JwtAuthGuard, ModuleAccessGuard],
})
export class AuthModule {}
