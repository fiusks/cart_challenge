import { Injectable } from '@nestjs/common';
import { Cart, CreateCart } from '../../domain';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateCartService {
  constructor(private readonly createCart: CreateCart) {}

  public async execute(): Promise<Cart> {
    return this.createCart.execute(
      Cart.create({ sessionId: uuidv4(), items: [] }),
    );
  }
}
