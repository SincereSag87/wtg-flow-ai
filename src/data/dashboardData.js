import {
  Activity,
  BarChart3,
  Bot,
  BrainCircuit,
  Cable,
  CheckCircle2,
  Clock3,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Settings,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react'

export const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'AI Agents', icon: Bot },
  { label: 'Workflow Builder', icon: GitBranch },
  { label: 'Automations', icon: Workflow },
  { label: 'Integrations', icon: Cable },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Activity', icon: Activity },
  { label: 'Settings', icon: Settings },
]

export const kpis = [
  {
    label: 'Active Agents',
    value: '12',
    trend: '+3 this month',
    icon: Bot,
    tone: 'teal',
  },
  {
    label: 'Tasks Automated',
    value: '2,481',
    trend: '+18.2% vs last week',
    icon: Zap,
    tone: 'blue',
  },
  {
    label: 'Success Rate',
    value: '98.4%',
    trend: '1.1% above target',
    icon: CheckCircle2,
    tone: 'green',
  },
  {
    label: 'Time Saved',
    value: '147 hrs',
    trend: '36 hrs this week',
    icon: Clock3,
    tone: 'amber',
  },
]

export const performance = [
  { day: 'Mon', value: 62 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 71 },
  { day: 'Thu', value: 92 },
  { day: 'Fri', value: 84 },
  { day: 'Sat', value: 68 },
  { day: 'Sun', value: 96 },
]

export const agents = [
  {
    name: 'Customer Support Agent',
    status: 'Active',
    tasks: 842,
    successRate: '99.1%',
    lastActive: '2 min ago',
  },
  {
    name: 'Invoice Processing Agent',
    status: 'Reviewing',
    tasks: 516,
    successRate: '97.8%',
    lastActive: '11 min ago',
  },
  {
    name: 'Lead Qualification Agent',
    status: 'Active',
    tasks: 693,
    successRate: '98.6%',
    lastActive: '6 min ago',
  },
  {
    name: 'Operations Analyst',
    status: 'Active',
    tasks: 430,
    successRate: '96.9%',
    lastActive: '24 min ago',
  },
]

export const recentRuns = [
  {
    workflow: 'Priority ticket triage',
    agent: 'Customer Support Agent',
    status: 'Completed',
    duration: '38s',
    timestamp: 'Today, 2:18 PM',
  },
  {
    workflow: 'Vendor invoice extraction',
    agent: 'Invoice Processing Agent',
    status: 'Human Review',
    duration: '1m 24s',
    timestamp: 'Today, 2:12 PM',
  },
  {
    workflow: 'Inbound lead scoring',
    agent: 'Lead Qualification Agent',
    status: 'Running',
    duration: '19s',
    timestamp: 'Today, 2:07 PM',
  },
  {
    workflow: 'Weekly ops variance scan',
    agent: 'Operations Analyst',
    status: 'Completed',
    duration: '2m 08s',
    timestamp: 'Today, 1:58 PM',
  },
  {
    workflow: 'Refund exception routing',
    agent: 'Customer Support Agent',
    status: 'Failed',
    duration: '44s',
    timestamp: 'Today, 1:43 PM',
  },
]

export const impactStats = [
  { label: 'Hours saved', value: '147', icon: Clock3 },
  { label: 'Estimated operational savings', value: '$18.4K', icon: Gauge },
  { label: 'Automated tasks', value: '2,481', icon: Sparkles },
  { label: 'Human handoffs avoided', value: '423', icon: BrainCircuit },
]

export const workflowNodes = [
  { id: 'trigger', label: 'Trigger', detail: 'New event detected', x: 50, y: 7 },
  { id: 'agent', label: 'AI Agent', detail: 'Routes context', x: 50, y: 22 },
  { id: 'analyze', label: 'Analyze', detail: 'Extracts signals', x: 50, y: 37 },
  { id: 'decision', label: 'Decision', detail: 'Confidence check', x: 50, y: 52 },
  { id: 'action', label: 'Action', detail: 'Executes task', x: 26, y: 68 },
  {
    id: 'review',
    label: 'Human Review',
    detail: 'Approves exception',
    x: 74,
    y: 68,
  },
  { id: 'completed', label: 'Completed', detail: 'Logs outcome', x: 50, y: 85 },
]
