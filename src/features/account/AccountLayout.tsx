import Spinner from '@/components/navigation/Spinner';
import { Suspense, type FC } from 'react';
import { Outlet } from 'react-router';

const AccountLayout: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AccountLayout;
