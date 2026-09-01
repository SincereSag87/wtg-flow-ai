import {
  BellRing,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  FileCheck2,
  FileText,
  GitBranch,
  Inbox,
  Mail,
  MessageSquare,
  MousePointer2,
  Network,
  PenLine,
  Route,
  ShieldCheck,
  Sparkles,
  Split,
  Timer,
  UserCheck,
  Webhook,
} from 'lucide-react'

export const nodeCategories = [
  {
    name: 'Triggers',
    nodes: [
      { type: 'webhook', title: 'Webhook', description: 'Start from an external event.', icon: Webhook, category: 'Triggers' },
      { type: 'form', title: 'Form Submission', description: 'Run when a form is submitted.', icon: PenLine, category: 'Triggers' },
      { type: 'email', title: 'New Email', description: 'Listen for matching inbox messages.', icon: Inbox, category: 'Triggers' },
      { type: 'schedule', title: 'Scheduled Run', description: 'Run on a recurring schedule.', icon: Clock3, category: 'Triggers' },
      { type: 'crm-event', title: 'CRM Event', description: 'Start from account or deal changes.', icon: Network, category: 'Triggers' },
    ],
  },
  {
    name: 'AI',
    nodes: [
      { type: 'ai-agent', title: 'AI Agent', description: 'Assign work to a deployed agent.', icon: Bot, category: 'AI' },
      { type: 'classify', title: 'Classify', description: 'Detect intent, sentiment, or priority.', icon: BrainCircuit, category: 'AI' },
      { type: 'extract', title: 'Extract Data', description: 'Pull structured data from content.', icon: FileText, category: 'AI' },
      { type: 'summarize', title: 'Summarize', description: 'Create a concise business summary.', icon: Sparkles, category: 'AI' },
      { type: 'generate-response', title: 'Generate Response', description: 'Draft a message or answer.', icon: MessageSquare, category: 'AI' },
    ],
  },
  {
    name: 'Logic',
    nodes: [
      { type: 'decision', title: 'Decision', description: 'Branch based on confidence or data.', icon: GitBranch, category: 'Logic' },
      { type: 'condition', title: 'Condition', description: 'Evaluate a specific rule.', icon: Route, category: 'Logic' },
      { type: 'branch', title: 'Branch', description: 'Split into multiple paths.', icon: Split, category: 'Logic' },
      { type: 'delay', title: 'Delay', description: 'Wait before continuing.', icon: Timer, category: 'Logic' },
    ],
  },
  {
    name: 'Actions',
    nodes: [
      { type: 'send-email', title: 'Send Email', description: 'Send a managed response.', icon: Mail, category: 'Actions' },
      { type: 'update-crm', title: 'Update CRM', description: 'Write outcomes to a CRM record.', icon: FileCheck2, category: 'Actions' },
      { type: 'create-task', title: 'Create Task', description: 'Assign follow-up work.', icon: CheckCircle2, category: 'Actions' },
      { type: 'slack', title: 'Send Slack Message', description: 'Notify an internal channel.', icon: BellRing, category: 'Actions' },
      { type: 'api', title: 'Call API', description: 'Send data to a connected service.', icon: Code2, category: 'Actions' },
    ],
  },
  {
    name: 'Human',
    nodes: [
      { type: 'human-review', title: 'Human Review', description: 'Pause for operator review.', icon: UserCheck, category: 'Human' },
      { type: 'approval', title: 'Approval', description: 'Require explicit approval.', icon: ShieldCheck, category: 'Human' },
      { type: 'manual-input', title: 'Manual Input', description: 'Request missing information.', icon: MousePointer2, category: 'Human' },
    ],
  },
]

export const defaultWorkflow = {
  id: 'customer-support-escalation',
  name: 'Customer Support Escalation',
  status: 'Draft',
  version: 'v1.0',
  updatedAt: 'Saved just now',
  lastTest: { status: 'Success', duration: '8.4 seconds' },
  lastPublished: 'Not yet published',
  nodes: [
    {
      id: 'customer-request',
      type: 'email',
      title: 'Customer Request',
      category: 'Triggers',
      status: 'Configured',
      position: { x: 390, y: 42 },
      config: { event: 'New support email', source: 'support@wtgflow.ai', schedule: 'Realtime' },
    },
    {
      id: 'intent-classifier',
      type: 'classify',
      title: 'Intent Classifier',
      category: 'AI',
      status: 'Configured',
      position: { x: 390, y: 168 },
      config: {
        agent: 'Customer Support Agent',
        instructions: 'Classify intent, urgency, customer sentiment, and refund risk.',
        model: 'GPT-5',
        temperature: '0.2',
        maxRuntime: '20 seconds',
        approval: 'Not required',
      },
    },
    {
      id: 'support-agent',
      type: 'ai-agent',
      title: 'Support AI Agent',
      category: 'AI',
      status: 'Configured',
      position: { x: 390, y: 294 },
      config: {
        agent: 'Customer Support Agent',
        instructions: 'Analyze the customer request and determine the best response.',
        model: 'GPT-5',
        temperature: '0.3',
        maxRuntime: '30 seconds',
        approval: 'Required for refunds over $500',
      },
    },
    {
      id: 'decision',
      type: 'decision',
      title: 'Decision',
      category: 'Logic',
      status: 'Configured',
      position: { x: 390, y: 420 },
      config: { condition: 'Agent confidence', operator: 'greater than', value: '92%' },
    },
    {
      id: 'auto-resolve',
      type: 'generate-response',
      title: 'Auto Resolve',
      category: 'AI',
      status: 'Configured',
      position: { x: 166, y: 558 },
      config: {
        agent: 'Customer Support Agent',
        instructions: 'Generate a concise customer-ready response using approved policy context.',
        model: 'GPT-5',
        temperature: '0.35',
        maxRuntime: '25 seconds',
        approval: 'Not required for standard cases',
      },
    },
    {
      id: 'human-review',
      type: 'human-review',
      title: 'Human Review',
      category: 'Human',
      status: 'Needs Setup',
      position: { x: 614, y: 558 },
      config: { reviewer: '', timeout: '2 hours', escalation: 'Escalate to CX Manager' },
    },
    {
      id: 'send-response',
      type: 'send-email',
      title: 'Send Response',
      category: 'Actions',
      status: 'Configured',
      position: { x: 166, y: 696 },
      config: { destination: 'Customer email', payload: 'Approved response body', retry: 'Retry twice, then create task' },
    },
    {
      id: 'agent-approval',
      type: 'approval',
      title: 'Agent Approval',
      category: 'Human',
      status: 'Configured',
      position: { x: 614, y: 696 },
      config: { reviewer: 'Support Lead', timeout: '4 hours', escalation: 'Escalate to Operations Director' },
    },
    {
      id: 'completed',
      type: 'complete',
      title: 'Completed',
      category: 'Actions',
      status: 'Configured',
      position: { x: 390, y: 846 },
      config: { destination: 'Activity log', payload: 'Outcome, duration, reviewer, and customer sentiment', retry: 'None' },
    },
  ],
  connections: [
    { id: 'c1', source: 'customer-request', target: 'intent-classifier', sourcePort: 'bottom', targetPort: 'top' },
    { id: 'c2', source: 'intent-classifier', target: 'support-agent', sourcePort: 'bottom', targetPort: 'top' },
    { id: 'c3', source: 'support-agent', target: 'decision', sourcePort: 'bottom', targetPort: 'top' },
    { id: 'c4', source: 'decision', target: 'auto-resolve', sourcePort: 'left', targetPort: 'top' },
    { id: 'c5', source: 'decision', target: 'human-review', sourcePort: 'right', targetPort: 'top' },
    { id: 'c6', source: 'auto-resolve', target: 'send-response', sourcePort: 'bottom', targetPort: 'top' },
    { id: 'c7', source: 'human-review', target: 'agent-approval', sourcePort: 'bottom', targetPort: 'top' },
    { id: 'c8', source: 'send-response', target: 'completed', sourcePort: 'bottom', targetPort: 'left' },
    { id: 'c9', source: 'agent-approval', target: 'completed', sourcePort: 'bottom', targetPort: 'right' },
  ],
}

const templateSummaries = [
  { id: 'customer-support-escalation', name: 'Customer Support Escalation', category: 'Support', nodes: 9 },
  { id: 'invoice-processing', name: 'Invoice Processing', category: 'Finance', nodes: 8 },
  { id: 'lead-qualification', name: 'Lead Qualification', category: 'Sales', nodes: 7 },
  { id: 'contract-review', name: 'Contract Review', category: 'Operations', nodes: 8 },
  { id: 'incident-triage', name: 'Incident Triage', category: 'Development', nodes: 7 },
  { id: 'content-approval', name: 'Content Approval', category: 'Operations', nodes: 6 },
]

export const workflowTemplates = templateSummaries.map((template, index) => ({
  ...template,
  description: `${template.category} workflow template with ${template.nodes} configured nodes.`,
  workflow: {
    ...defaultWorkflow,
    id: template.id,
    name: template.name,
    status: index === 0 ? 'Draft' : 'Template',
    updatedAt: index === 0 ? 'Saved just now' : 'Loaded from template',
    lastPublished: 'Not yet published',
    nodes: [
      ...defaultWorkflow.nodes.slice(0, Math.min(template.nodes - 1, defaultWorkflow.nodes.length - 1)),
      defaultWorkflow.nodes[defaultWorkflow.nodes.length - 1],
    ].map((node, nodeIndex) => ({
        ...node,
        id: `${template.id}-${node.id}`,
        title: nodeIndex === 0 ? template.name.split(' ')[0] + ' Intake' : node.title,
        config: { ...node.config },
      })),
    connections: defaultWorkflow.connections
      .filter((connection) => {
        const nodeIds = [
          ...defaultWorkflow.nodes.slice(0, Math.min(template.nodes - 1, defaultWorkflow.nodes.length - 1)),
          defaultWorkflow.nodes[defaultWorkflow.nodes.length - 1],
        ].map((node) => node.id)
        return nodeIds.includes(connection.source) && nodeIds.includes(connection.target)
      })
      .map((connection) => ({
        ...connection,
        id: `${template.id}-${connection.id}`,
        source: `${template.id}-${connection.source}`,
        target: `${template.id}-${connection.target}`,
      })),
  },
}))

export const testRunSteps = [
  'Trigger received',
  'Intent classified',
  'Agent generated response',
  'Decision evaluated',
  'Human review requested',
  'Completed',
]
