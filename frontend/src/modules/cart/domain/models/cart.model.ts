import { CartItem } from './cart-item.model';

export interface Cart {
  id: string;
  sessionId: string;
  items: CartItem[];
  itemsSum: number;
  total: string;
  createdAt: Date;
  updatedAt: Date;
}
