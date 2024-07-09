import { Cart } from '../entities';
import { CartRepository } from '../repositories';

export class DeleteCart {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(cart: Cart): Promise<void> {
    return this.cartRepository.delete(cart);
  }
}
