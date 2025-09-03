import { Skeleton } from '@/components/ui/skeleton';
import { type FC } from 'react';

const SkeletonRandomQuote: FC = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-[500px]" />
      <Skeleton className="h-6 w-[500px]" />
      <Skeleton className="h-6 w-[200px]" />
    </div>
  );
};

export default SkeletonRandomQuote;
