import { Product } from './product.entity';

describe('Product', () => {
  test('should create a Product instance with correct properties', () => {
    const price = BigInt(100);
    const productName = 'Floratta';
    const product = Product.create({ name: productName, price });

    expect(product).toBeInstanceOf(Product);
    expect(product.name).toEqual(productName);
    expect(product.price.value).toBe(price);
  });
});
