function TimeSavingsTrend({ data }) {
  const max = Math.max(...data.map((item) => item.hours))
  return (
    <section className="analytics-card savings-trend" aria-labelledby="savings-title">
      <div className="section-heading"><div><h3 id="savings-title">Hours Saved Over Time</h3><p>Accumulated time savings across measured workflows.</p></div></div>
      <div className="savings-bars">{data.map((item) => <div key={item.label}><span style={{ height: `${(item.hours / max) * 100}%` }} /><strong>{item.hours}</strong><small>{item.label}</small></div>)}</div>
    </section>
  )
}

export default TimeSavingsTrend
