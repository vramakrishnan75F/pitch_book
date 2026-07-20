import { useTheme } from '../../theme/ThemeContext'

type SkeletonProps = {
  width?: string
  height?: string
  borderRadius?: string
}

function Skeleton({ width = '100%', height = '1rem', borderRadius }: SkeletonProps) {
  const { theme } = useTheme()
  return (
    <div
      style={{
        width,
        height,
        borderRadius: borderRadius ?? theme.radius.md,
        backgroundColor: theme.colors.surface.selected,
      }}
    />
  )
}

export default Skeleton
