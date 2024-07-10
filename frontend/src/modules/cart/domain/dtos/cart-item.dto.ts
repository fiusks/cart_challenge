import { ProductDto } from '@/modules/product';

export interface CartItemDto {
  id: string;
  product: ProductDto;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
