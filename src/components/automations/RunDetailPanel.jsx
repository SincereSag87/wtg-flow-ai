import { RotateCw, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import StatusBadge from '../agents/StatusBadge'

function RunDetailPanel({ run, automation, feedback, onClose, onRetry }) {
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!run) return undefined
    previousFocusRef.current = document.activeElement
    closeRef.current?.focus()
    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [run, onClose])

  if (!run) return null

  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="agent-detail-panel" role="dialog" aria-modal="true" aria-labelledby="run-detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="detail-header">
          <div>
            <StatusBadge status={run.status} />
            <h2 id="run-detail-title">{run.id}</h2>
            <p>{automation?.name} / {run.result}</p>
          </div>
          <button className="icon-button" type="button" aria-label="Close run details" onClick={onClose} ref={closeRef}><X size={18} aria-hidden="true" /></button>
        </header>
        {feedback ? <div className="action-feedback" role="status">{feedback}</div> : null}
        <dl className="config-list run-detail-list">
          <div><dt>Automation</dt><dd>{automation?.name}</dd></div>
          <div><dt>Started</dt><dd>{run.startedAt}</dd></div>
          <div><dt>Completed</dt><dd>{run.completedAt}</dd></div>
          <div><dt>Duration</dt><dd>{run.duration}</dd></div>
          <div><dt>Result</dt><dd>{run.result}</dd></div>
        </dl>
        <section className="detail-section">
          <h3>Execution Steps</h3>
          <ol className="activity-timeline">{run.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </section>
        {run.status === 'Failed' ? <button className="primary-button subtle" type="button" onClick={onRetry}><RotateCw size={16} aria-hidden="true" />Retry Run</button> : null}
      </aside>
    </div>
  )
}

export default RunDetailPanel
