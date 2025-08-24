import { Button } from '@/components/ui/button'
import type { FC } from 'react'
import type { FallbackProps } from 'react-error-boundary'

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
    <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-muted-foreground text-6xl">
            Something went wrong.
        </h1>
        <Button
            className="bg-foreground text-background m-4 p-4"
            onClick={() => {
                resetErrorBoundary()
            }}
        >
            Try again
        </Button>
        <pre style={{ whiteSpace: 'normal' }}>{(error as Error).message}</pre>
    </div>
)

export default ErrorFallback
