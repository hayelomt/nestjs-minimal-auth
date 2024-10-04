'use server';

import bcrypt from 'bcryptjs';
import { NewPasswordSchema } from '@/schemas';
import { deleteResetTokenById, getResetToken } from '@/services/reset-service';
import { z } from 'zod';
import db from '@/lib/db';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string
) => {
  const validated = NewPasswordSchema.safeParse(values);

  if (!validated.success) {
    return {
      error: `Invalid fields ${Object.values(validated.error).join(', ')}`,
    };
  }

  if (!token) {
    return {
      error: 'Token not found',
    };
  }

  const { password } = validated.data;

  // Check if token exists in the database
  const resetToken = await getResetToken(token);

  if (!resetToken) {
    return {
      error: 'Invalid token',
    };
  }

  if (resetToken.expires < new Date()) {
    return {
      error: 'Token expired',
    };
  }

  // Update user password
  const hashed = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      email: resetToken.email,
    },
    data: {
      password: hashed,
    },
  });

  // Delete token from the database
  await deleteResetTokenById(resetToken.id);

  return {
    success: 'Password updated',
  };
};
