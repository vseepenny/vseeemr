import { useState, useEffect } from 'react'
import { soapNote, aiGeneratedNotes } from '../../../data/mockData'
import type { SOAPNote } from '../../../types'

interface Props {
  aiPanelOpen: boolean;
  setAiPanelOpen: (open: boolean) => void;
}

interface NoteFieldProps {
  title: string;
  fieldId: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function NoteField({ title, value, onChange, placeholder }: NoteFieldProps) {
  const [editing, setEditing] = useState(false)
  const hasContent = value.trim().length > 0

  return (
    <div style={{
      marginBottom: 16, border: '1px solid var(--border)',
      borderRadius: 'var(--r-md)', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', background: 'var(--grey-100)',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
          {title}
        </span>
        <button onClick={() => setEditing(!editing)} style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '4px 10px', fontSize: 'var(--text-xs)', fontWeight: 500,
          color: 'var(--text-brand)', background: 'transparent', border: 'none',
          cursor: 'pointer', borderRadius: 'var(--r-sm)',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 1.5l2 2L4 10H2v-2L8.5 1.5z"/>
          </svg>
          {editing ? 'Save' : 'Edit'}
        </button>
      </div>
      <div style={{ padding: 12, minHeight: 40 }}>
        {editing ? (
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            autoFocus
            style={{
              width: '100%', border: 'none', outline: 'none',
              fontFamily: 'var(--font)', fontSize: 'var(--text-base)',
              color: 'var(--text-primary)', resize: 'vertical',
              minHeight: 60, lineHeight: 1.6,
            }}
          />
        ) : (
          <span style={{
            whiteSpace: 'pre-wrap',
            color: hasContent ? 'var(--text-primary)' : 'var(--text-tertiary)',
            fontStyle: hasContent ? 'normal' : 'italic',
            fontSize: 'var(--text-base)',
          }}>
            {hasContent ? value : `Click Edit to add ${title}...`}
          </span>
        )}
      </div>
    </div>
  )
}

function SOAPSection({ title, children, onAiAssist }: {
  title: string; children: React.ReactNode; onAiAssist?: () => void;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 0', borderBottom: '2px solid var(--brand)', marginBottom: 16,
      }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--brand)' }}>
          {title}
        </h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {title === 'Subjective' && (
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', fontSize: 'var(--text-sm)', fontWeight: 500,
              color: 'var(--text-secondary)', background: 'var(--white)',
              border: '1px solid var(--border)', borderRadius: 'var(--r-sm)',
              cursor: 'pointer',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="10" height="10" rx="1.5"/>
                <path d="M5 5h4M5 7h4M5 9h2"/>
              </svg>
              Templates &#9662;
            </button>
          )}
          {onAiAssist && (
            <button onClick={onAiAssist} style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, padding: '6px 14px', fontSize: 'var(--text-sm)', fontWeight: 600,
              color: 'var(--brand)', background: 'var(--brand-light)',
              border: '1px solid #A7F3D0', borderRadius: 'var(--r-sm)', cursor: 'pointer',
            }}>
              <span style={{ fontSize: 14 }}>&#10024;</span> AI Assist
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

function NotesTab({ aiPanelOpen, setAiPanelOpen }: Props) {
  const [notes, setNotes] = useState<SOAPNote>(soapNote)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiReady, setAiReady] = useState(false)

  useEffect(() => {
    if (aiPanelOpen && !aiReady) {
      setAiLoading(true)
      const timer = setTimeout(() => {
        setAiLoading(false)
        setAiReady(true)
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [aiPanelOpen, aiReady])

  const updateSubjective = (key: keyof SOAPNote['subjective'], value: string) => {
    setNotes(prev => ({ ...prev, subjective: { ...prev.subjective, [key]: value } }))
  }
  const updateObjective = (key: keyof SOAPNote['objective'], value: string) => {
    setNotes(prev => ({ ...prev, objective: { ...prev.objective, [key]: value } }))
  }
  const updateAssessment = (key: keyof SOAPNote['assessment'], value: string) => {
    setNotes(prev => ({ ...prev, assessment: { ...prev.assessment, [key]: value } }))
  }
  const updatePlan = (key: keyof SOAPNote['plan'], value: string) => {
    setNotes(prev => ({ ...prev, plan: { ...prev.plan, [key]: value } }))
  }

  const applyAiNotes = () => {
    setNotes(prev => ({
      ...prev,
      subjective: { ...prev.subjective, hpi: aiGeneratedNotes.subjective.hpi },
      objective: { ...prev.objective, physicalExam: aiGeneratedNotes.objective.physicalExam },
      assessment: { ...prev.assessment, diagnosis: aiGeneratedNotes.assessment.diagnosis },
      plan: {
        treatmentPlan: aiGeneratedNotes.plan.treatmentPlan,
        prescriptions: aiGeneratedNotes.plan.prescriptions,
        followUp: aiGeneratedNotes.plan.followUp,
      },
    }))
    setAiPanelOpen(false)
  }

  const openPanel = () => {
    setAiPanelOpen(true)
    if (aiReady) return
    setAiLoading(true)
    setTimeout(() => { setAiLoading(false); setAiReady(true) }, 1800)
  }

  return (
    <>
      <div style={{ padding: 24 }}>
        {/* Section Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', background: 'var(--surface-muted)',
          borderRadius: 'var(--r-md)', marginBottom: 16,
        }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Notes</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-sm btn-ghost">Collapse All</button>
            <button className="btn btn-sm btn-ghost">Expand All</button>
          </div>
        </div>

        {/* Subjective */}
        <SOAPSection title="Subjective" onAiAssist={openPanel}>
          <NoteField title="Chief Complaint" fieldId="cc" value={notes.subjective.chiefComplaint} onChange={v => updateSubjective('chiefComplaint', v)} />
          <NoteField title="History of Present Illness" fieldId="hpi" value={notes.subjective.hpi} onChange={v => updateSubjective('hpi', v)} placeholder="Document the history of present illness..." />
          <NoteField title="Past Medical History" fieldId="pmh" value={notes.subjective.pmh} onChange={v => updateSubjective('pmh', v)} />
          <NoteField title="Past Surgeries" fieldId="surg" value={notes.subjective.pastSurgeries} onChange={v => updateSubjective('pastSurgeries', v)} />
          <NoteField title="Social History" fieldId="social" value={notes.subjective.socialHistory} onChange={v => updateSubjective('socialHistory', v)} />
          <NoteField title="Health Habits" fieldId="habits" value={notes.subjective.healthHabits} onChange={v => updateSubjective('healthHabits', v)} />
          <NoteField title="Family History" fieldId="family" value={notes.subjective.familyHistory} onChange={v => updateSubjective('familyHistory', v)} />
          <NoteField title="Medications" fieldId="meds" value={notes.subjective.medications} onChange={v => updateSubjective('medications', v)} />
          <NoteField title="Allergies" fieldId="allergies" value={notes.subjective.allergies} onChange={v => updateSubjective('allergies', v)} />
          <NoteField title="Review of Systems" fieldId="ros" value={notes.subjective.ros} onChange={v => updateSubjective('ros', v)} />
        </SOAPSection>

        {/* Objective */}
        <SOAPSection title="Objective" onAiAssist={openPanel}>
          <NoteField title="Vital Signs" fieldId="vitals" value={notes.objective.vitals} onChange={v => updateObjective('vitals', v)} />
          <NoteField title="Physical Examination" fieldId="pe" value={notes.objective.physicalExam} onChange={v => updateObjective('physicalExam', v)} placeholder="Document physical examination findings..." />
          <NoteField title="Labs & Diagnostics" fieldId="labs" value={notes.objective.labsDiagnostics} onChange={v => updateObjective('labsDiagnostics', v)} placeholder="Document lab results and diagnostic findings..." />
        </SOAPSection>

        {/* Assessment */}
        <SOAPSection title="Assessment" onAiAssist={openPanel}>
          <NoteField title="Diagnosis / Impressions" fieldId="dx" value={notes.assessment.diagnosis} onChange={v => updateAssessment('diagnosis', v)} placeholder="Document diagnosis and clinical impressions..." />
        </SOAPSection>

        {/* Plan */}
        <SOAPSection title="Plan" onAiAssist={openPanel}>
          <NoteField title="Treatment Plan" fieldId="plan" value={notes.plan.treatmentPlan} onChange={v => updatePlan('treatmentPlan', v)} placeholder="Document the treatment plan..." />
          <NoteField title="Prescriptions" fieldId="rx" value={notes.plan.prescriptions} onChange={v => updatePlan('prescriptions', v)} placeholder="Document prescriptions..." />
          <NoteField title="Follow-up" fieldId="followup" value={notes.plan.followUp} onChange={v => updatePlan('followUp', v)} placeholder="Document follow-up instructions..." />
        </SOAPSection>

        {/* Bottom Actions */}
        <div style={{
          display: 'flex', gap: 12, justifyContent: 'flex-end',
          padding: '16px 0', borderTop: '1px solid var(--border)', marginTop: 16,
        }}>
          <button className="btn btn-ghost btn-sm">Save Draft</button>
          <button className="btn btn-primary btn-sm">Sign &amp; Complete</button>
        </div>
      </div>

      {/* AI Panel Overlay */}
      {aiPanelOpen && (
        <div
          onClick={() => setAiPanelOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.3)', zIndex: 40,
          }}
        />
      )}

      {/* AI Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, width: 520, height: '100vh',
        background: 'var(--white)', boxShadow: 'var(--shadow-xl)', zIndex: 50,
        transform: aiPanelOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Panel Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid var(--border)',
          background: 'linear-gradient(135deg, var(--brand-light) 0%, #F0FAF5 100%)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>&#10024;</span>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-brand)' }}>
              AI SOAP Notes
            </h3>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '2px 8px', borderRadius: 'var(--r-full)',
              fontSize: 11, fontWeight: 600, background: 'var(--success-light)', color: '#065F46',
            }}>
              96% confidence
            </span>
          </div>
          <button onClick={() => setAiPanelOpen(false)} style={{
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', background: 'transparent', borderRadius: 'var(--r-sm)',
            cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 20,
          }}>
            &times;
          </button>
        </div>

        {/* Panel Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {aiLoading ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '40px 20px',
            }}>
              <div style={{
                width: 40, height: 40,
                border: '3px solid var(--brand-light)',
                borderTopColor: 'var(--brand)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                marginBottom: 16,
              }} />
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Analyzing visit recording and generating SOAP notes...
              </div>
            </div>
          ) : (
            <>
              <AiNoteSection label="Subjective">
                <p><strong>Chief Complaint:</strong> Patient presents with persistent headache and intermittent dizziness for 2 weeks.</p>
                <p><strong>HPI:</strong> 31-year-old female reports bilateral, throbbing headaches occurring daily for the past 2 weeks, rated 6/10 in severity. Associated with intermittent dizziness, especially upon standing. Headaches are worse in the afternoon and evening. Patient reports increased work-related stress and poor sleep (5-6 hours/night). High caffeine intake (4-5 cups/day). OTC ibuprofen provides partial, temporary relief. No nausea, vomiting, visual changes, or focal neurological deficits.</p>
                <p><strong>PMH:</strong> Hypertension (2019), managed with Lisinopril 10mg daily. Appendectomy (2015).</p>
                <p><strong>Medications:</strong> Lisinopril 10mg PO daily, Ibuprofen 400mg PRN, Multivitamin daily.</p>
                <p><strong>Allergies:</strong> Penicillin (rash), Sulfa drugs (hives).</p>
                <p><strong>Social Hx:</strong> Non-smoker, occasional alcohol (1-2 drinks/week). Software engineer, sedentary lifestyle. Poor sleep hygiene with high caffeine intake.</p>
                <p><strong>Family Hx:</strong> Mother: T2DM, HTN. Father: CAD (MI at 58). Maternal grandmother: CVA.</p>
              </AiNoteSection>

              <AiNoteSection label="Objective">
                <p><strong>Vitals:</strong> BP 138/88 mmHg (elevated), HR 78 bpm, Temp 98.4&#176;F, RR 16, SpO2 98%, Wt 145 lbs, Ht 5'6" (BMI 23.4)</p>
                <p><strong>General:</strong> Well-appearing female, no acute distress. Alert and oriented x4.</p>
                <p><strong>HEENT:</strong> Normocephalic, atraumatic. PERRL. No papilledema on fundoscopic exam. TMs clear bilaterally. Oropharynx clear.</p>
                <p><strong>Neck:</strong> Supple, no lymphadenopathy, no thyromegaly. Mild bilateral trapezius tenderness.</p>
                <p><strong>Neuro:</strong> CN II-XII intact. Strength 5/5 all extremities. Sensation intact to light touch. Negative Romberg. Gait normal. No nystagmus. Negative Dix-Hallpike.</p>
                <p><strong>CV:</strong> RRR, no murmurs, rubs, or gallops.</p>
              </AiNoteSection>

              <AiNoteSection label="Assessment">
                <p><strong>1. Tension-type headache (G44.209)</strong> &mdash; likely related to stress, poor sleep hygiene, and excessive caffeine consumption.</p>
                <p><strong>2. Orthostatic dizziness</strong> &mdash; likely positional, related to suboptimal hydration.</p>
                <p><strong>3. Essential hypertension, suboptimally controlled (I10)</strong> &mdash; BP 138/88, above goal of &lt;130/80.</p>
                <p><strong>4. Insomnia / Poor sleep hygiene (G47.00)</strong> &mdash; contributing to headache pattern.</p>
              </AiNoteSection>

              <AiNoteSection label="Plan">
                <p><strong>1. Tension headache:</strong></p>
                <ul>
                  <li>Reduce caffeine intake gradually to 1-2 cups/day over 2 weeks</li>
                  <li>Start Amitriptyline 10mg PO QHS for headache prophylaxis</li>
                  <li>Limit ibuprofen use to avoid medication overuse headache (&lt;15 days/month)</li>
                  <li>Stress management: recommend mindfulness exercises</li>
                </ul>
                <p><strong>2. Dizziness:</strong></p>
                <ul>
                  <li>Increase daily water intake to 64+ oz/day</li>
                  <li>Rise slowly from seated/lying position</li>
                  <li>Orthostatic vital signs at follow-up</li>
                </ul>
                <p><strong>3. Hypertension:</strong></p>
                <ul>
                  <li>Increase Lisinopril to 20mg PO daily</li>
                  <li>Home BP monitoring: record AM and PM readings</li>
                  <li>Reinforce low-sodium diet, regular exercise</li>
                  <li>Labs: BMP, lipid panel, urinalysis</li>
                </ul>
                <p><strong>4. Sleep hygiene:</strong></p>
                <ul>
                  <li>Sleep hygiene counseling: consistent sleep/wake times, limit screens 1hr before bed</li>
                  <li>Amitriptyline 10mg QHS will also assist with sleep</li>
                </ul>
                <p><strong>Follow-up:</strong> Return in 4 weeks for BP recheck and headache reassessment.</p>
                <p><strong>Prescriptions:</strong></p>
                <ul>
                  <li>Amitriptyline 10mg tablet, #30, 1 PO QHS, no refills</li>
                  <li>Lisinopril 20mg tablet, #30, 1 PO daily, 3 refills</li>
                </ul>
              </AiNoteSection>

              <div style={{
                padding: 12, background: 'var(--warning-light)', borderRadius: 'var(--r-md)',
                fontSize: 'var(--text-sm)', color: '#92400E', marginTop: 8,
              }}>
                <strong>&#9888; Disclaimer:</strong> These AI-generated notes are based on the visit recording and should be reviewed and edited by the clinician before signing. AI suggestions do not constitute medical advice.
              </div>
            </>
          )}
        </div>

        {/* Panel Footer */}
        <div style={{
          padding: '16px 20px', borderTop: '1px solid var(--border)',
          background: 'var(--grey-100)', display: 'flex', gap: 12, flexShrink: 0,
        }}>
          <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={applyAiNotes}>
            Apply to Notes
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => setAiPanelOpen(false)}>
            Dismiss
          </button>
        </div>
      </div>
    </>
  )
}

function AiNoteSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase' as const,
        letterSpacing: 1, color: 'var(--brand)', marginBottom: 8,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {label}
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{
        fontSize: 'var(--text-base)', color: 'var(--text-primary)', lineHeight: 1.7,
        background: 'var(--grey-100)', borderRadius: 'var(--r-md)',
        padding: '12px 16px', borderLeft: '3px solid var(--brand)',
      }}>
        {children}
      </div>
    </div>
  )
}

export default NotesTab
