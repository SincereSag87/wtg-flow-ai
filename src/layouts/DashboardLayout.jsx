import { Bell, Command, ListChecks, Search, ShieldCheck } from 'lucide-react'
import Sidebar from '../components/Sidebar'

function DashboardLayout({ activePage, onPageChange, onOpenCommand, onOpenOnboarding, children }) {
  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onPageChange={onPageChange} />
      <div className="dashboard-frame">
        <header className="topbar">
          <div>
            <p className="eyebrow">Build. Automate. Scale.</p>
            <h2>{activePage}</h2>
          </div>
          <div className="topbar-actions" aria-label="Dashboard tools">
            <button className="search-field command-search" type="button" onClick={onOpenCommand} aria-label="Open command menu">
              <Search size={17} aria-hidden="true" />
              <span>Search or jump to...</span>
              <kbd>Ctrl K</kbd>
            </button>
            <button className="icon-button" type="button" aria-label="Open command menu" onClick={onOpenCommand}>
              <Command size={18} aria-hidden="true" />
            </button>
            <button className="icon-button" type="button" aria-label="Open onboarding checklist" onClick={onOpenOnboarding}>
              <ListChecks size={18} aria-hidden="true" />
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
