import { ListProducts, Product } from '../../domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListProductsdService {
  constructor(private readonly listProducts: ListProducts) {}

  public async execute(): Promise<Product[]> {
    return this.listProducts.execute();
  }
}
