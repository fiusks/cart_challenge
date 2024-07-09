import { Module } from '@nestjs/common';
import { PrismaService } from './infra';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [PrismaService, ConfigService],
  exports: [PrismaService, ConfigService],
})
export class CommonModule {}
