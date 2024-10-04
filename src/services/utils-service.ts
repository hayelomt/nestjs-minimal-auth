'use server';

import { nanoid } from 'nanoid';

export const generateVerificationToken = () => nanoid(50);

export const generateResetToken = () => nanoid(50);
