import { HttpClient } from '@/modules/common';
import { Cart, CartDto, CartItemInput, RemoveCartItem } from '../../domain';
import { cartConverterToBigInt } from '../cart-converter-to-big-int';

export class RemoteRemoveCartItem implements RemoveCartItem {
  constructor(private readonly httpClient: HttpClient) {}

  public async execute(input: CartItemInput): Promise<Cart> {
    const { productId, sessionId, quantity } = input;

    const response = await this.httpClient(
      `carts/${sessionId}/${productId}/${quantity}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const cart = (await response.json()) as CartDto;

    return cartConverterToBigInt(cart);
  }
}
