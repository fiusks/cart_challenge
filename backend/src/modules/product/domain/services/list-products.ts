import { ProductRepository } from '../repositories';
import { Product } from '../entities';

export class ListProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
