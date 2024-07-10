import { NotFoundException } from '@nestjs/common';
import { Cart } from '../entities';
import { CartRepository } from '../repositories';
import { ProductRepository } from '~/modules/product/domain';
import { UpdateCartItemInputDto } from '../dtos';

export class RemoveCartItem {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  public async execute(input: UpdateCartItemInputDto): Promise<Cart> {
    const { productId, quantity, sessionId } = input;

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    const cart = await this.cartRepository.findById(sessionId);

    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    cart.removeItem({
      product: product.toCreateProps(),
      quantity,
    });

    return await this.cartRepository.update(cart);
  }
}
