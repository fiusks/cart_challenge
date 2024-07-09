import { FactoryProvider } from '@nestjs/common';

import { FindProductByIdService } from '~/modules/product/application';
import { FindProductById } from '~/modules/product/domain';

export const findProductByIdServiceFactory: FactoryProvider<FindProductByIdService> =
  {
    provide: FindProductByIdService,
    inject: [FindProductById],
    useFactory: (findProductById: FindProductById) => {
      return new FindProductByIdService(findProductById);
    },
  };
