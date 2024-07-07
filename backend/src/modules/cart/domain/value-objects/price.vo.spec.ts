import { Price } from './price.vo';

describe('Price', () => {
  test('should create a instance of Price', () => {
    const priceValue = 100;
    const price = Price.create(BigInt(100));
    expect(price).toBeInstanceOf(Price);
    expect(price.value).toBe(BigInt(priceValue));
    expect(price.toJSON()).toEqual(priceValue.toString());
  });

  test('should throw an error for negative price', () => {
    expect(() => {
      Price.create(BigInt(-100));
    }).toThrow();
  });
});
