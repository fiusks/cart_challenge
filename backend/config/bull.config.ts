import {
  BullRootModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { ConnectionOptions } from 'tls';
import { ConfigService } from '~/modules/common/@nestjs/services/config.service';

@Injectable()
export class BullConfig implements SharedBullConfigurationFactory {
  constructor(private readonly configService: ConfigService) {}

  public createSharedConfiguration(): BullRootModuleOptions {
    const tlsIsEnabled = this.configService.get('BULL_REDIS_TLS_ENABLE');
    const tls: ConnectionOptions | undefined = tlsIsEnabled
      ? {
          servername: this.configService.get('BULL_REDIS_HOST'),
        }
      : undefined;

    const removeOnComplete = this.configService.get(
      'BULL_REDIS_REMOVE_ON_COMPLETE',
    );
    const removeOnFail = this.configService.get('BULL_REDIS_REMOVE_ON_FAIL');

    const jobsRetryAttempts = this.configService.get('BULL_REDIS_ATTEMPTS');
    const jobsRetryType = this.configService.get('BULL_REDIS_ATTEMPTS_TYPE');
    const jobsRetryDelay = this.configService.get('BULL_REDIS_ATTEMPTS_DELAY');

    return {
      prefix: this.configService.get('BULL_REDIS_PREFIX'),
      redis: {
        db: this.configService.get('BULL_REDIS_DB'),
        host: this.configService.get('BULL_REDIS_HOST'),
        port: this.configService.get('BULL_REDIS_PORT'),
        password: this.configService.get('BULL_REDIS_PASSWORD'),
        tls,
      },
      defaultJobOptions: {
        removeOnComplete,
        removeOnFail,
        attempts: jobsRetryAttempts,
        backoff: {
          type: jobsRetryType,
          delay: jobsRetryDelay,
        },
      },
    };
  }
}
