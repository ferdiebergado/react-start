import Spinner from '@/components/navigation/Spinner';
import { routes } from '@/routes';
import { Suspense, type FC } from 'react';
import { useRoutes } from 'react-router';

const App: FC = () => {
  const element = useRoutes(routes);

  return <Suspense fallback={<Spinner />}>{element}</Suspense>;
};

export default App;
