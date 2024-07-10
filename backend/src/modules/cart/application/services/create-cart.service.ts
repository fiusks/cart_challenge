import { Injectable } from '@nestjs/common';
import { Cart, CreateCart } from '../../domain';

@Injectable()
export class CreateCartService {
  constructor(private readonly createCart: CreateCart) {}

  public async execute(sessionId: string): Promise<Cart> {
    return this.createCart.execute(Cart.create({ sessionId, items: [] }));
  }
}
