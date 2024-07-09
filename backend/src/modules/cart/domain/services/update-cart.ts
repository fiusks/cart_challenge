import { Cart } from '../entities';
import { CartRepository } from '../repositories';

export class UpdateCart {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(cart: Cart): Promise<Cart> {
    return this.cartRepository.update(cart);
  }
}
