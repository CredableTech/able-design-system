import styles from './Finance.module.css'

const TrendUpIcon   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
const TrendDownIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>

function KPICard({
  label,
  value,
  subValue,
  trend,
  trendLabel,
  trendInvert = false,
  icon,
  accentColor,
  sparkline,
  status,
  className,
  ...props
}) {
  const isUp = trend > 0
  const trendPositive = trendInvert ? !isUp : isUp

  return (
    <div
      className={[styles.kpiCard, className || ''].filter(Boolean).join(' ')}
      style={accentColor ? { '--kpi-accent': accentColor } : undefined}
      {...props}
    >
      <div className={styles.kpiTop}>
        <div>
          <p className={styles.kpiLabel}>{label}</p>
          <p className={styles.kpiValue}>{value}</p>
          {subValue && <p className={styles.kpiSub}>{subValue}</p>}
        </div>
        {icon && (
          <span className={styles.kpiIcon}>{icon}</span>
        )}
      </div>
      <div className={styles.kpiBottom}>
        {trend !== undefined && (
          <span className={[styles.trend, trendPositive ? styles.trendUp : styles.trendDown].join(' ')}>
            {isUp ? <TrendUpIcon /> : <TrendDownIcon />}
            {Math.abs(trend)}%
          </span>
        )}
        {trendLabel && <span className={styles.trendLabel}>{trendLabel}</span>}
        {status && <span className={styles.kpiStatus}>{status}</span>}
      </div>
      {sparkline && <div className={styles.sparkline}>{sparkline}</div>}
    </div>
  )
}

function KPIBar({ children, className, ...props }) {
  return (
    <div className={[styles.kpiBar, className || ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}

function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  variant = 'default',
  className,
  children,
  ...props
}) {
  const isPositive = delta >= 0

  return (
    <div className={[styles.statCard, styles[`stat-${variant}`], className || ''].filter(Boolean).join(' ')} {...props}>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
      {(delta !== undefined || children) && (
        <div className={styles.statFooter}>
          {delta !== undefined && (
            <span className={[styles.delta, isPositive ? styles.deltaPos : styles.deltaNeg].join(' ')}>
              {isPositive ? '↑' : '↓'} {Math.abs(delta)}%
            </span>
          )}
          {deltaLabel && <span className={styles.deltaLabel}>{deltaLabel}</span>}
          {children}
        </div>
      )}
    </div>
  )
}

export { KPICard, KPIBar, StatCard }
