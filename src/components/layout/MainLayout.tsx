import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Spinner from '@/components/navigation/Spinner';
import { useAccount } from '@/features/account';
import { paths } from '@/routes';
import { Suspense, type FC } from 'react';
import { Navigate, Outlet } from 'react-router';

const MainLayout: FC = () => {
  const { user, isLoading } = useAccount();

  if (isLoading) return <Spinner />;

  if (!user) {
    return <Navigate to={paths.account.signin} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
