import { Search } from 'lucide-react'
import { activitySourceOptions, activityStatusOptions, activityTimeOptions, activityTypeOptions } from '../../data/activityData'

function ActivityFilters({ filters, onChange, onReset, count }) {
  return (
    <section className="ops-toolbar activity-toolbar" aria-label="Filter activity events">
      <label className="agent-search"><Search size={17} aria-hidden="true" /><span className="sr-only">Search activity</span><input value={filters.query} type="search" placeholder="Search events, actors, workflows..." onChange={(event) => onChange('query', event.target.value)} /></label>
      <div className="filter-group">
        <label><span>Event Type</span><select value={filters.type} onChange={(event) => onChange('type', event.target.value)}>{activityTypeOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label><span>Status</span><select value={filters.status} onChange={(event) => onChange('status', event.target.value)}>{activityStatusOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label><span>Source</span><select value={filters.source} onChange={(event) => onChange('source', event.target.value)}>{activitySourceOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label><span>Date/Time</span><select value={filters.time} onChange={(event) => onChange('time', event.target.value)}>{activityTimeOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label><span>Sort</span><select value={filters.sort} onChange={(event) => onChange('sort', event.target.value)}><option>Newest</option><option>Oldest</option></select></label>
      </div>
      <div className="toolbar-summary"><span>{count} events</span><button className="ghost-button compact" type="button" onClick={onReset}>Reset</button></div>
    </section>
  )
}

export default ActivityFilters
