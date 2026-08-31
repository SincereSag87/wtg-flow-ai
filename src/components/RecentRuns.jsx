import { recentRuns } from '../data/dashboardData'

function RecentRuns() {
  return (
    <div className="runs-table-wrap">
      <table className="runs-table">
        <caption className="sr-only">Recent workflow execution activity</caption>
        <thead>
          <tr>
            <th scope="col">Workflow</th>
            <th scope="col">Agent</th>
            <th scope="col">Status</th>
            <th scope="col">Duration</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {recentRuns.map((run) => (
            <tr key={`${run.workflow}-${run.timestamp}`}>
              <td>{run.workflow}</td>
              <td>{run.agent}</td>
              <td>
                <span className={`status status-${run.status.toLowerCase().replaceAll(' ', '-')}`}>{run.status}</span>
              </td>
              <td>{run.duration}</td>
              <td>{run.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentRuns
