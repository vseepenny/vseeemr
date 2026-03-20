import { Link } from 'react-router-dom'
import type { Patient, Visit } from '../../types'

interface Props {
  patient: Patient;
  visit?: Visit;
}

function PatientSidebar({ patient, visit }: Props) {
  return (
    <aside style={{
      width: 320, background: 'var(--white)',
      borderRight: '1px solid var(--border)', flexShrink: 0, overflowY: 'auto',
    }}>
      {/* Back link */}
      <Link to="/patients" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 16px', fontSize: 'var(--text-sm)',
        color: 'var(--text-brand)', cursor: 'pointer', textDecoration: 'none',
        borderBottom: '1px solid var(--border)',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 2L4 7l5 5"/>
        </svg>
        All participants
      </Link>

      {/* Patient Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: patient.avatarGradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 'var(--text-lg)', fontWeight: 700, color: 'white', flexShrink: 0,
          }}>
            {patient.initials}
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>
              {patient.firstName} {patient.lastName}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '2px 8px', borderRadius: 'var(--r-full)',
                fontSize: 11, fontWeight: 600,
                background: 'var(--grey-200)', color: 'var(--grey-600)',
                marginLeft: 8,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--grey-500)' }} />
                {patient.status}
              </span>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr',
          gap: '6px 12px', fontSize: 'var(--text-sm)',
        }}>
          <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>Age</span>
          <span>{patient.age}</span>
          <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>DOB</span>
          <span>{patient.dob}</span>
          <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>Sex</span>
          <span>{patient.sex}</span>
          <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>Address</span>
          <span>{patient.address}</span>
        </div>
      </div>

      {/* Contact */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 6 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M2 5l6 4 6-4"/>
          </svg>
          <span>{patient.email}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 3.5h3l1.5 3-1.5 1.5a8 8 0 003.5 3.5L11 10l3 1.5v3h-1a11 11 0 01-10.5-11z"/>
          </svg>
          <span>{patient.phone}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
        {['Chat', 'Add Participant', 'Schedule'].map((title) => (
          <button key={title} title={title} style={{
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
            background: 'var(--white)', cursor: 'pointer', color: 'var(--text-secondary)',
            fontSize: 16,
          }}>
            {title === 'Chat' && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h12v8H5l-3 3V3z"/></svg>
            )}
            {title === 'Add Participant' && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="5" r="3"/><path d="M2 14v-1a4 4 0 018 0v1"/><path d="M12 5v4m-2-2h4"/></svg>
            )}
            {title === 'Schedule' && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M5 1v3m6-3v3M2 7h12"/></svg>
            )}
          </button>
        ))}
      </div>

      {/* Visit Details */}
      {visit && (
        <div style={{ padding: '16px 20px' }}>
          {[
            { icon: '#', label: 'Visit ID', value: visit.id },
            { icon: '\uD83D\uDCC5', value: `${visit.date} ${visit.time}` },
            { icon: '\uD83D\uDCF9', value: `${visit.type}` },
            { icon: '\u2139', value: visit.reason },
            { icon: '\u23F1', value: visit.duration },
            { icon: '\uD83D\uDCB3', value: visit.cost },
            { icon: '\uD83D\uDCCD', value: visit.room },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '6px 0', fontSize: 'var(--text-sm)',
            }}>
              <span style={{
                width: 18, height: 18, color: 'var(--grey-500)', flexShrink: 0,
                marginTop: 1, fontSize: 14, display: 'flex', alignItems: 'center',
              }}>
                {item.icon}
              </span>
              <span style={{ color: 'var(--text-primary)' }}>
                {item.label && <span style={{ color: 'var(--text-secondary)' }}>{item.label} </span>}
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

export default PatientSidebar
