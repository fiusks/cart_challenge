import { CartItem } from './cart-item.entity';
import { Quantity } from '../value-objects';
import { Product } from '~/modules/product/domain';

describe('CartItem', () => {
  let productProps: Product.CreateProps;
  let quantityProps: Quantity.CreateProps;
  const imageUrl =
    'https://cdn.shopify.com/s/files/1/0587/6075/7446/files/BT-US_Malbec-Regular-1_1060b816-76ec-49ab-81a6-c284715e56cc.jpg?v=1717775207&width=626&crop=center';

  beforeEach(() => {
    productProps = {
      id: '25117f80-79f1-4c18-baff-3c726233cb7d',
      name: 'Floratta',
      price: BigInt(100),
      imageUrl,
    };

    quantityProps = 2;
  });

  test('should create a CartItem instance', () => {
    const cartItem = CartItem.create({
      product: productProps,
      quantity: quantityProps,
    });

    expect(cartItem).toBeInstanceOf(CartItem);
    expect(cartItem.product).toBeInstanceOf(Product);
    expect(cartItem.quantity).toBeInstanceOf(Quantity);
    expect(cartItem.product.name).toBe('Floratta');
    expect(cartItem.quantity.value).toBe(2);
  });

  test('should increase quantity', () => {
    const cartItem = CartItem.create({
      product: productProps,
      quantity: quantityProps,
    });

    cartItem.increaseQuantity(2);

    expect(cartItem.quantity.value).toBe(4);
  });

  test('should decrease quantity', () => {
    const cartItem = CartItem.create({
      product: productProps,
      quantity: quantityProps,
    });

    cartItem.decreaseQuantity(1);

    expect(cartItem.quantity.value).toBe(1);
  });

  test('should decrease quantity by default amount', () => {
    const cartItem = CartItem.create({
      product: productProps,
      quantity: quantityProps,
    });

    cartItem.decreaseQuantity();

    expect(cartItem.quantity.value).toBe(1);
  });

  test('should convert to JSON', () => {
    const cartItem = CartItem.create({
      product: productProps,
      quantity: quantityProps,
    });

    const json = cartItem.toJSON();

    expect(json.product.name).toBe('Floratta');
    expect(json.quantity).toBe(2);
  });
});
