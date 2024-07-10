import { Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCartService } from '../../application';
import { plainToInstance } from 'class-transformer';
import { CartDto } from '../dto/cart.dto';

@Controller()
export class CartController {
  constructor(private readonly createCart: CreateCartService) {}

  @Post('/carts/:sessionId')
  public async index(@Param('sessionId') sessionId: string): Promise<any> {
    const cart = await this.createCart.execute(sessionId);

    return plainToInstance(CartDto, cart.toJSON());
  }
}
