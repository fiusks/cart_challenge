import { Cart } from '../models';

export interface GetCartItem {
  execute(): Promise<Cart>;
}
