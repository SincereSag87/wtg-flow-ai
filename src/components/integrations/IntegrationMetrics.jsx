function IntegrationMetrics({ integrations }) {
  const connected = integrations.filter((item) => item.status === 'Connected')
  const attention = integrations.filter((item) => item.health === 'Needs Attention')
  const events = connected.reduce((total, item) => total + item.eventsToday, 0)
  const metrics = [
    ['Connected Apps', connected.length],
    ['Healthy Connections', connected.filter((item) => item.health === 'Healthy').length],
    ['Needs Attention', attention.length],
    ['Events Today', events.toLocaleString()],
  ]

  return (
    <section className="integration-metrics-grid" aria-label="Integration summary">
      {metrics.map(([label, value]) => <article className="ops-metric" key={label}><span>{label}</span><strong>{value}</strong></article>)}
    </section>
  )
}

export default IntegrationMetrics
