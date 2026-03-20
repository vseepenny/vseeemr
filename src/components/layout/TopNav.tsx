import { NavLink } from 'react-router-dom'

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: 'flex', alignItems: 'center', height: 56,
    padding: '0 24px', background: 'var(--white)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky', top: 0, zIndex: 30,
  },
  logo: {
    fontSize: 'var(--text-2xl)', fontWeight: 800,
    color: 'var(--brand)', letterSpacing: -0.5,
    marginRight: 40, cursor: 'pointer', textDecoration: 'none',
  },
  logoSpan: {
    fontWeight: 400, color: 'var(--text-secondary)',
    fontSize: 'var(--text-lg)', marginLeft: 2,
  },
  links: { display: 'flex', gap: 4, flex: 1 },
  right: { display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto' },
  avatar: {
    width: 32, height: 32, borderRadius: '50%',
    background: 'var(--brand-light)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 700, color: 'var(--brand)', cursor: 'pointer',
  },
  userName: {
    display: 'flex', alignItems: 'center', gap: 8,
    cursor: 'pointer', fontSize: 'var(--text-sm)',
    fontWeight: 500, color: 'var(--text-primary)',
  },
}

function TopNav() {
  const linkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
    padding: '8px 14px',
    fontSize: 'var(--text-sm)',
    fontWeight: isActive ? 600 : 500,
    color: isActive ? 'var(--text-brand)' : 'var(--text-secondary)',
    borderRadius: 'var(--r-md)',
    transition: 'all 150ms',
    cursor: 'pointer',
    textDecoration: 'none',
    background: isActive ? 'var(--brand-50)' : 'transparent',
  })

  return (
    <nav style={styles.nav}>
      <NavLink to="/" style={styles.logo}>
        VSee Clinic
      </NavLink>
      <div style={styles.links}>
        <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/patients" style={linkStyle}>Patients</NavLink>
        <NavLink to="/schedule" style={linkStyle}>Schedule</NavLink>
        <NavLink to="/health" style={linkStyle}>Health</NavLink>
      </div>
      <div style={styles.right}>
        <div style={styles.userName}>
          <div style={styles.avatar}>CJ</div>
          <span>Charlotte Jones</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{ color: 'var(--grey-500)' }}>
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
    </nav>
  )
}

export default TopNav
