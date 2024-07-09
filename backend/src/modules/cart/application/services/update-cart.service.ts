import { Injectable } from '@nestjs/common';
import { Cart, UpdateCart } from '../../domain';

@Injectable()
export class UpdateCartService {
  constructor(private readonly updateCart: UpdateCart) {}

  public async execute(cart: Cart): Promise<Cart> {
    return this.updateCart.execute(cart);
  }
}
