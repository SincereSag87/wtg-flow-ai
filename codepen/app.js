import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@19.2.8'
import { createRoot } from 'https://esm.sh/react-dom@19.2.8/client'
import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  CheckCircle2,
  Command,
  Copy,
  GitBranch,
  LayoutDashboard,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  Zap,
} from 'https://esm.sh/lucide-react@0.541.0'

const h = React.createElement
const icon = (Icon, size = 18) => h(Icon, { size, 'aria-hidden': 'true' })

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'AI Agents', icon: Bot },
  { label: 'Workflow Builder', icon: Workflow },
  { label: 'Automations', icon: Zap },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Activity', icon: Activity },
  { label: 'Settings', icon: Settings },
]

const initialAgents = [
  { name: 'Customer Support Agent', category: 'Support', status: 'Active', tasks: 842, success: 98.9, runtime: '4.2s', tags: ['Triage', 'Sentiment', 'Replies'] },
  { name: 'Invoice Processing Agent', category: 'Finance', status: 'Active', tasks: 621, success: 99.2, runtime: '5.1s', tags: ['Extraction', 'Validation'] },
  { name: 'Lead Qualification Agent', category: 'Sales', status: 'Active', tasks: 504, success: 96.8, runtime: '6.8s', tags: ['Scoring', 'CRM'] },
  { name: 'Operations Analyst', category: 'Analysis', status: 'Active', tasks: 318, success: 97.4, runtime: '7.3s', tags: ['Reporting', 'Anomaly'] },
  { name: 'Developer Assistant', category: 'Development', status: 'Paused', tasks: 188, success: 95.6, runtime: '8.9s', tags: ['Review', 'Docs'] },
]

const automations = [
  { name: 'Customer Support Escalation', status: 'Active', trigger: 'New Support Ticket', agent: 'Customer Support Agent', runs: 482, success: 99.1 },
  { name: 'Invoice Processing', status: 'Active', trigger: 'New Invoice', agent: 'Invoice Processing Agent', runs: 311, success: 99.4 },
  { name: 'Lead Qualification', status: 'Active', trigger: 'CRM Lead Created', agent: 'Lead Qualification Agent', runs: 198, success: 96.7 },
  { name: 'Security Incident Triage', status: 'Needs Attention', trigger: 'Webhook', agent: 'Operations Analyst', runs: 64, success: 91.2 },
]

const activities = [
  { title: 'Customer Support Escalation', type: 'Workflow', status: 'Success', detail: 'Workflow completed successfully', time: '12 seconds ago' },
  { title: 'Customer Support Agent', type: 'Agent', status: 'Success', detail: 'Generated response', time: '28 seconds ago' },
  { title: 'Salesforce', type: 'Integration', status: 'Info', detail: 'Lead event received', time: '1 minute ago' },
  { title: 'Invoice Processing', type: 'Human Review', status: 'Warning', detail: 'Human review requested', time: '3 minutes ago' },
  { title: 'Security Incident Triage', type: 'Automation', status: 'Error', detail: 'CRM API returned 429 rate limit response', time: '6 minutes ago' },
]

const workflowNodes = [
  { id: 'request', title: 'Customer Request', type: 'Trigger', x: 40, y: 35, icon: Zap },
  { id: 'classify', title: 'Intent Classifier', type: 'AI', x: 40, y: 160, icon: GitBranch },
  { id: 'agent', title: 'Support AI Agent', type: 'Agent', x: 40, y: 285, icon: Bot },
  { id: 'decision', title: 'Decision', type: 'Logic', x: 40, y: 410, icon: Workflow },
  { id: 'resolve', title: 'Auto Resolve', type: 'Action', x: 260, y: 410, icon: CheckCircle2 },
  { id: 'review', title: 'Human Review', type: 'Approval', x: 260, y: 285, icon: ShieldCheck },
]

const workflowConnections = [['request', 'classify'], ['classify', 'agent'], ['agent', 'decision'], ['decision', 'resolve'], ['decision', 'review']]

function Status({ children }) {
  return h('span', { className: `status status-${String(children).toLowerCase().replaceAll(' ', '-')}` }, children)
}

function PageHeader({ kicker, title, subtitle, action }) {
  return h('section', { className: 'hero page-hero' }, h('div', null, h('p', { className: 'eyebrow' }, kicker), h('h2', null, title), h('p', null, subtitle)), h('div', { className: 'hero-actions' }, action))
}

function MiniMetric({ label, value }) {
  return h('article', { className: 'metric mini' }, h('div', null, h('span', null, label), h('strong', null, value)))
}

function HeroVisual() {
  return h('div', { className: 'hero-visual', role: 'img', 'aria-label': 'WTG Flow AI automation preview' },
    h('div', { className: 'hero-visual-header' }, h('span', null, 'WTG Flow'), h('strong', null, 'Live automation map')),
    h('div', { className: 'hero-visual-flow' }, ['Trigger', 'AI Agent', 'Decision', 'Action'].map((item) => h('span', { key: item }, item))),
    h('div', { className: 'hero-visual-metrics' }, h('div', null, h('strong', null, '98.4%'), h('span', null, 'Success')), h('div', null, h('strong', null, '147h'), h('span', null, 'Saved'))),
  )
}

function Sidebar({ activePage, setActivePage }) {
  return h(
    'aside',
    { className: 'sidebar', 'aria-label': 'Primary navigation' },
    h('div', { className: 'brand' }, h('div', { className: 'brand-mark' }, icon(Sparkles, 20)), h('div', null, h('strong', null, 'WTG Flow AI'), h('span', null, 'Automation OS'))),
    h('nav', { className: 'nav' }, navItems.map((item) => h('button', { className: `nav-item ${activePage === item.label ? 'active' : ''}`, type: 'button', key: item.label, onClick: () => setActivePage(item.label), 'aria-current': activePage === item.label ? 'page' : undefined }, icon(item.icon), h('span', null, item.label)))),
    h('div', { className: 'workspace' }, h('div', { className: 'workspace-badge' }, 'W'), h('div', null, h('span', null, 'Workspace'), h('strong', null, 'WTG Operations'), h('span', null, 'Scale Plan'))),
  )
}

function Topbar({ activePage, openCommand }) {
  return h('header', { className: 'topbar' }, h('div', null, h('p', { className: 'eyebrow' }, 'Build. Automate. Scale.'), h('h1', null, activePage)), h('div', { className: 'topbar-actions' }, h('button', { className: 'command-search', type: 'button', onClick: openCommand, 'aria-label': 'Open command menu' }, icon(Search, 17), h('span', null, 'Search or jump to...'), h('kbd', null, 'Ctrl K')), h('button', { className: 'icon-button', type: 'button', onClick: openCommand, 'aria-label': 'Command menu' }, icon(Command)), h('button', { className: 'icon-button', type: 'button', 'aria-label': 'Notifications' }, icon(Bell))))
}

function Overview({ setActivePage }) {
  const metrics = [['Active Agents', '12', Bot], ['Tasks Automated', '2,481', Zap], ['Success Rate', '98.4%', CheckCircle2], ['Time Saved', '147 hrs', Activity]]
  return h(React.Fragment, null,
    h('section', { className: 'hero' }, h('div', null, h('div', { className: 'hero-brand' }, h('div', { className: 'wtg-logo', 'aria-hidden': 'true' }, 'WTG'), h('p', { className: 'eyebrow' }, 'WTG Flow AI')), h('h2', null, 'AI automation built for real businesses.'), h('p', null, 'A CodePen-friendly product demo with interactive agents, workflow testing, automations, analytics, activity traces, and settings.')), h(HeroVisual)),
    h('section', { className: 'metrics', 'aria-label': 'Key metrics' }, metrics.map(([label, value, Icon]) => h('article', { className: 'metric', key: label }, h('div', null, h('span', null, label), h('strong', null, value)), icon(Icon, 20)))),
    h('div', { className: 'content-grid' }, h(WorkflowCanvas), h('aside', { className: 'agents' }, h(AgentSnapshot), h(RunSnapshot))),
    h('section', { className: 'panel quick-actions' }, h('button', { className: 'primary-button', type: 'button', onClick: () => setActivePage('AI Agents') }, icon(Bot, 16), 'Browse Agents'), h('button', { className: 'ghost-button', type: 'button', onClick: () => setActivePage('Workflow Builder') }, icon(Workflow, 16), 'Test Workflow'), h('button', { className: 'ghost-button', type: 'button', onClick: () => setActivePage('Analytics') }, icon(BarChart3, 16), 'View Analytics')),
  )
}

function AgentSnapshot() {
  return h('section', { className: 'panel' }, h('div', { className: 'panel-title' }, h('div', null, h('h3', null, 'Active Agents'), h('p', null, 'Live automation capacity'))), h('div', { className: 'agents' }, initialAgents.slice(0, 3).map((agent) => h(AgentCard, { agent, key: agent.name }))))
}

function RunSnapshot() {
  return h('section', { className: 'panel' }, h('div', { className: 'panel-title' }, h('div', null, h('h3', null, 'Recent Runs'), h('p', null, 'Execution feed'))), h('div', { className: 'run-feed' }, automations.map((run) => h('article', { key: run.name }, h('strong', null, run.name), h('small', null, `${run.status} / ${run.runs} runs today`)))))
}

function AgentCard({ agent, onSelect }) {
  return h('article', { className: 'agent-card' },
    h('div', { className: 'agent-row' }, h('div', { className: 'avatar' }, agent.name[0]), h('div', null, h('strong', null, agent.name), h('br'), h('small', null, agent.category)), h(Status, null, agent.status)),
    h('div', { className: 'agent-stats' }, h('div', null, h('span', null, 'Tasks'), h('strong', null, agent.tasks)), h('div', null, h('span', null, 'Success'), h('strong', null, `${agent.success}%`)), h('div', null, h('span', null, 'Runtime'), h('strong', null, agent.runtime))),
    h('div', { className: 'tag-row' }, agent.tags.map((tag) => h('span', { key: tag }, tag))),
    onSelect ? h('button', { className: 'ghost-button', type: 'button', onClick: () => onSelect(agent) }, 'Open details') : null,
  )
}

function AgentsPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [selected, setSelected] = useState(null)
  const [agents, setAgents] = useState(initialAgents)
  const filtered = agents.filter((agent) => (status === 'All' || agent.status === status) && agent.name.toLowerCase().includes(query.toLowerCase()))
  return h(React.Fragment, null,
    h(PageHeader, { kicker: 'AI workforce', title: 'AI Agents', subtitle: 'Browse, inspect, and manage intelligent agents across your workflows.', action: h('button', { className: 'primary-button', type: 'button', onClick: () => setAgents((current) => [{ name: 'New Routing Agent', category: 'Operations', status: 'Draft', tasks: 0, success: 100, runtime: '0s', tags: ['Routing', 'Review'] }, ...current]) }, icon(Plus, 16), 'Create Agent') }),
    h('section', { className: 'metrics compact' }, h(MiniMetric, { label: 'Total Agents', value: agents.length }), h(MiniMetric, { label: 'Active', value: agents.filter((a) => a.status === 'Active').length }), h(MiniMetric, { label: 'Running Tasks', value: '27' }), h(MiniMetric, { label: 'Avg Success', value: '97.8%' })),
    h(FilterBar, { query, setQuery, status, setStatus, statuses: ['All', 'Active', 'Paused', 'Draft'] }),
    filtered.length ? h('section', { className: 'card-grid' }, filtered.map((agent) => h(AgentCard, { agent, key: agent.name, onSelect: setSelected }))) : h(Empty, { onReset: () => { setQuery(''); setStatus('All') } }),
    selected ? h(DetailPanel, { title: selected.name, onClose: () => setSelected(null) }, h('p', null, `${selected.category} agent with ${selected.tasks} tasks completed at ${selected.success}% success.`), h('div', { className: 'detail-grid' }, h(MiniMetric, { label: 'Runtime', value: selected.runtime }), h(MiniMetric, { label: 'Handoff Rate', value: '3.2%' })), h('div', { className: 'tag-row' }, selected.tags.map((tag) => h('span', { key: tag }, tag))), h('button', { className: 'primary-button', type: 'button' }, icon(Pause, 16), selected.status === 'Paused' ? 'Resume' : 'Pause')) : null,
  )
}

function WorkflowBuilderPage() {
  const [running, setRunning] = useState(false)
  const [log, setLog] = useState(['Draft saved just now'])
  const [status, setStatus] = useState('Draft')
  const runTest = () => {
    setRunning(true)
    setLog(['Trigger received'])
    ;['Intent classified', 'Agent generated response', 'Decision evaluated', 'Human review requested', 'Completed'].forEach((step, index) => window.setTimeout(() => setLog((current) => [...current, step]), 500 * (index + 1)))
    window.setTimeout(() => setRunning(false), 3200)
  }
  return h(React.Fragment, null,
    h(PageHeader, { kicker: 'Customer Support Escalation', title: 'Workflow Builder', subtitle: 'Design intelligent automations with agents, decisions, actions, and human review.', action: h('div', { className: 'button-row' }, h('button', { className: 'ghost-button', type: 'button', onClick: () => setLog(['Workflow is ready to run.']) }, 'Validate'), h('button', { className: 'primary-button', type: 'button', onClick: runTest }, icon(Play, 16), running ? 'Running...' : 'Run Test'), h('button', { className: 'ghost-button', type: 'button', onClick: () => setStatus('Published') }, 'Publish')) }),
    h('div', { className: 'builder-demo' }, h('section', { className: 'panel node-library' }, h('h3', null, 'Node Library'), ['Webhook', 'AI Agent', 'Decision', 'Send Email', 'Human Review'].map((item) => h('button', { className: 'node-chip', type: 'button', key: item, onClick: () => setLog((current) => [`${item} node added`, ...current]) }, icon(Plus, 15), item))), h(WorkflowCanvas, { running }), h('section', { className: 'panel' }, h('div', { className: 'panel-title' }, h('div', null, h('h3', null, 'Configuration'), h('p', null, `Status: ${status}`))), h('label', { className: 'field' }, 'Model', h('input', { defaultValue: 'GPT-5' })), h('label', { className: 'field' }, 'Temperature', h('input', { defaultValue: '0.3' })), h('div', { className: 'run-feed' }, log.map((item) => h('article', { key: item }, h('strong', null, item), h('small', null, 'Test log')))))),
  )
}

function WorkflowCanvas({ running = false }) {
  const [selected, setSelected] = useState('agent')
  const nodeById = Object.fromEntries(workflowNodes.map((node) => [node.id, node]))
  return h('section', { className: 'panel', 'aria-labelledby': 'workflow-title' }, h('div', { className: 'panel-title' }, h('div', null, h('h3', { id: 'workflow-title' }, 'Customer Support Escalation'), h('p', null, 'Click nodes to select them'))), h('div', { className: 'workflow-canvas', role: 'group', 'aria-label': 'Workflow canvas' }, h('svg', { className: 'connector-layer', viewBox: '0 0 520 560', 'aria-hidden': 'true' }, workflowConnections.map(([source, target]) => { const from = nodeById[source]; const to = nodeById[target]; return h('path', { className: 'connector', d: `M${from.x + 85} ${from.y + 78} C${from.x + 85} ${from.y + 112}, ${to.x + 85} ${to.y - 36}, ${to.x + 85} ${to.y}`, key: `${source}-${target}` }) })), workflowNodes.map((node, index) => h('button', { className: `workflow-node ${selected === node.id ? 'selected' : ''} ${running && index < 4 ? 'node-running' : ''}`, style: { left: `${node.x}px`, top: `${node.y}px` }, type: 'button', onClick: () => setSelected(node.id), key: node.id }, h('div', { className: 'node-icon' }, icon(node.icon, 17)), h('strong', null, node.title), h('span', null, `${node.type} / ${selected === node.id ? 'Selected' : 'Configured'}`)))))
}

function AutomationsPage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const filtered = automations.filter((automation) => automation.name.toLowerCase().includes(query.toLowerCase()))

  return h(React.Fragment, null,
    h(PageHeader, { kicker: 'Automation Health 98.7%', title: 'Automations', subtitle: 'Monitor, manage, and optimize active AI-powered workflows.', action: h('button', { className: 'primary-button', type: 'button' }, icon(Plus, 16), 'Create Automation') }),
    h('section', { className: 'metrics compact' }, h(MiniMetric, { label: 'Active', value: '18' }), h(MiniMetric, { label: 'Runs Today', value: '1,284' }), h(MiniMetric, { label: 'Success', value: '98.7%' }), h(MiniMetric, { label: 'Reviews', value: '42' })),
    h('label', { className: 'search-wide' }, icon(Search, 17), h('input', { value: query, placeholder: 'Search automations...', onChange: (event) => setQuery(event.target.value) })),
    h('section', { className: 'table-card' },
      h('table', null,
        h('thead', null, h('tr', null, ['Automation', 'Status', 'Trigger', 'Agent', 'Runs', 'Success'].map((col) => h('th', { key: col }, col)))),
        h('tbody', null, filtered.map((automation) => h('tr', { key: automation.name, onClick: () => setSelected(automation) }, h('td', null, h('strong', null, automation.name)), h('td', null, h(Status, null, automation.status)), h('td', null, automation.trigger), h('td', null, automation.agent), h('td', null, automation.runs), h('td', null, `${automation.success}%`)))),
      ),
    ),
    selected ? h(DetailPanel, { title: selected.name, onClose: () => setSelected(null) }, h('p', null, `${selected.trigger} routed to ${selected.agent}.`), h('div', { className: 'detail-grid' }, h(MiniMetric, { label: 'Total Runs', value: '18,420' }), h(MiniMetric, { label: 'Failures', value: '17' })), h('button', { className: 'primary-button', type: 'button' }, icon(RefreshCw, 16), 'Run Now')) : null,
  )
}

function AnalyticsPage({ setActivePage }) {
  const [range, setRange] = useState('Last 30 Days')
  const [exported, setExported] = useState(false)
  const multiplier = range === 'Today' ? 0.08 : range === 'Last 7 Days' ? 0.32 : range === 'Last 90 Days' ? 2.6 : 1
  return h(React.Fragment, null,
    h(PageHeader, { kicker: range, title: 'Analytics', subtitle: 'Measure automation performance, agent efficiency, and business impact.', action: h('div', { className: 'button-row' }, ['Today', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days'].map((item) => h('button', { className: item === range ? 'primary-button' : 'ghost-button', type: 'button', onClick: () => setRange(item), key: item }, item)), h('button', { className: 'ghost-button', type: 'button', onClick: () => setExported(true) }, 'Export Report')) }),
    exported ? h('div', { className: 'settings-feedback', role: 'status' }, 'Analytics report prepared for export.') : null,
    h('section', { className: 'metrics compact' }, h(MiniMetric, { label: 'Automated Tasks', value: Math.round(24892 * multiplier).toLocaleString() }), h(MiniMetric, { label: 'Hours Saved', value: Math.round(1482 * multiplier).toLocaleString() }), h(MiniMetric, { label: 'Savings', value: `$${Math.round(184600 * multiplier).toLocaleString()}` }), h(MiniMetric, { label: 'Success', value: '98.4%' })),
    h('section', { className: 'panel chart-panel' }, h('div', { className: 'panel-title' }, h('div', null, h('h3', null, 'Automation Performance'), h('p', null, 'Runs, successful runs, and exceptions over time'))), h('div', { className: 'bars' }, [44, 68, 52, 82, 74, 90, 78].map((height, index) => h('span', { style: { height: `${height}%` }, title: `Day ${index + 1}`, key: index })))),
    h('section', { className: 'content-grid' }, h('div', { className: 'panel' }, h('h3', null, 'Agent Performance'), initialAgents.map((agent) => h('article', { className: 'rank-row', key: agent.name }, h('strong', null, agent.name), h('span', null, `${agent.tasks} tasks / ${agent.success}%`)))), h('div', { className: 'panel' }, h('h3', null, 'Failures & Exceptions'), ['API rate limit', 'Timeout', 'Validation failure'].map((item) => h('button', { className: 'node-chip', type: 'button', onClick: () => setActivePage('Activity'), key: item }, item, ' / View Activity')))),
  )
}

function ActivityPage({ setActivePage }) {
  const [live, setLive] = useState(false)
  const [selected, setSelected] = useState(null)
  const [items, setItems] = useState(activities)
  useEffect(() => {
    if (!live) return undefined
    const timer = window.setInterval(() => setItems((current) => [{ title: 'Live Workflow Run', type: 'Workflow', status: 'Success', detail: 'New execution event received', time: 'just now' }, ...current].slice(0, 8)), 3500)
    return () => window.clearInterval(timer)
  }, [live])
  return h(React.Fragment, null,
    h(PageHeader, { kicker: live ? 'Live updates on' : 'Traceability', title: 'Activity', subtitle: 'Trace workflow runs, agent actions, system events, and workspace changes.', action: h('button', { className: live ? 'primary-button' : 'ghost-button', type: 'button', onClick: () => setLive((value) => !value) }, icon(Activity, 16), live ? 'Live On' : 'Live Updates') }),
    h('section', { className: 'metrics compact' }, h(MiniMetric, { label: 'Events Today', value: '4,824' }), h(MiniMetric, { label: 'Workflow Runs', value: '1,284' }), h(MiniMetric, { label: 'Agent Actions', value: '3,102' }), h(MiniMetric, { label: 'Errors', value: '17' })),
    h('section', { className: 'timeline' }, items.map((item, index) => h('button', { className: 'activity-card', type: 'button', onClick: () => setSelected(item), key: `${item.title}-${index}` }, h(Status, null, item.status), h('div', null, h('strong', null, item.title), h('p', null, item.detail)), h('small', null, item.time)))),
    h('section', { className: 'panel' }, h('h3', null, 'Audit Log'), ['Workflow published', 'Agent paused', 'Integration connected', 'Automation disabled'].map((item) => h('article', { className: 'rank-row', key: item }, h('strong', null, item), h('span', null, 'Raymond Wannamaker / Success')))),
    selected ? h(DetailPanel, { title: selected.title, onClose: () => setSelected(null) }, h('p', null, selected.detail), h('div', { className: 'trace' }, ['Trigger received', 'Intent classified', 'Agent invoked', 'Decision evaluated', selected.status === 'Error' ? 'Retry scheduled' : 'Completed'].map((step) => h('div', { key: step }, icon(CheckCircle2, 15), step))), h('div', { className: 'button-row' }, h('button', { className: 'ghost-button', type: 'button', onClick: () => setActivePage('Automations') }, 'Open Automation'), h('button', { className: 'primary-button', type: 'button' }, 'Retry'))) : null,
  )
}

function SettingsPage() {
  const [tab, setTab] = useState('General')
  const tabs = ['General', 'Team & Roles', 'Notifications', 'AI Defaults', 'Security', 'Billing']
  const [message, setMessage] = useState('Settings are stored locally in this demo.')
  const [general, setGeneral] = useState({ workspace: 'WTG Operations', timezone: 'Eastern Time', startPage: 'Overview', appearance: 'Dark' })
  const [team, setTeam] = useState(['Raymond Wannamaker / Owner / Active', 'Maya Chen / Admin / Active', 'Jordan Lee / Builder / Active'])
  const [notifications, setNotifications] = useState({ failures: true, reviews: true, reports: false, security: true })
  const [aiDefaults, setAiDefaults] = useState({ model: 'GPT-5', temperature: '0.3', runtime: '30 sec', approval: 'Medium Risk' })
  const [apiAccess, setApiAccess] = useState(true)
  const [billing, setBilling] = useState({ name: 'Raymond Wannamaker', card: '', address: 'WTG Operations, Baltimore, MD', status: 'Active' })

  const updateObject = (setter, field, value) => setter((current) => ({ ...current, [field]: value }))
  const saveMessage = (copy) => setMessage(copy)

  const panel = () => {
    if (tab === 'General') {
      return h('div', { className: 'settings-grid' },
        h('label', { className: 'field' }, 'Workspace Name', h('input', { value: general.workspace, onChange: (event) => updateObject(setGeneral, 'workspace', event.target.value) })),
        h('label', { className: 'field' }, 'Default Time Zone', h('select', { value: general.timezone, onChange: (event) => updateObject(setGeneral, 'timezone', event.target.value) }, ['Eastern Time', 'Central Time', 'Pacific Time', 'UTC'].map((item) => h('option', { key: item }, item)))),
        h('label', { className: 'field' }, 'Default Start Page', h('select', { value: general.startPage, onChange: (event) => updateObject(setGeneral, 'startPage', event.target.value) }, navItems.map((item) => h('option', { key: item.label }, item.label)))),
        h('label', { className: 'field' }, 'Appearance', h('select', { value: general.appearance, onChange: (event) => updateObject(setGeneral, 'appearance', event.target.value) }, ['Dark', 'System'].map((item) => h('option', { key: item }, item)))),
      )
    }

    if (tab === 'Team & Roles') {
      return h('div', { className: 'run-feed' },
        h('button', { className: 'primary-button', type: 'button', onClick: () => { setTeam((current) => ['new.member@demo.com / Reviewer / Invited', ...current]); saveMessage('Demo invite added to the team list.') } }, icon(Plus, 16), 'Invite Member'),
        team.map((member) => h('article', { key: member }, h('strong', null, member), h('button', { className: 'ghost-button', type: 'button', onClick: () => { setTeam((current) => current.filter((item) => item !== member)); saveMessage('Team member removed locally.') } }, 'Remove'))),
      )
    }

    if (tab === 'Notifications') {
      return h('div', { className: 'settings-list' }, Object.entries(notifications).map(([key, value]) => h('label', { className: 'toggle-line', key }, h('span', null, key === 'failures' ? 'Workflow Failures' : key === 'reviews' ? 'Human Review Requests' : key === 'reports' ? 'Weekly Reports' : 'Security Alerts'), h('input', { type: 'checkbox', checked: value, onChange: () => updateObject(setNotifications, key, !value) }))), h('label', { className: 'field' }, 'Quiet Hours', h('input', { defaultValue: '10:00 PM - 7:00 AM' })))
    }

    if (tab === 'AI Defaults') {
      return h('div', { className: 'settings-grid' },
        h('label', { className: 'field' }, 'Default Model', h('select', { value: aiDefaults.model, onChange: (event) => updateObject(setAiDefaults, 'model', event.target.value) }, ['GPT-5', 'FlowMind Enterprise', 'FlowMind Analyst'].map((item) => h('option', { key: item }, item)))),
        h('label', { className: 'field' }, 'Temperature', h('input', { value: aiDefaults.temperature, onChange: (event) => updateObject(setAiDefaults, 'temperature', event.target.value) })),
        h('label', { className: 'field' }, 'Max Runtime', h('input', { value: aiDefaults.runtime, onChange: (event) => updateObject(setAiDefaults, 'runtime', event.target.value) })),
        h('label', { className: 'field' }, 'Human Approval Threshold', h('select', { value: aiDefaults.approval, onChange: (event) => updateObject(setAiDefaults, 'approval', event.target.value) }, ['Low Risk', 'Medium Risk', 'High Risk'].map((item) => h('option', { key: item }, item)))),
      )
    }

    if (tab === 'Security') {
      return h('div', { className: 'settings-list' },
        h('label', { className: 'toggle-line' }, h('span', null, 'API Access'), h('input', { type: 'checkbox', checked: apiAccess, onChange: () => setApiAccess((value) => !value) })),
        h('article', { className: 'billing-card' }, h('strong', null, 'Demo API Key'), h('span', null, 'wtg_demo_********8H2K'), h('button', { className: 'ghost-button', type: 'button', onClick: () => saveMessage('Demo key revoked locally.') }, 'Revoke')),
        h('article', { className: 'billing-card' }, h('strong', null, 'Audit Logging'), h('span', null, 'Enabled / 90 day retention')),
      )
    }

    return h('form', { className: 'billing-form', onSubmit: (event) => { event.preventDefault(); updateObject(setBilling, 'status', 'Active'); saveMessage('Demo billing information submitted locally.') } },
      h('article', { className: 'billing-card' }, h('strong', null, 'Current Plan'), h('span', null, 'Scale / $249 per month'), h(Status, null, billing.status)),
      h('div', { className: 'settings-grid' },
        h('label', { className: 'field' }, 'Name on Card', h('input', { required: true, value: billing.name, onChange: (event) => updateObject(setBilling, 'name', event.target.value) })),
        h('label', { className: 'field' }, 'Debit or Credit Card', h('input', { required: true, inputMode: 'numeric', placeholder: '4242 4242 4242 4242', value: billing.card, onChange: (event) => updateObject(setBilling, 'card', event.target.value) })),
        h('label', { className: 'field full' }, 'Billing Address', h('textarea', { value: billing.address, onChange: (event) => updateObject(setBilling, 'address', event.target.value) })),
      ),
      h('div', { className: 'button-row' }, h('button', { className: 'primary-button', type: 'submit' }, 'Submit Billing Info'), h('button', { className: 'ghost-button', type: 'button', onClick: () => { updateObject(setBilling, 'status', 'Inactive'); saveMessage('Billing marked inactive for the demo.') } }, 'Deactivate Billing'), h('button', { className: 'ghost-button', type: 'button', onClick: () => saveMessage(`Billing contact: ${billing.name || 'No name entered'}. Status: ${billing.status}.`) }, 'View Billing Information')),
    )
  }

  return h(React.Fragment, null,
    h(PageHeader, { kicker: 'Workspace controls', title: 'Settings', subtitle: 'Manage workspace preferences, team access, AI defaults, security, and plan usage.', action: h('button', { className: 'primary-button', type: 'button', onClick: () => saveMessage(`${tab} settings saved locally.`) }, 'Save Changes') }),
    h('div', { className: 'settings-demo' }, h('div', { className: 'settings-tabs', role: 'tablist', 'aria-label': 'Settings sections' }, tabs.map((item) => h('button', { className: tab === item ? 'active' : '', type: 'button', role: 'tab', 'aria-selected': tab === item, onClick: () => setTab(item), key: item }, item))), h('section', { className: 'panel', role: 'tabpanel', 'aria-label': tab }, h('h3', null, tab), panel(), h('div', { className: 'settings-feedback', role: 'status', 'aria-live': 'polite' }, message))),
  )
}

function FilterBar({ query, setQuery, status, setStatus, statuses }) {
  return h('section', { className: 'filter-bar' }, h('label', { className: 'search-wide' }, icon(Search, 17), h('input', { value: query, placeholder: 'Search agents...', onChange: (event) => setQuery(event.target.value) })), h('select', { value: status, onChange: (event) => setStatus(event.target.value), 'aria-label': 'Filter by status' }, statuses.map((item) => h('option', { key: item }, item))))
}

function Empty({ onReset }) {
  return h('section', { className: 'panel empty-state' }, h('h3', null, 'No agents match these filters.'), h('button', { className: 'primary-button', type: 'button', onClick: onReset }, 'Reset filters'))
}

function DetailPanel({ title, onClose, children }) {
  return h('div', { className: 'drawer', role: 'dialog', 'aria-modal': 'true', 'aria-label': title }, h('section', { className: 'drawer-panel' }, h('header', null, h('h3', null, title), h('button', { className: 'icon-button', type: 'button', onClick: onClose, 'aria-label': 'Close detail panel' }, icon(X))), children))
}

function CommandMenu({ open, onClose, onNavigate, onToast }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const actions = useMemo(() => [...navItems.map((item) => ({ label: item.label, group: 'Navigate', page: item.label, icon: item.icon })), { label: 'New Agent', group: 'Create', page: 'AI Agents', icon: Plus }, { label: 'Run Test', group: 'Create', page: 'Workflow Builder', icon: Play }, { label: 'Export Analytics', group: 'Create', page: 'Analytics', icon: Copy }], [])
  const filtered = actions.filter((action) => `${action.group} ${action.label}`.toLowerCase().includes(query.toLowerCase()))
  if (!open) return null
  const run = (action) => { onNavigate(action.page); if (action.group === 'Create') onToast(`${action.label} action prepared.`); onClose() }
  const onKeyDown = (event) => {
    if (event.key === 'Escape') onClose()
    if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0))) }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)) }
    if (event.key === 'Enter' && filtered[activeIndex]) run(filtered[activeIndex])
  }
  return h('div', { className: 'command-backdrop', onMouseDown: onClose }, h('section', { className: 'command-menu', role: 'dialog', 'aria-modal': 'true', onMouseDown: (event) => event.stopPropagation(), onKeyDown }, h('header', null, icon(Search), h('input', { autoFocus: true, value: query, placeholder: 'Search actions...', onChange: (event) => { setQuery(event.target.value); setActiveIndex(0) } })), h('div', { className: 'command-list' }, filtered.map((action, index) => h('button', { className: index === activeIndex ? 'active' : '', type: 'button', onClick: () => run(action), key: action.label }, icon(action.icon, 17), h('span', null, h('strong', null, action.label), h('small', null, action.group)))))))
}

function PageRouter({ activePage, setActivePage }) {
  if (activePage === 'AI Agents') return h(AgentsPage)
  if (activePage === 'Workflow Builder') return h(WorkflowBuilderPage)
  if (activePage === 'Automations') return h(AutomationsPage)
  if (activePage === 'Analytics') return h(AnalyticsPage, { setActivePage })
  if (activePage === 'Activity') return h(ActivityPage, { setActivePage })
  if (activePage === 'Settings') return h(SettingsPage)
  return h(Overview, { setActivePage })
}

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [commandOpen, setCommandOpen] = useState(false)
  const [toast, setToast] = useState('')
  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(''), 3000) }
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
  return h('div', { className: 'app-shell' }, h(Sidebar, { activePage, setActivePage }), h('div', { className: 'frame' }, h(Topbar, { activePage, openCommand: () => setCommandOpen(true) }), h('main', { className: 'main' }, h(PageRouter, { activePage, setActivePage }))), h(CommandMenu, { open: commandOpen, onClose: () => setCommandOpen(false), onNavigate: setActivePage, onToast: showToast }), toast ? h('div', { className: 'toast', role: 'status', 'aria-live': 'polite' }, toast) : null)
}

createRoot(document.getElementById('root')).render(h(App))
