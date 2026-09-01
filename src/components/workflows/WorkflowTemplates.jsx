import { LayoutTemplate } from 'lucide-react'
import { workflowTemplates } from '../../data/workflowsData'

function WorkflowTemplates({ currentTemplateId, onLoadTemplate }) {
  return (
    <section className="workflow-templates" aria-labelledby="templates-title">
      <div className="panel-title horizontal">
        <div>
          <h2 id="templates-title">Templates</h2>
          <p>Load a proven automation pattern.</p>
        </div>
        <LayoutTemplate size={18} aria-hidden="true" />
      </div>
      <div className="template-list">
        {workflowTemplates.map((template) => (
          <button
            className={`template-card${currentTemplateId === template.id ? ' active' : ''}`}
            type="button"
            onClick={() => onLoadTemplate(template)}
            key={template.id}
          >
            <strong>{template.name}</strong>
            <span>{template.description}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default WorkflowTemplates
