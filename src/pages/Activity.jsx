import { Pause, Play, Upload } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import ActivityDetailPanel from '../components/activity/ActivityDetailPanel'
import ActivityFilters from '../components/activity/ActivityFilters'
import ActivityMetrics from '../components/activity/ActivityMetrics'
import ActivityTimeline from '../components/activity/ActivityTimeline'
import AuditLog from '../components/activity/AuditLog'
import { initialActivityEvents } from '../data/activityData'

const defaultFilters = { query: '', type: 'All', status: 'All', source: 'All', time: 'Recent', sort: 'Newest' }

function Activity({ onNavigate }) {
  const [events, setEvents] = useState(initialActivityEvents)
  const [filters, setFilters] = useState(defaultFilters)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [live, setLive] = useState(false)
  const [feedback, setFeedback] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    window.clearInterval(timerRef.current)

    if (!live) {
      return undefined
    }

    timerRef.current = window.setInterval(() => {
      setEvents((current) => [{
        ...current[1],
        id: `EVT-${Date.now().toString().slice(-5)}`,
        timestamp: 'Live now',
        source: 'Automations',
        type: 'Agent',
        status: 'Info',
        title: 'Customer Support Agent',
        description: 'Processed live queue update',
        entity: 'Live ticket queue',
      }, ...current].slice(0, 12))
    }, 5000)

    return () => window.clearInterval(timerRef.current)
  }, [live])

  const filteredEvents = useMemo(() => {
    const query = filters.query.trim().toLowerCase()
    const result = events.filter((event) => {
      const searchable = [event.id, event.title, event.description, event.source, event.type, event.actor, event.entity].join(' ').toLowerCase()
      const matchesTime = filters.time === 'Last 7 Days'
        || (filters.time === 'Today' && !event.timestamp.toLowerCase().includes('yesterday'))
        || (filters.time === 'Recent' && ['live', 'second', '1 minute', '3 minutes', '6 minutes'].some((token) => event.timestamp.toLowerCase().includes(token)))

      return (!query || searchable.includes(query))
        && (filters.type === 'All' || event.type === filters.type)
        && (filters.status === 'All' || event.status === filters.status)
        && (filters.source === 'All' || event.source === filters.source)
        && matchesTime
    })

    return filters.sort === 'Oldest' ? [...result].reverse() : result
  }, [events, filters])

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }))
  const showFeedback = (message) => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 2400)
  }

  return (
    <div className="activity-page">
      <section className="ops-hero activity-hero" aria-labelledby="activity-title">
        <div>
          <div className={`status-indicator ${live ? 'live' : ''}`}><span aria-hidden="true" />{live ? 'Live updates enabled' : 'Live updates paused'}</div>
          <h1 id="activity-title">Activity</h1>
          <p>Trace workflow runs, agent actions, system events, and workspace changes.</p>
        </div>
        <div className="agents-hero-actions">
          {feedback ? <div className="action-feedback inline" role="status">{feedback}</div> : null}
          <button className="ghost-button" type="button" onClick={() => setLive((current) => !current)} aria-pressed={live}>{live ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{live ? 'Pause Live' : 'Live Updates'}</button>
          <button className="primary-button subtle" type="button" onClick={() => showFeedback('Activity logs prepared for export.')}><Upload size={16} aria-hidden="true" />Export Logs</button>
        </div>
      </section>

      <ActivityMetrics events={events} />
      <ActivityFilters filters={filters} onChange={updateFilter} onReset={() => setFilters(defaultFilters)} count={filteredEvents.length} />
      <div className="activity-grid">
        <ActivityTimeline events={filteredEvents} onSelect={setSelectedEvent} />
        <AuditLog />
      </div>
      <ActivityDetailPanel event={selectedEvent} feedback={feedback} onClose={() => setSelectedEvent(null)} onAction={showFeedback} onNavigate={onNavigate} />
    </div>
  )
}

export default Activity
