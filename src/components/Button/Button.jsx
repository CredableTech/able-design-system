import styles from './Button.module.css'

/**
 * Button
 *
 * @param {'primary'|'ghost'|'destructive'|'outline'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {React.ReactNode} iconLeft  — optional leading icon
 * @param {React.ReactNode} iconRight — optional trailing icon
 * @param {boolean} loading
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      className={[styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden />}
      {!loading && iconLeft && <span className={styles.icon} aria-hidden>{iconLeft}</span>}
      {children && <span>{children}</span>}
      {!loading && iconRight && <span className={styles.icon} aria-hidden>{iconRight}</span>}
    </button>
  )
}

export default Button
