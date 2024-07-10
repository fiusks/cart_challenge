import { CartItemInput } from '../dtos';
import { Cart } from '../models';

export interface RemoveCartItem {
  execute(input: CartItemInput): Promise<Cart>;
}
