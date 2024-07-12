import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Cart } from '../entities';
import { CartRepository } from '../repositories';
import { ProductRepository } from '~/modules/product/domain';
import { UpdateCartItemInputDto } from '../dtos';

export class RemoveCartItem {
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

    const currentCartItem = cart.items.find(
      (cartItem) => cartItem.product.id.id === productId,
    );

    if (!currentCartItem) {
      throw new UnprocessableEntityException('Produto não existe no carrinho');
    }

    const cartItem = cart.removeItem({
      product: product.toCreateProps(),
      quantity,
    });

    if (!cartItem) {
      return await this.cartRepository.deleteCartItem(
        cart.sessionId,
        currentCartItem.id.id,
      );
    }

    return await this.cartRepository.removeCartItem(cart.sessionId, cartItem);
  }
}
