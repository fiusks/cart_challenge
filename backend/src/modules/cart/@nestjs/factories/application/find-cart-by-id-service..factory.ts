import { FactoryProvider } from '@nestjs/common';
import { FindCartByIdService } from '~/modules/cart/application';
import { FindCartById } from '~/modules/cart/domain';

export const findCartBydIdFactoryService: FactoryProvider<FindCartByIdService> =
  {
    provide: FindCartByIdService,
    inject: [FindCartById],
    useFactory: (findCartById: FindCartById) => {
      return new FindCartByIdService(findCartById);
    },
  };
