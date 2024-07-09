import { Cart } from '~/modules/cart/domain';

export interface CartRepository {
  create(cart: Cart): Promise<Cart>;
  findById(id: string): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
  delete(cart: Cart): Promise<void>;
}
