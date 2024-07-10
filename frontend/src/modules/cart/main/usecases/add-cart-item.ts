import { fetchHttpClient } from '@/modules/common';
import { RemoteAddCartItem } from '../../data';
import { AddCartItem } from '../../domain';

export function makeAddCartItem(): AddCartItem {
  return new RemoteAddCartItem(fetchHttpClient);
}
