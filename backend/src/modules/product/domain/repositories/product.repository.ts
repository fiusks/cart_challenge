import { Product } from '../entities';

export interface ProductRepository {
  findById(id: string): Promise<Product>;
  findAll(): Promise<Product[]>;
}
