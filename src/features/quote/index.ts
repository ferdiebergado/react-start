import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

async function fetchRandomQuote(): Promise<Quote> {
  const res = await fetch('https://dummyjson.com/quotes/random');
  if (!res.ok) throw new Error(res.statusText);
  return (await res.json()) as Quote;
}

export const randomQuoteQuery = queryOptions({
  queryKey: ['random_quote'],
  queryFn: fetchRandomQuote,
});

export function useRandomQuote() {
  return useSuspenseQuery(randomQuoteQuery);
}
