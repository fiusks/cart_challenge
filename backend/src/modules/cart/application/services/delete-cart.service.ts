import { Injectable } from '@nestjs/common';
import { Cart, DeleteCart } from '../../domain';

@Injectable()
export class DeleteCartService {
  constructor(private readonly deleteCart: DeleteCart) {}

  public async execute(cart: Cart): Promise<void> {
    return this.deleteCart.execute(cart);
  }
}
