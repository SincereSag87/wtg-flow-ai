function AutomationPerformanceTable({ rows }) {
  return (
    <section className="analytics-card" aria-labelledby="automation-ranking-title">
      <div className="section-heading"><div><h3 id="automation-ranking-title">Automation Rankings</h3><p>Connected to the active workflow catalog.</p></div></div>
      <div className="runs-table-wrap"><table className="runs-table compact-table"><thead><tr><th>Automation</th><th>Runs</th><th>Success</th><th>Failures</th><th>Runtime</th><th>Impact</th></tr></thead><tbody>{rows.map((row) => <tr key={row.automation}><td>{row.automation}</td><td>{row.runs.toLocaleString()}</td><td>{row.successRate}%</td><td>{row.failures}</td><td>{row.runtime}s</td><td>{row.impact}</td></tr>)}</tbody></table></div>
    </section>
  )
}

export default AutomationPerformanceTable
