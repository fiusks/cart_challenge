import { UnprocessableEntityException } from '@nestjs/common';
import { Cart } from '../entities';
import { CartRepository } from '../repositories';

export class CreateCart {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(cart: Cart): Promise<Cart> {
    const cartExist = await this.cartRepository.findById(cart.sessionId);

    if (cartExist) {
      throw new UnprocessableEntityException('Carrinho já existente');
    }
    return this.cartRepository.create(cart);
  }
}
