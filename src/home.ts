import { QueryClient, queryOptions, useQuery } from '@tanstack/react-query'

interface Quote {
    id: number
    quote: string
    author: string
}

async function fetchRandomQuote(): Promise<Quote> {
    const res = await fetch('https://dummyjson.com/quotes/random')
    return (await res.json()) as Quote
}

export const quoteQuery = queryOptions({
    queryKey: ['random'],
    queryFn: fetchRandomQuote,
})

export function useQuoteQuery(initialData: Quote) {
    return useQuery({
        ...quoteQuery,
        initialData,
    })
}

export function quoteLoader(queryClient: QueryClient) {
    return async function () {
        return await queryClient.ensureQueryData(quoteQuery)
    }
}
