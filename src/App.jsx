import { useState } from 'react'
import DashboardLayout from './layouts/DashboardLayout'
import Agents from './pages/Agents'
import Automations from './pages/Automations'
import Integrations from './pages/Integrations'
import Overview from './pages/Overview'
import WorkflowBuilder from './pages/WorkflowBuilder'
import './styles/dashboard.css'

const pages = {
  Overview,
  'AI Agents': Agents,
  'Workflow Builder': WorkflowBuilder,
  Automations,
  Integrations,
}

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const ActivePage = pages[activePage] ?? Overview

  return (
    <DashboardLayout activePage={activePage} onPageChange={setActivePage}>
      <ActivePage onNavigate={setActivePage} />
    </DashboardLayout>
  )
}

export default App
