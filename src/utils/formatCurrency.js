const LOCALES = {
  TZS: 'sw-TZ', KES: 'en-KE', MZN: 'pt-MZ', INR: 'en-IN', USD: 'en-US',
}

/**
 * Format a monetary value with currency code.
 * formatCurrency(1234567.89, 'TZS') → 'TZS 1,234,568'
 */
export function formatCurrency(value, currency = 'TZS', opts = {}) {
  const locale = LOCALES[currency] || 'en-US'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: opts.decimals ?? (currency === 'TZS' ? 0 : 2),
    maximumFractionDigits: opts.decimals ?? (currency === 'TZS' ? 0 : 2),
    notation: opts.compact ? 'compact' : 'standard',
    ...opts,
  }).format(value)
}

/**
 * Compact notation: 1,234,567 → '1.2M'
 */
export function compactNumber(value, locale = 'en-US') {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

/**
 * Format a PAR percentage: 3.24 → '3.24%'
 */
export function formatPAR(value, decimals = 2) {
  return `${Number(value).toFixed(decimals)}%`
}
