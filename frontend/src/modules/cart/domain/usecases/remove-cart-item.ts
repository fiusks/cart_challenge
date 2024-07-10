import { Cart } from '../models';

export interface RemoveCartItem {
  execute(): Promise<Cart>;
}
