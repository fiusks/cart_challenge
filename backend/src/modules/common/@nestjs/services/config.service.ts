import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { EnvConfig } from '~/config/env';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService<EnvConfig, true>) {}

  public get<T extends keyof EnvConfig>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
