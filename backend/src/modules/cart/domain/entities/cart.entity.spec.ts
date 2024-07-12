import { v4 as uuidv4 } from 'uuid';

import { UnprocessableEntityException } from '@nestjs/common';
import { Cart } from './cart.entity';

describe('Cart', () => {
  const florattaProduct = {
    id: uuidv4(),
    name: 'Floratta',
    price: BigInt(60),
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0587/6075/7446/files/BT-US_Floratta-Summer-Love-Set-1_7e5122cb-5b9d-4624-9da9-b92b7142c178.jpg?v=1716562584&width=626&crop=center',
  };

  const malbecProduct = {
    id: uuidv4(),
    name: 'Malbec',
    price: BigInt(210),
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0587/6075/7446/files/BT-US_Malbec-Regular-1_1060b816-76ec-49ab-81a6-c284715e56cc.jpg?v=1717775207&width=626&crop=center',
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
      sessionId: uuidv4(),
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
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0587/6075/7446/files/BT-US_Malbec-Regular-1_1060b816-76ec-49ab-81a6-c284715e56cc.jpg?v=1717775207&width=626&crop=center',
    };

    expect(() => cart.removeItem({ product, quantity: 5 })).toThrow(
      UnprocessableEntityException,
    );
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
