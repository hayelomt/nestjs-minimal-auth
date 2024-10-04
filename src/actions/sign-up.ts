'use server';

import { SignUpSchema } from '@/schemas';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { emailExists } from '@/services/auth-service';
import { sendEmail } from '@/services/email-service';
import { setVerificationToken } from '@/services/token-service';

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    const validated = SignUpSchema.safeParse(values);

    if (!validated.success) {
      return {
        error: `Invalid fields ${Object.values(validated.error).join(', ')}`,
      };
    }

    const { email, password, name } = validated.data;

    if (await emailExists(email)) {
      return {
        error: 'Email already in use',
      };
    }

    const hashed = await bcrypt.hash(password, 10);

    const verification = await setVerificationToken(email);

    await sendEmail(
      email,
      'Verify your email',
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${verification.token}`
    );

    await db.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });

    return {
      message:
        'Sign up successful. Please check your email to verify your account',
    };
  } catch (error) {
    console.log('[ERROR] Failed to sign up', error);
    return {
      error: 'Something went wrong',
    };
  }
};
