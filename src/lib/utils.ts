import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function catchAsync<T = void>(
  fn: () => Promise<T>,
  errParser: (error: unknown) => string = () => 'Something went wrong'
) {
  try {
    return await fn();
  } catch (error) {
    return {
      error: errParser(error),
    };
  }
}
