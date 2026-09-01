import { Search } from 'lucide-react'
import { automationCategoryOptions, automationSortOptions, automationStatusOptions, automationTriggerOptions } from '../../data/automationsData'

function AutomationFilters({ filters, onChange, onReset, count }) {
  return (
    <section className="ops-toolbar" aria-label="Filter automations">
      <label className="agent-search">
        <Search size={17} aria-hidden="true" />
        <span className="sr-only">Search automations</span>
        <input value={filters.query} type="search" placeholder="Search automations, agents, workflows..." onChange={(event) => onChange('query', event.target.value)} />
      </label>
      <div className="filter-group">
        <label><span>Status</span><select value={filters.status} onChange={(event) => onChange('status', event.target.value)}>{automationStatusOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label><span>Category</span><select value={filters.category} onChange={(event) => onChange('category', event.target.value)}>{automationCategoryOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label><span>Trigger</span><select value={filters.trigger} onChange={(event) => onChange('trigger', event.target.value)}>{automationTriggerOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label><span>Sort</span><select value={filters.sort} onChange={(event) => onChange('sort', event.target.value)}>{automationSortOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
      </div>
      <div className="toolbar-summary">
        <span>{count} visible</span>
        <button className="ghost-button compact" type="button" onClick={onReset}>Reset</button>
      </div>
    </section>
  )
}

export default AutomationFilters
