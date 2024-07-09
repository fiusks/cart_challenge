import { FactoryProvider } from '@nestjs/common';
import { CreateCartService } from '~/modules/cart/application';
import { CreateCart } from '~/modules/cart/domain';

export const createCartFactoryService: FactoryProvider<CreateCartService> = {
  provide: CreateCartService,
  inject: [CreateCart],
  useFactory: (createCart: CreateCart) => {
    return new CreateCartService(createCart);
  },
};
