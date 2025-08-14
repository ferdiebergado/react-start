import { type FC } from 'react'
import ErrorPage from './ErrorPage'

const ErrorBoundary: FC = () => {
    return <ErrorPage msg="Something went wrong. Try again later." />
}

export default ErrorBoundary
