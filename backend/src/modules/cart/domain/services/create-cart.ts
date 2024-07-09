import { Cart } from '../entities';
import { CartRepository } from '../repositories';

export class CreateCart {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(cart: Cart): Promise<Cart> {
    return this.cartRepository.create(cart);
  }
}
