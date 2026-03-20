import { soapNote, vitalSigns } from '../../../data/mockData'

function MedicalHistoryTab() {
  const subj = soapNote.subjective

  const sections = [
    { title: 'Past Medical History', content: subj.pmh },
    { title: 'Past Surgeries', content: subj.pastSurgeries },
    { title: 'Family History', content: subj.familyHistory },
    { title: 'Social History', content: subj.socialHistory },
    { title: 'Health Habits', content: subj.healthHabits },
    { title: 'Medications', content: subj.medications },
    { title: 'Allergies', content: subj.allergies },
  ]

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 16 }}>Medical History</h2>

      {/* Vitals Trend */}
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', marginBottom: 24, overflow: 'hidden',
      }}>
        <div style={{
          padding: '12px 16px', borderBottom: '1px solid var(--border)',
          fontWeight: 600, fontSize: 'var(--text-base)',
        }}>
          Vitals History
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--surface-subtle)' }}>
              {['Date', 'BP', 'HR', 'Temp', 'RR', 'SpO2', 'Weight', 'BMI'].map(h => (
                <th key={h} style={{
                  padding: '8px 12px', textAlign: 'left', fontWeight: 600,
                  color: 'var(--text-secondary)', fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase' as const, letterSpacing: 0.5,
                  borderBottom: '1px solid var(--border)',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vitalSigns.map((v, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 500 }}>{v.date}</td>
                <td style={{
                  padding: '8px 12px',
                  color: parseInt(v.bloodPressure.split('/')[0]) >= 140 ? '#DC2626' : 'inherit',
                  fontWeight: parseInt(v.bloodPressure.split('/')[0]) >= 140 ? 600 : 400,
                }}>
                  {v.bloodPressure}
                </td>
                <td style={{ padding: '8px 12px' }}>{v.heartRate}</td>
                <td style={{ padding: '8px 12px' }}>{v.temperature}</td>
                <td style={{ padding: '8px 12px' }}>{v.respiratoryRate}</td>
                <td style={{ padding: '8px 12px' }}>{v.oxygenSaturation}%</td>
                <td style={{ padding: '8px 12px' }}>{v.weight} lbs</td>
                <td style={{ padding: '8px 12px' }}>{v.bmi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Medical History Sections */}
      {sections.map((section, i) => (
        <div key={i} style={{
          background: 'var(--white)', borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border)', marginBottom: 16, overflow: 'hidden',
        }}>
          <div style={{
            padding: '10px 16px', borderBottom: '1px solid var(--border)',
            fontWeight: 600, fontSize: 'var(--text-sm)', background: 'var(--surface-subtle)',
          }}>
            {section.title}
          </div>
          <div style={{
            padding: '12px 16px', fontSize: 'var(--text-base)',
            color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' as const,
          }}>
            {section.content}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MedicalHistoryTab
