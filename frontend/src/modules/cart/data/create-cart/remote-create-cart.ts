import { HttpClient } from '@/modules/common';
import { Cart, CartDto, CreateCart } from '../../domain';
import { cartConverterToBigInt } from '../cart-converter-to-big-int';

export class RemoteCreateCart implements CreateCart {
  constructor(private readonly httpClient: HttpClient) {}

  public async execute(sessionId: string): Promise<Cart> {
    const response = await this.httpClient(`carts/${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['cart'],
      },
    });

    const cart = (await response.json()) as CartDto;

    return cartConverterToBigInt(cart);
  }
}
