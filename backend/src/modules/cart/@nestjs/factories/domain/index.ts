import { FactoryProvider } from '@nestjs/common';
import { createCartFactory } from './create-cart-factory';
import { deleteCartFactory } from './delete-cart-factory';
import { findCartBydIdFactory } from './find-cart-by-id.factory';
import { updateCartFactory } from './update-cart-factory';
import { addCartItemFactory } from './add-cart-item.factory';
import { removeCartItemFactory } from './remove-cart-item.factory';

export const domainFactories: FactoryProvider[] = [
  addCartItemFactory,
  createCartFactory,
  deleteCartFactory,
  findCartBydIdFactory,
  removeCartItemFactory,
  updateCartFactory,
];
