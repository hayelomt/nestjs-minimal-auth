'use server';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/services/auth-service';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validated = LoginSchema.safeParse(values);

  if (!validated.success) {
    return {
      data: null,
      error: `Invalid fields ${Object.values(validated.error).join(', ')}`,
    };
  }

  const { email, password } = validated.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return {
      data: null,
      error: 'Invalid credentials',
    };
  }

  if (!user.password) {
    return {
      data: null,
      error: 'Password login is not enabled for this account',
    };
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return {
      data: null,
      error: 'Invalid credentials',
    };
  }

  return { data: 'Valid login', error: null };
};
