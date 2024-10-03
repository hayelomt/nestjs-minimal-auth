import { useState } from 'react';

export const useFormMsg = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clear = () => {
    setSuccess(null);
    setError(null);
  };

  return {
    success,
    error,
    setSuccess,
    setError,
    clear,
  };
};
