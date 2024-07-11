'use client';

import { handleAddProduct } from '@/app/actions';
import { convertCurrency, Product } from '@/modules';
import Image from 'next/image';

interface ProductListPorps {
  products: Product[];
}

export async function ProductsList({ products }: ProductListPorps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center p-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col items-center justify-center p-2 rounded-md w-48 bg-white border-2 hover:border-blue-500 transition duration-200 ease-in-out"
        >
          <Image
            src={product.imageUrl}
            alt="imagem do produto"
            width={100}
            height={100}
            unoptimized
          />
          <div className="flex flex-col size-full justify-center">
            <h3 className="text-sm font-medium mt-4">{product.name}</h3>
            <p className="text-sm font-semibold mt-2">
              {convertCurrency(BigInt(product.price), 'pt-BR')}
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
    </section>
  );
}
