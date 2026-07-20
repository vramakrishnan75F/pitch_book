import Skeleton from './Skeleton'

function SkeletonHero() {
  return (
    <div style={{ display: 'grid', gap: '0.6rem' }}>
      <Skeleton height="2rem" width="60%" />
      <Skeleton height="1rem" width="85%" />
      <Skeleton height="1rem" width="70%" />
    </div>
  )
}

export default SkeletonHero
