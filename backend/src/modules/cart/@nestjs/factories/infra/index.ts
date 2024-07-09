import { FactoryProvider } from '@nestjs/common';
import { prismaCartRepository } from './persistence';

export const infraFactories: FactoryProvider[] = [prismaCartRepository];
