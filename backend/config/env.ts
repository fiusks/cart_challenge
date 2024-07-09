import { z } from 'zod';

export const env = z.object({
  PORT: z.coerce.number().optional().default(3333),
  ADDRESS: z.string().ip(),
  PRISMA_DATABASE_URL: z.string(),
});

export type EnvConfig = z.infer<typeof env>;
