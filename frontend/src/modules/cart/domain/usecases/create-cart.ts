import { Cart } from '../models';

export interface CreateCart {
  execute(): Promise<Cart>;
}
