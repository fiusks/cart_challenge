import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  AddCartItemService,
  CreateCartService,
  FindCartByIdService,
  RemoveCartItemService,
} from '../../application';
import { plainToInstance } from 'class-transformer';
import { CartDto } from '../dto/cart.dto';

@Controller()
export class CartController {
  constructor(
    private readonly createCart: CreateCartService,
    private readonly findCartById: FindCartByIdService,
    private readonly addCartItem: AddCartItemService,
    private readonly removeCartItem: RemoveCartItemService,
  ) {}

  @Post('/carts/:sessionId')
  public async store(@Param('sessionId') sessionId: string): Promise<CartDto> {
    const cart = await this.createCart.execute(sessionId);

    return plainToInstance(CartDto, cart.toJSON());
  }

  @Post('/carts/:sessionId/:productId/:quantity')
  public async addItem(
    @Param('sessionId') sessionId: string,
    @Param('productId') productId: string,
    @Param('quantity', ParseIntPipe) quantity: number,
  ): Promise<CartDto> {
    const cart = await this.addCartItem.execute({
      sessionId,
      productId,
      quantity,
    });

    return plainToInstance(CartDto, cart.toJSON());
  }

  @Delete('/carts/:sessionId/:productId/:quantity')
  public async removeItem(
    @Param('sessionId') sessionId: string,
    @Param('productId') productId: string,
    @Param('quantity', ParseIntPipe) quantity: number,
  ): Promise<CartDto> {
    const cart = await this.removeCartItem.execute({
      sessionId,
      productId,
      quantity,
    });

    return plainToInstance(CartDto, cart.toJSON());
  }

  @Get('/carts/:sessionId')
  public async index(
    @Param('sessionId') sessionId: string,
  ): Promise<CartDto | null> {
    const cart = await this.findCartById.execute(sessionId);

    return cart ? plainToInstance(CartDto, cart.toJSON()) : null;
  }
}
