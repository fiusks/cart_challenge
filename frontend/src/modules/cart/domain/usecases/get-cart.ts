import { Cart } from '../models';

export interface GetCart {
  execute(): Promise<Cart>;
}
