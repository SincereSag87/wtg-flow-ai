import { ArrowUpRight, PlugZap } from 'lucide-react'
import StatusBadge from '../agents/StatusBadge'

function IntegrationCard({ integration, onSelect, onConnect }) {
  const Icon = integration.icon
  const connected = integration.status === 'Connected'

  return (
    <article className={`integration-card ${connected ? 'connected' : 'available'}`}>
      <div className="integration-card-head">
        <div className="integration-mark" aria-hidden="true"><Icon size={22} /></div>
        <div>
          <h3>{integration.name}</h3>
          <span>{integration.category}</span>
        </div>
        <StatusBadge status={integration.status} />
      </div>
      <p>{integration.description}</p>
      {connected ? (
        <div className="integration-connected-meta">
          <span><strong>{integration.health}</strong>health</span>
          <span><strong>{integration.eventsToday.toLocaleString()}</strong>events today</span>
          <span><strong>{integration.lastSync}</strong>last synced</span>
        </div>
      ) : (
        <div className="capability-tags">{integration.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div>
      )}
      <div className="integration-used-by">
        <span>Used by</span>
        <strong>{connected ? integration.usedBy.join(', ') : 'Ready for setup'}</strong>
      </div>
      <div className="automation-card-footer">
        {connected ? (
          <button className="text-button" type="button" onClick={() => onSelect(integration)}>Configure <ArrowUpRight size={15} aria-hidden="true" /></button>
        ) : (
          <button className="primary-button subtle" type="button" onClick={() => onConnect(integration)}><PlugZap size={15} aria-hidden="true" />Connect</button>
        )}
      </div>
    </article>
  )
}

export default IntegrationCard
