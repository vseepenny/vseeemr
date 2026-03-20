import { Routes, Route, Navigate } from 'react-router-dom'
import TopNav from './components/layout/TopNav'
import DashboardPage from './pages/DashboardPage'
import PatientsPage from './pages/PatientsPage'
import EncounterPage from './pages/EncounterPage'
import SchedulePage from './pages/SchedulePage'
import HealthPage from './pages/HealthPage'

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <TopNav />
      <Routes>
        <Route path="/" element={<Navigate to="/patients" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patients/:id/encounter" element={<EncounterPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/health" element={<HealthPage />} />
      </Routes>
    </div>
  )
}

export default App
