import { FactoryProvider } from '@nestjs/common';
import {
  DeleteCartOnExpireProcessor,
  PrismaCartRepository,
} from '~/modules/cart/infra';

export const deleteCartOnExpireProcessorFactory: FactoryProvider<DeleteCartOnExpireProcessor> =
  {
    provide: 'DeleteCartOnExpireQueue',
    inject: [PrismaCartRepository],
    useFactory: (cartRepository: PrismaCartRepository) => {
      return new DeleteCartOnExpireProcessor(cartRepository);
    },
  };
