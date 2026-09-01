function FailureAnalytics({ failures, onViewActivity }) {
  return (
    <section className="analytics-card failure-panel" aria-labelledby="failure-title">
      <div className="section-heading"><div><h3 id="failure-title">Failures & Exceptions</h3><p>Primary failure drivers across automations.</p></div><button className="text-button" type="button" onClick={onViewActivity}>View Activity</button></div>
      <div className="failure-list">{failures.map((failure) => <article key={failure.reason}><div><strong>{failure.reason}</strong><span>{failure.affected}</span></div><b>{failure.count}</b><small>{failure.trend} / {failure.percent}%</small></article>)}</div>
    </section>
  )
}

export default FailureAnalytics
