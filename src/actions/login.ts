'use server';

import { AuthError } from 'next-auth';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/services/auth-service';
import { z } from 'zod';
import { signIn } from '@/auth';
import { DEFAULT_REDIRECT_URL } from '@/routes';
import { setVerificationToken } from '@/services/token-service';
import { sendEmail } from '@/services/email-service';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validated = LoginSchema.safeParse(values);

  if (!validated.success) {
    return {
      error: `Invalid fields ${Object.values(validated.error).join(', ')}`,
    };
  }

  const { email, password } = validated.data;

  const user = await getUserByEmail(email);

  if (user === null) {
    return {
      error: 'Invalid credentials',
    };
  }

  if (!user.password) {
    return {
      error: 'Password login is not enabled for this account',
    };
  }

  if (!user.emailVerified) {
    const verification = await setVerificationToken(email);

    await sendEmail(
      email,
      'Verify your email',
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${verification.token}`
    );

    return {
      data: 'Verification email sent',
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT_URL,
    });

    return {
      data: 'Logged in',
    };
  } catch (error) {
    console.log('Login Error', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid credentials',
          };
        default: {
          return {
            error: 'Something went wrong!',
          };
        }
      }
    }

    throw error;
  }
};
