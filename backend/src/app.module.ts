import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CartModule, CommonModule],
})
export class AppModule {}
