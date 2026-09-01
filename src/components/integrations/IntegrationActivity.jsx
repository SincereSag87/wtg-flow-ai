import { integrationActivity } from '../../data/integrationsData'

function IntegrationActivity() {
  return (
    <section className="section-card integration-activity" aria-labelledby="integration-activity-title">
      <div className="section-heading"><div><h3 id="integration-activity-title">Integration Activity</h3><p>Recent events moving through connected systems.</p></div></div>
      <ol className="activity-timeline">
        {integrationActivity.map((activity) => <li key={`${activity.integration}-${activity.time}`}><strong>{activity.integration}</strong> {activity.event} <span>{activity.time}</span></li>)}
      </ol>
    </section>
  )
}

export default IntegrationActivity
