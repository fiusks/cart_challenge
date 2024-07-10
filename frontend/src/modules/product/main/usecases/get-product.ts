import { fetchHttpClient } from '@/modules/common';
import { GetProducts } from '../../domain';
import { RemoteGetProducts } from '../../data/get-products';

export function makeGetProducts(): GetProducts {
  return new RemoteGetProducts(fetchHttpClient);
}
