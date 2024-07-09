import { FactoryProvider } from '@nestjs/common';
import { findProductByIdFactory } from './find-product-by-id.factory';

export const domainFactories: FactoryProvider[] = [findProductByIdFactory];
