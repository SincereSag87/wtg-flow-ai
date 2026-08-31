import { ArrowUpRight, Clock3 } from 'lucide-react'
import StatusBadge from './StatusBadge'

function AgentCard({ agent, selected, onSelect }) {
  const Icon = agent.icon

  return (
    <article className={`agent-card${selected ? ' selected' : ''}`}>
      <div className="agent-card-top">
        <div className="agent-avatar large" aria-hidden="true">
          <Icon size={22} />
        </div>
        <div>
          <p>{agent.category}</p>
          <h3>{agent.name}</h3>
        </div>
        <StatusBadge status={agent.status} />
      </div>

      <p className="agent-description">{agent.description}</p>

      <div className="agent-card-stats">
        <div>
          <span>Success</span>
          <strong>{agent.successRate ? `${agent.successRate}%` : 'Pending'}</strong>
        </div>
        <div>
          <span>Tasks</span>
          <strong>{agent.tasksCompleted.toLocaleString()}</strong>
        </div>
        <div>
          <span>Runtime</span>
          <strong>{agent.avgRuntime}</strong>
        </div>
      </div>

      <div className="capability-tags" aria-label={`${agent.name} capabilities`}>
        {agent.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="agent-card-footer">
        <span>
          <Clock3 size={14} aria-hidden="true" />
          {agent.lastActive}
        </span>
        <button
          className="text-button"
          type="button"
          onClick={() => onSelect(agent)}
          aria-expanded={selected}
          aria-label={`Open details for ${agent.name}`}
        >
          Details
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

export default AgentCard
