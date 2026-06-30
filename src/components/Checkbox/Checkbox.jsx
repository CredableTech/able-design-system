import { useId } from 'react'
import styles from './Checkbox.module.css'

function Checkbox({
  label,
  helperText,
  error,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  indeterminate = false,
  id: idProp,
  className,
  ...props
}) {
  const uid = useId()
  const id = idProp || uid

  return (
    <div className={[styles.wrap, error ? styles.hasError : '', className || ''].filter(Boolean).join(' ')}>
      <label className={[styles.label, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
        <div className={styles.checkWrap}>
          <input
            type="checkbox"
            id={id}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={onChange}
            className={styles.input}
            ref={el => { if (el) el.indeterminate = indeterminate }}
            aria-invalid={!!error}
            {...props}
          />
          <span className={styles.box} aria-hidden="true">
            {indeterminate ? (
              <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor"><rect width="10" height="2" rx="1"/></svg>
            ) : (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 4 7 9 1"/>
              </svg>
            )}
          </span>
        </div>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
      {(helperText || error) && (
        <p className={[styles.helper, error ? styles.helperError : ''].filter(Boolean).join(' ')}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}

function Radio({
  label,
  helperText,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id: idProp,
  name,
  value,
  className,
  ...props
}) {
  const uid = useId()
  const id = idProp || uid

  return (
    <div className={[styles.wrap, className || ''].filter(Boolean).join(' ')}>
      <label className={[styles.label, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
        <div className={styles.checkWrap}>
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={onChange}
            className={styles.input}
            {...props}
          />
          <span className={styles.radio} aria-hidden="true">
            <span className={styles.radioDot} />
          </span>
        </div>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  )
}

export { Checkbox, Radio }
