import { Link } from 'react-router-dom'
import { patients, visits, scheduleData } from '../../data/mockData'

function DashboardPage() {
  const todayVisits = visits.filter(v => v.date === 'Today')
  const pendingNotes = visits.filter(v => v.status === 'Pending')
  const upcomingSchedule = scheduleData.filter(s => s.status === 'Scheduled')

  const stats = [
    { label: "Today's Appointments", value: todayVisits.length, color: 'var(--brand)' },
    { label: 'Pending Notes', value: pendingNotes.length, color: 'var(--warning)' },
    { label: 'Active Patients', value: patients.filter(p => p.status === 'Active').length, color: 'var(--info)' },
    { label: 'Upcoming', value: upcomingSchedule.length, color: 'var(--success)' },
  ]

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, marginBottom: 24 }}>Dashboard</h1>

      {/* Stats Cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16, marginBottom: 32,
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: 'var(--white)', borderRadius: 'var(--r-lg)',
            border: '1px solid var(--border)', padding: 20,
            borderLeft: `4px solid ${stat.color}`,
          }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 4 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Today's Schedule */}
        <div style={{
          background: 'var(--white)', borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Today's Schedule</h2>
            <Link to="/schedule" style={{
              fontSize: 'var(--text-sm)', fontWeight: 600,
              color: 'var(--text-brand)', textDecoration: 'none',
            }}>
              View All
            </Link>
          </div>
          <div>
            {scheduleData.map((slot, i) => {
              const isBreak = slot.patient === '-'
              const statusColor = slot.status === 'Completed' ? 'var(--success)'
                : slot.status === 'In Progress' ? 'var(--warning)' : 'var(--info)'
              return (
                <div key={slot.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 20px',
                  borderBottom: i < scheduleData.length - 1 ? '1px solid var(--border)' : 'none',
                  opacity: isBreak ? 0.6 : 1,
                  background: slot.status === 'In Progress' ? 'var(--brand-50)' : 'transparent',
                }}>
                  <span style={{
                    fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)',
                    minWidth: 70,
                  }}>
                    {slot.time}
                  </span>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: statusColor, flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>
                      {isBreak ? slot.reason : slot.patient}
                    </div>
                    {!isBreak && (
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                        {slot.reason} - {slot.type}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    {slot.duration}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Patients */}
        <div style={{
          background: 'var(--white)', borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Recent Patients</h2>
            <Link to="/patients" style={{
              fontSize: 'var(--text-sm)', fontWeight: 600,
              color: 'var(--text-brand)', textDecoration: 'none',
            }}>
              View All
            </Link>
          </div>
          <div>
            {patients.slice(0, 5).map((patient, i) => (
              <Link
                key={patient.id}
                to={`/patients/${patient.id}/encounter`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 20px',
                  borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
                  textDecoration: 'none', color: 'inherit',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: patient.avatarGradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0,
                }}>
                  {patient.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>
                    {patient.firstName} {patient.lastName}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    {patient.age} / {patient.sex.charAt(0)} - {patient.insurance}
                  </div>
                </div>
                <span style={{
                  padding: '2px 8px', borderRadius: 'var(--r-full)',
                  fontSize: 11, fontWeight: 600,
                  background: patient.status === 'Active' ? 'var(--success-light)' : 'var(--grey-200)',
                  color: patient.status === 'Active' ? '#065F46' : 'var(--grey-600)',
                }}>
                  {patient.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
