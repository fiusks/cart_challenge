import { FactoryProvider } from '@nestjs/common';
import { FindProductById } from '~/modules/product/domain';
import { PrismaProductRepository } from '~/modules/product/infra';

export const findProductByIdFactory: FactoryProvider<FindProductById> = {
  provide: FindProductById,
  inject: [PrismaProductRepository],
  useFactory: (productRepository: PrismaProductRepository) => {
    return new FindProductById(productRepository);
  },
};
