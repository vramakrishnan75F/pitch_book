import Skeleton from './Skeleton'

type SkeletonTextProps = {
  lines?: number
}

function SkeletonText({ lines = 3 }: SkeletonTextProps) {
  return (
    <div style={{ display: 'grid', gap: '0.4rem' }}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} height="0.9rem" />
      ))}
    </div>
  )
}

export default SkeletonText
