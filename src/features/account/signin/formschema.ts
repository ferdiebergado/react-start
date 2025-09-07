import { z } from 'zod';

export const formSchema = z
  .object({
    email: z.email().trim(),
    password: z.string().trim(),
  })
  .required({
    email: true,
    password: true,
  });
