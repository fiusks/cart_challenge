import { Cart } from '../entities';
import { CartRepository } from '../repositories';

export class FindCartById {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(id: string): Promise<Cart> {
    return this.cartRepository.findById(id);
  }
}
