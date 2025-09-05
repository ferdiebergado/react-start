import ErrorWrapper from '@/components/error/ErrorWrapper';
import { Button } from '@/components/ui/button';
import type { FC } from 'react';
import type { FallbackProps } from 'react-error-boundary';

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Unknown error';

  const handleClick = () => {
    resetErrorBoundary();
  };

  return (
    <ErrorWrapper>
      <h1 className="text-muted-foreground text-6xl">Something went wrong.</h1>
      <pre className="text-destructive">{message}</pre>
      <Button onClick={handleClick}>Try again</Button>
    </ErrorWrapper>
  );
};

export default ErrorFallback;
