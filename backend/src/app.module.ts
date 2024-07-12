import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module';
import { CommonModule } from './modules/common/common.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { env } from '~/config/env';
import { BullModule } from '@nestjs/bull';
import { BullConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: env.parse,
    }),
    BullModule.forRootAsync({ useClass: BullConfig }),
    CartModule,
    CommonModule,
    ProductModule,
  ],
})
export class AppModule {}
