import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Spinner from '@/components/navigation/Spinner';
import { Suspense, type FC } from 'react';
import { Outlet } from 'react-router';

const MainLayout: FC = () => {
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
