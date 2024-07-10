import { fetchHttpClient } from '@/modules/common';
import { RemoteRemoveCartItem } from '../../data';
import { RemoveCartItem } from '../../domain';

export function makeRemoveCartItemt(): RemoveCartItem {
  return new RemoteRemoveCartItem(fetchHttpClient);
}
