import { useState } from 'react'
import DashboardLayout from './layouts/DashboardLayout'
import Agents from './pages/Agents'
import Overview from './pages/Overview'
import './styles/dashboard.css'

const pages = {
  Overview,
  'AI Agents': Agents,
}

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const ActivePage = pages[activePage] ?? Overview

  return (
    <DashboardLayout activePage={activePage} onPageChange={setActivePage}>
      <ActivePage />
    </DashboardLayout>
  )
}

export default App
