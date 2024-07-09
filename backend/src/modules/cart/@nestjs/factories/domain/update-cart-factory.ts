import { FactoryProvider } from '@nestjs/common';
import { UpdateCart } from '~/modules/cart/domain';
import { PrismaCartRepository } from '~/modules/cart/infra';

export const updateCartFactory: FactoryProvider<UpdateCart> = {
  provide: UpdateCart,
  inject: [PrismaCartRepository],
  useFactory: (prismaCartRepository: PrismaCartRepository) => {
    return new UpdateCart(prismaCartRepository);
  },
};
