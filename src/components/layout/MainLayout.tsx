import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import type { FC } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

const MainLayout: FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        <section>
          <Outlet />
        </section>
      </main>
      <Toaster position="top-right" richColors />
      <Footer />
    </div>
  );
};

export default MainLayout;
