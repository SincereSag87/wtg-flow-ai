import { Copy, EyeOff, Pause, Play, Route, X, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'
import StatusBadge from '../agents/StatusBadge'

function AutomationDetailPanel({ automation, runs, feedback, onClose, onAction, onEditWorkflow }) {
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!automation) return undefined
    previousFocusRef.current = document.activeElement
    closeRef.current?.focus()
    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [automation, onClose])

  if (!automation) return null

  const canResume = automation.status === 'Paused' || automation.status === 'Draft'

  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="agent-detail-panel" role="dialog" aria-modal="true" aria-labelledby="automation-detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="detail-header">
          <div>
            <StatusBadge status={automation.status} />
            <h2 id="automation-detail-title">{automation.name}</h2>
            <p>{automation.description}</p>
          </div>
          <button className="icon-button" type="button" aria-label="Close automation details" onClick={onClose} ref={closeRef}><X size={18} aria-hidden="true" /></button>
        </header>
        {feedback ? <div className="action-feedback" role="status">{feedback}</div> : null}
        <div className="detail-actions">
          <button className="primary-button subtle" type="button" onClick={() => onAction(canResume ? 'resume' : 'pause')}>{canResume ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}{canResume ? 'Resume' : 'Pause'}</button>
          <button className="ghost-button" type="button" onClick={() => onAction('run')}><Zap size={16} aria-hidden="true" />Run Now</button>
          <button className="ghost-button" type="button" onClick={onEditWorkflow}><Route size={16} aria-hidden="true" />Edit Workflow</button>
          <button className="ghost-button" type="button" onClick={() => onAction('duplicate')}><Copy size={16} aria-hidden="true" />Duplicate</button>
          <button className="ghost-button danger" type="button" onClick={() => onAction('disable')}><EyeOff size={16} aria-hidden="true" />Disable</button>
        </div>
        <section className="detail-section"><h3>Overview</h3><dl className="config-list">
          <div><dt>Trigger</dt><dd>{automation.triggerLabel}</dd></div>
          <div><dt>Workflow</dt><dd>{automation.workflow}</dd></div>
          <div><dt>Assigned agent</dt><dd>{automation.agent}</dd></div>
          <div><dt>Created</dt><dd>{automation.createdAt}</dd></div>
          <div><dt>Last run</dt><dd>{automation.lastRun}</dd></div>
        </dl></section>
        <section className="detail-section"><h3>Performance</h3><div className="detail-stat-grid">
          <span><strong>{automation.totalRuns.toLocaleString()}</strong>Total runs</span>
          <span><strong>{automation.successRate ? `${automation.successRate}%` : 'Pending'}</strong>Success rate</span>
          <span><strong>{automation.avgRuntime}</strong>Average runtime</span>
          <span><strong>{automation.failedRuns}</strong>Failed runs</span>
          <span><strong>{automation.humanHandoffs}</strong>Human handoffs</span>
        </div></section>
        <section className="detail-section"><h3>Configuration</h3><dl className="config-list">
          <div><dt>Enabled</dt><dd>{automation.config.enabled ? 'Enabled' : 'Disabled'}</dd></div>
          <div><dt>Retry behavior</dt><dd>{automation.config.retry}</dd></div>
          <div><dt>Max attempts</dt><dd>{automation.config.maxAttempts}</dd></div>
          <div><dt>Timeout</dt><dd>{automation.config.timeout}</dd></div>
          <div><dt>Approval</dt><dd>{automation.config.approval}</dd></div>
        </dl></section>
        <section className="detail-section"><h3>Recent Runs</h3><ol className="activity-timeline">{runs.map((run) => <li key={run.id}>{run.id}: {run.status} / {run.duration}</li>)}</ol></section>
      </aside>
    </div>
  )
}

export default AutomationDetailPanel
