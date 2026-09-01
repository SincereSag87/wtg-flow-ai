import { integrationCategories } from '../../data/integrationsData'

function IntegrationFilters({ activeCategory, onChange }) {
  return (
    <section className="integration-tabs" aria-label="Filter integrations by category">
      {integrationCategories.map((category) => (
        <button className={activeCategory === category ? 'active' : ''} type="button" onClick={() => onChange(category)} aria-pressed={activeCategory === category} key={category}>
          {category}
        </button>
      ))}
    </section>
  )
}

export default IntegrationFilters
