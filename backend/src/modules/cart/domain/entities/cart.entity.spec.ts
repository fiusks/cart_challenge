import { v4 as uuidv4 } from 'uuid';

import { UnprocessableEntityException } from '@nestjs/common';
import { Cart } from './cart.entity';
import { subHours } from 'date-fns';

describe('Cart', () => {
  const florattaProduct = {
    id: uuidv4(),
    name: 'Floratta',
    price: BigInt(60),
  };

  const malbecProduct = {
    id: uuidv4(),
    name: 'Malbec',
    price: BigInt(210),
  };

  const cartSessionId = uuidv4();

  test('should create a Cart instance', () => {
    const cart = Cart.create({
      sessionId: cartSessionId,
      items: [],
    });

    expect(cart).toBeInstanceOf(Cart);
    expect(cart.sessionId).toBe(cartSessionId);
    expect(cart.items).toHaveLength(0);
    expect(cart.total).toBe(BigInt(0));
  });

  test('should add items to the cart', () => {
    const cart = Cart.create({
      sessionId: cartSessionId,
      items: [],
    });

    cart.addItem({ product: florattaProduct, quantity: 2 });
    cart.addItem({ product: malbecProduct, quantity: 1 });

    expect(cart.items).toHaveLength(2);
    expect(cart.total.toString()).toBe(BigInt(330).toString());
  });

  test('should increase quantity of existing item', () => {
    const cart = Cart.create({
      sessionId: cartSessionId,
      items: [],
    });

    cart.addItem({ product: florattaProduct, quantity: 2 });
    cart.addItem({ product: florattaProduct, quantity: 1 });

    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity.value).toBe(3);
    expect(cart.total.toString()).toBe(BigInt(180).toString());
  });

  test('should remove items from the cart', () => {
    const cart = Cart.create({
      sessionId: cartSessionId,
      items: [],
    });

    cart.addItem({ product: florattaProduct, quantity: 2 });
    cart.addItem({ product: malbecProduct, quantity: 1 });

    cart.removeItem({ product: florattaProduct, quantity: 2 });

    expect(cart.items).toHaveLength(1);
    expect(cart.total.toString()).toBe(BigInt(210).toString());
  });

  test('should throw UnprocessableEntityException when removing non-existent item', () => {
    const cart = Cart.create({
      sessionId: cartSessionId,
      items: [],
    });

    cart.addItem({ product: florattaProduct, quantity: 2 });

    const product = {
      name: 'Non-existent Product',
      price: BigInt(150),
    };

    expect(() => cart.removeItem({ product, quantity: 5 })).toThrow(
      UnprocessableEntityException,
    );
  });

  test('should be enabled if createdAt is younger than 24h', () => {
    const cart = Cart.create({
      sessionId: cartSessionId,
      items: [],
      createdAt: subHours(new Date(), 25),
    });

    expect(cart.enabled).toBe(false);
  });

  test('should be disabled if createdAt is older than 24h', () => {
    const cart = Cart.create({
      sessionId: cartSessionId,
      items: [],
      createdAt: subHours(new Date(), 25),
    });

    expect(cart.enabled).toBe(false);
  });

  test('should convert to JSON', () => {
    const cart = Cart.create({
      sessionId: cartSessionId,
      items: [],
    });

    cart.addItem({ product: florattaProduct, quantity: 2 });
    cart.addItem({ product: malbecProduct, quantity: 1 });

    const json = cart.toJSON();

    expect(json.id).toBeDefined();
    expect(json.sessionId).toBe(cartSessionId);
    expect(json.items).toHaveLength(2);
    expect(json.total.toString()).toBe(BigInt(330).toString());
    expect(json.createdAt).toBeDefined();
    expect(json.updatedAt).toBeDefined();
  });
});
