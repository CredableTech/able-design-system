import { useState, useRef, Children, cloneElement } from 'react'
import styles from './Tabs.module.css'

function Tabs({
  defaultTab,
  activeTab: controlledTab,
  onChange,
  children,
  variant = 'line',
  size = 'md',
  className,
  fullWidth = false,
}) {
  const tabs = Children.toArray(children).filter(c => c.type === Tab)
  const [internal, setInternal] = useState(defaultTab || tabs[0]?.props?.id)
  const active = controlledTab ?? internal
  const listRef = useRef(null)

  function select(id) {
    if (controlledTab === undefined) setInternal(id)
    onChange?.(id)
  }

  function onKeyDown(e, idx) {
    const items = listRef.current?.querySelectorAll('[role="tab"]')
    if (!items) return
    let next = idx
    if (e.key === 'ArrowRight') next = (idx + 1) % items.length
    if (e.key === 'ArrowLeft')  next = (idx - 1 + items.length) % items.length
    if (e.key === 'Home')       next = 0
    if (e.key === 'End')        next = items.length - 1
    if (next !== idx) { e.preventDefault(); items[next].focus(); items[next].click() }
  }

  const activePanel = tabs.find(t => t.props.id === active)

  return (
    <div className={[styles.root, styles[variant], styles[`size-${size}`], fullWidth ? styles.fullWidth : '', className || ''].filter(Boolean).join(' ')}>
      <div ref={listRef} role="tablist" className={styles.list}>
        {tabs.map((tab, i) => {
          const isActive = tab.props.id === active
          return (
            <button
              key={tab.props.id}
              id={`tab-${tab.props.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.props.id}`}
              tabIndex={isActive ? 0 : -1}
              className={[styles.tab, isActive ? styles.active : '', tab.props.disabled ? styles.tabDisabled : ''].filter(Boolean).join(' ')}
              onClick={() => !tab.props.disabled && select(tab.props.id)}
              onKeyDown={e => onKeyDown(e, i)}
              disabled={tab.props.disabled}
            >
              {tab.props.icon && <span className={styles.tabIcon} aria-hidden="true">{tab.props.icon}</span>}
              {tab.props.label}
              {tab.props.count !== undefined && (
                <span className={styles.count}>{tab.props.count}</span>
              )}
            </button>
          )
        })}
      </div>
      {activePanel && (
        <div
          id={`panel-${activePanel.props.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activePanel.props.id}`}
          className={styles.panel}
        >
          {activePanel.props.children}
        </div>
      )}
    </div>
  )
}

function Tab({ children }) { return children }
Tab.displayName = 'Tab'

export { Tabs, Tab }
