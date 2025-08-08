import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'

export default function Home() {
    return (
        <Card className="mx-12 my-4 shadow-md">
            <CardHeader>
                <CardTitle>Home</CardTitle>
                <CardDescription>Home Page</CardDescription>
                <CardAction>
                    <Button>Get started</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p>Welcome!</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}
