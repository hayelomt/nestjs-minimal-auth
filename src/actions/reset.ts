'use server';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/services/auth-service';
import { sendEmail } from '@/services/email-service';
import { createResetToken } from '@/services/reset-service';
import { z } from 'zod';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validated = ResetSchema.safeParse(values);

  if (!validated.success) {
    return {
      error: `Invalid fields ${Object.values(validated.error).join(', ')}`,
    };
  }

  const { email } = validated.data;

  const user = await getUserByEmail(email);

  if (user === null) {
    return {
      error: 'Email does not exist',
    };
  }

  const resetToken = await createResetToken(email);

  await sendEmail(
    email,
    'Reset your password',
    `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${resetToken.token}">here</a> to reset your password</p>
    <p>
      Or copy and paste the following link in your browser: ${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${resetToken.token}
    </p>
    <p>
      If you didn't request a password reset, you can ignore this email.
    </p>
    `
  );

  return {
    success: 'Password reset email sent',
  };
};
