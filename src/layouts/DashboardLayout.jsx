import { Bell, Command, Search, ShieldCheck } from 'lucide-react'
import Sidebar from '../components/Sidebar'

function DashboardLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="dashboard-frame">
        <header className="topbar">
          <div>
            <p className="eyebrow">Build. Automate. Scale.</p>
            <h2>Overview</h2>
          </div>
          <div className="topbar-actions" aria-label="Dashboard tools">
            <label className="search-field">
              <Search size={17} aria-hidden="true" />
              <span className="sr-only">Search automations</span>
              <input type="search" placeholder="Search workflows, agents..." />
            </label>
            <button className="icon-button" type="button" aria-label="Command menu">
              <Command size={18} aria-hidden="true" />
            </button>
            <button className="icon-button notification-dot" type="button" aria-label="Notifications">
              <Bell size={18} aria-hidden="true" />
            </button>
            <div className="security-pill" aria-label="SOC 2 ready workspace">
              <ShieldCheck size={16} aria-hidden="true" />
              Secure
            </div>
          </div>
        </header>
        <main className="dashboard-main">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
