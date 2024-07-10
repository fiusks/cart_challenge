import { fetchHttpClient } from '@/modules/common';
import { RemoteGetCart } from '../../data';
import { GetCart } from '../../domain';

export function makeGetCart(): GetCart {
  return new RemoteGetCart(fetchHttpClient);
}
