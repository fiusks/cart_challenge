'use server';
import {
  makeAddCartItem,
  makeCreateCart,
  makeGetCart,
  makeRemoveCartItemt,
} from '@/modules/cart/main';
import { revalidateTag } from 'next/cache';

export async function handleAddProduct(productId: string) {
  await makeAddCartItem().execute({
    productId,
    sessionId: '9f5b2714-09f1-4b68-9e84-c82779652e49',
  });

  revalidateTag('cart');
}

export async function handleRemoveCartItem(productId: string) {
  await makeRemoveCartItemt().execute({
    productId,
    sessionId: '9f5b2714-09f1-4b68-9e84-c82779652e49',
  });

  revalidateTag('cart');
}

export async function getCart(sessionId: string) {
  const existingCart = await makeGetCart().execute(sessionId);

  if (existingCart) return existingCart;

  await makeCreateCart().execute(sessionId);

  revalidateTag('cart');
}
