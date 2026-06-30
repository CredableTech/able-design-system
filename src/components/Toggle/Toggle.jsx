import { useId } from 'react'
import styles from './Toggle.module.css'

function Toggle({
  label,
  helperText,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = 'md',
  id: idProp,
  className,
  ...props
}) {
  const uid = useId()
  const id = idProp || uid

  return (
    <div className={[styles.wrap, className || ''].filter(Boolean).join(' ')}>
      <label className={[styles.label, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
        <div className={[styles.track, styles[`size-${size}`], checked || defaultChecked ? styles.checked : ''].filter(Boolean).join(' ')}>
          <input
            type="checkbox"
            id={id}
            role="switch"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={onChange}
            className={styles.input}
            aria-checked={checked}
            {...props}
          />
          <span className={styles.thumb} />
        </div>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  )
}

export { Toggle }
