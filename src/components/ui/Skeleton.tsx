import { cn } from '../../utils'

type Props = {
  className?: string
}

const Skeleton: React.FC = ({ className }: Props) => {
  return (
    <div className={cn('flex-1', className)}>
      <div className="skeleton-animation mb-2 h-3 w-10 rounded-xs" />
      <div className="skeleton-animation mb-2 h-4 rounded-xs" />
      <div className="skeleton-animation mb-2 h-4 rounded-xs" />
      <div className="skeleton-animation mb-2 h-2 w-12 rounded-xs" />
      <div className="skeleton-animation mb-2 h-2 w-20 rounded-xs" />
    </div>
  )
}

export { Skeleton }
