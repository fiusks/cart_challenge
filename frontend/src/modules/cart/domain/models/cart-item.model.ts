import { Product } from '@/modules/product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
