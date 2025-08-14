import { type FC } from 'react'

interface PageProps {
    msg: string
}

const ErrorPage: FC<PageProps> = ({ msg }: PageProps) => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-muted-foreground text-6xl">{msg}</h1>
        </div>
    )
}

export default ErrorPage
