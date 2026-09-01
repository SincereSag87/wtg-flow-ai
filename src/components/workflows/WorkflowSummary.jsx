function WorkflowSummary({ workflow }) {
  const items = [
    { label: 'Last Test', value: workflow.lastTest.status, detail: workflow.lastTest.duration },
    { label: 'Last Published', value: workflow.lastPublished, detail: workflow.status === 'Published' ? workflow.version : 'Awaiting release' },
    { label: 'Nodes', value: workflow.nodes.length.toString(), detail: 'Active canvas blocks' },
    { label: 'Connections', value: workflow.connections.length.toString(), detail: 'Workflow paths' },
  ]

  return (
    <section className="workflow-summary" aria-label="Workflow activity summary">
      {items.map((item) => (
        <article key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <small>{item.detail}</small>
        </article>
      ))}
    </section>
  )
}

export default WorkflowSummary
