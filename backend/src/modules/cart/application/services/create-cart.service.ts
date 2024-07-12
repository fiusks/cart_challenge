import { Injectable } from '@nestjs/common';
import { Cart, CreateCart } from '../../domain';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CreateCartService {
  constructor(
    private readonly createCart: CreateCart,
    @InjectQueue('DeleteCartOnExpireQueue')
    protected readonly deleteCartQueue: Queue<Cart>,
  ) {}

  public async execute(sessionId: string): Promise<Cart> {
    const newCart = await this.createCart.execute(
      Cart.create({ sessionId, items: [] }),
    );

    this.deleteCartQueue.add('DeleteCartOnExpireQueue', newCart, {
      delay: 60 * 60 * 24,
    });

    return newCart;
  }
}
