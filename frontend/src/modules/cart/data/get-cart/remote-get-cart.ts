import { HttpClient } from '@/modules/common';
import { Cart, CartDto, GetCart } from '../../domain';
import { cartConverterToBigInt } from '../cart-converter-to-big-int';

export class RemoteGetCart implements GetCart {
  constructor(private readonly httpClient: HttpClient) {}

  public async execute(sessionId: string): Promise<Cart | null> {
    const response = await this.httpClient(`/carts/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseBody = await response.text();

    if (!responseBody) return null;

    const cart = JSON.parse(responseBody) as CartDto;

    return cartConverterToBigInt(cart);
  }
}
