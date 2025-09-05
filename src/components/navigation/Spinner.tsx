import { type FC } from 'react';

const Spinner: FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-cyan-500"></div>
    </div>
  );
};

export default Spinner;
