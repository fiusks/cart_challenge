import { Controller, Get } from '@nestjs/common';
import { ListProductsdService } from '../../application';
import { ProductDto } from '../dtos';

@Controller()
export class ProductController {
  constructor(private readonly listProducts: ListProductsdService) {}

  @Get('/products')
  public async index(): Promise<ProductDto[]> {
    const result = await this.listProducts.execute();

    return result.map((product) => product.toJSON());
  }
}
