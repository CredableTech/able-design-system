/**
 * Utility to merge class names — filters falsy values.
 * Usage: cn('base', condition && 'extra', styles.mod)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
