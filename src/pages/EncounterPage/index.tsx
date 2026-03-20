import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PatientSidebar from './PatientSidebar'
import AiBanner from '../../components/layout/AiBanner'
import NotesTab from './tabs/NotesTab'
import IntakeTab from './tabs/IntakeTab'
import VisitsTab from './tabs/VisitsTab'
import ProblemListTab from './tabs/ProblemListTab'
import MedicalHistoryTab from './tabs/MedicalHistoryTab'
import AllergiesTab from './tabs/AllergiesTab'
import MedicationsTab from './tabs/MedicationsTab'
import DocumentsTab from './tabs/DocumentsTab'
import { patients, visits } from '../../data/mockData'

const tabList = [
  { id: 'intake', label: 'Intake' },
  { id: 'notes', label: 'Notes' },
  { id: 'visits', label: 'Visits' },
  { id: 'problem-list', label: 'Problem List' },
  { id: 'medical-history', label: 'Medical History' },
  { id: 'allergies', label: 'Allergies' },
  { id: 'medications', label: 'Medications' },
  { id: 'documents', label: 'Documents' },
]

function EncounterPage() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState('notes')
  const [aiPanelOpen, setAiPanelOpen] = useState(false)

  const patient = patients.find(p => p.id === id) || patients[0]
  const patientVisits = visits.filter(v => v.patientId === patient.id)
  const currentVisit = patientVisits[0]

  const renderTab = () => {
    switch (activeTab) {
      case 'intake': return <IntakeTab />
      case 'notes': return <NotesTab aiPanelOpen={aiPanelOpen} setAiPanelOpen={setAiPanelOpen} />
      case 'visits': return <VisitsTab visits={patientVisits} />
      case 'problem-list': return <ProblemListTab />
      case 'medical-history': return <MedicalHistoryTab />
      case 'allergies': return <AllergiesTab />
      case 'medications': return <MedicationsTab />
      case 'documents': return <DocumentsTab />
      default: return <NotesTab aiPanelOpen={aiPanelOpen} setAiPanelOpen={setAiPanelOpen} />
    }
  }

  return (
    <>
      <AiBanner onViewNotes={() => { setActiveTab('notes'); setAiPanelOpen(true); }} />

      {/* Status Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '12px 24px',
        background: 'var(--white)', borderBottom: '1px solid var(--border)', gap: 12,
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 'var(--r-full)',
          fontSize: 12, fontWeight: 600, background: 'var(--warning-light)', color: '#92400E',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#F59E0B' }} />
          Pending Completion
        </span>
        <span style={{ width: 1, height: 20, background: 'var(--border)' }} />
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 'var(--r-full)',
          fontSize: 12, fontWeight: 600, background: 'var(--info-light)', color: '#075985',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0575AD' }} />
          Pending Notes
        </span>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
        <PatientSidebar patient={patient} visit={currentVisit} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
          {/* Tabs */}
          <div style={{
            display: 'flex', borderBottom: '1px solid var(--border)',
            background: 'var(--white)', padding: '0 24px',
            position: 'sticky', top: 56, zIndex: 10,
          }}>
            {tabList.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 20px', fontSize: 'var(--text-sm)',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  color: activeTab === tab.id ? 'var(--brand)' : 'var(--text-secondary)',
                  cursor: 'pointer', borderBottom: `2px solid ${activeTab === tab.id ? 'var(--brand)' : 'transparent'}`,
                  transition: 'all 150ms', marginBottom: -1, whiteSpace: 'nowrap',
                  background: 'none', border: 'none', borderBottomStyle: 'solid',
                  borderBottomWidth: 2, fontFamily: 'var(--font)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {renderTab()}
          </div>
        </div>
      </div>
    </>
  )
}

export default EncounterPage
