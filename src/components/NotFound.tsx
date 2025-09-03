import ErrorWrapper from '@/components/ErrorWrapper';
import { type FC } from 'react';

const NotFound: FC = () => {
  return (
    <ErrorWrapper>
      <h1 className="text-muted-foreground text-6xl">Page not found.</h1>
    </ErrorWrapper>
  );
};

export default NotFound;
