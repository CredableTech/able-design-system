import styles from './LoanCard.module.css'

const STEP_LABELS = {
  application:  'Application',
  scoring:      'Credit Scoring',
  approval:     'Approval',
  disbursement: 'Disbursement',
  active:       'Active',
  repayment:    'Repayment',
  settled:      'Settled',
  defaulted:    'Defaulted',
}

function LoanCard({
  loanId,
  customerName,
  amount,
  currency = 'TZS',
  product,
  status,
  disbursedAt,
  dueDate,
  par,
  meta = [],
  onViewDetails,
  className,
  ...props
}) {
  const statusVariant = {
    active:      'success',
    pending:     'warning',
    defaulted:   'danger',
    settled:     'info',
    processing:  'info',
  }[status?.toLowerCase()] || 'default'

  return (
    <div className={[styles.card, className || ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.loanId}>{loanId}</span>
          <span className={[styles.statusBadge, styles[`status-${statusVariant}`]].join(' ')}>{status}</span>
        </div>
        {product && <span className={styles.product}>{product}</span>}
      </div>

      {customerName && <p className={styles.customer}>{customerName}</p>}

      <p className={styles.amount}>
        <span className={styles.currency}>{currency}</span>
        {' '}
        <span className={styles.amountValue}>{amount}</span>
      </p>

      {meta.length > 0 && (
        <div className={styles.metaGrid}>
          {meta.map((m, i) => (
            <div key={i} className={styles.metaItem}>
              <span className={styles.metaLabel}>{m.label}</span>
              <span className={styles.metaValue}>{m.value}</span>
            </div>
          ))}
        </div>
      )}

      {par !== undefined && (
        <div className={styles.parRow}>
          <span className={styles.parLabel}>PAR 30</span>
          <div className={styles.parBar}>
            <div
              className={[styles.parFill, par > 5 ? styles.parDanger : par > 2 ? styles.parWarn : styles.parOk].join(' ')}
              style={{ width: `${Math.min(100, par * 10)}%` }}
            />
          </div>
          <span className={[styles.parValue, par > 5 ? styles.parDanger : par > 2 ? styles.parWarn : styles.parOk].join(' ')}>{par}%</span>
        </div>
      )}

      {onViewDetails && (
        <button className={styles.viewBtn} onClick={onViewDetails} type="button">
          View details →
        </button>
      )}
    </div>
  )
}

function LoanTimeline({ steps = [], current, className }) {
  return (
    <div className={[styles.timeline, className || ''].filter(Boolean).join(' ')}>
      {steps.map((step, i) => {
        const state = i < steps.indexOf(current) || step === current
          ? i < steps.indexOf(current) ? 'done' : 'active'
          : 'pending'
        return (
          <div key={step} className={[styles.timelineStep, styles[`step-${state}`]].join(' ')}>
            <div className={styles.timelineDot}>
              {state === 'done' ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : <span className={styles.timelineDotInner} />}
            </div>
            {i < steps.length - 1 && <div className={[styles.timelineLine, state === 'done' ? styles.timelineLineDone : ''].join(' ')} />}
            <span className={styles.timelineLabel}>{STEP_LABELS[step] || step}</span>
          </div>
        )
      })}
    </div>
  )
}

export { LoanCard, LoanTimeline }
