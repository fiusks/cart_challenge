import { Product } from './product.entity';

describe('Product', () => {
  test('should create a Product instance with correct properties', () => {
    const price = BigInt(100);
    const productName = 'Floratta';
    const product = Product.create({
      name: productName,
      price,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0587/6075/7446/files/BT-US_Malbec-Regular-1_1060b816-76ec-49ab-81a6-c284715e56cc.jpg?v=1717775207&width=626&crop=center',
    });

    expect(product).toBeInstanceOf(Product);
    expect(product.name).toEqual(productName);
    expect(product.price.value).toBe(price);
  });
});
