import { z } from 'zod';

export const env = z.object({
  PORT: z.coerce.number().optional().default(3333),
  ADDRESS: z.string().ip(),
  PRISMA_DATABASE_URL: z.string(),
  //BULL
  BULL_REDIS_PREFIX: z.string(),
  BULL_REDIS_HOST: z.string(),
  BULL_REDIS_PORT: z.coerce.number(),
  BULL_REDIS_DB: z.coerce.number(),
  BULL_REDIS_USERNAME: z.string().optional(),
  BULL_REDIS_PASSWORD: z.string().optional(),
  BULL_REDIS_TLS_ENABLE: z
    .enum(['true', 'false'])
    .default('true')
    .transform((tlsEnable) => {
      if (tlsEnable === 'false') return false;
      return Boolean(tlsEnable);
    }),
  BULL_REDIS_REMOVE_ON_COMPLETE: z
    .enum(['true', 'false'])
    .default('true')
    .transform((removeOnComplete) => {
      if (removeOnComplete === 'false') return false;
      return Boolean(removeOnComplete);
    }),
  BULL_REDIS_REMOVE_ON_FAIL: z
    .enum(['true', 'false'])
    .default('true')
    .transform((removeOnFail) => {
      if (removeOnFail === 'false') return false;
      return Boolean(removeOnFail);
    }),
  BULL_REDIS_ATTEMPTS: z.coerce.number(),
  BULL_REDIS_ATTEMPTS_TYPE: z
    .enum(['exponential', 'fixed'])
    .default('exponential'),
  BULL_REDIS_ATTEMPTS_DELAY: z.coerce.number().default(600),
});

export type EnvConfig = z.infer<typeof env>;
