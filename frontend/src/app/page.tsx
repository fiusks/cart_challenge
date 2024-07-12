import { ProductsList } from '@/components/produc-list';
import { Header } from '../components/header';

import { makeGetProducts } from '@/modules';
import { handleGetCart } from './actions';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export default async function Home() {
  const products = await makeGetProducts().execute();

  const cart = await (async () => {
    const sessionId = cookies().get('sessionId');

    if (sessionId) {
      return await handleGetCart(sessionId.value);
    }

    revalidateTag('cart');

    return null;
  })();

  return (
    <main className="flex-1 flex-col items-center justify-between bg-neutral-50 rounded-lg min-h-screen">
      <Header cart={cart} />
      <ProductsList products={products} />
    </main>
  );
}
