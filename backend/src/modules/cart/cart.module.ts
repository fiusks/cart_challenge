import { Module } from '@nestjs/common';

import { ProductModule } from '../product/product.module';
import { CartController } from './@nestjs/controller/cart.controller';
import {
  applicationFactories,
  domainFactories,
  infraFactories,
} from './@nestjs/factories';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductModule,
    ConfigModule,
    BullModule.registerQueue({ name: 'DeleteCartOnExpireQueue' }),
  ],
  providers: [...domainFactories, ...applicationFactories, ...infraFactories],
  controllers: [CartController],
})
export class CartModule {}
