import { FactoryProvider } from '@nestjs/common';
import { createCartFactory } from './create-cart-factory';
import { deleteCartFactory } from './delete-cart-factory';
import { findCartBydIdFactory } from './find-cart-by-id.factory';
import { updateCartFactory } from './update-cart-factory';

export const domainFactories: FactoryProvider[] = [
  createCartFactory,
  deleteCartFactory,
  findCartBydIdFactory,
  updateCartFactory,
];
