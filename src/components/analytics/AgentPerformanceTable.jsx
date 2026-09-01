function AgentPerformanceTable({ rows, sort, onSort }) {
  const sorted = [...rows].sort((a, b) => {
    if (sort === 'Success Rate') return b.successRate - a.successRate
    if (sort === 'Runtime') return a.runtime - b.runtime
    if (sort === 'Handoff Rate') return a.handoffRate - b.handoffRate
    return b.tasks - a.tasks
  })

  return (
    <section className="analytics-card" aria-labelledby="agent-ranking-title">
      <div className="section-heading"><div><h3 id="agent-ranking-title">Agent Performance</h3><p>Ranked by current operating target.</p></div><select value={sort} onChange={(event) => onSort(event.target.value)} aria-label="Sort agent performance"><option>Tasks</option><option>Success Rate</option><option>Runtime</option><option>Handoff Rate</option></select></div>
      <div className="runs-table-wrap"><table className="runs-table compact-table"><thead><tr><th>Agent</th><th>Tasks</th><th>Success</th><th>Runtime</th><th>Handoff</th><th>Trend</th></tr></thead><tbody>{sorted.map((row) => <tr key={row.agent}><td>{row.agent}</td><td>{row.tasks.toLocaleString()}</td><td>{row.successRate}%</td><td>{row.runtime}s</td><td>{row.handoffRate}%</td><td>{row.trend}</td></tr>)}</tbody></table></div>
    </section>
  )
}

export default AgentPerformanceTable
