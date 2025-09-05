import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Spinner from '@/components/navigation/Spinner';
import { routes } from '@/routes';
import { Suspense, type FC } from 'react';
import { useRoutes } from 'react-router';
import { Toaster } from 'sonner';

const App: FC = () => {
  const element = useRoutes(routes);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        <section>
          <Suspense fallback={<Spinner />}>{element}</Suspense>
        </section>
      </main>
      <Toaster position="top-right" richColors />
      <Footer />
    </div>
  );
};

export default App;
