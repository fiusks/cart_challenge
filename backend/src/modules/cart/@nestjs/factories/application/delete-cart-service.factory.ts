import { FactoryProvider } from '@nestjs/common';
import { DeleteCartService } from '~/modules/cart/application';
import { DeleteCart } from '~/modules/cart/domain';

export const deleteCartFactoryService: FactoryProvider<DeleteCartService> = {
  provide: DeleteCartService,
  inject: [DeleteCart],
  useFactory: (deleteCart: DeleteCart) => {
    return new DeleteCartService(deleteCart);
  },
};
