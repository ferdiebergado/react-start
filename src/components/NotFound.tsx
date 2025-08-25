import ErrorPage from '@/components/ErrorPage'
import { type FC } from 'react'

const NotFound: FC = () => {
    return <ErrorPage msg="Page not found." />
}

export default NotFound
