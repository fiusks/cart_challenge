import { Cart, CartDto } from '../domain';

export function cartConverterToBigInt(cart: CartDto): Cart {
  const cartItems = cart.items;

  const microsBigInt = BigInt(1000000);

  const convertedCartItemsToBigInt = cartItems.map((item) => {
    const product = item.product;

    return {
      ...item,
      product: {
        ...product,
        price: BigInt(product.price) / microsBigInt,
      },
    };
  });

  return {
    ...cart,
    total: BigInt(cart.total) / microsBigInt,
    items: convertedCartItemsToBigInt,
  };
}
