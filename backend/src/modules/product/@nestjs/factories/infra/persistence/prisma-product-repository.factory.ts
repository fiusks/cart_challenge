import { FactoryProvider } from '@nestjs/common';
import { PrismaService } from '~/modules/common/infra';

import { PrismaProductRepository } from '~/modules/product/infra';

export const prismaProductRepository: FactoryProvider<PrismaProductRepository> =
  {
    provide: PrismaProductRepository,
    inject: [PrismaService],
    useFactory: (prisma: PrismaService) => {
      return new PrismaProductRepository(prisma);
    },
  };
