import { Search, SlidersHorizontal, X } from 'lucide-react'
import { capabilityOptions, sortOptions, statusOptions } from '../../data/agentsData'

function AgentFilters({ filters, onFilterChange, onReset, resultCount }) {
  return (
    <section className="agent-toolbar" aria-label="Search and filter AI agents">
      <label className="agent-search">
        <Search size={17} aria-hidden="true" />
        <span className="sr-only">Search agents</span>
        <input
          type="search"
          value={filters.query}
          placeholder="Search agents, capabilities, workflows..."
          onChange={(event) => onFilterChange('query', event.target.value)}
        />
      </label>

      <div className="filter-group">
        <SlidersHorizontal size={17} aria-hidden="true" />
        <label>
          <span>Status</span>
          <select value={filters.status} onChange={(event) => onFilterChange('status', event.target.value)}>
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Type</span>
          <select value={filters.category} onChange={(event) => onFilterChange('category', event.target.value)}>
            {capabilityOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Sort</span>
          <select value={filters.sort} onChange={(event) => onFilterChange('sort', event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="toolbar-summary">
        <span>{resultCount} visible</span>
        <button className="ghost-button compact" type="button" onClick={onReset}>
          <X size={15} aria-hidden="true" />
          Reset
        </button>
      </div>
    </section>
  )
}

export default AgentFilters
