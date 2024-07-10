import { NotFoundException } from '@nestjs/common';
import { Cart } from '../entities';
import { CartRepository } from '../repositories';

export class FindCartById {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findById(id);

    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    return cart;
  }
}
