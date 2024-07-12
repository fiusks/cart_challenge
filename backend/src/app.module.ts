import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module';
import { CommonModule } from './modules/common/common.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { env } from '~/config/env';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: env.parse,
    }),
    BullModule.forRootAsync({
      useFactory: async () => ({
        redis: {
          db: 1,
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    CartModule,
    CommonModule,
    ProductModule,
  ],
})
export class AppModule {}
