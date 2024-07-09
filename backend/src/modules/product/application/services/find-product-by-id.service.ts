import { EntityId } from '~/modules/common/domain';
import { FindProductById, Product } from '../../domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindProductByIdService {
  constructor(private readonly findProductById: FindProductById) {}

  public async execute(id: EntityId): Promise<Product> {
    return this.findProductById.execute(id);
  }
}
