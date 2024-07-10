import { FactoryProvider } from '@nestjs/common';

import { createCartFactoryService } from './create-cart-service.factory';
import { deleteCartFactoryService } from './delete-cart-service.factory';
import { findCartBydIdFactoryService } from './find-cart-by-id-service..factory';
import { updateCartFactoryService } from './update-cart-service.factory';
import { addCartItemFactoryService } from './add-cart-item-service.factory';
import { removeCartItemFactoryService } from './remove-cart-item-service.factory';

export const applicationFactories: FactoryProvider[] = [
  addCartItemFactoryService,
  createCartFactoryService,
  deleteCartFactoryService,
  findCartBydIdFactoryService,
  removeCartItemFactoryService,
  updateCartFactoryService,
];
