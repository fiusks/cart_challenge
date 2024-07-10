import { Cart, CartItem } from '~/modules/cart/domain';

export interface CartRepository {
  create(cart: Cart): Promise<Cart>;
  findById(id: string): Promise<Cart | null>;
  addCartItem(sessionId: string, cartItem: CartItem): Promise<Cart>;
  removeCartItem(sessionId: string, cartItem: CartItem): Promise<Cart>;
  deleteCartItem(sessionId: string, cartItemId: string): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
  delete(cart: Cart): Promise<void>;
}
