import { ArrowUpRight } from 'lucide-react'
import StatusBadge from '../agents/StatusBadge'

function ActivityItem({ event, onSelect }) {
  return (
    <button className="activity-item" type="button" onClick={() => onSelect(event)}>
      <span className={`activity-pin status-${event.status.toLowerCase()}`} aria-hidden="true" />
      <span className="activity-copy">
        <strong>{event.title}</strong>
        <small>{event.description}</small>
        <em>{event.source} / {event.type} / {event.entity}</em>
      </span>
      <span className="activity-side"><StatusBadge status={event.status} /><small>{event.timestamp}</small><ArrowUpRight size={15} aria-hidden="true" /></span>
    </button>
  )
}

export default ActivityItem
