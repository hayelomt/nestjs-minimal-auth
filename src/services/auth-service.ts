'use server';

import db from '@/lib/db';

export const emailExists = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } });

  return !!user;
};

export const getUserByEmail = async (email: string) => {
  return db.user.findUnique({ where: { email } });
};

export const getUserById = async (id: string) => {
  return db.user.findUnique({ where: { id } });
};

export const verifyEmail = async (email: string) => {
  return db.user.update({
    where: { email },
    data: {
      emailVerified: new Date(),
    },
  });
};
