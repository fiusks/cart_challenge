import { Quantity } from './quantity.vo';

describe('Quantity', () => {
  describe('constructor', () => {
    test('should create a Quantity instance', () => {
      const quantity = Quantity.create(3);
      expect(quantity).toBeInstanceOf(Quantity);
      expect(quantity.value).toEqual(3);
    });

    test('should throw an error for quantity less than 1', () => {
      expect(() => {
        Quantity.create(0);
      }).toThrow();
    });
  });

  describe('increment', () => {
    test('should increment by default amount (1)', () => {
      const quantity = Quantity.create(3);
      quantity.increment();
      expect(quantity.value).toEqual(4);
    });

    test('should increment by specified amount', () => {
      const quantity = Quantity.create(3);
      quantity.increment(2);
      expect(quantity.value).toEqual(5);
    });

    test('should throw an error for negative increment amount', () => {
      const quantity = Quantity.create(3);
      expect(() => {
        quantity.increment(-1);
      }).toThrow();
    });
  });

  describe('decrement', () => {
    test('should decrement by default amount (1)', () => {
      const quantity = Quantity.create(3);
      quantity.decrement();
      expect(quantity.value).toEqual(2);
    });

    test('should decrement by specified amount', () => {
      const quantity = Quantity.create(3);
      quantity.decrement(2);
      expect(quantity.value).toEqual(1);
    });

    test('should throw an error for decrementing below zero', () => {
      const quantity = Quantity.create(3);
      expect(() => {
        quantity.decrement(4);
      }).toThrow();
    });

    test('should throw an error for zero or negative decrement amount', () => {
      const quantity = Quantity.create(3);
      expect(() => {
        quantity.decrement(0);
      }).toThrow();

      expect(() => {
        quantity.decrement(-1);
      }).toThrow();
    });
  });
});
