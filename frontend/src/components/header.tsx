import Logo from '../assets/Brand-logo-new_1 (1).png';

import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineShoppingCart } from 'react-icons/md';

export interface HeaderProps {
  cartItemsCount: number;
}

export function Header({ cartItemsCount }: HeaderProps) {
  return (
    <header className="flex flex-col">
      <div className="text-xs flex items-center justify-center bg-[#1f2622] p-5">
        <p className="uppercase text-white">
          new here? find your perfect start
        </p>
      </div>
      <div className="flex flex-row items-center justify-between w-full px-8 py-5 bg-[#4c7f63]">
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo Boticário"
            style={{ height: 15, width: 'auto' }}
          />
        </Link>

        <div className="text-white uppercase">gift guide</div>
        <div className="text-white uppercase">best sellers</div>
        <div className="text-white uppercase">shop</div>
        <div className="text-white uppercase">gifts</div>
        <div className="text-white uppercase">brands</div>
        <div className="text-white uppercase">sale</div>
        <div className="text-white uppercase">stores</div>
        <div className="text-white uppercase">about</div>

        <div className="flex flex-row items-center">
          <div>
            <Link
              href="/cart"
              className="text-black hover:text-blue-500 duration-100"
              style={{
                fontSize: 12,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 22,
              }}
            >
              <div className="relative">
                <MdOutlineShoppingCart color="white" size={24} />
                <span className="absolute bottom-4 left-4 inline-flex items-center justify-center h-4 w-4 rounded-full bg-white text-black">
                  {cartItemsCount}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
