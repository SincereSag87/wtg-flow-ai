import StatusBadge from '../agents/StatusBadge'

function ExecutionTrace({ trace }) {
  if (!trace?.length) return null

  return (
    <section className="detail-section">
      <h3>Execution Trace</h3>
      <ol className="execution-trace">{trace.map((step) => <li key={`${step.step}-${step.timestamp}`}><StatusBadge status={step.status} /><div><strong>{step.step}</strong><span>{step.duration} / {step.timestamp}</span><p>{step.detail}</p></div></li>)}</ol>
    </section>
  )
}

export default ExecutionTrace
