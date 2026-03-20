import { medications } from '../../../data/mockData'

const statusColors: Record<string, { bg: string; color: string }> = {
  Active: { bg: 'var(--success-light)', color: '#065F46' },
  Discontinued: { bg: 'var(--grey-200)', color: 'var(--grey-600)' },
  'On Hold': { bg: 'var(--warning-light)', color: '#92400E' },
}

function MedicationsTab() {
  const active = medications.filter(m => m.status === 'Active')
  const inactive = medications.filter(m => m.status !== 'Active')

  return (
    <div style={{ padding: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Medications</h2>
        <button className="btn btn-primary btn-sm">+ Add Medication</button>
      </div>

      {/* Active Medications */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{
          fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)',
          textTransform: 'uppercase' as const, letterSpacing: 0.5, marginBottom: 8,
        }}>
          Active Medications ({active.length})
        </h3>
        <div style={{
          background: 'var(--white)', borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border)', overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border)' }}>
                {['Medication', 'Dosage', 'Frequency', 'Route', 'Prescriber', 'Start Date', 'Refills', 'Status'].map(h => (
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
              {active.map(med => {
                const sc = statusColors[med.status]
                return (
                  <tr key={med.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{med.name}</td>
                    <td style={{ padding: '10px 12px' }}>{med.dosage}</td>
                    <td style={{ padding: '10px 12px' }}>{med.frequency}</td>
                    <td style={{ padding: '10px 12px' }}>{med.route}</td>
                    <td style={{ padding: '10px 12px' }}>{med.prescriber}</td>
                    <td style={{ padding: '10px 12px' }}>{med.startDate}</td>
                    <td style={{ padding: '10px 12px' }}>{med.refills}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px',
                        borderRadius: 'var(--r-full)', fontSize: 11, fontWeight: 600,
                        background: sc.bg, color: sc.color,
                      }}>
                        {med.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discontinued */}
      {inactive.length > 0 && (
        <div>
          <h3 style={{
            fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)',
            textTransform: 'uppercase' as const, letterSpacing: 0.5, marginBottom: 8,
          }}>
            Discontinued / On Hold ({inactive.length})
          </h3>
          <div style={{
            background: 'var(--white)', borderRadius: 'var(--r-lg)',
            border: '1px solid var(--border)', overflow: 'hidden',
          }}>
            {inactive.map((med, i) => {
              const sc = statusColors[med.status]
              return (
                <div key={med.id} style={{
                  padding: '10px 16px',
                  borderBottom: i < inactive.length - 1 ? '1px solid var(--border)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  opacity: 0.7,
                }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{med.name}</span>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: 8 }}>
                      {med.dosage} - {med.frequency}
                    </span>
                  </div>
                  <span style={{
                    padding: '2px 8px', borderRadius: 'var(--r-full)',
                    fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color,
                  }}>
                    {med.status}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicationsTab
