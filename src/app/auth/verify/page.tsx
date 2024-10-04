import { CardWrapper } from '@/components/auth/card-wrapper';
import { verifyToken } from '@/services/token-service';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

const VerifyPage = async ({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) => {
  const result = await verifyToken(token);

  if (result.success) {
    toast.success(result.success);
    return redirect('/auth/login');
  }

  return (
    <CardWrapper
      headerLabel="Verify email address"
      backButtonHref="/auth/sign-up"
      backButtonLabel="Return to sign Up"
      showSocial={false}
    >
      <p className="text-center text-destructive">
        {result.error || 'An error occurred while verifying your account'}
      </p>
      {
        // result.type && result.type === 'expired' &&
      }
    </CardWrapper>
  );
};

export default VerifyPage;
