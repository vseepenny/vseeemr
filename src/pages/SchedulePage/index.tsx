import { Link } from 'react-router-dom'
import { scheduleData, patients } from '../../data/mockData'

const statusStyles: Record<string, { bg: string; color: string; dot: string }> = {
  Completed: { bg: 'var(--success-light)', color: '#065F46', dot: 'var(--success)' },
  'In Progress': { bg: 'var(--warning-light)', color: '#92400E', dot: 'var(--warning)' },
  Scheduled: { bg: 'var(--info-light)', color: '#075985', dot: 'var(--info)' },
}

function SchedulePage() {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const today = 2 // Wednesday index

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24,
      }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>Schedule</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm">Day</button>
          <button className="btn btn-primary btn-sm">Week</button>
          <button className="btn btn-ghost btn-sm">Month</button>
        </div>
      </div>

      {/* Week Header */}
      <div style={{
        display: 'flex', gap: 1, marginBottom: 24,
        background: 'var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden',
      }}>
        {daysOfWeek.map((day, i) => (
          <div key={day} style={{
            flex: 1, padding: '12px 16px',
            background: i === today ? 'var(--brand-50)' : 'var(--white)',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)',
              textTransform: 'uppercase' as const, letterSpacing: 0.5,
            }}>
              {day}
            </div>
            <div style={{
              fontSize: 'var(--text-2xl)', fontWeight: 700,
              color: i === today ? 'var(--brand)' : 'var(--text-primary)',
            }}>
              {17 + i}
            </div>
          </div>
        ))}
      </div>

      {/* Today's Detailed Schedule */}
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
            Wednesday, March 19
          </h2>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            {scheduleData.length} appointments
          </span>
        </div>

        {scheduleData.map((slot, i) => {
          const isBreak = slot.patient === '-'
          const ss = statusStyles[slot.status] || statusStyles.Scheduled
          const matchedPatient = patients.find(p => `${p.firstName} ${p.lastName}` === slot.patient)

          return (
            <div key={slot.id} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '14px 20px',
              borderBottom: i < scheduleData.length - 1 ? '1px solid var(--border)' : 'none',
              background: slot.status === 'In Progress' ? 'var(--brand-50)' : isBreak ? 'var(--surface-subtle)' : 'transparent',
            }}>
              {/* Time */}
              <div style={{ minWidth: 80 }}>
                <div style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{slot.time}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{slot.duration}</div>
              </div>

              {/* Status dot */}
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: ss.dot, flexShrink: 0,
              }} />

              {/* Patient Info */}
              <div style={{ flex: 1 }}>
                {isBreak ? (
                  <div style={{ fontWeight: 500, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                    {slot.reason}
                  </div>
                ) : (
                  <>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-base)' }}>
                      {slot.patient}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      {slot.reason} - {slot.type}
                    </div>
                  </>
                )}
              </div>

              {/* Status Badge */}
              <span style={{
                padding: '4px 10px', borderRadius: 'var(--r-full)',
                fontSize: 11, fontWeight: 600, background: ss.bg, color: ss.color,
              }}>
                {slot.status}
              </span>

              {/* Action */}
              {!isBreak && matchedPatient && (
                <Link to={`/patients/${matchedPatient.id}/encounter`} style={{
                  padding: '4px 12px', fontSize: 'var(--text-xs)', fontWeight: 600,
                  color: 'var(--brand)', background: 'var(--brand-light)',
                  border: '1px solid #A7F3D0', borderRadius: 'var(--r-sm)',
                  cursor: 'pointer', textDecoration: 'none',
                }}>
                  Open Chart
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SchedulePage
