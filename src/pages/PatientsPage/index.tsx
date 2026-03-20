import { useState } from 'react'
import { Link } from 'react-router-dom'
import { patients, visits } from '../../data/mockData'

function PatientsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')

  const filtered = patients.filter(p => {
    const matchesSearch = `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
      || p.mrn.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24,
      }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>Patients</h1>
        <button className="btn btn-primary">+ New Patient</button>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 16,
      }}>
        <input
          type="text"
          className="input"
          placeholder="Search patients by name or MRN..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 360 }}
        />
        <select
          className="input"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ width: 160 }}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Patient Table */}
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--border)', overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border)' }}>
              {['Patient', 'MRN', 'Age / Sex', 'Phone', 'Insurance', 'Last Visit', 'Status', ''].map(h => (
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
            {filtered.map(patient => {
              const patientVisits = visits.filter(v => v.patientId === patient.id)
              const lastVisit = patientVisits.length > 0 ? patientVisits[0].date : '-'

              return (
                <tr key={patient.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: patient.avatarGradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0,
                      }}>
                        {patient.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{patient.firstName} {patient.lastName}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{patient.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)' }}>{patient.mrn}</td>
                  <td style={{ padding: '10px 12px' }}>{patient.age} / {patient.sex.charAt(0)}</td>
                  <td style={{ padding: '10px 12px' }}>{patient.phone}</td>
                  <td style={{ padding: '10px 12px' }}>{patient.insurance}</td>
                  <td style={{ padding: '10px 12px' }}>{lastVisit}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      display: 'inline-block', padding: '2px 8px',
                      borderRadius: 'var(--r-full)', fontSize: 11, fontWeight: 600,
                      background: patient.status === 'Active' ? 'var(--success-light)' : 'var(--grey-200)',
                      color: patient.status === 'Active' ? '#065F46' : 'var(--grey-600)',
                    }}>
                      {patient.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <Link to={`/patients/${patient.id}/encounter`} style={{
                      padding: '4px 12px', fontSize: 'var(--text-xs)', fontWeight: 600,
                      color: 'var(--brand)', background: 'var(--brand-light)',
                      border: '1px solid #A7F3D0', borderRadius: 'var(--r-sm)',
                      cursor: 'pointer', textDecoration: 'none',
                    }}>
                      Open
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
      }}>
        <span>Showing {filtered.length} of {patients.length} patients</span>
      </div>
    </div>
  )
}

export default PatientsPage
