'use server';

import db from '@/lib/db';
import { generateVerificationToken } from './utils-service';

export const setVerificationToken = async (identifier: string) => {
  const existing = await getTokenByIdentifier(identifier);
  if (existing) {
    await deleteVerificationToken(existing.token);
  }

  const token = await generateVerificationToken();
  return db.verificationToken.create({
    data: {
      identifier,
      token,
      // expires in 1 hour
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
  });
};

export const deleteVerificationToken = (token: string) => {
  return db.verificationToken.delete({
    where: { token },
  });
};

export const getTokenByIdentifier = (identifier: string) => {
  return db.verificationToken.findFirst({
    where: { identifier },
  });
};
