import { useState, useRef, useId } from 'react'
import styles from './Tooltip.module.css'

function Tooltip({
  content,
  placement = 'top',
  delay = 0,
  children,
  className,
}) {
  const [visible, setVisible] = useState(false)
  const timer = useRef(null)
  const id = useId()

  function show() {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisible(true), delay)
  }
  function hide() {
    clearTimeout(timer.current)
    setVisible(false)
  }

  return (
    <span
      className={[styles.wrap, className || ''].filter(Boolean).join(' ')}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && content && (
        <span
          id={id}
          role="tooltip"
          className={[styles.tooltip, styles[placement]].filter(Boolean).join(' ')}
        >
          {content}
          <span className={styles.arrow} aria-hidden="true" />
        </span>
      )}
    </span>
  )
}

export { Tooltip }
