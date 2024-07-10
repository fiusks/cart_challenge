import { CartItemInput } from '../dtos';
import { Cart } from '../models';

export interface AddCartItem {
  execute(input: CartItemInput): Promise<Cart>;
}
