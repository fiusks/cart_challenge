import { FactoryProvider } from '@nestjs/common';
import { CreateCart } from '~/modules/cart/domain';
import { PrismaCartRepository } from '~/modules/cart/infra';

export const createCartFactory: FactoryProvider<CreateCart> = {
  provide: CreateCart,
  inject: [PrismaCartRepository],
  useFactory: (prismaCartRepository: PrismaCartRepository) => {
    return new CreateCart(prismaCartRepository);
  },
};
