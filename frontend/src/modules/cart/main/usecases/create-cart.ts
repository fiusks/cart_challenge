import { fetchHttpClient } from '@/modules/common';
import { RemoteCreateCart } from '../../data';
import { CreateCart } from '../../domain';

export function makeCreateCart(): CreateCart {
  return new RemoteCreateCart(fetchHttpClient);
}
