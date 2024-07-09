import { FactoryProvider } from '@nestjs/common';
import { ListProducts } from '~/modules/product/domain';
import { PrismaProductRepository } from '~/modules/product/infra';

export const listProductsFactory: FactoryProvider<ListProducts> = {
  provide: ListProducts,
  inject: [PrismaProductRepository],
  useFactory: (productRepository: PrismaProductRepository) => {
    return new ListProducts(productRepository);
  },
};
