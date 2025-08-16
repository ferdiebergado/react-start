import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { useLoaderData } from 'react-router'
import { quoteLoader, quoteQuery } from './home'

const Home: FC = () => {
    const initialData = useLoaderData<Awaited<ReturnType<typeof quoteLoader>>>()
    const {
        data: { quote, author },
    } = useQuery({
        ...quoteQuery,
        initialData,
    })

    return (
        <Card className="m-16 shadow-md">
            <CardHeader>
                <CardTitle className="text-3xl">Random Quote</CardTitle>
                <CardDescription>
                    A demo of data fetching with React Router and React Query
                </CardDescription>
            </CardHeader>
            <CardContent>
                <blockquote className="text-lg">
                    <span className="italic">"{quote}"</span>
                    <footer className="pt-4 font-bold">{author}</footer>
                </blockquote>
            </CardContent>
        </Card>
    )
}

export default Home
