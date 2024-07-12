'use client';
import { handleAddProduct } from '@/app/actions';
import { convertCurrency, Product } from '@/modules';
import Image from 'next/image';

interface ProductListPorps {
  products: Product[];
}

export function ProductsList({ products }: ProductListPorps) {
  return (
    <section className="flex flex-col items-center justify-center mt-5 pt-5">
      <h1>Nossos Produtos</h1>
      <div className="grid grid-cols-1 gap-8 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-center p-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center justify-center p-2 rounded-md w-48 bg-white border-2 hover:border-blue-500 transition duration-200 ease-in-out"
          >
            <Image
              src={product.imageUrl}
              alt="imagem do produto"
              width={150}
              height={100}
              unoptimized
            />
            <div className="flex flex-col size-full items-center justify-center">
              <h3 className="text-sm font-medium mt-4">{product.name}</h3>
              <p className="text-sm font-semibold mt-2">
                {convertCurrency(BigInt(product.price), 'en-US', 'USD')}
              </p>

              <button
                onClick={() => handleAddProduct(product.id)}
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 mt-4 hover:bg-blue-600 transition duration-200 ease-in-out text-xs"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
