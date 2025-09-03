import { type FC, type ReactNode } from 'react';

interface ErrorWrapperProps {
  children: ReactNode;
}

const ErrorWrapper: FC<ErrorWrapperProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      {children}
    </div>
  );
};

export default ErrorWrapper;
