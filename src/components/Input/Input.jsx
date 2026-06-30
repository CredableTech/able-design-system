import { forwardRef, useId, useState } from 'react'
import styles from './Input.module.css'

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

const Input = forwardRef(({
  label,
  helperText,
  error,
  success,
  prefix,
  suffix,
  type = 'text',
  size = 'md',
  disabled = false,
  required = false,
  id: idProp,
  className,
  ...props
}, ref) => {
  const uid = useId()
  const id = idProp || uid
  const [showPassword, setShowPassword] = useState(false)

  const resolvedType = type === 'password' ? (showPassword ? 'text' : 'password') : type
  const isSearch = type === 'search'

  const wrapClass = [
    styles.wrap,
    styles[`size-${size}`],
    error   ? styles.error   : '',
    success ? styles.success : '',
    disabled ? styles.disabled : '',
    className || '',
  ].filter(Boolean).join(' ')

  const inputClass = [
    styles.input,
    (prefix || isSearch) ? styles.hasPrefix : '',
    (suffix || type === 'password' || error || success) ? styles.hasSuffix : '',
  ].filter(Boolean).join(' ')

  const helpId = `${id}-help`

  return (
    <div className={wrapClass}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}
      <div className={styles.inputWrap}>
        {(prefix || isSearch) && (
          <span className={styles.prefix} aria-hidden="true">
            {isSearch ? <SearchIcon /> : prefix}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          type={resolvedType}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={(helperText || error || success) ? helpId : undefined}
          className={inputClass}
          {...props}
        />
        {type === 'password' ? (
          <button
            type="button"
            className={styles.suffixBtn}
            onClick={() => setShowPassword(p => !p)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        ) : error ? (
          <span className={styles.suffixIcon} aria-hidden="true"><AlertIcon /></span>
        ) : success ? (
          <span className={styles.suffixIcon} aria-hidden="true"><CheckIcon /></span>
        ) : suffix ? (
          <span className={styles.suffixIcon} aria-hidden="true">{suffix}</span>
        ) : null}
      </div>
      {(helperText || error || success) && (
        <p id={helpId} className={[styles.helper, error ? styles.helperError : success ? styles.helperSuccess : ''].filter(Boolean).join(' ')}>
          {error || success || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

const Textarea = forwardRef(({
  label, helperText, error, success, size = 'md',
  disabled, required, id: idProp, className, rows = 4, ...props
}, ref) => {
  const uid = useId()
  const id = idProp || uid
  const helpId = `${id}-help`

  return (
    <div className={[styles.wrap, styles[`size-${size}`], error ? styles.error : '', success ? styles.success : '', disabled ? styles.disabled : '', className || ''].filter(Boolean).join(' ')}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={(helperText || error || success) ? helpId : undefined}
        className={[styles.input, styles.textarea].join(' ')}
        {...props}
      />
      {(helperText || error || success) && (
        <p id={helpId} className={[styles.helper, error ? styles.helperError : success ? styles.helperSuccess : ''].filter(Boolean).join(' ')}>
          {error || success || helperText}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export { Input, Textarea }
