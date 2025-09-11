import Spinner from '@/components/navigation/Spinner';
import { Suspense, type FC } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

const AccountLayout: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default AccountLayout;
