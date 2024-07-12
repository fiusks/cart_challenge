'use server';
import {
  makeAddCartItem,
  makeCreateCart,
  makeGetCart,
  makeRemoveCartItemt,
} from '@/modules/cart/main';
import { revalidateTag } from 'next/cache';
import { generateSession } from '../session';

export async function handleAddProduct(productId: string) {
  const sessionId = await generateSession();

  await handleGetCart(sessionId);

  await makeAddCartItem().execute({
    productId,
    sessionId,
  });

  revalidateTag('cart');
}

export async function handleRemoveCartItem(
  productId: string,
  quantity?: number,
) {
  const sessionId = await generateSession();
  await makeRemoveCartItemt().execute({
    productId,
    sessionId,
    quantity,
  });

  revalidateTag('cart');
}

export async function handleGetCart(sessionId: string) {
  const existingCart = await makeGetCart().execute(sessionId);

  if (existingCart) return existingCart;

  const cart = await makeCreateCart().execute(sessionId);

  revalidateTag('cart');

  return cart;
}
