import { Activity, PlugZap, Power, RefreshCw, Trash2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import StatusBadge from '../agents/StatusBadge'

function IntegrationDetailPanel({ integration, feedback, testing, onClose, onAction }) {
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!integration) return undefined
    previousFocusRef.current = document.activeElement
    closeRef.current?.focus()
    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [integration, onClose])

  if (!integration) return null

  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="agent-detail-panel" role="dialog" aria-modal="true" aria-labelledby="integration-detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="detail-header">
          <div>
            <StatusBadge status={integration.health} />
            <h2 id="integration-detail-title">{integration.name}</h2>
            <p>{integration.description}</p>
          </div>
          <button className="icon-button" type="button" aria-label="Close integration details" onClick={onClose} ref={closeRef}><X size={18} aria-hidden="true" /></button>
        </header>
        {feedback ? <div className="action-feedback" role="status">{feedback}</div> : null}
        <div className="detail-actions">
          <button className="primary-button subtle" type="button" onClick={() => onAction('test')} disabled={testing}><PlugZap size={16} aria-hidden="true" />{testing ? 'Testing...' : 'Test Connection'}</button>
          <button className="ghost-button" type="button" onClick={() => onAction('reconnect')}><RefreshCw size={16} aria-hidden="true" />Reconnect</button>
          <button className="ghost-button" type="button" onClick={() => onAction('disable')}><Power size={16} aria-hidden="true" />Disable</button>
          <button className="ghost-button danger" type="button" onClick={() => onAction('disconnect')}><Trash2 size={16} aria-hidden="true" />Disconnect</button>
        </div>
        <section className="detail-section"><h3>Connection Status</h3><dl className="config-list">
          <div><dt>Status</dt><dd>{integration.health}</dd></div>
          <div><dt>Workspace</dt><dd>{integration.workspace}</dd></div>
          <div><dt>Authentication</dt><dd>{integration.auth}</dd></div>
          <div><dt>Last Sync</dt><dd>{integration.lastSync}</dd></div>
          <div><dt>Events Today</dt><dd>{integration.eventsToday.toLocaleString()}</dd></div>
        </dl></section>
        <section className="detail-section"><h3>Capabilities</h3><div className="capability-tags expanded">{integration.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div></section>
        <section className="detail-section"><h3>Used By</h3><ol className="activity-timeline">{integration.usedBy.map((item) => <li key={item}>{item}</li>)}</ol></section>
        <section className="detail-section"><h3>Activity</h3><ol className="activity-timeline"><li><Activity size={14} aria-hidden="true" /> Last sync completed {integration.lastSync}</li><li>{integration.eventsToday.toLocaleString()} events processed today</li></ol></section>
      </aside>
    </div>
  )
}

export default IntegrationDetailPanel
