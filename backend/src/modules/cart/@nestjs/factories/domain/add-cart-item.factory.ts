import { FactoryProvider } from '@nestjs/common';
import { AddCartItem } from '~/modules/cart/domain';
import { PrismaCartRepository } from '~/modules/cart/infra';
import { PrismaProductRepository } from '~/modules/product/infra';

export const addCartItemFactory: FactoryProvider<AddCartItem> = {
  provide: AddCartItem,
  inject: [PrismaProductRepository, PrismaCartRepository],
  useFactory: (
    productRepository: PrismaProductRepository,
    prismaCartRepository: PrismaCartRepository,
  ) => {
    return new AddCartItem(productRepository, prismaCartRepository);
  },
};
