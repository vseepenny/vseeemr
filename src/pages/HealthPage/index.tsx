import { patients, vitalSigns } from '../../data/mockData'

function HealthPage() {
  const rpmPatients = [
    {
      patient: patients[0],
      device: 'Blood Pressure Monitor',
      lastReading: '138/88 mmHg',
      lastSync: '2 hours ago',
      trend: 'elevated' as const,
      alert: true,
    },
    {
      patient: patients[1],
      device: 'Glucose Monitor',
      lastReading: '142 mg/dL',
      lastSync: '4 hours ago',
      trend: 'stable' as const,
      alert: false,
    },
    {
      patient: patients[2],
      device: 'Pulse Oximeter',
      lastReading: '98%',
      lastSync: '1 hour ago',
      trend: 'normal' as const,
      alert: false,
    },
    {
      patient: patients[3],
      device: 'Weight Scale',
      lastReading: '198 lbs',
      lastSync: '1 day ago',
      trend: 'increasing' as const,
      alert: true,
    },
  ]

  const trendColors: Record<string, { bg: string; color: string }> = {
    normal: { bg: 'var(--success-light)', color: '#065F46' },
    stable: { bg: 'var(--success-light)', color: '#065F46' },
    elevated: { bg: 'var(--warning-light)', color: '#92400E' },
    increasing: { bg: 'var(--danger-light)', color: '#991B1B' },
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24,
      }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, marginBottom: 4 }}>Remote Patient Monitoring</h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Track patient vitals and device readings in real-time
          </p>
        </div>
        <button className="btn btn-primary">+ Enroll Patient</button>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16, marginBottom: 32,
      }}>
        {[
          { label: 'Enrolled Patients', value: rpmPatients.length, color: 'var(--brand)' },
          { label: 'Active Alerts', value: rpmPatients.filter(p => p.alert).length, color: 'var(--danger)' },
          { label: 'Readings Today', value: 12, color: 'var(--info)' },
          { label: 'Devices Connected', value: rpmPatients.length, color: 'var(--success)' },
        ].map((stat, i) => (
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

      {/* Patient Devices Table */}
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 32,
      }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--border)',
          fontWeight: 700, fontSize: 'var(--text-lg)',
        }}>
          Patient Devices & Readings
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border)' }}>
              {['Patient', 'Device', 'Last Reading', 'Last Sync', 'Trend', 'Alert', ''].map(h => (
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
            {rpmPatients.map((rpm, i) => {
              const tc = trendColors[rpm.trend]
              return (
                <tr key={i} style={{
                  borderBottom: '1px solid var(--border)',
                  background: rpm.alert ? 'rgba(220, 38, 38, 0.03)' : 'transparent',
                }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: rpm.patient.avatarGradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700, color: 'white',
                      }}>
                        {rpm.patient.initials}
                      </div>
                      <span style={{ fontWeight: 600 }}>
                        {rpm.patient.firstName} {rpm.patient.lastName}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>{rpm.device}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)' }}>
                    {rpm.lastReading}
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{rpm.lastSync}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 'var(--r-full)',
                      fontSize: 11, fontWeight: 600, background: tc.bg, color: tc.color,
                    }}>
                      {rpm.trend}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {rpm.alert && (
                      <span style={{ color: 'var(--danger)', fontWeight: 600, fontSize: 'var(--text-xs)' }}>
                        &#9888; Action Required
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <button style={{
                      padding: '4px 10px', fontSize: 'var(--text-xs)',
                      color: 'var(--text-brand)', background: 'transparent',
                      border: '1px solid var(--border)', borderRadius: 'var(--r-sm)',
                      cursor: 'pointer', fontFamily: 'var(--font)',
                    }}>
                      View Details
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* BP Trend for Alena */}
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
            BP Trend - Alena Workman
          </h2>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Last 4 readings
          </span>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
          }}>
            {vitalSigns.map((v, i) => {
              const systolic = parseInt(v.bloodPressure.split('/')[0])
              const isElevated = systolic >= 135
              return (
                <div key={i} style={{
                  padding: 12, borderRadius: 'var(--r-md)',
                  background: isElevated ? 'var(--warning-light)' : 'var(--surface-subtle)',
                  border: `1px solid ${isElevated ? 'var(--warning)' : 'var(--border)'}`,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 4 }}>
                    {v.date}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-2xl)', fontWeight: 700,
                    color: isElevated ? '#92400E' : 'var(--text-primary)',
                  }}>
                    {v.bloodPressure}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>mmHg</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthPage
