import styles from './Card.module.css'

/**
 * Card — surface container
 *
 * @param {'default'|'dark'|'bordered'} variant
 * @param {'sm'|'md'|'lg'} padding
 * @param {boolean} hoverable — lift on hover
 * @param {boolean} clickable — pointer cursor + border accent on hover
 * @param {string} accentColor — CSS color for hover border (clickable only)
 */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  accentColor,
  className = '',
  style = {},
  ...props
}) {
  return (
    <div
      className={[
        styles.card,
        styles[variant],
        styles[`pad-${padding}`],
        hoverable && styles.hoverable,
        clickable && styles.clickable,
        className,
      ].filter(Boolean).join(' ')}
      style={accentColor ? { '--card-accent': accentColor, ...style } : style}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={[styles.header, className].filter(Boolean).join(' ')}>{children}</div>
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={[styles.title, className].filter(Boolean).join(' ')}>{children}</h3>
}

export function CardBody({ children, className = '' }) {
  return <div className={[styles.body, className].filter(Boolean).join(' ')}>{children}</div>
}

export default Card
