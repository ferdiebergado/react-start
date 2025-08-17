import SuspenseFallback from '@/components/SuspenseFallback'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useQuoteQuery } from '@/home'
import { Suspense, type FC } from 'react'

const Home: FC = () => {
    const {
        data: { quote, author },
    } = useQuoteQuery()

    return (
        <Card className="m-16 shadow-md">
            <CardHeader>
                <CardTitle className="text-3xl">Random Quote</CardTitle>
                <CardDescription>
                    A demo of data fetching using React Query
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<SuspenseFallback />}>
                    <blockquote>
                        <span className="text-lg italic">"{quote}"</span>
                        <footer className="pt-4 text-xl font-bold">
                            {author}
                        </footer>
                    </blockquote>
                </Suspense>
            </CardContent>
        </Card>
    )
}

export default Home
