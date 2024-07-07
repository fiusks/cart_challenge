import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [CartModule],
})
export class AppModule {}
