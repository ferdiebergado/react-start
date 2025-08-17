import { type FC } from 'react'
import { Skeleton } from './ui/skeleton'

const SuspenseFallback: FC = () => {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
        </div>
    )
}

export default SuspenseFallback
