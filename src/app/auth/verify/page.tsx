import { verifyToken } from '@/actions/verify';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify email address',
  description: 'Verify your email address',
};

const VerifyPage = async ({
  searchParams: { token },
}: {
  searchParams: { token?: string };
}) => {
  const result = await verifyToken(token);

  return (
    <CardWrapper
      headerLabel="Verify email address"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      showSocial={false}
    >
      {result.success ? (
        <FormSuccess message={result.success} />
      ) : (
        <FormError
          message={
            result.error || 'An error occurred while verifying your account'
          }
        />
      )}
    </CardWrapper>
  );
};

export default VerifyPage;
