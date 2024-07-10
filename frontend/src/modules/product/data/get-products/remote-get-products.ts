import { HttpClient } from '@/modules/common';
import { GetProducts, Product } from '../../domain';
import { ProductDto } from '../../domain/dtos/product.dto';

export class RemoteGetProducts implements GetProducts {
  constructor(private readonly httpClient: HttpClient) {}

  public async execute(): Promise<Product[]> {
    const response = await this.httpClient('products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const products = (await response.json()) as ProductDto[];

    const productConvertedToBigInt = products.map((product) => ({
      ...product,
      price: BigInt(product.price) / BigInt(1000000),
    }));

    return productConvertedToBigInt;
  }
}
