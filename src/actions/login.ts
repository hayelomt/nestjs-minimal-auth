'use server';

import { LoginSchema } from '@/schemas';
import { z } from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validated = LoginSchema.safeParse(values);

  if (!validated.success) {
    return {
      data: null,
      error: `Invalid fields ${Object.values(validated.error).join(', ')}`,
    };
  }

  return { data: 'Email sent', error: null };
};
