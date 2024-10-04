import { useState } from 'react';

export const useFormMsg = () => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const clear = () => {
    setSuccess(undefined);
    setError(undefined);
  };

  return {
    success,
    error,
    setSuccess,
    setError,
    clear,
  };
};
