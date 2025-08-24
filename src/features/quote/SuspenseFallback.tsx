import { Skeleton } from '@/components/ui/skeleton'
import { type FC } from 'react'

const SuspenseFallback: FC = () => {
    return (
        <div className="space-y-2">
            <Skeleton className="h-6 w-[500px]" />
            <Skeleton className="h-6 w-[200px]" />
        </div>
    )
}

export default SuspenseFallback
