import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module';
import { CommonModule } from './common/common.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CartModule, CommonModule, ProductModule],
})
export class AppModule {}
