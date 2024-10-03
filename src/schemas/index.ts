import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  // password min 6 1 letter 1 alphanumeric
  password: z.string(),
});

export const SignUpSchema = z.object({
  name: z.string().min(3, { message: 'Name too short' }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password too short' })
    .regex(/^(?=.*[a-z])(?=.*[0-9])/, {
      message: 'Password must contain at least 1 letter and 1 number',
    }),
});
