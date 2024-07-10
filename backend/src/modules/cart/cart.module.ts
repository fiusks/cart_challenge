import { Module } from '@nestjs/common';

import { ProductModule } from '../product/product.module';
import { CartController } from './@nestjs/controller/cart.controller';
import {
  applicationFactories,
  domainFactories,
  infraFactories,
} from './@nestjs/factories';

@Module({
  imports: [ProductModule],
  providers: [...domainFactories, ...applicationFactories, ...infraFactories],
  controllers: [CartController],
})
export class CartModule {}
