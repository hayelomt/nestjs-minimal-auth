import { BackButton } from '@/components/auth/back-button';
import { Header } from '@/components/auth/header';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';

const ErrorPage = () => {
  return (
    <Card className="w-[400px] shadow-md text-center">
      <CardHeader>
        <Header label="Oops! Something went wrong" />
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};

export default ErrorPage;
