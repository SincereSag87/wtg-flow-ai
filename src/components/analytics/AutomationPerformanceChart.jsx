function AutomationPerformanceChart({ data, range }) {
  const maxRuns = Math.max(...data.map((item) => item.runs))
  const points = data.map((item, index) => {
    const x = 8 + index * (84 / Math.max(1, data.length - 1))
    const y = 58 - (item.runs / maxRuns) * 46
    return `${x},${y}`
  })

  return (
    <section className="analytics-card performance-visual" aria-labelledby="performance-chart-title">
      <div className="section-heading">
        <div>
          <h3 id="performance-chart-title">Automation Performance</h3>
          <p>Runs, successful runs, and failed runs for {range.toLowerCase()}.</p>
        </div>
        <div className="chart-legend"><span>Runs</span><span>Successful</span><span>Failed</span></div>
      </div>
      <svg className="analytics-line-chart" viewBox="0 0 100 64" role="img" aria-label={`Automation run performance for ${range}`}>
        <polyline className="chart-grid" points="8,52 92,52" />
        <polyline className="chart-grid" points="8,36 92,36" />
        <polyline className="chart-grid" points="8,20 92,20" />
        <polyline className="chart-area" points={`8,64 ${points.join(' ')} 92,64`} />
        <polyline className="chart-line" points={points.join(' ')} />
        {data.map((item, index) => {
          const x = 8 + index * (84 / Math.max(1, data.length - 1))
          const y = 58 - (item.runs / maxRuns) * 46
          return <circle className="chart-point" cx={x} cy={y} r="1.8" key={item.label}><title>{`${item.label}: ${item.runs} runs, ${item.successful} successful, ${item.failed} failed`}</title></circle>
        })}
      </svg>
      <div className="chart-days">{data.map((item) => <span key={item.label}>{item.label}</span>)}</div>
    </section>
  )
}

export default AutomationPerformanceChart
