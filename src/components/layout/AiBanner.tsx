import { useState } from 'react'

interface AiBannerProps {
  onViewNotes?: () => void;
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 12, padding: '12px 24px',
    background: 'var(--brand-light)',
    borderBottom: '1px solid #A7F3D0',
    position: 'relative',
  },
  icon: { fontSize: 18 },
  text: {
    fontSize: 'var(--text-sm)', fontWeight: 500,
    color: 'var(--text-brand)',
  },
  link: {
    fontWeight: 600, color: 'var(--brand)',
    cursor: 'pointer', textDecoration: 'none', marginLeft: 4,
    background: 'none', border: 'none', fontSize: 'var(--text-sm)',
    fontFamily: 'var(--font)',
  },
  close: {
    position: 'absolute' as const, right: 16,
    background: 'none', border: 'none', cursor: 'pointer',
    color: 'var(--text-brand)', fontSize: 18,
    padding: 4, borderRadius: 'var(--r-sm)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
}

function AiBanner({ onViewNotes }: AiBannerProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div style={styles.banner}>
      <span style={styles.icon}>&#10024;</span>
      <span style={styles.text}>
        The meeting summary and AI SOAP notes are ready.
        <button style={styles.link} onClick={onViewNotes}>
          View them now &rarr;
        </button>
      </span>
      <button style={styles.close} onClick={() => setVisible(false)} aria-label="Close banner">
        &times;
      </button>
    </div>
  )
}

export default AiBanner
