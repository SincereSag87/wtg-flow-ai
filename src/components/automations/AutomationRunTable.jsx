import StatusBadge from '../agents/StatusBadge'

function AutomationRunTable({ runs, automations, onSelectRun }) {
  const automationName = (id) => automations.find((item) => item.id === id)?.name ?? id

  return (
    <section className="section-card run-history-section" aria-labelledby="run-history-title">
      <div className="section-heading">
        <div>
          <h3 id="run-history-title">Run History</h3>
          <p>Recent workflow executions across active automations.</p>
        </div>
      </div>
      <div className="runs-table-wrap">
        <table className="runs-table">
          <thead><tr><th>Run ID</th><th>Automation</th><th>Status</th><th>Triggered By</th><th>Started</th><th>Duration</th><th>Agent</th><th>Result</th></tr></thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.id} onClick={() => onSelectRun(run)}>
                <td><button className="table-link" type="button" onClick={() => onSelectRun(run)}>{run.id}</button></td>
                <td>{automationName(run.automationId)}</td>
                <td><StatusBadge status={run.status} /></td>
                <td>{run.triggeredBy}</td>
                <td>{run.startedAt}</td>
                <td>{run.duration}</td>
                <td>{run.agent}</td>
                <td>{run.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AutomationRunTable
