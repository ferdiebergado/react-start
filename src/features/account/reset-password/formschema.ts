import { z } from 'zod';

export const formSchema = z
  .object({
    password: z.string().trim(),
    confirmPassword: z.string().trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword)
  .required({ password: true, confirmPassword: true });
