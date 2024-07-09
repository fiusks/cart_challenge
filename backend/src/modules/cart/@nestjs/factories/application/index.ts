import { FactoryProvider } from '@nestjs/common';

import { createCartFactoryService } from './create-cart-service.factory';
import { deleteCartFactoryService } from './delete-cart-service.factory';
import { findCartBydIdFactoryService } from './find-cart-by-id-service..factory';
import { updateCartFactoryService } from './update-cart-service.factory';

export const applicationFactories: FactoryProvider[] = [
  createCartFactoryService,
  deleteCartFactoryService,
  findCartBydIdFactoryService,
  updateCartFactoryService,
];
