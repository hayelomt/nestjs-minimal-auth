'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface LoginButtonProps {
  children: ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export function LoginButton({ children, mode = 'redirect' }: LoginButtonProps) {
  const router = useRouter();

  if (mode === 'modal') {
    return <>Modal: {children}</>;
  }

  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        router.push('/auth/login');
      }}
    >
      {children}
    </span>
  );
}
