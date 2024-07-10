import { NotFoundException } from '@nestjs/common';
import { Cart } from '../entities';
import { CartRepository } from '../repositories';
import { ProductRepository } from '~/modules/product/domain';
import { UpdateCartItemInputDto } from '../dtos';

export class AddCartItem {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cartRepository: CartRepository,
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

    const cartItem = cart.addItem({
      product: product.toCreateProps(),
      quantity,
    });

    return await this.cartRepository.addCartItem(cart.sessionId, cartItem);
  }
}
