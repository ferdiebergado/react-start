import { useRandomQuote } from '@/features/quote';
import type { FC } from 'react';

const RandomQuote: FC = () => {
  const {
    data: { quote, author },
  } = useRandomQuote();

  return (
    <blockquote>
      <span className="text-lg italic">"{quote}"</span>
      <footer className="pt-4 text-xl font-bold">{author}</footer>
    </blockquote>
  );
};

export default RandomQuote;
