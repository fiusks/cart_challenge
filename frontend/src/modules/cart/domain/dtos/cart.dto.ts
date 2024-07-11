import { CartItemDto } from './cart-item.dto';

export interface CartDto {
  id: string;
  sessionId: string;
  items: CartItemDto[];
  itemsSum: number;
  total: string;
  createdAt: Date;
  updatedAt: Date;
}
