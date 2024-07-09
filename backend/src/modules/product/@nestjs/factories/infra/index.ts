import { FactoryProvider } from '@nestjs/common';
import { prismaProductRepository } from './persistence';

export const infraFactories: FactoryProvider[] = [prismaProductRepository];
