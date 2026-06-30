import styles from './Skeleton.module.css'

function Skeleton({
  variant = 'line',
  width,
  height,
  lines = 3,
  animated = true,
  className,
  style,
  ...props
}) {
  const cls = [
    styles.skeleton,
    styles[variant],
    animated ? styles.animated : '',
    className || '',
  ].filter(Boolean).join(' ')

  if (variant === 'lines') {
    return (
      <div className={[styles.linesWrap, className || ''].filter(Boolean).join(' ')} aria-busy="true" aria-label="Loading">
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className={[styles.skeleton, styles.line, animated ? styles.animated : ''].filter(Boolean).join(' ')}
            style={{ width: i === lines - 1 ? '67%' : '100%' }}
          />
        ))}
      </div>
    )
  }

  return (
    <span
      className={cls}
      style={{ width, height, ...style }}
      aria-busy="true"
      aria-label="Loading"
      {...props}
    />
  )
}

function SkeletonCard({ animated = true }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <Skeleton variant="circle" width={40} height={40} animated={animated} />
        <div className={styles.cardMeta}>
          <Skeleton variant="line" width="60%" height={14} animated={animated} />
          <Skeleton variant="line" width="40%" height={12} animated={animated} style={{ marginTop: 6 }} />
        </div>
      </div>
      <Skeleton variant="lines" lines={3} animated={animated} style={{ marginTop: 16 }} />
    </div>
  )
}

export { Skeleton, SkeletonCard }
