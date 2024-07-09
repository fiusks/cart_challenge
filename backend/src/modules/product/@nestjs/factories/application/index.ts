import { FactoryProvider } from '@nestjs/common';

import { listProductsServiceFactory } from './list-products.factory';

export const applicationFactories: FactoryProvider[] = [
  listProductsServiceFactory,
];
