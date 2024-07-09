import { Cart } from '~/modules/cart/domain';

export interface CartRepository {
  findById(id: string): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
  delete(cart: Cart): Promise<void>;
}
