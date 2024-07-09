import { Injectable } from '@nestjs/common';
import { Cart, CreateCart } from '../../domain';

@Injectable()
export class CreateCartService {
  constructor(private readonly createCart: CreateCart) {}

  public async execute(cart: Cart): Promise<Cart> {
    return this.createCart.execute(cart);
  }
}
