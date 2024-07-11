import { Type } from 'class-transformer';
import { CartItemDto } from './cart-item.dto';

export class CartDto {
  public readonly id: string;
  public readonly sessionId: string;

  @Type(() => CartItemDto)
  public readonly items: CartItemDto[];

  public readonly total: string;
  public readonly itemsSum: number;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
