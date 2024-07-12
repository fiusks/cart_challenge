import { HttpClient } from '@/modules/common';
import { AddCartItem, Cart, CartDto, CartItemInput } from '../../domain';
import { cartConverterToBigInt } from '../cart-converter-to-big-int';
import { revalidateTag } from 'next/cache';

export class RemoteAddCartItem implements AddCartItem {
  constructor(private readonly httpClient: HttpClient) {}

  public async execute(input: CartItemInput): Promise<Cart> {
    const { productId, sessionId, quantity } = input;

    const productQtd = quantity ?? 1;

    const response = await this.httpClient(
      `carts/${sessionId}/${productId}/${productQtd}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['cart'],
        },
      },
    );

    const cart = (await response.json()) as CartDto;

    revalidateTag('cart');

    return cartConverterToBigInt(cart);
  }
}
