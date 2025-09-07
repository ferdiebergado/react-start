import type { FC } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

const AccountLayout: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Outlet />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default AccountLayout;
