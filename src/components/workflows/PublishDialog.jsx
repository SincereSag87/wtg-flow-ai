import { Rocket, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

function PublishDialog({ open, workflow, onClose, onConfirm }) {
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    previousFocusRef.current = document.activeElement
    closeRef.current?.focus()

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
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="drawer-backdrop publish-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="publish-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="detail-header compact">
          <div>
            <span className="dialog-kicker">Release workflow</span>
            <h2 id="publish-title">Publish Workflow</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close publish dialog" onClick={onClose} ref={closeRef}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <p className="publish-copy">{workflow.name} will become available to connected automations.</p>
        <dl className="publish-meta">
          <div><dt>Version</dt><dd>{workflow.version}</dd></div>
          <div><dt>Status after publish</dt><dd>Published</dd></div>
        </dl>
        <footer className="dialog-actions">
          <button className="ghost-button" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-button" type="button" onClick={onConfirm}>
            <Rocket size={16} aria-hidden="true" />
            Publish
          </button>
        </footer>
      </section>
    </div>
  )
}

export default PublishDialog
