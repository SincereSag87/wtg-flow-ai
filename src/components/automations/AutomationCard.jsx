import { ArrowUpRight, Workflow } from 'lucide-react'
import StatusBadge from '../agents/StatusBadge'

function AutomationCard({ automation, selected, onSelect }) {
  const Icon = automation.icon

  return (
    <article className={`automation-card${selected ? ' selected' : ''}`}>
      <div className="automation-card-head">
        <div className="agent-avatar large" aria-hidden="true"><Icon size={21} /></div>
        <div>
          <h3>{automation.name}</h3>
          <span>{automation.category}</span>
        </div>
        <StatusBadge status={automation.status} />
      </div>
      <p>{automation.description}</p>
      <div className="automation-stats">
        <span><strong>{automation.runsToday.toLocaleString()}</strong>runs today</span>
        <span><strong>{automation.successRate ? `${automation.successRate}%` : 'Pending'}</strong>success</span>
        <span><strong>{automation.avgRuntime}</strong>avg runtime</span>
      </div>
      <div className="automation-meta-list">
        <span>Trigger: {automation.triggerLabel}</span>
        <span>Agent: {automation.agent}</span>
        <span><Workflow size={14} aria-hidden="true" /> {automation.workflow}</span>
        <span>Last run: {automation.lastRun}</span>
      </div>
      <div className="automation-card-footer">
        <span className={`health-dot health-${automation.health.toLowerCase().replaceAll(' ', '-')}`}>{automation.health}</span>
        <button className="text-button" type="button" onClick={() => onSelect(automation)} aria-expanded={selected}>
          Inspect <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

export default AutomationCard
