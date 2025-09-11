import type { FC } from 'react';
import { Toaster } from 'sonner';

const Toast: FC = () => {
  return <Toaster position="top-right" richColors />;
};

export default Toast;
