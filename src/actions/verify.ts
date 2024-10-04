'use server';

import db from '@/lib/db';
import { verifyEmail } from '@/services/auth-service';
import { deleteVerificationToken } from '@/services/token-service';

export const verifyToken = async (token: string) => {
  const verification = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!verification) {
    return {
      error: 'Invalid token',
    };
  }

  if (new Date() > verification.expires) {
    return {
      error: 'Token has expired',
    };
  }

  await verifyEmail(verification.identifier);

  await deleteVerificationToken(token);

  return {
    success: 'Email verified',
  };
};
