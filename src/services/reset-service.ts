'use server';

import db from '@/lib/db';
import { generateResetToken } from './utils-service';

export const getResetToken = async (token: string) => {
  return db.resetToken.findUnique({ where: { token } });
};

export const getResetTokenByEmail = async (email: string) => {
  return db.resetToken.findUnique({ where: { email } });
};

export const createResetToken = async (email: string) => {
  const existing = await getResetTokenByEmail(email);

  if (existing) {
    await deleteResetTokenById(existing.id);
  }

  const token = await generateResetToken();

  return db.resetToken.create({
    data: {
      email,
      token: token,
      // expires in an hour
      expires: new Date(Date.now() + 1 * 60 * 1000),
    },
  });
};

export const deleteResetTokenById = async (id: string) => {
  return db.resetToken.delete({ where: { id } });
};
