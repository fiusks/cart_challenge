import { Injectable } from '@nestjs/common';
import { AddCartItem, Cart, UpdateCartItemInputDto } from '../../domain';

@Injectable()
export class AddCartItemService {
  constructor(private readonly addCartItem: AddCartItem) {}

  public async execute(input: UpdateCartItemInputDto): Promise<Cart> {
    return this.addCartItem.execute(input);
  }
}
