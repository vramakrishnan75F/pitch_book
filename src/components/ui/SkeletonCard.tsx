import Skeleton from './Skeleton'
import SkeletonText from './SkeletonText'

function SkeletonCard() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Skeleton height="1.2rem" width="45%" />
      <SkeletonText lines={3} />
    </div>
  )
}

export default SkeletonCard
