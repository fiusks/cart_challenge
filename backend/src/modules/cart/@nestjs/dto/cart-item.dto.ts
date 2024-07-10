import { Type } from 'class-transformer';
import { ProductDto } from '~/modules/product/@nestjs';

export class CartItemDto {
  public readonly id: string;

  @Type(() => ProductDto)
  public readonly product: ProductDto;

  public readonly quantity: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
