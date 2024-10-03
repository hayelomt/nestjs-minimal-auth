import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

const Settings = async () => {
  const session = await auth();

  return (
    <div>
      <h1>Settings</h1>
      <p>User: {session?.user?.email}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <form
        action={async () => {
          'use server';

          await signOut({ redirectTo: '/' });
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};

export default Settings;
