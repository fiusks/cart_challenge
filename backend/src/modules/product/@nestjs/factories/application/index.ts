import { FactoryProvider } from '@nestjs/common';

import { findProductByIdServiceFactory } from './find-product-by-id.factory';

export const applicationFactories: FactoryProvider[] = [
  findProductByIdServiceFactory,
];
