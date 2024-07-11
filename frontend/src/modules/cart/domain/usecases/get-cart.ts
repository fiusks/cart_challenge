import { Cart } from '../models';

export interface GetCart {
  execute(sessionId: string): Promise<Cart | null>;
}
