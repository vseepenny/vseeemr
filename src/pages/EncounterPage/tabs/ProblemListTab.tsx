import { problems } from '../../../data/mockData'

const statusColors: Record<string, { bg: string; color: string }> = {
  Active: { bg: 'var(--danger-light)', color: '#991B1B' },
  Resolved: { bg: 'var(--success-light)', color: '#065F46' },
  Inactive: { bg: 'var(--grey-200)', color: 'var(--grey-600)' },
}

function ProblemListTab() {
  const active = problems.filter(p => p.status === 'Active')
  const resolved = problems.filter(p => p.status !== 'Active')

  return (
    <div style={{ padding: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Problem List</h2>
        <button className="btn btn-primary btn-sm">+ Add Problem</button>
      </div>

      {/* Active Problems */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{
          fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)',
          textTransform: 'uppercase' as const, letterSpacing: 0.5, marginBottom: 8,
        }}>
          Active Problems ({active.length})
        </h3>
        <div style={{
          background: 'var(--white)', borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border)', overflow: 'hidden',
        }}>
          {active.map((problem, i) => {
            const sc = statusColors[problem.status]
            return (
              <div key={problem.id} style={{
                padding: '12px 16px',
                borderBottom: i < active.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--text-base)' }}>{problem.name}</span>
                    <span style={{
                      padding: '1px 6px', borderRadius: 'var(--r-sm)',
                      fontSize: 11, fontWeight: 600, fontFamily: 'var(--mono)',
                      background: 'var(--info-light)', color: '#075985',
                    }}>
                      {problem.icd10}
                    </span>
                    <span style={{
                      padding: '1px 6px', borderRadius: 'var(--r-full)',
                      fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color,
                    }}>
                      {problem.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 2 }}>
                    Onset: {problem.onsetDate} | Diagnosed by: {problem.diagnosedBy}
                  </div>
                  {problem.notes && (
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      {problem.notes}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Resolved Problems */}
      {resolved.length > 0 && (
        <div>
          <h3 style={{
            fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)',
            textTransform: 'uppercase' as const, letterSpacing: 0.5, marginBottom: 8,
          }}>
            Resolved / Inactive ({resolved.length})
          </h3>
          <div style={{
            background: 'var(--white)', borderRadius: 'var(--r-lg)',
            border: '1px solid var(--border)', overflow: 'hidden',
          }}>
            {resolved.map((problem, i) => {
              const sc = statusColors[problem.status]
              return (
                <div key={problem.id} style={{
                  padding: '12px 16px',
                  borderBottom: i < resolved.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>{problem.name}</span>
                    <span style={{
                      padding: '1px 6px', borderRadius: 'var(--r-sm)',
                      fontSize: 11, fontWeight: 600, fontFamily: 'var(--mono)',
                      background: 'var(--grey-200)', color: 'var(--grey-600)',
                    }}>
                      {problem.icd10}
                    </span>
                    <span style={{
                      padding: '1px 6px', borderRadius: 'var(--r-full)',
                      fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color,
                    }}>
                      {problem.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                    {problem.notes}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProblemListTab
