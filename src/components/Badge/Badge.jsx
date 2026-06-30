import styles from './Badge.module.css'

/**
 * Badge — status indicator pill
 *
 * @param {'success'|'warning'|'danger'|'info'|'sapphire'|'peridot'|'topaz'|'default'} variant
 * @param {'sm'|'md'} size
 * @param {boolean} dot — show animated pulse dot before label
 */
export function Badge({ children, variant = 'default', size = 'md', dot = false, className = '' }) {
  return (
    <span className={[styles.badge, styles[variant], styles[size], className].filter(Boolean).join(' ')}>
      {dot && <span className={styles.dot} aria-hidden />}
      {children}
    </span>
  )
}

export default Badge
