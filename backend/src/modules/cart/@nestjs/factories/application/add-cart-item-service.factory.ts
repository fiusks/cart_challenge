import { FactoryProvider } from '@nestjs/common';
import { AddCartItemService } from '~/modules/cart/application';
import { AddCartItem } from '~/modules/cart/domain';

export const addCartItemFactoryService: FactoryProvider<AddCartItemService> = {
  provide: AddCartItemService,
  inject: [AddCartItem],
  useFactory: (addCartItem: AddCartItem) => {
    return new AddCartItemService(addCartItem);
  },
};
