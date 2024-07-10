import { HttpClient } from '@/modules/common';
import { Cart, CartDto, GetCart } from '../../domain';
import { cartConverterToBigInt } from '../cart-converter-to-big-int';

export class RemoteGetCart implements GetCart {
  constructor(private readonly httpClient: HttpClient) {}

  public async execute(sessionId: string): Promise<Cart> {
    const response = await this.httpClient(`cart/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const cart = (await response.json()) as CartDto;

    return cartConverterToBigInt(cart);
  }
}
