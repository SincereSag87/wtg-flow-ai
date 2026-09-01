import { RotateCw, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import StatusBadge from '../agents/StatusBadge'
import ExecutionTrace from './ExecutionTrace'
import HumanReviewDetail from './HumanReviewDetail'

function ActivityDetailPanel({ event, feedback, onClose, onAction, onNavigate }) {
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!event) return undefined
    previousFocusRef.current = document.activeElement
    closeRef.current?.focus()
    const handleKeyDown = (keyEvent) => keyEvent.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [event, onClose])

  if (!event) return null

  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="agent-detail-panel" role="dialog" aria-modal="true" aria-labelledby="activity-detail-title" onMouseDown={(mouseEvent) => mouseEvent.stopPropagation()}>
        <header className="detail-header"><div><StatusBadge status={event.status} /><h2 id="activity-detail-title">{event.id}</h2><p>{event.title}: {event.description}</p></div><button className="icon-button" type="button" aria-label="Close activity details" onClick={onClose} ref={closeRef}><X size={18} aria-hidden="true" /></button></header>
        {feedback ? <div className="action-feedback" role="status">{feedback}</div> : null}
        <dl className="config-list run-detail-list"><div><dt>Timestamp</dt><dd>{event.timestamp}</dd></div><div><dt>Source</dt><dd>{event.source}</dd></div><div><dt>Type</dt><dd>{event.type}</dd></div><div><dt>Actor</dt><dd>{event.actor}</dd></div><div><dt>Workflow</dt><dd>{event.workflow ?? 'N/A'}</dd></div><div><dt>Agent</dt><dd>{event.agent ?? 'N/A'}</dd></div><div><dt>Automation</dt><dd>{event.automation ?? 'N/A'}</dd></div></dl>
        <section className="detail-section"><h3>Metadata</h3><dl className="config-list"><div><dt>Runtime</dt><dd>{event.metadata.runtime}</dd></div><div><dt>Model</dt><dd>{event.metadata.model}</dd></div><div><dt>Token usage</dt><dd>{event.metadata.tokens}</dd></div><div><dt>Input size</dt><dd>{event.metadata.input}</dd></div><div><dt>Output size</dt><dd>{event.metadata.output}</dd></div><div><dt>Request ID</dt><dd>{event.metadata.requestId}</dd></div></dl></section>
        <ExecutionTrace trace={event.trace} />
        <HumanReviewDetail review={event.review} />
        {event.error ? <section className="detail-section error-detail"><h3>Error Detail</h3><dl className="config-list"><div><dt>Error</dt><dd>{event.error.message}</dd></div><div><dt>Retry Count</dt><dd>{event.error.retryCount}</dd></div><div><dt>Last Attempt</dt><dd>{event.error.lastAttempt}</dd></div><div><dt>Resolution</dt><dd>{event.error.resolution}</dd></div></dl><div className="detail-actions"><button className="primary-button subtle" type="button" onClick={() => onAction('Retry queued')}><RotateCw size={16} aria-hidden="true" />Retry</button><button className="ghost-button" type="button" onClick={() => onNavigate('Automations')}>Open Automation</button><button className="ghost-button" type="button" onClick={() => onNavigate('Integrations')}>Open Integration</button></div></section> : null}
      </aside>
    </div>
  )
}

export default ActivityDetailPanel
