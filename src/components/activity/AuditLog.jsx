import { auditEvents } from '../../data/activityData'

function AuditLog() {
  return (
    <section className="section-card audit-log" aria-labelledby="audit-title">
      <div className="section-heading"><div><h3 id="audit-title">Audit Log</h3><p>Enterprise record of workspace and configuration changes.</p></div></div>
      <div className="runs-table-wrap"><table className="runs-table compact-table"><thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Resource</th><th>Result</th></tr></thead><tbody>{auditEvents.map((event) => <tr key={event.id}><td>{event.timestamp}</td><td>{event.actor}</td><td>{event.action}</td><td>{event.resource}</td><td>{event.result}</td></tr>)}</tbody></table></div>
    </section>
  )
}

export default AuditLog
