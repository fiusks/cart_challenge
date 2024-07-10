import { Cart } from '../models';

export interface AddCartItem {
  execute(): Promise<Cart>;
}
