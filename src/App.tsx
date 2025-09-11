import { routes } from '@/routes';
import { type FC } from 'react';
import { useRoutes } from 'react-router';

const App: FC = () => {
  return useRoutes(routes);
};

export default App;
