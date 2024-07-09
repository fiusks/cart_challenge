import { Module } from '@nestjs/common';
import {
  applicationFactories,
  domainFactories,
  infraFactories,
  ProductController,
} from './@nestjs';

@Module({
  providers: [...infraFactories, ...domainFactories, ...applicationFactories],
  controllers: [ProductController],
})
export class ProductModule {}
