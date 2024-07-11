import { Cart } from '../entities';
import { CartRepository } from '../repositories';

export class FindCartById {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(id: string): Promise<Cart | null> {
    const cart = await this.cartRepository.findById(id);

    if (!cart) {
      return null;
    }

    return cart;
  }
}
