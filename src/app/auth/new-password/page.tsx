import { NewPasswordForm } from '@/components/auth/new-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change your password',
};

const NewPasswordPage = async ({
  searchParams: { token },
}: {
  searchParams: { token?: string };
}) => {
  return <NewPasswordForm token={token} />;
};

export default NewPasswordPage;
