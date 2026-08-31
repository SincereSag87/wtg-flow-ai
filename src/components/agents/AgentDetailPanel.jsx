import { Copy, Edit3, Pause, Play, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import StatusBadge from './StatusBadge'

function AgentDetailPanel({ agent, feedback, onClose, onMockAction }) {
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!agent) {
      return undefined
    }

    previousFocusRef.current = document.activeElement
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [agent, onClose])

  if (!agent) {
    return null
  }

  const canResume = agent.status === 'Paused'

  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside
        className="agent-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="agent-detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="detail-header">
          <div>
            <StatusBadge status={agent.status} />
            <h2 id="agent-detail-title">{agent.name}</h2>
            <p>{agent.description}</p>
          </div>
          <button className="icon-button" type="button" aria-label="Close agent details" onClick={onClose} ref={closeButtonRef}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        {feedback ? <div className="action-feedback" role="status">{feedback}</div> : null}

        <div className="detail-actions">
          <button className="primary-button subtle" type="button" onClick={() => onMockAction('edit')}>
            <Edit3 size={16} aria-hidden="true" />
            Edit Agent
          </button>
          <button
            className="ghost-button"
            type="button"
            onClick={() => onMockAction(canResume ? 'resume' : 'pause')}
          >
            {canResume ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            {canResume ? 'Resume' : 'Pause'}
          </button>
          <button className="ghost-button" type="button" onClick={() => onMockAction('duplicate')}>
            <Copy size={16} aria-hidden="true" />
            Duplicate
          </button>
        </div>

        <section className="detail-section" aria-labelledby="performance-title">
          <h3 id="performance-title">Performance</h3>
          <div className="detail-stat-grid">
            <span><strong>{agent.successRate ? `${agent.successRate}%` : 'Pending'}</strong>Success rate</span>
            <span><strong>{agent.tasksCompleted.toLocaleString()}</strong>Tasks completed</span>
            <span><strong>{agent.avgRuntime}</strong>Avg. runtime</span>
            <span><strong>{agent.handoffRate}</strong>Human handoff rate</span>
          </div>
        </section>

        <section className="detail-section" aria-labelledby="capabilities-title">
          <h3 id="capabilities-title">Capabilities</h3>
          <div className="capability-tags expanded">
            {agent.capabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
        </section>

        <section className="detail-section" aria-labelledby="workflows-title">
          <h3 id="workflows-title">Assigned Workflows</h3>
          <ul className="detail-list">
            {agent.workflows.map((workflow) => (
              <li key={workflow}>{workflow}</li>
            ))}
          </ul>
        </section>

        <section className="detail-section" aria-labelledby="config-title">
          <h3 id="config-title">Configuration</h3>
          <dl className="config-list">
            <div><dt>Model</dt><dd>{agent.config.model}</dd></div>
            <div><dt>Temperature</dt><dd>{agent.config.temperature}</dd></div>
            <div><dt>Max runtime</dt><dd>{agent.config.maxRuntime}</dd></div>
            <div><dt>Human approval</dt><dd>{agent.config.approval}</dd></div>
          </dl>
        </section>

        <section className="detail-section" aria-labelledby="activity-title">
          <h3 id="activity-title">Recent Activity</h3>
          <ol className="activity-timeline">
            {agent.activity.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      </aside>
    </div>
  )
}

export default AgentDetailPanel
