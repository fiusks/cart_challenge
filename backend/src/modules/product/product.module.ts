import { Module } from '@nestjs/common';
import {
  applicationFactories,
  domainFactories,
  infraFactories,
  ProductController,
} from './@nestjs';
import { PrismaProductRepository } from './infra';

@Module({
  providers: [...infraFactories, ...domainFactories, ...applicationFactories],
  controllers: [ProductController],
  exports: [PrismaProductRepository],
})
export class ProductModule {}
