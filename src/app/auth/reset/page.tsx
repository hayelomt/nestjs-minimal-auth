import { ResetForm } from '@/components/auth/reset-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset your password',
};

const ResetPage = () => {
  return <ResetForm />;
};

export default ResetPage;
