import { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { getUserByEmail } from './services/auth-service';
import { LoginSchema } from './schemas';

export default {
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validated = LoginSchema.safeParse(credentials);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const valid = await bcrypt.compare(password, user.password);

          return !valid ? null : user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
