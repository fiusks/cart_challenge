import { ProductsList } from '@/components/produc-list';
import { Header } from '../components/header';
import { makeGetProducts, Product } from '@/modules';
import {
  makeAddCartItem,
  makeCreateCart,
  makeGetCart,
} from '@/modules/cart/main';

export default async function Home() {
  const sessionId = '9f5b2714-09f1-4b68-9e84-c82779652e49';

  // Fetch products and initial cart

  const initialCart = await (async () => {
    const existingCart = await makeGetCart().execute(sessionId);

    if (!existingCart) {
      return await makeCreateCart().execute(sessionId);
    }

    return existingCart;
  })();

  async function handleAddProduct(productId: string) {
    'use server';
    const updatedCart = await makeAddCartItem().execute({
      productId,
      sessionId,
    });
    console.log('🚀 ~ updatedCart ~ updatedCart:', updatedCart);
  }

  const products = await makeGetProducts().execute();

  return (
    <main className="flex-1 flex-col items-center justify-between bg-neutral-50 rounded-lg">
      <Header cartItemsCount={initialCart.items.length} />
      <ProductsList products={products} addToCart={handleAddProduct} />
    </main>
  );
}
