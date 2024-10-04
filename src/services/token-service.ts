'use server';

import db from '@/lib/db';
import { generateVerificationToken } from './utils-service';
import { verifyEmail } from './auth-service';

export const setVerificationToken = async (identifier: string) => {
  const token = await generateVerificationToken();
  return db.verificationToken.create({
    data: {
      identifier,
      token,
      // expires in 1 minutes
      expires: new Date(Date.now() + 1 * 60 * 1000),
    },
  });
};

export const deleteVerificationToken = (token: string) => {
  return db.verificationToken.delete({
    where: { token },
  });
};

export const verifyToken = async (token: string) => {
  const verification = await db.verificationToken.findUnique({
    where: { token },
  });

  console.log({ verification });

  if (!verification) {
    return {
      error: 'Invalid token',
    };
  }

  if (new Date() > verification.expires) {
    return {
      error: 'Token expired',
      type: 'expired',
    };
  }

  await verifyEmail(verification.identifier);

  await deleteVerificationToken(token);

  return {
    success: 'Email verified',
  };
};
