import ActivityItem from './ActivityItem'

function ActivityTimeline({ events, onSelect }) {
  return (
    <section className="activity-stream section-card" aria-labelledby="activity-stream-title">
      <div className="section-heading"><div><h3 id="activity-stream-title">Event Stream</h3><p>Workflow runs, agent actions, system events, and workspace changes.</p></div></div>
      <div className="activity-list">{events.length ? events.map((event) => <ActivityItem event={event} onSelect={onSelect} key={event.id} />) : <div className="empty-state compact"><h2>No activity matches these filters.</h2><p>Reset filters to return to the full event stream.</p></div>}</div>
    </section>
  )
}

export default ActivityTimeline
