'use client';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { BeatLoader } from 'react-spinners';

const VerifyLoading = () => {
  return (
    <CardWrapper
      headerLabel="Verify email address"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      showSocial={false}
    >
      <div className="flex items-center justify-center">
        <BeatLoader />
      </div>
    </CardWrapper>
  );
};

export default VerifyLoading;
