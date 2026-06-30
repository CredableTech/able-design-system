import styles from './Progress.module.css'

function Progress({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'md',
  label,
  showValue = false,
  animated = false,
  className,
  ...props
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={[styles.wrap, className || ''].filter(Boolean).join(' ')}>
      {(label || showValue) && (
        <div className={styles.meta}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={[styles.track, styles[`size-${size}`]].join(' ')}
        {...props}
      >
        <div
          className={[styles.bar, styles[variant], animated ? styles.animated : ''].filter(Boolean).join(' ')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function CircularProgress({ value = 0, max = 100, size = 64, strokeWidth = 5, variant = 'default', label, className }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const r = (size - strokeWidth * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <div className={[styles.circular, className || ''].filter(Boolean).join(' ')} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={label} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--able-border-md, rgba(24,1,19,0.10))" strokeWidth={strokeWidth}/>
        <circle
          cx={size/2} cy={size/2} r={r}
          fill="none"
          stroke={variant === 'danger' ? 'var(--able-danger, #A10000)' : variant === 'warning' ? '#C3D044' : 'var(--able-accent, #42C9AE)'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 0.5s var(--able-ease-default)' }}
        />
      </svg>
      {label && <span className={styles.circularLabel}>{label}</span>}
    </div>
  )
}

export { Progress, CircularProgress }
