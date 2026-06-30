import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

function Modal({
  open = false,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  className,
  ...props
}) {
  const panelRef = useRef(null)

  // Focus trap + escape key
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    panelRef.current?.focus()

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last  = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className={styles.overlay}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-desc' : undefined}
      onClick={closeOnBackdrop ? (e) => { if (e.target === e.currentTarget) onClose?.() } : undefined}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={[styles.panel, styles[`size-${size}`], className || ''].filter(Boolean).join(' ')}
        {...props}
      >
        <div className={styles.header}>
          <div>
            {title && <h2 id="modal-title" className={styles.title}>{title}</h2>}
            {description && <p id="modal-desc" className={styles.description}>{description}</p>}
          </div>
          {onClose && (
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
              <CloseIcon />
            </button>
          )}
        </div>
        {children && <div className={styles.body}>{children}</div>}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  )
}

export { Modal }
