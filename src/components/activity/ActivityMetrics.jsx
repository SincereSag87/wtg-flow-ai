function ActivityMetrics({ events }) {
  const metrics = [
    ['Events Today', '4,824'],
    ['Workflow Runs', '1,284'],
    ['Agent Actions', '3,102'],
    ['Human Reviews', '42'],
    ['Errors', events.filter((event) => event.status === 'Error').length + 16],
  ]

  return <section className="activity-metrics-grid" aria-label="Activity summary">{metrics.map(([label, value]) => <article className="ops-metric" key={label}><span>{label}</span><strong>{value}</strong></article>)}</section>
}

export default ActivityMetrics
