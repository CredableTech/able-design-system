import { forwardRef, useId } from 'react'
import styles from './Select.module.css'

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const Select = forwardRef(({
  label,
  helperText,
  error,
  options = [],
  placeholder = 'Select an option',
  size = 'md',
  disabled = false,
  required = false,
  id: idProp,
  className,
  ...props
}, ref) => {
  const uid = useId()
  const id = idProp || uid
  const helpId = `${id}-help`

  return (
    <div className={[
      styles.wrap, styles[`size-${size}`],
      error ? styles.error : '',
      disabled ? styles.disabled : '',
      className || '',
    ].filter(Boolean).join(' ')}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <div className={styles.selectWrap}>
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={(helperText || error) ? helpId : undefined}
          className={[styles.select, !props.value && !props.defaultValue ? styles.placeholder : ''].filter(Boolean).join(' ')}
          {...props}
        >
          {placeholder && <option value="" disabled hidden>{placeholder}</option>}
          {options.map(opt => {
            if (opt.group) {
              return (
                <optgroup key={opt.group} label={opt.group}>
                  {opt.options.map(o => (
                    <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
                  ))}
                </optgroup>
              )
            }
            return <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
          })}
        </select>
        <span className={styles.chevron} aria-hidden="true"><ChevronIcon /></span>
      </div>
      {(helperText || error) && (
        <p id={helpId} className={[styles.helper, error ? styles.helperError : ''].filter(Boolean).join(' ')}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'
export { Select }
