import { type FC, type ReactNode } from 'react'

interface ErrorWrapperProps {
    children: ReactNode
}

const ErrorWrapper: FC<ErrorWrapperProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            {children}
        </div>
    )
}

export default ErrorWrapper
