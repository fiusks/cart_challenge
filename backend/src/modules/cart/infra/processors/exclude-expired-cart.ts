import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Cart, CartRepository } from '../../domain';

@Processor('DeleteCartOnExpireQueue')
export class DeleteCartOnExpireProcessor {
  constructor(public readonly cartRepository: CartRepository) {}

  @Process('DeleteCartOnExpireQueue')
  public async transcode(job: Job<Cart.JSON>): Promise<void> {
    const cartFromJob = job.data;

    const cart = await this.cartRepository.findById(cartFromJob.id);

    if (!cart) return;

    await this.cartRepository.delete(cart);
  }
}
