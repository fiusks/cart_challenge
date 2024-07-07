import { Price } from './price.vo';

describe('Price', () => {
  test('should create a instance of Price', () => {
    const priceValue = BigInt(100);
    const price = new Price(priceValue);
    expect(price).toBeInstanceOf(Price);
    expect(price.getValue()).toEqual(priceValue);
  });

  test('should throw an error for negative price', () => {
    expect(() => {
      new Price(BigInt(-100));
    }).toThrow();
  });
});
