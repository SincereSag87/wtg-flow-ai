import { Bot, Download, LayoutTemplate, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import AgentCard from '../components/agents/AgentCard'
import AgentDetailPanel from '../components/agents/AgentDetailPanel'
import AgentFilters from '../components/agents/AgentFilters'
import AgentMetrics from '../components/agents/AgentMetrics'
import CreateAgentDialog from '../components/agents/CreateAgentDialog'
import { initialAgents } from '../data/agentsData'

const defaultFilters = {
  query: '',
  status: 'All',
  category: 'All',
  sort: 'Most Active',
}

function Agents() {
  const [agents, setAgents] = useState(initialAgents)
  const [filters, setFilters] = useState(defaultFilters)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [pageFeedback, setPageFeedback] = useState('')

  const filteredAgents = useMemo(() => {
    const query = filters.query.trim().toLowerCase()

    return agents
      .filter((agent) => {
        const searchable = [
          agent.name,
          agent.category,
          agent.description,
          ...agent.tags,
          ...agent.workflows,
        ].join(' ').toLowerCase()

        const matchesQuery = query ? searchable.includes(query) : true
        const matchesStatus = filters.status === 'All' || agent.status === filters.status
        const matchesCategory = filters.category === 'All' || agent.category === filters.category

        return matchesQuery && matchesStatus && matchesCategory
      })
      .sort((a, b) => {
        if (filters.sort === 'Success Rate') {
          return b.successRate - a.successRate
        }

        if (filters.sort === 'Tasks Completed') {
          return b.tasksCompleted - a.tasksCompleted
        }

        if (filters.sort === 'Recently Updated') {
          return a.updatedAt - b.updatedAt
        }

        return b.runningTasks - a.runningTasks || b.tasksCompleted - a.tasksCompleted
      })
  }, [agents, filters])

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  const showPageFeedback = (message) => {
    setPageFeedback(message)
    window.setTimeout(() => setPageFeedback(''), 2600)
  }

  const handlePanelAction = (action) => {
    if (!selectedAgent) {
      return
    }

    if (action === 'pause' || action === 'resume') {
      const nextStatus = action === 'pause' ? 'Paused' : 'Active'
      const updatedAgent = { ...selectedAgent, status: nextStatus, runningTasks: action === 'pause' ? 0 : selectedAgent.runningTasks }

      setAgents((current) => current.map((agent) => (agent.id === selectedAgent.id ? updatedAgent : agent)))
      setSelectedAgent(updatedAgent)
      setFeedback(action === 'pause' ? 'Agent paused for this session' : 'Agent resumed for this session')
      window.setTimeout(() => setFeedback(''), 2200)
      return
    }

    const messages = {
      edit: 'Edit mode opened',
      duplicate: 'Duplicate draft prepared',
    }

    setFeedback(messages[action])
    window.setTimeout(() => setFeedback(''), 2200)
  }

  const handleCreateAgent = (form) => {
    const capabilities = form.capabilities.length ? form.capabilities : ['Workflow routing']
    const newAgent = {
      id: `${form.name.toLowerCase().replaceAll(' ', '-')}-${Date.now()}`,
      name: form.name,
      category: form.category,
      status: 'Draft',
      description: form.description,
      tasksCompleted: 0,
      successRate: 0,
      avgRuntime: 'Not run',
      handoffRate: 'Not measured',
      lastActive: 'Created just now',
      updatedAt: 0,
      runningTasks: 0,
      icon: Bot,
      tags: capabilities.slice(0, 3),
      capabilities,
      workflows: ['Workflow assignment pending'],
      config: {
        model: form.model,
        temperature: '0.30',
        maxRuntime: '60s',
        approval: form.approval ? 'Required before external actions' : 'Not required',
      },
      activity: ['Draft created in this session', 'Awaiting workflow assignment', 'Ready for configuration review'],
    }

    setAgents((current) => [newAgent, ...current])
    setSelectedAgent(newAgent)
    setCreateOpen(false)
    setFilters(defaultFilters)
    showPageFeedback(`${form.name} created as a draft`)
  }

  return (
    <div className="agents-page">
      <section className="agents-hero" aria-labelledby="agents-title">
        <div>
          <div className="status-indicator">
            <span aria-hidden="true" />
            9 active agents monitoring 27 tasks
          </div>
          <h1 id="agents-title">AI Agents</h1>
          <p>Deploy and manage intelligent agents across your workflows.</p>
        </div>
        <div className="agents-hero-actions">
          {pageFeedback ? <div className="action-feedback inline" role="status">{pageFeedback}</div> : null}
          <button className="ghost-button" type="button" onClick={() => showPageFeedback('Template gallery queued')}>
            <LayoutTemplate size={16} aria-hidden="true" />
            Templates
          </button>
          <button className="ghost-button" type="button" onClick={() => showPageFeedback('Import flow prepared')}>
            <Download size={16} aria-hidden="true" />
            Import
          </button>
          <button className="primary-button" type="button" onClick={() => setCreateOpen(true)} aria-expanded={createOpen}>
            <Plus size={16} aria-hidden="true" />
            Create Agent
          </button>
        </div>
      </section>

      <AgentMetrics agents={agents} />

      <AgentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
        resultCount={filteredAgents.length}
      />

      {filteredAgents.length ? (
        <section className="agent-grid" aria-label="AI agent directory">
          {filteredAgents.map((agent) => (
            <AgentCard
              agent={agent}
              selected={selectedAgent?.id === agent.id}
              onSelect={setSelectedAgent}
              key={agent.id}
            />
          ))}
        </section>
      ) : (
        <section className="empty-state" aria-live="polite">
          <div className="agent-avatar large" aria-hidden="true">
            <Bot size={22} />
          </div>
          <h2>No agents match these filters.</h2>
          <p>Adjust your search terms or reset the filters to view the full agent directory.</p>
          <button className="primary-button subtle" type="button" onClick={resetFilters}>Reset filters</button>
        </section>
      )}

      <AgentDetailPanel
        agent={selectedAgent}
        feedback={feedback}
        onClose={() => setSelectedAgent(null)}
        onMockAction={handlePanelAction}
      />
      <CreateAgentDialog open={createOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreateAgent} />
    </div>
  )
}

export default Agents
