import { FactoryProvider } from '@nestjs/common';
import { FindCartById } from '~/modules/cart/domain';
import { PrismaCartRepository } from '~/modules/cart/infra';

export const findCartBydIdFactory: FactoryProvider<FindCartById> = {
  provide: FindCartById,
  inject: [PrismaCartRepository],
  useFactory: (cartRepository: PrismaCartRepository) => {
    return new FindCartById(cartRepository);
  },
};
