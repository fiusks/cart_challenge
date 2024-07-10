import { FactoryProvider } from '@nestjs/common';
import { RemoveCartItemService } from '~/modules/cart/application';
import { RemoveCartItem } from '~/modules/cart/domain';

export const removeCartItemFactoryService: FactoryProvider<RemoveCartItemService> =
  {
    provide: RemoveCartItemService,
    inject: [RemoveCartItem],
    useFactory: (removeCartItem: RemoveCartItem) => {
      return new RemoveCartItemService(removeCartItem);
    },
  };
