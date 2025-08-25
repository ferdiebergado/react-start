import { Button } from '@/components/ui/button'
import type { FC } from 'react'
import type { FallbackProps } from 'react-error-boundary'
import ErrorWrapper from './ErrorWrapper'

const ErrorFallback: FC<FallbackProps> = ({ resetErrorBoundary }) => (
    <ErrorWrapper>
        <h1 className="text-destructive text-6xl">Something went wrong.</h1>
        <Button
            className="bg-foreground text-background m-4 p-4"
            onClick={() => {
                resetErrorBoundary()
            }}
        >
            Try again
        </Button>
    </ErrorWrapper>
)

export default ErrorFallback
