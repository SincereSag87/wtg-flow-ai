import { useEffect, useState } from 'react'
import CommandMenu from './components/global/CommandMenu'
import OnboardingPanel from './components/global/OnboardingPanel'
import DashboardLayout from './layouts/DashboardLayout'
import Agents from './pages/Agents'
import Activity from './pages/Activity'
import Analytics from './pages/Analytics'
import Automations from './pages/Automations'
import Integrations from './pages/Integrations'
import Overview from './pages/Overview'
import Settings from './pages/Settings'
import WorkflowBuilder from './pages/WorkflowBuilder'
import './styles/dashboard.css'

const pages = {
  Overview,
  'AI Agents': Agents,
  'Workflow Builder': WorkflowBuilder,
  Automations,
  Integrations,
  Analytics,
  Activity,
  Settings,
}

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [commandOpen, setCommandOpen] = useState(false)
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [globalFeedback, setGlobalFeedback] = useState('')
  const ActivePage = pages[activePage] ?? Overview
  const showGlobalFeedback = (message) => {
    setGlobalFeedback(message)
    window.setTimeout(() => setGlobalFeedback(''), 3200)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <DashboardLayout activePage={activePage} onPageChange={setActivePage} onOpenCommand={() => setCommandOpen(true)} onOpenOnboarding={() => setOnboardingOpen(true)}>
        <ActivePage onNavigate={setActivePage} onFeedback={showGlobalFeedback} />
      </DashboardLayout>
      <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} onNavigate={setActivePage} onFeedback={showGlobalFeedback} />
      <OnboardingPanel open={onboardingOpen} onClose={() => setOnboardingOpen(false)} onNavigate={setActivePage} />
      {globalFeedback && <div className="global-toast" role="status" aria-live="polite">{globalFeedback}</div>}
    </>
  )
}

export default App
