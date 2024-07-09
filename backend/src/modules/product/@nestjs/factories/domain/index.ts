import { FactoryProvider } from '@nestjs/common';
import { listProductsFactory } from './list-products.factory';

export const domainFactories: FactoryProvider[] = [listProductsFactory];
