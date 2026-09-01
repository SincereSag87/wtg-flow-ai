function AutomationMetrics() {
  const metrics = [
    ['Active Automations', '18'],
    ['Runs Today', '1,284'],
    ['Successful Runs', '98.7%'],
    ['Human Reviews', '42'],
    ['Avg. Runtime', '6.4s'],
  ]

  return (
    <section className="ops-metrics-grid" aria-label="Automation summary metrics">
      {metrics.map(([label, value]) => (
        <article className="ops-metric" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  )
}

export default AutomationMetrics
