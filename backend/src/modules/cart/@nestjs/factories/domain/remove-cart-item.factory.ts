import { FactoryProvider } from '@nestjs/common';
import { RemoveCartItem } from '~/modules/cart/domain';
import { PrismaCartRepository } from '~/modules/cart/infra';
import { PrismaProductRepository } from '~/modules/product/infra';

export const removeCartItemFactory: FactoryProvider<RemoveCartItem> = {
  provide: RemoveCartItem,
  inject: [PrismaProductRepository, PrismaCartRepository],
  useFactory: (
    productRepository: PrismaProductRepository,
    cartRepository: PrismaCartRepository,
  ) => {
    return new RemoveCartItem(productRepository, cartRepository);
  },
};
