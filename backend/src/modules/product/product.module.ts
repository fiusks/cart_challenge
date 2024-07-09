import { Module } from '@nestjs/common';
import {
  applicationFactories,
  domainFactories,
  infraFactories,
} from './@nestjs';

@Module({
  imports: [],
  providers: [...infraFactories, ...domainFactories, ...applicationFactories],
})
export class ProductModule {}
