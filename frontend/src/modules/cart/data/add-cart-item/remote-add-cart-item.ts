import { HttpClient } from '@/modules/common';
import { AddCartItem, Cart, CartDto, CartItemInput } from '../../domain';
import { cartConverterToBigInt } from '../cart-converter-to-big-int';

export class RemoteAddCartItem implements AddCartItem {
  constructor(private readonly httpClient: HttpClient) {}

  public async execute(input: CartItemInput): Promise<Cart> {
    const { productId, sessionId, quantity } = input;
    const response = await this.httpClient(
      `cart/${sessionId}/${productId}/${quantity}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const cart = (await response.json()) as CartDto;

    return cartConverterToBigInt(cart);
  }
}
