import { Plus, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { automationCategoryOptions, automationTriggerOptions } from '../../data/automationsData'

function CreateAutomationDialog({ open, onClose, onCreate }) {
  const titleId = useId()
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)
  const [form, setForm] = useState({ name: '', workflow: 'Customer Support Escalation', trigger: 'Webhook', agent: 'Customer Support Agent', category: 'Customer Support', enabled: true })

  useEffect(() => {
    if (!open) return undefined
    previousFocusRef.current = document.activeElement
    closeRef.current?.focus()
    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const submit = (event) => {
    event.preventDefault()
    onCreate(form)
    setForm({ name: '', workflow: 'Customer Support Escalation', trigger: 'Webhook', agent: 'Customer Support Agent', category: 'Customer Support', enabled: true })
  }

  return (
    <div className="drawer-backdrop publish-backdrop" role="presentation" onMouseDown={onClose}>
      <form className="create-agent-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} onMouseDown={(event) => event.stopPropagation()} onSubmit={submit}>
        <header className="detail-header compact"><div><span className="dialog-kicker">New workflow deployment</span><h2 id={titleId}>Create Automation</h2></div><button className="icon-button" type="button" aria-label="Close create automation dialog" onClick={onClose} ref={closeRef}><X size={18} aria-hidden="true" /></button></header>
        <div className="form-grid">
          <label><span>Name</span><input required value={form.name} placeholder="Renewal Risk Review" onChange={(event) => update('name', event.target.value)} /></label>
          <label><span>Workflow</span><select value={form.workflow} onChange={(event) => update('workflow', event.target.value)}><option>Customer Support Escalation</option><option>Invoice Processing</option><option>Lead Qualification</option><option>Contract Review</option><option>Incident Triage</option><option>Content Approval</option></select></label>
          <label><span>Trigger</span><select value={form.trigger} onChange={(event) => update('trigger', event.target.value)}>{automationTriggerOptions.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Assigned Agent</span><select value={form.agent} onChange={(event) => update('agent', event.target.value)}><option>Customer Support Agent</option><option>Invoice Processing Agent</option><option>Lead Qualification Agent</option><option>Operations Analyst</option><option>Contract Review Agent</option></select></label>
          <label><span>Category</span><select value={form.category} onChange={(event) => update('category', event.target.value)}>{automationCategoryOptions.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <label className="toggle-row"><span><strong>Enable immediately</strong>Start listening for new events after creation.</span><input type="checkbox" checked={form.enabled} onChange={(event) => update('enabled', event.target.checked)} /></label>
        <footer className="dialog-actions"><button className="ghost-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit"><Plus size={16} aria-hidden="true" />Create Automation</button></footer>
      </form>
    </div>
  )
}

export default CreateAutomationDialog
