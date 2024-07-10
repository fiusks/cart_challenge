import { Injectable } from '@nestjs/common';
import { Cart, RemoveCartItem, UpdateCartItemInputDto } from '../../domain';

@Injectable()
export class RemoveCartItemService {
  constructor(private readonly removeCartItem: RemoveCartItem) {}

  public async execute(input: UpdateCartItemInputDto): Promise<Cart> {
    return this.removeCartItem.execute(input);
  }
}
