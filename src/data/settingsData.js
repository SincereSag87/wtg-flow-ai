export const settingsTabs = ['General', 'Team & Roles', 'Notifications', 'AI Defaults', 'Security', 'Billing / Plan']

export const generalDefaults = {
  workspaceName: 'WTG Operations',
  workspaceId: 'wtg-operations',
  timezone: 'Eastern Time',
  dateFormat: 'MM/DD/YYYY',
  startPage: 'Overview',
  appearance: 'Dark',
}

export const teamRoles = ['Owner', 'Admin', 'Builder', 'Reviewer', 'Viewer']

export const initialTeamMembers = [
  { id: 'raymond', name: 'Raymond Wannamaker', email: 'raymond@wtgflow.demo', role: 'Owner', status: 'Active' },
  { id: 'maya', name: 'Maya Chen', email: 'maya@wtgflow.demo', role: 'Admin', status: 'Active' },
  { id: 'jordan', name: 'Jordan Lee', email: 'jordan@wtgflow.demo', role: 'Builder', status: 'Active' },
  { id: 'elena', name: 'Elena Rodriguez', email: 'elena@wtgflow.demo', role: 'Reviewer', status: 'Active' },
  { id: 'noah', name: 'Noah Carter', email: 'noah@wtgflow.demo', role: 'Viewer', status: 'Invited' },
]

export const rolePermissions = [
  ['Owner', 'Full workspace control, billing, and security policy access'],
  ['Admin', 'Manage agents, workflows, automations, integrations, and team members'],
  ['Builder', 'Create and edit agents, workflows, and automations'],
  ['Reviewer', 'Approve human review tasks and inspect activity traces'],
  ['Viewer', 'Read dashboards, analytics, and audit history'],
]

export const notificationCategories = [
  'Workflow Failures',
  'Human Review Requests',
  'Integration Errors',
  'Agent Performance Alerts',
  'Weekly Reports',
  'Billing Notifications',
  'Security Alerts',
]

export const notificationChannels = ['In App', 'Email', 'Slack']

export const aiDefaults = {
  model: 'GPT-5',
  temperature: '0.3',
  maxRuntime: '30 sec',
  approvalThreshold: 'Medium Risk',
  retryAttempts: '2',
  memory: true,
}

export const securityDefaults = {
  twoFactor: true,
  sso: 'Available on Enterprise',
  sessionTimeout: '8 hours',
  apiAccess: true,
  auditLogging: true,
  retention: '90 days',
}

export const initialApiKeys = [
  { id: 'key-primary', name: 'Production Demo Key', token: 'wtg_demo_********8H2K', created: 'Aug 22, 2026' },
  { id: 'key-ops', name: 'Operations Sandbox', token: 'wtg_demo_********1Q9P', created: 'Aug 29, 2026' },
]

export const plans = ['Starter', 'Growth', 'Scale', 'Enterprise']

export const usageStats = [
  ['Automated Runs', '84,920', '100,000', 85],
  ['AI Agent Seats', '12', '20', 60],
  ['Team Members', '5', '10', 50],
  ['Data Retention', '90 days', '90 days', 100],
]

export const onboardingItems = [
  { id: 'agent', label: 'Create your first AI Agent', page: 'AI Agents', done: true },
  { id: 'workflow', label: 'Build a Workflow', page: 'Workflow Builder', done: true },
  { id: 'automation', label: 'Create an Automation', page: 'Automations', done: true },
  { id: 'integration', label: 'Connect an Integration', page: 'Integrations', done: true },
  { id: 'test', label: 'Run your first test', page: 'Workflow Builder', done: false },
]
