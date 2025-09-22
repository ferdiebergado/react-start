import { Button } from '@/components/ui/button';
import { useAccount } from '@/features/account';
import { api } from '@/lib/api';
import type { FC } from 'react';
import { toast } from 'sonner';

const Signout: FC = () => {
  const { signout } = useAccount();

  const handleSignout = () => {
    signout();
    api.clearAccessToken();
    toast.success('Signed out.');
  };

  return (
    <Button variant="ghost" className="w-full" onClick={handleSignout}>
      Sign Out
    </Button>
  );
};

export default Signout;
