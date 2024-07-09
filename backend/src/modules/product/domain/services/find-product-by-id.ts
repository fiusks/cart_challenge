import { EntityId } from '~/modules/common/domain';
import { ProductRepository } from '../repositories';
import { Product } from '../entities';

export class FindProductById {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(id: EntityId): Promise<Product> {
    return this.productRepository.findById(id.id);
  }
}
