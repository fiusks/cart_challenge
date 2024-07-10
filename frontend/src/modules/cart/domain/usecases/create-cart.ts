import { Cart } from '../models';

export interface CreateCart {
  execute(sessionId: string): Promise<Cart>;
}
