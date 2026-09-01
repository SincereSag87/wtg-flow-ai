import { LayoutTemplate, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import AutomationCard from '../components/automations/AutomationCard'
import AutomationDetailPanel from '../components/automations/AutomationDetailPanel'
import AutomationFilters from '../components/automations/AutomationFilters'
import AutomationHealth from '../components/automations/AutomationHealth'
import AutomationMetrics from '../components/automations/AutomationMetrics'
import AutomationRunTable from '../components/automations/AutomationRunTable'
import CreateAutomationDialog from '../components/automations/CreateAutomationDialog'
import RunDetailPanel from '../components/automations/RunDetailPanel'
import { initialAutomations, initialRuns } from '../data/automationsData'

const defaultFilters = { query: '', status: 'All', category: 'All', trigger: 'All', sort: 'Most Active' }

function Automations({ onNavigate }) {
  const [automations, setAutomations] = useState(initialAutomations)
  const [runs, setRuns] = useState(initialRuns)
  const [filters, setFilters] = useState(defaultFilters)
  const [selectedAutomation, setSelectedAutomation] = useState(null)
  const [selectedRun, setSelectedRun] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [pageFeedback, setPageFeedback] = useState('')

  const filteredAutomations = useMemo(() => {
    const query = filters.query.trim().toLowerCase()

    return automations
      .filter((automation) => {
        const searchable = [automation.name, automation.description, automation.agent, automation.workflow, automation.triggerLabel, ...automation.integrations].join(' ').toLowerCase()
        return (!query || searchable.includes(query))
          && (filters.status === 'All' || automation.status === filters.status)
          && (filters.category === 'All' || automation.category === filters.category)
          && (filters.trigger === 'All' || automation.trigger === filters.trigger)
      })
      .sort((a, b) => {
        if (filters.sort === 'Recently Updated') return a.updatedAt - b.updatedAt
        if (filters.sort === 'Success Rate') return b.successRate - a.successRate
        if (filters.sort === 'Most Runs') return b.totalRuns - a.totalRuns
        return b.runsToday - a.runsToday
      })
  }, [automations, filters])

  const selectedRuns = selectedAutomation ? runs.filter((run) => run.automationId === selectedAutomation.id) : []
  const selectedRunAutomation = selectedRun ? automations.find((automation) => automation.id === selectedRun.automationId) : null

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }))
  const showFeedback = (message) => {
    setPageFeedback(message)
    window.setTimeout(() => setPageFeedback(''), 2600)
  }
  const showPanelFeedback = (message) => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 2300)
  }

  const updateAutomation = (automationId, updates) => {
    setAutomations((current) => current.map((automation) => (automation.id === automationId ? { ...automation, ...updates } : automation)))
    setSelectedAutomation((current) => (current?.id === automationId ? { ...current, ...updates } : current))
  }

  const handleAutomationAction = (action) => {
    if (!selectedAutomation) return

    if (action === 'pause' || action === 'resume') {
      const status = action === 'pause' ? 'Paused' : 'Active'
      updateAutomation(selectedAutomation.id, { status, health: status === 'Active' ? 'Healthy' : 'Paused', config: { ...selectedAutomation.config, enabled: status === 'Active' } })
      showPanelFeedback(action === 'pause' ? 'Automation paused for this session' : 'Automation resumed for this session')
    }

    if (action === 'disable') {
      updateAutomation(selectedAutomation.id, { status: 'Paused', health: 'Paused', config: { ...selectedAutomation.config, enabled: false } })
      showPanelFeedback('Automation disabled locally')
    }

    if (action === 'duplicate') {
      const duplicate = { ...selectedAutomation, id: `${selectedAutomation.id}-copy-${Date.now()}`, name: `${selectedAutomation.name} Copy`, status: 'Draft', runsToday: 0, totalRuns: 0, updatedAt: 0, health: 'Draft', config: { ...selectedAutomation.config, enabled: false } }
      setAutomations((current) => [duplicate, ...current])
      setSelectedAutomation(duplicate)
      showPanelFeedback('Duplicate automation created as draft')
    }

    if (action === 'run') {
      const run = { id: `RUN-${Date.now().toString().slice(-5)}`, automationId: selectedAutomation.id, status: 'Running', triggeredBy: 'Manual test', startedAt: 'Just now', completedAt: 'In progress', duration: '0s', agent: selectedAutomation.agent, result: 'Manual run started.', steps: ['Trigger received', 'Agent invoked'] }
      setRuns((current) => [run, ...current])
      updateAutomation(selectedAutomation.id, { runsToday: selectedAutomation.runsToday + 1, lastRun: 'Just now' })
      showPanelFeedback('Manual run started')
    }
  }

  const handleCreateAutomation = (form) => {
    const automation = {
      id: `${form.name.toLowerCase().replaceAll(' ', '-')}-${Date.now()}`,
      name: form.name,
      description: `${form.workflow} is connected to ${form.trigger.toLowerCase()} events and assigned to ${form.agent}.`,
      status: form.enabled ? 'Active' : 'Draft',
      category: form.category,
      trigger: form.trigger,
      triggerLabel: form.trigger,
      agent: form.agent,
      workflow: form.workflow,
      runsToday: 0,
      totalRuns: 0,
      successRate: 0,
      avgRuntime: 'Not run',
      failedRuns: 0,
      humanHandoffs: 0,
      lastRun: 'Not yet run',
      createdAt: 'Today',
      updatedAt: 0,
      health: form.enabled ? 'Healthy' : 'Draft',
      integrations: ['Webhook'],
      icon: Plus,
      config: { enabled: form.enabled, retry: 'Retry once, then alert operator', maxAttempts: 2, timeout: '60s', approval: 'Use workflow default' },
    }

    setAutomations((current) => [automation, ...current])
    setSelectedAutomation(automation)
    setCreateOpen(false)
    setFilters(defaultFilters)
    showFeedback(`${form.name} created locally`)
  }

  return (
    <div className="ops-page">
      <section className="ops-hero" aria-labelledby="automations-title">
        <div>
          <div className="status-indicator"><span aria-hidden="true" />Automation Health 98.7% Healthy</div>
          <h1 id="automations-title">Automations</h1>
          <p>Monitor, manage, and optimize your active AI-powered workflows.</p>
        </div>
        <div className="agents-hero-actions">
          {pageFeedback ? <div className="action-feedback inline" role="status">{pageFeedback}</div> : null}
          <button className="ghost-button" type="button" onClick={() => showFeedback('Template gallery prepared')}><LayoutTemplate size={16} aria-hidden="true" />View Templates</button>
          <button className="primary-button" type="button" onClick={() => setCreateOpen(true)} aria-expanded={createOpen}><Plus size={16} aria-hidden="true" />Create Automation</button>
        </div>
      </section>

      <AutomationMetrics />
      <AutomationHealth automations={automations} />
      <AutomationFilters filters={filters} onChange={updateFilter} onReset={() => setFilters(defaultFilters)} count={filteredAutomations.length} />

      {filteredAutomations.length ? (
        <section className="automation-grid" aria-label="Automation directory">
          {filteredAutomations.map((automation) => <AutomationCard automation={automation} selected={selectedAutomation?.id === automation.id} onSelect={setSelectedAutomation} key={automation.id} />)}
        </section>
      ) : (
        <section className="empty-state"><h2>No automations match these filters.</h2><p>Reset filters to return to the full operational view.</p><button className="primary-button subtle" type="button" onClick={() => setFilters(defaultFilters)}>Reset filters</button></section>
      )}

      <AutomationRunTable runs={runs} automations={automations} onSelectRun={setSelectedRun} />
      <AutomationDetailPanel automation={selectedAutomation} runs={selectedRuns} feedback={feedback} onClose={() => setSelectedAutomation(null)} onAction={handleAutomationAction} onEditWorkflow={() => onNavigate('Workflow Builder')} />
      <RunDetailPanel run={selectedRun} automation={selectedRunAutomation} feedback={feedback} onClose={() => setSelectedRun(null)} onRetry={() => showPanelFeedback('Retry run queued locally')} />
      <CreateAutomationDialog open={createOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreateAutomation} />
    </div>
  )
}

export default Automations
