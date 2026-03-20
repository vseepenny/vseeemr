import { allergies } from '../../../data/mockData'

const severityColors: Record<string, { bg: string; color: string }> = {
  Mild: { bg: 'var(--success-light)', color: '#065F46' },
  Moderate: { bg: 'var(--warning-light)', color: '#92400E' },
  Severe: { bg: 'var(--danger-light)', color: '#991B1B' },
}

function AllergiesTab() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Allergies</h2>
        <button className="btn btn-primary btn-sm">+ Add Allergy</button>
      </div>

      {/* Warning Banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 16px', background: 'var(--danger-light)',
        borderRadius: 'var(--r-md)', marginBottom: 16,
        fontSize: 'var(--text-sm)', fontWeight: 500, color: '#991B1B',
      }}>
        <span style={{ fontSize: 16 }}>&#9888;</span>
        Patient has {allergies.filter(a => a.status === 'Active').length} active allergies on record.
      </div>

      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border)' }}>
              {['Allergen', 'Reaction', 'Severity', 'Status', 'Onset', 'Source'].map(h => (
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
            {allergies.map(allergy => {
              const sc = severityColors[allergy.severity] || severityColors.Mild
              return (
                <tr key={allergy.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: 'var(--danger)', fontSize: 14 }}>&#9888;</span>
                      {allergy.allergen}
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>{allergy.reaction}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      display: 'inline-block', padding: '2px 8px',
                      borderRadius: 'var(--r-full)', fontSize: 11, fontWeight: 600,
                      background: sc.bg, color: sc.color,
                    }}>
                      {allergy.severity}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      display: 'inline-block', padding: '2px 8px',
                      borderRadius: 'var(--r-full)', fontSize: 11, fontWeight: 600,
                      background: allergy.status === 'Active' ? 'var(--danger-light)' : 'var(--grey-200)',
                      color: allergy.status === 'Active' ? '#991B1B' : 'var(--grey-600)',
                    }}>
                      {allergy.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>{allergy.onsetDate}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{allergy.source}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllergiesTab
