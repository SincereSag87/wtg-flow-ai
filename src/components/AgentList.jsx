import { Bot } from 'lucide-react'
import { agents } from '../data/dashboardData'

function AgentList() {
  return (
    <div className="agent-list">
      {agents.map((agent) => (
        <article className="agent-row" key={agent.name}>
          <div className="agent-avatar" aria-hidden="true">
            <Bot size={18} />
          </div>
          <div className="agent-copy">
            <strong>{agent.name}</strong>
            <span>{agent.tasks.toLocaleString()} tasks completed</span>
          </div>
          <div className="agent-meta">
            <span className={`status status-${agent.status.toLowerCase()}`}>{agent.status}</span>
            <span>{agent.successRate}</span>
            <small>{agent.lastActive}</small>
          </div>
        </article>
      ))}
    </div>
  )
}

export default AgentList
