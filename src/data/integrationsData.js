import { Code2, CreditCard, Database, FileText, Github, HardDrive, MessageSquare, Radio, Send, Table2, Users } from 'lucide-react'

export const integrationCategories = ['All', 'Communication', 'CRM', 'Productivity', 'Developer Tools', 'Data', 'Finance']

export const initialIntegrations = [
  { id: 'slack', name: 'Slack', category: 'Communication', status: 'Connected', description: 'Send workflow alerts and human review requests to team channels.', health: 'Healthy', eventsToday: 684, lastSync: '4 min ago', capabilities: ['Send messages', 'Create approvals', 'Receive events'], usedBy: ['Customer Support Escalation', 'Lead Qualification', 'Security Incident Triage'], icon: MessageSquare, auth: 'OAuth 2.0', workspace: 'WTG Operations' },
  { id: 'teams', name: 'Microsoft Teams', category: 'Communication', status: 'Available', description: 'Route approvals and status updates to Teams channels.', health: 'Available', eventsToday: 0, lastSync: 'Not connected', capabilities: ['Send messages', 'Create tasks', 'Receive events'], usedBy: [], icon: Send, auth: 'OAuth 2.0', workspace: 'Not connected' },
  { id: 'salesforce', name: 'Salesforce', category: 'CRM', status: 'Connected', description: 'Read leads, update contacts, and receive CRM lifecycle events.', health: 'Healthy', eventsToday: 842, lastSync: '2 min ago', capabilities: ['Read Leads', 'Update Contacts', 'Create Tasks', 'Receive Events'], usedBy: ['Lead Qualification', 'Customer Support Escalation', 'Sales Follow-up'], icon: Users, auth: 'OAuth 2.0', workspace: 'WTG Operations' },
  { id: 'hubspot', name: 'HubSpot', category: 'CRM', status: 'Available', description: 'Sync contact events and automate sales follow-up workflows.', health: 'Available', eventsToday: 0, lastSync: 'Not connected', capabilities: ['Read contacts', 'Update deals', 'Create tasks'], usedBy: [], icon: Table2, auth: 'OAuth 2.0', workspace: 'Not connected' },
  { id: 'github', name: 'GitHub', category: 'Developer Tools', status: 'Connected', description: 'Receive pull request, issue, and deployment events for engineering automations.', health: 'Healthy', eventsToday: 226, lastSync: '12 min ago', capabilities: ['Pull request events', 'Issue events', 'Deployment updates'], usedBy: ['Incident Triage', 'Developer Assistant'], icon: Github, auth: 'OAuth 2.0', workspace: 'WTG Engineering' },
  { id: 'google-drive', name: 'Google Drive', category: 'Productivity', status: 'Connected', description: 'Process documents and route files through approval workflows.', health: 'Healthy', eventsToday: 318, lastSync: '9 min ago', capabilities: ['Read documents', 'Watch folders', 'Write summaries'], usedBy: ['Invoice Processing', 'Contract Review'], icon: HardDrive, auth: 'OAuth 2.0', workspace: 'WTG Operations' },
  { id: 'notion', name: 'Notion', category: 'Productivity', status: 'Available', description: 'Create pages, update databases, and collect review outcomes.', health: 'Available', eventsToday: 0, lastSync: 'Not connected', capabilities: ['Create pages', 'Update databases', 'Read docs'], usedBy: [], icon: FileText, auth: 'OAuth 2.0', workspace: 'Not connected' },
  { id: 'stripe', name: 'Stripe', category: 'Finance', status: 'Connected', description: 'Monitor billing events and route finance exceptions.', health: 'Healthy', eventsToday: 406, lastSync: '7 min ago', capabilities: ['Read charges', 'Receive events', 'Create notes'], usedBy: ['Invoice Processing', 'Refund Review'], icon: CreditCard, auth: 'OAuth 2.0', workspace: 'WTG Finance' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Data', status: 'Connected', description: 'Read operational data and write workflow audit records.', health: 'Needs Attention', eventsToday: 523, lastSync: '28 min ago', capabilities: ['Read records', 'Write audit logs', 'Run views'], usedBy: ['Invoice Processing', 'Operations Analyst'], icon: Database, auth: 'Service account', workspace: 'WTG Data Warehouse' },
  { id: 'rest-api', name: 'REST API', category: 'Developer Tools', status: 'Connected', description: 'Call internal APIs and exchange structured workflow payloads.', health: 'Healthy', eventsToday: 604, lastSync: '18 min ago', capabilities: ['GET requests', 'POST requests', 'Signed headers'], usedBy: ['Security Incident Triage', 'Customer Support Escalation'], icon: Code2, auth: 'Signed token', workspace: 'WTG Platform' },
  { id: 'webhook', name: 'Webhook', category: 'Developer Tools', status: 'Connected', description: 'Receive external events from any system that can send webhooks.', health: 'Healthy', eventsToday: 239, lastSync: '1 min ago', capabilities: ['Receive Events', 'Validate payloads', 'Route workflows'], usedBy: ['Customer Support Escalation', 'Invoice Processing'], icon: Radio, auth: 'Signed secret', workspace: 'WTG Platform' },
]

export const integrationActivity = [
  { integration: 'Salesforce', event: 'Lead created', time: '2 min ago' },
  { integration: 'Slack', event: 'Message sent', time: '4 min ago' },
  { integration: 'GitHub', event: 'Pull request event received', time: '12 min ago' },
  { integration: 'REST API', event: 'POST /customers completed', time: '18 min ago' },
  { integration: 'PostgreSQL', event: 'Audit write retried', time: '28 min ago' },
]

export const setupCapabilityDefaults = ['Read Leads', 'Update Contacts', 'Create Tasks', 'Receive Events']
