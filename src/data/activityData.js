export const activityTypeOptions = ['All', 'Workflow', 'Agent', 'Automation', 'Integration', 'Human Review', 'System']
export const activityStatusOptions = ['All', 'Success', 'Running', 'Warning', 'Error', 'Info']
export const activitySourceOptions = ['All', 'Workflow Builder', 'AI Agents', 'Automations', 'Integrations', 'System']
export const activityTimeOptions = ['Recent', 'Today', 'Last 7 Days']

const trace = [
  { step: 'Trigger received', status: 'Success', duration: '0.4s', timestamp: '12 sec ago', detail: 'New support ticket matched escalation rule.' },
  { step: 'Intent classified', status: 'Success', duration: '1.1s', timestamp: '11 sec ago', detail: 'Intent: refund request, sentiment: frustrated.' },
  { step: 'Agent invoked', status: 'Success', duration: '2.8s', timestamp: '9 sec ago', detail: 'Customer Support Agent generated response.' },
  { step: 'Decision evaluated', status: 'Success', duration: '0.6s', timestamp: '6 sec ago', detail: 'Confidence exceeded auto-resolve threshold.' },
  { step: 'Action executed', status: 'Success', duration: '1.2s', timestamp: '4 sec ago', detail: 'Response sent and CRM updated.' },
  { step: 'Completed', status: 'Success', duration: '0.1s', timestamp: '2 sec ago', detail: 'Run outcome recorded.' },
]

export const initialActivityEvents = [
  { id: 'EVT-98241', timestamp: '12 seconds ago', source: 'Automations', type: 'Workflow', status: 'Success', actor: 'System', title: 'Customer Support Escalation', description: 'Workflow completed successfully', entity: 'Customer Support Escalation', workflow: 'Customer Support Escalation', agent: 'Customer Support Agent', automation: 'Customer Support Escalation', integration: 'Salesforce', metadata: { runtime: '6.2s', model: 'GPT-5', tokens: '2,481', input: '18 KB', output: '4 KB', requestId: 'req_wtg_9142' }, trace },
  { id: 'EVT-98240', timestamp: '28 seconds ago', source: 'AI Agents', type: 'Agent', status: 'Success', actor: 'Customer Support Agent', title: 'Customer Support Agent', description: 'Generated response', entity: 'Priority ticket response', workflow: 'Customer Support Escalation', agent: 'Customer Support Agent', automation: 'Customer Support Escalation', metadata: { runtime: '2.8s', model: 'GPT-5', tokens: '1,904', input: '11 KB', output: '3 KB', requestId: 'req_wtg_9141' } },
  { id: 'EVT-98239', timestamp: '1 minute ago', source: 'Integrations', type: 'Integration', status: 'Info', actor: 'Salesforce', title: 'Salesforce', description: 'Lead event received', entity: 'Lead Qualification', integration: 'Salesforce', workflow: 'Lead Qualification', agent: 'Lead Qualification Agent', automation: 'Lead Qualification', metadata: { runtime: '0.8s', model: 'None', tokens: '0', input: '9 KB', output: '1 KB', requestId: 'evt_sf_2918' } },
  { id: 'EVT-98238', timestamp: '3 minutes ago', source: 'Automations', type: 'Human Review', status: 'Warning', actor: 'Invoice Processing Agent', title: 'Invoice Processing', description: 'Human review requested', entity: 'Vendor invoice INV-2048', workflow: 'Invoice Processing', agent: 'Invoice Processing Agent', automation: 'Invoice Processing', review: { requestedBy: 'Invoice Processing Agent', reason: 'Refund amount exceeds $500 approval threshold', reviewer: 'Operations Manager', status: 'Approved', waiting: '2m 14s', decision: 'Approved' }, metadata: { runtime: '12.3s', model: 'GPT-5', tokens: '3,144', input: '42 KB', output: '6 KB', requestId: 'req_wtg_9138' } },
  { id: 'EVT-98237', timestamp: '6 minutes ago', source: 'Automations', type: 'Automation', status: 'Error', actor: 'System', title: 'Security Incident Triage', description: 'Run failed', entity: 'Security event API', workflow: 'Incident Triage', agent: 'Operations Analyst', automation: 'Security Incident Triage', integration: 'REST API', error: { message: 'CRM API returned 429 rate limit response', retryCount: 2, lastAttempt: '6 minutes ago', resolution: 'Retry scheduled in 60 seconds' }, metadata: { runtime: '8.9s', model: 'GPT-5', tokens: '1,208', input: '15 KB', output: '2 KB', requestId: 'req_wtg_9135' }, trace: trace.map((step, index) => index === 4 ? { ...step, status: 'Error', detail: 'CRM API returned 429 rate limit response.' } : step) },
  { id: 'EVT-98236', timestamp: '14 minutes ago', source: 'Workflow Builder', type: 'System', status: 'Info', actor: 'Raymond W.', title: 'System', description: 'Workflow version v1.3 published', entity: 'Customer Support Escalation', workflow: 'Customer Support Escalation', metadata: { runtime: 'N/A', model: 'N/A', tokens: '0', input: '0 KB', output: '0 KB', requestId: 'audit_5512' } },
]

export const auditEvents = [
  { id: 'AUD-4112', timestamp: '14 min ago', actor: 'Raymond W.', action: 'Workflow published', resource: 'Customer Support Escalation v1.3', result: 'Success' },
  { id: 'AUD-4111', timestamp: '31 min ago', actor: 'System', action: 'Agent paused', resource: 'Developer Assistant', result: 'Success' },
  { id: 'AUD-4110', timestamp: '49 min ago', actor: 'Operations Manager', action: 'Integration connected', resource: 'Salesforce', result: 'Success' },
  { id: 'AUD-4109', timestamp: '1 hr ago', actor: 'Raymond W.', action: 'Automation disabled', resource: 'Contract Review', result: 'Success' },
  { id: 'AUD-4108', timestamp: '2 hrs ago', actor: 'Admin', action: 'Settings changed', resource: 'Human approval policy', result: 'Success' },
  { id: 'AUD-4107', timestamp: '3 hrs ago', actor: 'Admin', action: 'User invited', resource: 'Finance Reviewer', result: 'Pending' },
]
