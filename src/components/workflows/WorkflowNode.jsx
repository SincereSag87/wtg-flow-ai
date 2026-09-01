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
  Send,
  ShieldCheck,
  Sparkles,
  Split,
  Timer,
  UserCheck,
  Webhook,
} from 'lucide-react'

const iconMap = {
  webhook: Webhook,
  form: PenLine,
  email: Inbox,
  schedule: Clock3,
  'crm-event': Network,
  'ai-agent': Bot,
  classify: BrainCircuit,
  extract: FileText,
  summarize: Sparkles,
  'generate-response': MessageSquare,
  decision: GitBranch,
  condition: Route,
  branch: Split,
  delay: Timer,
  'send-email': Mail,
  'update-crm': FileCheck2,
  'create-task': CheckCircle2,
  slack: BellRing,
  api: Code2,
  'human-review': UserCheck,
  approval: ShieldCheck,
  'manual-input': MousePointer2,
  complete: Send,
}

function WorkflowNode({ node, selected, runState, onSelect }) {
  const Icon = iconMap[node.type] ?? Bot
  const visualStatus = runState ?? node.status

  return (
    <button
      className={`builder-node category-${node.category.toLowerCase()} status-${visualStatus.toLowerCase().replaceAll(' ', '-')}${selected ? ' selected' : ''}`}
      style={{ left: node.position.x, top: node.position.y }}
      type="button"
      onClick={() => onSelect(node.id)}
      aria-pressed={selected}
      aria-label={`${node.title}, ${node.category}, ${visualStatus}`}
    >
      <span className="node-port top" aria-hidden="true" />
      <span className="node-port right" aria-hidden="true" />
      <span className="node-port bottom" aria-hidden="true" />
      <span className="node-port left" aria-hidden="true" />
      <span className="builder-node-icon" aria-hidden="true">
        <Icon size={18} />
      </span>
      <span className="builder-node-copy">
        <strong>{node.title}</strong>
        <small>{node.type.replaceAll('-', ' ')}</small>
      </span>
      <span className="builder-node-status">{visualStatus}</span>
    </button>
  )
}

export default WorkflowNode
