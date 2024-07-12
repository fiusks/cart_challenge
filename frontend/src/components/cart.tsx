import type { Cart } from '@/modules/cart';
import Drawer from './drawer';
import { IoBagHandleOutline } from 'react-icons/io5';
import { convertCurrency } from '@/modules';
import { handleAddProduct, handleRemoveCartItem } from '@/app/actions';
interface CartProps {
  onClose: () => void;
  cart: Cart;
}
export function Cart({ cart, onClose }: CartProps) {
  const cartTotalItems = cart.itemsSum;
  const drawerTitle = cartTotalItems ? `${cartTotalItems} Items` : 'Cart';

  return (
    <Drawer
      onClose={onClose}
      position="right"
      title={drawerTitle}
      icon={<IoBagHandleOutline />}
    >
      <div>
        <section className="flex items-center flex-col text-black">
          <p className="text-xs p-3">Spend more $29.00 to get free shipping!</p>
          <div className="h-1 bg-gray-200 w-full rounded overflow-hidden">
            <div
              className="h-full bg-green-700 transition-width ease-in-out duration-1000"
              style={{ width: `${66}%` }}
            ></div>
          </div>
        </section>
        <section className="flex flex-col pt-5">
          <ul className="divide-y divide-gray-200 ">
            {cart.items.map((item) => (
              <li key={item.product.id} className="py-4">
                <div className="grid grid-cols-3">
                  <img src={item.product.imageUrl} width={150} height={100} />
                  <div className=" flex flex-col items-center justify-center">
                    <p className="py-5">{item.product.name}</p>
                    <div className="grid grid-cols-2 py-2">
                      <div className="flex space-x-4 border  border-gray-300 rounded p-2 justify-center items-center">
                        <button
                          onClick={() => handleRemoveCartItem(item.product.id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleAddProduct(item.product.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveCartItem(item.product.id, item.quantity)
                        }
                        className="px-5 mt-6 text-xs"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center items-center text-sm">
                    <p>{convertCurrency(item.product.price, 'en-US', 'USD')}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col items-center w-full">
          <div className="flex flex-row justify-between w-full p-5 items-center">
            <p className="uppercase">total</p>
            <p>{convertCurrency(cart.total, 'en-US', 'USD')}</p>
          </div>
          <button className="p-5 uppercase text-white w-full bg-[#4c7f63]">
            check out
          </button>
        </section>
      </div>
    </Drawer>
  );
}
