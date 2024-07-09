import { FactoryProvider } from '@nestjs/common';

import { ListProductsdService } from '~/modules/product/application';
import { ListProducts } from '~/modules/product/domain';

export const listProductsServiceFactory: FactoryProvider<ListProductsdService> =
  {
    provide: ListProductsdService,
    inject: [ListProducts],
    useFactory: (findProductById: ListProducts) => {
      return new ListProductsdService(findProductById);
    },
  };
