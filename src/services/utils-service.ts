'use server';

import { nanoid } from 'nanoid';

export const generateVerificationToken = () => nanoid(50);
