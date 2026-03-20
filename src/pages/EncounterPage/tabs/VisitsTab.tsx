import type { Visit } from '../../../types'

interface Props {
  visits: Visit[];
}

const statusColors: Record<string, { bg: string; color: string }> = {
  Completed: { bg: 'var(--success-light)', color: '#065F46' },
  Pending: { bg: 'var(--warning-light)', color: '#92400E' },
  Cancelled: { bg: 'var(--grey-200)', color: 'var(--grey-600)' },
  'In Progress': { bg: 'var(--info-light)', color: '#075985' },
  Scheduled: { bg: 'var(--info-light)', color: '#075985' },
}

function VisitsTab({ visits }: Props) {
  return (
    <div style={{ padding: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Visit History</h2>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          {visits.length} visits
        </span>
      </div>

      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border)' }}>
              {['Date', 'Time', 'Type', 'Reason', 'Provider', 'Duration', 'Status'].map(h => (
                <th key={h} style={{
                  padding: '10px 12px', textAlign: 'left', fontWeight: 600,
                  color: 'var(--text-secondary)', fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase' as const, letterSpacing: 0.5,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visits.map(visit => {
              const sc = statusColors[visit.status] || statusColors.Completed
              return (
                <tr key={visit.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{visit.date}</td>
                  <td style={{ padding: '10px 12px' }}>{visit.time}</td>
                  <td style={{ padding: '10px 12px' }}>{visit.type}</td>
                  <td style={{ padding: '10px 12px' }}>{visit.reason}</td>
                  <td style={{ padding: '10px 12px' }}>{visit.provider}</td>
                  <td style={{ padding: '10px 12px' }}>{visit.duration}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      display: 'inline-block', padding: '2px 8px',
                      borderRadius: 'var(--r-full)', fontSize: 11, fontWeight: 600,
                      background: sc.bg, color: sc.color,
                    }}>
                      {visit.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VisitsTab
