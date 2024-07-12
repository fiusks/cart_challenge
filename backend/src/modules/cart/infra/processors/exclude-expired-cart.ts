import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Cart, CartRepository } from '../../domain';
import { differenceInMilliseconds } from 'date-fns';

@Processor('DeleteCartOnExpireQueue')
export class DeleteCartOnExpireProcessor {
  constructor(public readonly cartRepository: CartRepository) {}

  @Process('DeleteCartOnExpireQueue')
  public async transcode(job: Job<Cart.JSON>): Promise<void> {
    const cartFromJob = job.data;

    const cart = await this.cartRepository.findById(cartFromJob.sessionId);

    if (!cart) return;

    const remmaingTimeToExclude = differenceInMilliseconds(
      cart.dateToExclude(),
      new Date(),
    );

    if (remmaingTimeToExclude > 0) {
      await job.queue.add('DeleteCartOnExpireQueue', cart.toJSON(), {
        delay: remmaingTimeToExclude,
      });

      return;
    }

    await this.cartRepository.delete(cart);
  }
}
