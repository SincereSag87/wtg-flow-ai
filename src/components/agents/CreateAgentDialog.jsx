import { Plus, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { capabilityOptions } from '../../data/agentsData'

const availableCapabilities = [
  'Intent classification',
  'Knowledge retrieval',
  'Document extraction',
  'Forecast summaries',
  'Response generation',
  'Approval routing',
]

function CreateAgentDialog({ open, onClose, onCreate }) {
  const nameId = useId()
  const descriptionId = useId()
  const categoryId = useId()
  const modelId = useId()
  const approvalId = useId()
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Support',
    model: 'FlowMind Standard',
    approval: true,
    capabilities: ['Intent classification', 'Knowledge retrieval'],
  })

  useEffect(() => {
    if (!open) {
      return undefined
    }

    previousFocusRef.current = document.activeElement
    const firstInput = dialogRef.current?.querySelector('input, textarea, select, button')
    firstInput?.focus()

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

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const toggleCapability = (capability) => {
    setForm((current) => {
      const exists = current.capabilities.includes(capability)
      const capabilities = exists
        ? current.capabilities.filter((item) => item !== capability)
        : [...current.capabilities, capability]

      return { ...current, capabilities }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onCreate(form)
    setForm({
      name: '',
      description: '',
      category: 'Support',
      model: 'FlowMind Standard',
      approval: true,
      capabilities: ['Intent classification', 'Knowledge retrieval'],
    })
  }

  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <form
        className="create-agent-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-agent-title"
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        ref={dialogRef}
      >
        <header className="detail-header compact">
          <div>
            <span className="dialog-kicker">New automation agent</span>
            <h2 id="create-agent-title">Create Agent</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close create agent dialog" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="form-grid">
          <label>
            <span>Agent name</span>
            <input
              id={nameId}
              required
              value={form.name}
              placeholder="Renewal Risk Agent"
              onChange={(event) => updateForm('name', event.target.value)}
            />
          </label>
          <label>
            <span>Description</span>
            <textarea
              id={descriptionId}
              required
              value={form.description}
              placeholder="Reviews renewal signals, flags risk, and routes exceptions to account owners."
              onChange={(event) => updateForm('description', event.target.value)}
            />
          </label>
          <label>
            <span>Category</span>
            <select id={categoryId} value={form.category} onChange={(event) => updateForm('category', event.target.value)}>
              {capabilityOptions.filter((option) => option !== 'All').map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Model</span>
            <select id={modelId} value={form.model} onChange={(event) => updateForm('model', event.target.value)}>
              <option>FlowMind Standard</option>
              <option>FlowMind Enterprise</option>
              <option>FlowMind Analyst</option>
              <option>FlowMind Code</option>
            </select>
          </label>
        </div>

        <fieldset className="capability-fieldset">
          <legend>Capabilities</legend>
          <div className="capability-picker">
            {availableCapabilities.map((capability) => (
              <label key={capability}>
                <input
                  type="checkbox"
                  checked={form.capabilities.includes(capability)}
                  onChange={() => toggleCapability(capability)}
                />
                <span>{capability}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="toggle-row" htmlFor={approvalId}>
          <span>
            <strong>Human approval</strong>
            Require review before external actions.
          </span>
          <input
            id={approvalId}
            type="checkbox"
            checked={form.approval}
            onChange={(event) => updateForm('approval', event.target.checked)}
          />
        </label>

        <footer className="dialog-actions">
          <button className="ghost-button" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-button" type="submit">
            <Plus size={16} aria-hidden="true" />
            Create Agent
          </button>
        </footer>
      </form>
    </div>
  )
}

export default CreateAgentDialog
