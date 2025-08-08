import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'

export default function Home() {
    return (
        <Card className="m-16 shadow-md">
            <CardHeader>
                <CardTitle className="text-3xl">Home</CardTitle>
                <CardDescription>Home Page</CardDescription>
                <CardAction>
                    <Button className="bg-primary">Get started</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <h1 className="text-4xl">Welcome!</h1>
            </CardContent>
        </Card>
    )
}
