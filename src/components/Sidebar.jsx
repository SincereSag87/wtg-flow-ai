import { ChevronsUpDown, Sparkles } from 'lucide-react'
import { navItems } from '../data/dashboardData'

function Sidebar() {
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

          return (
            <button
              className={`nav-item${item.active ? ' active' : ''}`}
              type="button"
              key={item.label}
              aria-current={item.active ? 'page' : undefined}
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
          <strong>Wannamaker Ops</strong>
        </div>
        <ChevronsUpDown size={16} aria-hidden="true" />
      </div>
    </aside>
  )
}

export default Sidebar
