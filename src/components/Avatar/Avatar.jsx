import styles from './Avatar.module.css'

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

const COLORS = [
  '#42C9AE','#654DF9','#C3D044','#EF61CE','#009280',
  '#3C26C4','#828F13','#89105F','#6A0446',
]
function colorFor(name = '') {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return COLORS[Math.abs(h) % COLORS.length]
}

function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className,
  ...props
}) {
  const initials = getInitials(name)
  const bg = colorFor(name)
  const isDark = ['#42C9AE','#C3D044'].includes(bg)

  return (
    <span
      className={[styles.avatar, styles[`size-${size}`], styles[`shape-${shape}`], className || ''].filter(Boolean).join(' ')}
      title={name}
      aria-label={name}
      {...props}
    >
      {src ? (
        <img src={src} alt={name || 'Avatar'} className={styles.img} />
      ) : (
        <span
          className={styles.initials}
          style={{ background: bg, color: isDark ? '#180113' : '#fff' }}
        >
          {initials}
        </span>
      )}
      {status && (
        <span className={[styles.status, styles[`status-${status}`]].join(' ')} aria-label={status} />
      )}
    </span>
  )
}

function AvatarGroup({ avatars = [], max = 4, size = 'md', className }) {
  const shown  = avatars.slice(0, max)
  const excess = avatars.length - max

  return (
    <span className={[styles.group, className || ''].filter(Boolean).join(' ')}>
      {shown.map((a, i) => (
        <Avatar key={i} {...a} size={size} className={styles.groupItem} />
      ))}
      {excess > 0 && (
        <span className={[styles.avatar, styles[`size-${size}`], styles.excess].join(' ')}>
          +{excess}
        </span>
      )}
    </span>
  )
}

export { Avatar, AvatarGroup }
