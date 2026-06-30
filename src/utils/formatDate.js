/**
 * All dates formatted as UTC — Credable operates across TZ/KE/MZ/IN.
 * Display conversion is UI-layer only.
 */

export function formatDate(date, locale = 'en-GB', opts = {}) {
  const d = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat(locale, {
    timeZone: 'UTC',
    day: '2-digit', month: 'short', year: 'numeric',
    ...opts,
  }).format(d)
}

export function formatDateTime(date, locale = 'en-GB') {
  return formatDate(date, locale, { hour: '2-digit', minute: '2-digit', hour12: false })
}

export function formatRelative(date) {
  const d = date instanceof Date ? date : new Date(date)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)
  if (diff < 60)   return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}
