import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module';
import { CommonModule } from './modules/common/common.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { env } from '~/config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: env.parse,
    }),
    CartModule,
    CommonModule,
    ProductModule,
  ],
})
export class AppModule {}
