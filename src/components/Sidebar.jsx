import { ChevronsUpDown, Sparkles } from 'lucide-react'
import { navItems } from '../data/dashboardData'

function Sidebar({ activePage, onPageChange }) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="brand-lockup">
        <div className="brand-mark" aria-hidden="true">
          <Sparkles size={20} />
        </div>
        <div>
          <strong>WTG Flow AI</strong>
          <span>Automation OS</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.label === activePage
          const isEnabled = ['Overview', 'AI Agents', 'Workflow Builder', 'Automations', 'Integrations', 'Analytics', 'Activity', 'Settings'].includes(item.label)

          return (
            <button
              className={`nav-item${isActive ? ' active' : ''}`}
              type="button"
              key={item.label}
              aria-current={isActive ? 'page' : undefined}
              aria-disabled={isEnabled ? undefined : 'true'}
              onClick={() => {
                if (isEnabled) {
                  onPageChange(item.label)
                }
              }}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="workspace-card">
        <div className="workspace-icon">W</div>
        <div>
          <span>Workspace</span>
          <strong>WTG Operations</strong>
          <span>Scale Plan</span>
        </div>
        <ChevronsUpDown size={16} aria-hidden="true" />
      </div>
    </aside>
  )
}

export default Sidebar
