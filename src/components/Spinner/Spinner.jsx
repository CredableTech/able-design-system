import styles from './Spinner.module.css'

function Spinner({ size = 'md', color = 'accent', label = 'Loading…', className }) {
  return (
    <span
      role="status"
      aria-label={label}
      className={[styles.spinner, styles[`size-${size}`], styles[`color-${color}`], className || ''].filter(Boolean).join(' ')}
    >
      <span className={styles.sr}>{label}</span>
    </span>
  )
}

export { Spinner }
