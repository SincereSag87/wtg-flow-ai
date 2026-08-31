import { impactStats } from '../data/dashboardData'

function BusinessImpact() {
  return (
    <div className="impact-grid">
      {impactStats.map((stat) => {
        const Icon = stat.icon

        return (
          <article className="impact-item" key={stat.label}>
            <Icon size={18} aria-hidden="true" />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        )
      })}
    </div>
  )
}

export default BusinessImpact
