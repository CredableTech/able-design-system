import { useState, useCallback } from 'react'

let _counter = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const add = useCallback(({ variant = 'info', title, message, duration = 4000 }) => {
    const id = ++_counter
    setToasts(prev => [...prev, { id, variant, title, message, duration }])
    if (duration > 0) {
      setTimeout(() => remove(id), duration)
    }
    return id
  }, [])

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const success = useCallback((message, opts) => add({ variant: 'success', message, ...opts }), [add])
  const warning = useCallback((message, opts) => add({ variant: 'warning', message, ...opts }), [add])
  const danger  = useCallback((message, opts) => add({ variant: 'danger',  message, ...opts }), [add])
  const info    = useCallback((message, opts) => add({ variant: 'info',    message, ...opts }), [add])

  return { toasts, add, remove, success, warning, danger, info }
}
