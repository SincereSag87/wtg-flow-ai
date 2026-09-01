import { BookOpen, PlugZap } from 'lucide-react'
import { useMemo, useState } from 'react'
import IntegrationActivity from '../components/integrations/IntegrationActivity'
import IntegrationCard from '../components/integrations/IntegrationCard'
import IntegrationDetailPanel from '../components/integrations/IntegrationDetailPanel'
import IntegrationFilters from '../components/integrations/IntegrationFilters'
import IntegrationMetrics from '../components/integrations/IntegrationMetrics'
import IntegrationSetupDialog from '../components/integrations/IntegrationSetupDialog'
import { initialIntegrations } from '../data/integrationsData'

function Integrations() {
  const [integrations, setIntegrations] = useState(initialIntegrations)
  const [category, setCategory] = useState('All')
  const [selectedIntegration, setSelectedIntegration] = useState(null)
  const [setupIntegration, setSetupIntegration] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [testing, setTesting] = useState(false)
  const [pageFeedback, setPageFeedback] = useState('')

  const visibleIntegrations = useMemo(
    () => integrations.filter((integration) => category === 'All' || integration.category === category),
    [integrations, category],
  )

  const showPageFeedback = (message) => {
    setPageFeedback(message)
    window.setTimeout(() => setPageFeedback(''), 2600)
  }

  const updateIntegration = (integrationId, updates) => {
    setIntegrations((current) => current.map((integration) => (integration.id === integrationId ? { ...integration, ...updates } : integration)))
    setSelectedIntegration((current) => (current?.id === integrationId ? { ...current, ...updates } : current))
  }

  const connectIntegration = (integration, form) => {
    const updates = { status: 'Connected', health: 'Healthy', workspace: form.workspace, auth: form.auth, lastSync: 'Connected just now', eventsToday: 0, usedBy: ['Workflow assignment pending'] }
    updateIntegration(integration.id, updates)
    setSetupIntegration(null)
    setSelectedIntegration({ ...integration, ...updates })
    showPageFeedback(`${integration.name} connected locally`)
  }

  const handleDetailAction = (action) => {
    if (!selectedIntegration) return

    if (action === 'test') {
      setTesting(true)
      setFeedback('Testing connection...')
      window.setTimeout(() => {
        setTesting(false)
        setFeedback('Connection successful')
        updateIntegration(selectedIntegration.id, { health: 'Healthy', lastSync: 'Just now' })
      }, 900)
      return
    }

    if (action === 'disconnect') {
      updateIntegration(selectedIntegration.id, { status: 'Available', health: 'Available', eventsToday: 0, lastSync: 'Not connected', usedBy: [] })
      setFeedback('Integration disconnected locally')
      return
    }

    if (action === 'disable') {
      updateIntegration(selectedIntegration.id, { health: 'Disabled' })
      setFeedback('Integration disabled locally')
      return
    }

    setFeedback('Reconnect flow prepared')
  }

  return (
    <div className="integrations-page">
      <section className="ops-hero" aria-labelledby="integrations-title">
        <div>
          <div className="status-indicator"><span aria-hidden="true" />7 healthy connections processing events</div>
          <h1 id="integrations-title">Integrations</h1>
          <p>Connect WTG Flow AI to the tools your business already uses.</p>
        </div>
        <div className="agents-hero-actions">
          {pageFeedback ? <div className="action-feedback inline" role="status">{pageFeedback}</div> : null}
          <button className="ghost-button" type="button" onClick={() => showPageFeedback('Documentation opened in demo mode')}><BookOpen size={16} aria-hidden="true" />View Documentation</button>
          <button className="primary-button" type="button" onClick={() => setSetupIntegration(integrations.find((item) => item.status === 'Available'))}><PlugZap size={16} aria-hidden="true" />Add Integration</button>
        </div>
      </section>

      <IntegrationMetrics integrations={integrations} />
      <IntegrationFilters activeCategory={category} onChange={setCategory} />

      <section className="integration-grid" aria-label="Integration catalog">
        {visibleIntegrations.map((integration) => <IntegrationCard integration={integration} onSelect={setSelectedIntegration} onConnect={setSetupIntegration} key={integration.id} />)}
      </section>

      <IntegrationActivity />
      <IntegrationSetupDialog integration={setupIntegration} onClose={() => setSetupIntegration(null)} onConnect={connectIntegration} />
      <IntegrationDetailPanel integration={selectedIntegration} feedback={feedback} testing={testing} onClose={() => { setSelectedIntegration(null); setFeedback('') }} onAction={handleDetailAction} />
    </div>
  )
}

export default Integrations
