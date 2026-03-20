import { vitalSigns } from '../../../data/mockData'

function IntakeTab() {
  const latest = vitalSigns[0]

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 16 }}>Patient Intake</h2>

      {/* Vitals Section */}
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', marginBottom: 24,
      }}>
        <div style={{
          padding: '12px 16px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>Vital Signs</h3>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Recorded: {latest.date}
          </span>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16, padding: 16,
        }}>
          {[
            { label: 'Blood Pressure', value: latest.bloodPressure, unit: 'mmHg', alert: true },
            { label: 'Heart Rate', value: latest.heartRate, unit: 'bpm' },
            { label: 'Temperature', value: `${latest.temperature}\u00B0`, unit: 'F' },
            { label: 'Respiratory Rate', value: latest.respiratoryRate, unit: '/min' },
            { label: 'SpO2', value: `${latest.oxygenSaturation}%`, unit: '' },
            { label: 'Weight', value: latest.weight, unit: 'lbs' },
            { label: 'Height', value: latest.height, unit: '' },
            { label: 'BMI', value: latest.bmi, unit: '' },
          ].map((vital, i) => (
            <div key={i} style={{
              padding: 12, background: 'var(--surface-subtle)',
              borderRadius: 'var(--r-md)',
              border: vital.alert ? '1px solid var(--warning)' : '1px solid var(--border)',
            }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: 4 }}>
                {vital.label}
              </div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: vital.alert ? '#92400E' : 'var(--text-primary)' }}>
                {vital.value}
                {vital.unit && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 400, color: 'var(--text-secondary)', marginLeft: 4 }}>{vital.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chief Complaint */}
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', marginBottom: 24, padding: 16,
      }}>
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 12 }}>Chief Complaint</h3>
        <div style={{
          padding: 12, background: 'var(--surface-subtle)',
          borderRadius: 'var(--r-md)', fontSize: 'var(--text-base)',
          color: 'var(--text-primary)', lineHeight: 1.6,
        }}>
          Patient reports persistent headache and intermittent dizziness for the past 2 weeks.
        </div>
      </div>

      {/* Reason for Visit */}
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', marginBottom: 24, padding: 16,
      }}>
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 12 }}>Reason for Visit</h3>
        <div style={{
          padding: 12, background: 'var(--surface-subtle)',
          borderRadius: 'var(--r-md)', fontSize: 'var(--text-base)',
          color: 'var(--text-primary)', lineHeight: 1.6,
        }}>
          30-minute video consultation for evaluation of recurring headaches and dizziness. Patient has history of hypertension and reports worsening symptoms over past two weeks.
        </div>
      </div>

      {/* Screening Questionnaires */}
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', padding: 16,
      }}>
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 12 }}>Screening Questionnaires</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { name: 'PHQ-9 (Depression)', score: '4/27', status: 'Minimal', color: 'var(--success)' },
            { name: 'GAD-7 (Anxiety)', score: '8/21', status: 'Mild', color: 'var(--warning)' },
            { name: 'Pain Scale (NRS)', score: '6/10', status: 'Moderate', color: 'var(--warning)' },
          ].map((q, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 12px', background: 'var(--surface-subtle)',
              borderRadius: 'var(--r-md)',
            }}>
              <span style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>{q.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{q.score}</span>
                <span style={{
                  padding: '2px 8px', borderRadius: 'var(--r-full)',
                  fontSize: 11, fontWeight: 600,
                  background: q.color === 'var(--success)' ? 'var(--success-light)' : 'var(--warning-light)',
                  color: q.color === 'var(--success)' ? '#065F46' : '#92400E',
                }}>
                  {q.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IntakeTab
