import { Injectable } from '@nestjs/common';
import { Cart, FindCartById } from '../../domain';

@Injectable()
export class FindCartByIdService {
  constructor(private readonly findCartById: FindCartById) {}

  public async execute(id: string): Promise<Cart> {
    return this.findCartById.execute(id);
  }
}
