const formatValue = (metric) => {
  const value = metric.prefix === '$' ? metric.value.toLocaleString() : metric.value.toLocaleString()
  return `${metric.prefix ?? ''}${value}${metric.suffix ?? ''}`
}

function AnalyticsMetrics({ metrics }) {
  return (
    <section className="analytics-metrics-grid" aria-label="Executive analytics metrics">
      {metrics.map((metric) => (
        <article className="analytics-metric" key={metric.label}>
          <span>{metric.label}</span>
          <strong>{formatValue(metric)}</strong>
          <small className={metric.positive ? 'trend-positive' : 'trend-negative'}>{metric.trend}</small>
        </article>
      ))}
    </section>
  )
}

export default AnalyticsMetrics
