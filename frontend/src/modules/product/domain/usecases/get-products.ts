import { Product } from '../models';

export interface GetProducts {
  execute(): Promise<Product[]>;
}
