import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RandomQuote from '@/features/quote/RandomQuote';
import SkeletonRandomQuote from '@/features/quote/SkeletonRandomQuote';
import { Suspense, type FC } from 'react';

const Home: FC = () => {
  return (
    <Card className="mx-16 shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl">Random Quote</CardTitle>
        <CardDescription>
          A demo of data fetching using React Query
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<SkeletonRandomQuote />}>
          <RandomQuote />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default Home;
