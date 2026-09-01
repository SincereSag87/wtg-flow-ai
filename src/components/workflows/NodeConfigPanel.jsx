import { Copy, Eye, EyeOff, Trash2 } from 'lucide-react'
import StatusBadge from '../agents/StatusBadge'

function NodeConfigPanel({ node, onUpdateNode, onDeleteNode, onDuplicateNode, onToggleNode }) {
  if (!node) {
    return (
      <aside className="node-config-panel" aria-label="Node configuration">
        <div className="empty-config">
          <h2>Select a node</h2>
          <p>Choose a workflow node to inspect performance, rules, and runtime settings.</p>
        </div>
      </aside>
    )
  }

  const updateConfig = (key, value) => {
    onUpdateNode(node.id, { config: { ...node.config, [key]: value } })
  }

  const updateTitle = (value) => {
    onUpdateNode(node.id, { title: value })
  }

  const updatePosition = (axis, value) => {
    const nextValue = Number(value)

    if (Number.isNaN(nextValue)) {
      return
    }

    onUpdateNode(node.id, { position: { ...node.position, [axis]: nextValue } })
  }

  const renderControls = () => {
    if (node.category === 'Triggers') {
      return (
        <>
          <label><span>Event</span><input value={node.config.event ?? ''} onChange={(event) => updateConfig('event', event.target.value)} /></label>
          <label><span>Source</span><input value={node.config.source ?? ''} onChange={(event) => updateConfig('source', event.target.value)} /></label>
          <label><span>Schedule</span><input value={node.config.schedule ?? ''} onChange={(event) => updateConfig('schedule', event.target.value)} /></label>
        </>
      )
    }

    if (node.category === 'Logic') {
      return (
        <>
          <label><span>Condition</span><input value={node.config.condition ?? ''} onChange={(event) => updateConfig('condition', event.target.value)} /></label>
          <label><span>Operator</span><select value={node.config.operator ?? 'greater than'} onChange={(event) => updateConfig('operator', event.target.value)}><option>greater than</option><option>equals</option><option>contains</option><option>is empty</option></select></label>
          <label><span>Value</span><input value={node.config.value ?? ''} onChange={(event) => updateConfig('value', event.target.value)} /></label>
        </>
      )
    }

    if (node.category === 'Actions') {
      return (
        <>
          <label><span>Destination</span><input value={node.config.destination ?? ''} onChange={(event) => updateConfig('destination', event.target.value)} /></label>
          <label><span>Payload</span><textarea value={node.config.payload ?? ''} onChange={(event) => updateConfig('payload', event.target.value)} /></label>
          <label><span>Retry behavior</span><input value={node.config.retry ?? ''} onChange={(event) => updateConfig('retry', event.target.value)} /></label>
        </>
      )
    }

    if (node.category === 'Human') {
      return (
        <>
          <label><span>Reviewer</span><input value={node.config.reviewer ?? ''} onChange={(event) => updateConfig('reviewer', event.target.value)} /></label>
          <label><span>Timeout</span><input value={node.config.timeout ?? ''} onChange={(event) => updateConfig('timeout', event.target.value)} /></label>
          <label><span>Escalation</span><input value={node.config.escalation ?? ''} onChange={(event) => updateConfig('escalation', event.target.value)} /></label>
        </>
      )
    }

    return (
      <>
        <label><span>Agent</span><select value={node.config.agent ?? 'Customer Support Agent'} onChange={(event) => updateConfig('agent', event.target.value)}><option>Customer Support Agent</option><option>Invoice Processing Agent</option><option>Lead Qualification Agent</option><option>Operations Analyst</option></select></label>
        <label><span>Instructions</span><textarea value={node.config.instructions ?? ''} onChange={(event) => updateConfig('instructions', event.target.value)} /></label>
        <label><span>Model</span><select value={node.config.model ?? 'GPT-5'} onChange={(event) => updateConfig('model', event.target.value)}><option>GPT-5</option><option>FlowMind Enterprise</option><option>FlowMind Analyst</option></select></label>
        <label><span>Temperature</span><input value={node.config.temperature ?? '0.3'} onChange={(event) => updateConfig('temperature', event.target.value)} /></label>
        <label><span>Max Runtime</span><input value={node.config.maxRuntime ?? '30 seconds'} onChange={(event) => updateConfig('maxRuntime', event.target.value)} /></label>
        <label><span>Human Approval</span><input value={node.config.approval ?? 'Not required'} onChange={(event) => updateConfig('approval', event.target.value)} /></label>
      </>
    )
  }

  return (
    <aside className="node-config-panel" aria-label="Node configuration">
      <div className="panel-title">
        <h2>Configuration</h2>
        <p>Selected node settings update the local workflow state.</p>
      </div>
      <div className="selected-node-summary">
        <StatusBadge status={node.status} />
        <label>
          <span>Name</span>
          <input value={node.title} onChange={(event) => updateTitle(event.target.value)} />
        </label>
        <div className="position-controls">
          <label>
            <span>X</span>
            <input type="number" value={node.position.x} onChange={(event) => updatePosition('x', event.target.value)} />
          </label>
          <label>
            <span>Y</span>
            <input type="number" value={node.position.y} onChange={(event) => updatePosition('y', event.target.value)} />
          </label>
        </div>
        <small>{node.category} / {node.type.replaceAll('-', ' ')}</small>
      </div>
      <div className="node-actions">
        <button className="ghost-button compact" type="button" onClick={() => onDuplicateNode(node.id)}><Copy size={14} aria-hidden="true" />Duplicate</button>
        <button className="ghost-button compact" type="button" onClick={() => onToggleNode(node.id)}>{node.status === 'Disabled' ? <Eye size={14} aria-hidden="true" /> : <EyeOff size={14} aria-hidden="true" />}{node.status === 'Disabled' ? 'Enable' : 'Disable'}</button>
        <button className="ghost-button compact danger" type="button" onClick={() => onDeleteNode(node.id)}><Trash2 size={14} aria-hidden="true" />Delete</button>
      </div>
      <div className="config-form">{renderControls()}</div>
    </aside>
  )
}

export default NodeConfigPanel
