import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export interface Quote {
    id: number
    quote: string
    author: string
}

async function fetchRandomQuote(): Promise<Quote> {
    const res = await fetch('https://dummyjson.com/quotes/random')
    if (!res.ok) throw new Error(res.statusText)
    return (await res.json()) as Quote
}

export const quoteQuery = queryOptions({
    queryKey: ['random'],
    queryFn: fetchRandomQuote,
})

export function useQuoteQuery() {
    return useSuspenseQuery(quoteQuery)
}
