import { Module } from '@nestjs/common';
import {
  applicationFactories,
  domainFactories,
  infraFactories,
} from '../product/@nestjs';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
  providers: [...domainFactories, ...applicationFactories, ...infraFactories],
})
export class CartModule {}
