import { createPortal } from 'react-dom'
import styles from './Toast.module.css'

const icons = {
  success: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  warning: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>,
  danger:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  info:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
}
const CloseIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>

function ToastItem({ id, variant = 'info', title, message, onRemove }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={[styles.toast, styles[variant]].join(' ')}
    >
      <span className={styles.icon} aria-hidden="true">{icons[variant]}</span>
      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {message && <p className={styles.message}>{message}</p>}
      </div>
      <button
        type="button"
        className={styles.close}
        onClick={() => onRemove(id)}
        aria-label="Dismiss"
      >
        <CloseIcon />
      </button>
    </div>
  )
}

function ToastRegion({ toasts = [], onRemove, position = 'bottom-right' }) {
  if (!toasts.length) return null
  return createPortal(
    <div className={[styles.region, styles[position]].join(' ')} aria-label="Notifications">
      {toasts.map(t => (
        <ToastItem key={t.id} {...t} onRemove={onRemove} />
      ))}
    </div>,
    document.body
  )
}

export { ToastItem, ToastRegion }
