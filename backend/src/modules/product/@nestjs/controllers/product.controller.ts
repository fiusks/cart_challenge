import { Controller, Get } from '@nestjs/common';
import { ListProductsdService } from '../../application';
import { Product } from '../../domain';

@Controller()
export class ProductController {
  constructor(private readonly listProducts: ListProductsdService) {}

  @Get()
  public async index(): Promise<Product[]> {
    return this.listProducts.execute();
  }
}
