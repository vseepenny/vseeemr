import { documents } from '../../../data/mockData'

const typeIcons: Record<string, string> = {
  'Lab Report': '\uD83E\uDDEA',
  'Insurance': '\uD83D\uDCB3',
  'Referral': '\uD83D\uDCE4',
  'Medical Record': '\uD83D\uDCC4',
  'Consent': '\u270D\uFE0F',
}

const statusColors: Record<string, { bg: string; color: string }> = {
  Final: { bg: 'var(--success-light)', color: '#065F46' },
  Verified: { bg: 'var(--success-light)', color: '#065F46' },
  Sent: { bg: 'var(--info-light)', color: '#075985' },
  Received: { bg: 'var(--info-light)', color: '#075985' },
  Signed: { bg: 'var(--success-light)', color: '#065F46' },
  Pending: { bg: 'var(--warning-light)', color: '#92400E' },
}

function DocumentsTab() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Documents</h2>
        <button className="btn btn-primary btn-sm">+ Upload Document</button>
      </div>

      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border)' }}>
              {['Document', 'Type', 'Date', 'Source', 'Status', ''].map((h, i) => (
                <th key={i} style={{
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
            {documents.map(doc => {
              const sc = statusColors[doc.status] || statusColors.Pending
              return (
                <tr key={doc.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{typeIcons[doc.type] || '\uD83D\uDCC4'}</span>
                      <span style={{ fontWeight: 500, color: 'var(--text-brand)', cursor: 'pointer' }}>
                        {doc.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 'var(--r-sm)',
                      fontSize: 11, fontWeight: 500, background: 'var(--surface-muted)',
                      color: 'var(--text-secondary)',
                    }}>
                      {doc.type}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>{doc.date}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{doc.provider}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      display: 'inline-block', padding: '2px 8px',
                      borderRadius: 'var(--r-full)', fontSize: 11, fontWeight: 600,
                      background: sc.bg, color: sc.color,
                    }}>
                      {doc.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <button style={{
                      padding: '4px 10px', fontSize: 'var(--text-xs)',
                      color: 'var(--text-brand)', background: 'transparent',
                      border: '1px solid var(--border)', borderRadius: 'var(--r-sm)',
                      cursor: 'pointer', fontFamily: 'var(--font)',
                    }}>
                      View
                    </button>
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

export default DocumentsTab
