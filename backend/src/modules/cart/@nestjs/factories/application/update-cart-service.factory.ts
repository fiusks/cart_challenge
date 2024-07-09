import { FactoryProvider } from '@nestjs/common';
import { UpdateCartService } from '~/modules/cart/application';
import { UpdateCart } from '~/modules/cart/domain';

export const updateCartFactoryService: FactoryProvider<UpdateCartService> = {
  provide: UpdateCartService,
  inject: [UpdateCart],
  useFactory: (updateCart: UpdateCart) => {
    return new UpdateCartService(updateCart);
  },
};
