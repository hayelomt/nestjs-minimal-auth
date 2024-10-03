'use server';

import { SignUpSchema } from '@/schemas';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import { emailExists } from '@/services/auth-service';

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validated = SignUpSchema.safeParse(values);

  if (!validated.success) {
    return {
      data: null,
      error: `Invalid fields ${Object.values(validated.error).join(', ')}`,
    };
  }

  const { email, password, name } = validated.data;

  if (await emailExists(email)) {
    return {
      data: null,
      error: 'Email already in use',
    };
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      password: hashed,
      name,
    },
  });

  return { data: 'Email sent', error: null };
};
