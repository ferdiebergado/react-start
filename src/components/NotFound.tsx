import { type FC } from 'react'
import ErrorPage from './ErrorPage'

const NotFound: FC = () => {
    return <ErrorPage msg="Page not found." />
}

export default NotFound
