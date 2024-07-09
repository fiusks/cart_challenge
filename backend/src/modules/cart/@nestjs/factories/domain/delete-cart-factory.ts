import { FactoryProvider } from '@nestjs/common';
import { DeleteCart } from '~/modules/cart/domain';
import { PrismaCartRepository } from '~/modules/cart/infra';

export const deleteCartFactory: FactoryProvider<DeleteCart> = {
  provide: DeleteCart,
  inject: [PrismaCartRepository],
  useFactory: (prismaCartRepository: PrismaCartRepository) => {
    return new DeleteCart(prismaCartRepository);
  },
};
