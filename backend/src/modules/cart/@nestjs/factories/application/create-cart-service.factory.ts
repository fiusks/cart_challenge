import { FactoryProvider } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateCartService } from '~/modules/cart/application';
import { Cart, CreateCart } from '~/modules/cart/domain';

export const createCartFactoryService: FactoryProvider<CreateCartService> = {
  provide: CreateCartService,
  inject: [CreateCart, 'BullQueue_DeleteCartOnExpireQueue'],
  useFactory: (createCart: CreateCart, deleteCartQueue: Queue<Cart>) => {
    return new CreateCartService(createCart, deleteCartQueue);
  },
};
