'use server';

import { SignUpSchema } from '@/schemas';
import { z } from 'zod';

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validated = SignUpSchema.safeParse(values);

  if (!validated.success) {
    return {
      data: null,
      error: `Invalid fields ${Object.values(validated.error).join(', ')}`,
    };
  }

  return { data: 'Email sent', error: null };
};
