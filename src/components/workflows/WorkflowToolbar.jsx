import { Play, Rocket, Save, ShieldCheck } from 'lucide-react'
import StatusBadge from '../agents/StatusBadge'

function WorkflowToolbar({ workflow, running, onSave, onValidate, onRunTest, onPublish }) {
  return (
    <section className="workflow-header" aria-labelledby="workflow-builder-title">
      <div>
        <h1 id="workflow-builder-title">Workflow Builder</h1>
        <p>Design intelligent automations with agents, decisions, actions, and human review.</p>
        <div className="workflow-meta">
          <strong>{workflow.name}</strong>
          <StatusBadge status={workflow.status} />
          <span>{workflow.updatedAt}</span>
        </div>
      </div>
      <div className="workflow-actions">
        <button className="ghost-button" type="button" onClick={onSave}>
          <Save size={16} aria-hidden="true" />
          Save Draft
        </button>
        <button className="ghost-button" type="button" onClick={onValidate}>
          <ShieldCheck size={16} aria-hidden="true" />
          Validate
        </button>
        <button className="primary-button subtle" type="button" onClick={onRunTest} disabled={running}>
          <Play size={16} aria-hidden="true" />
          {running ? 'Running' : 'Run Test'}
        </button>
        <button className="primary-button" type="button" onClick={onPublish}>
          <Rocket size={16} aria-hidden="true" />
          Publish
        </button>
      </div>
    </section>
  )
}

export default WorkflowToolbar
