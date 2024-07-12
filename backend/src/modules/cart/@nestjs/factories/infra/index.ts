import { FactoryProvider } from '@nestjs/common';
import { prismaCartRepository } from './persistence';
import { deleteCartOnExpireProcessorFactory } from './processors';

export const infraFactories: FactoryProvider[] = [
  prismaCartRepository,
  deleteCartOnExpireProcessorFactory,
];
