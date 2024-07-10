import { Cart, CartDto } from '../domain';

export function cartConverterToBigInt(cart: CartDto): Cart {
  const cartItems = cart.items;

  const convertedCartItemsToBigInt = cartItems.map((item) => {
    const product = item.product;

    return {
      ...item,
      product: {
        ...product,
        price: BigInt(product.price) / BigInt(1000000),
      },
    };
  });

  return {
    ...cart,
    items: convertedCartItemsToBigInt,
  };
}
