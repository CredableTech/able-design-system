import { useState } from 'react'
import styles from './Table.module.css'

const SortAscIcon  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
const SortDescIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
const SortIcon     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="18 9 12 3 6 9"/><polyline points="6 15 12 21 18 15"/></svg>

function Table({
  columns = [],
  data = [],
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  stickyHeader = false,
  loading = false,
  emptyText = 'No data',
  onRowClick,
  className,
  ...props
}) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  function handleSort(col) {
    if (!col.sortable) return
    if (sortKey === col.key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(col.key)
      setSortDir('asc')
    }
  }

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const col = columns.find(c => c.key === sortKey)
        const va = col?.sortFn ? col.sortFn(a) : a[sortKey]
        const vb = col?.sortFn ? col.sortFn(b) : b[sortKey]
        const cmp = va < vb ? -1 : va > vb ? 1 : 0
        return sortDir === 'asc' ? cmp : -cmp
      })
    : data

  const cls = [
    styles.table,
    striped   ? styles.striped   : '',
    hoverable ? styles.hoverable : '',
    bordered  ? styles.bordered  : '',
    compact   ? styles.compact   : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={[styles.wrap, stickyHeader ? styles.stickyHeader : ''].filter(Boolean).join(' ')}>
      <table className={cls} {...props}>
        <thead className={styles.thead}>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className={[styles.th, col.sortable ? styles.sortable : '', sortKey === col.key ? styles.sorted : '', col.align ? styles[`align-${col.align}`] : ''].filter(Boolean).join(' ')}
                style={{ width: col.width }}
                onClick={() => handleSort(col)}
                aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                <span className={styles.thInner}>
                  {col.header ?? col.key}
                  {col.sortable && (
                    <span className={styles.sortIcon}>
                      {sortKey === col.key ? (sortDir === 'asc' ? <SortAscIcon /> : <SortDescIcon />) : <SortIcon />}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length} className={styles.emptyCell}>
              <div className={styles.loadingRows}>
                {[1,2,3].map(i => (
                  <div key={i} className={styles.loadingRow}>
                    {columns.map((_, j) => <div key={j} className={styles.loadingSkeleton} />)}
                  </div>
                ))}
              </div>
            </td></tr>
          ) : sorted.length === 0 ? (
            <tr><td colSpan={columns.length} className={styles.emptyCell}>{emptyText}</td></tr>
          ) : (
            sorted.map((row, ri) => (
              <tr
                key={row.id ?? ri}
                className={[styles.tr, onRowClick ? styles.clickable : ''].filter(Boolean).join(' ')}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={[styles.td, col.align ? styles[`align-${col.align}`] : '', col.mono ? styles.mono : ''].filter(Boolean).join(' ')}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export { Table }
