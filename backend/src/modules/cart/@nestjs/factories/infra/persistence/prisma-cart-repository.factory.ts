import { FactoryProvider } from '@nestjs/common';
import { PrismaCartRepository } from '~/modules/cart/infra';
import { PrismaService } from '~/modules/common/infra';

export const prismaCartRepository: FactoryProvider<PrismaCartRepository> = {
  provide: PrismaCartRepository,
  inject: [PrismaService],
  useFactory: (prisma: PrismaService) => {
    return new PrismaCartRepository(prisma);
  },
};
