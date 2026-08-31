function MetricCard({ metric }) {
  const Icon = metric.icon

  return (
    <article className={`metric-card metric-${metric.tone}`}>
      <div className="metric-icon" aria-hidden="true">
        <Icon size={20} />
      </div>
      <div>
        <p>{metric.label}</p>
        <strong>{metric.value}</strong>
        <span>{metric.trend}</span>
      </div>
    </article>
  )
}

export default MetricCard
