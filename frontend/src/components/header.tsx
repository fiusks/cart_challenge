'use client';
import Logo from '../assets/Brand-logo-new_1 (1).png';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useState } from 'react';
import { Cart } from './cart';
import { IoMenuOutline } from 'react-icons/io5';
import type { Cart as CartModel } from '@/modules/cart';
import Drawer from './drawer';

interface HeaderProps {
  cart: CartModel;
}

export function Header({ cart }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <header className="flex flex-col text-white">
        <div className="text-xs flex items-center justify-center bg-[#1f2622] p-5">
          <p className="uppercase">new here? find your perfect start</p>
        </div>
        <div className="flex items-center justify-between w-full px-8 py-5 bg-[#4c7f63]">
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <IoMenuOutline className="text-2xl" />
            </button>
          </div>

          <div className="flex justify-center md:justify-start ">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                alt="Logo Boticário"
                style={{ height: 15, width: 'auto' }}
              />
            </Link>
          </div>

          <nav className="hidden lg:flex justify-between items-center w-2/3">
            <a className="text-white uppercase">gift guide</a>
            <a className="text-white uppercase">best sellers</a>
            <a className="text-white uppercase">shop</a>
            <a className="text-white uppercase">gifts</a>
            <a className="text-white uppercase">brands</a>
            <a className="text-white uppercase">sale</a>
            <a className="text-white uppercase">stores</a>
            <a className="text-white uppercase">about</a>
          </nav>

          <div className="flex items-center">
            <button
              onClick={toggleCart}
              className="text-black hover:text-blue-500 duration-100"
              style={{
                fontSize: 12,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div className="relative">
                <MdOutlineShoppingCart color="white" size={24} />
                <span className="absolute bottom-4 left-4 inline-flex items-center justify-center h-4 w-4 rounded-full bg-white text-black">
                  {cart.itemsSum}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="lg:hidden text-black">
          <Drawer onClose={toggleMenu} position="left">
            <nav className="flex text-black gap-5 pt-5 flex-col justify-center items-start">
              <a className="uppercase border-b border-gray-300 py-2 w-full block">
                gift guide
              </a>
              <a className="uppercase border-b border-gray-300 py-2 w-full block">
                best sellers
              </a>
              <a className="uppercase border-b border-gray-300 py-2 w-full block">
                shop
              </a>
              <a className="uppercase border-b border-gray-300 py-2 w-full block">
                gifts
              </a>
              <a className="uppercase border-b border-gray-300 py-2 w-full block">
                brands
              </a>
              <a className="uppercase border-b border-gray-300 py-2 w-full block">
                sale
              </a>
              <a className="uppercase border-b border-gray-300 py-2 w-full block">
                stores
              </a>
              <a className="uppercase border-b border-gray-300 py-2 w-full block">
                about
              </a>
            </nav>
          </Drawer>
        </div>
      )}

      {isCartOpen && <Cart key={cart.id} cart={cart} onClose={toggleCart} />}
    </>
  );
}
