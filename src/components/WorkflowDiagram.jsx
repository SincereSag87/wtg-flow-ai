import { workflowNodes } from '../data/dashboardData'

const connectors = [
  { x1: 50, y1: 15, x2: 50, y2: 20 },
  { x1: 50, y1: 30, x2: 50, y2: 35 },
  { x1: 50, y1: 45, x2: 50, y2: 50 },
  { x1: 46, y1: 58, x2: 32, y2: 66 },
  { x1: 54, y1: 58, x2: 68, y2: 66 },
  { x1: 31, y1: 75, x2: 46, y2: 84 },
  { x1: 69, y1: 75, x2: 54, y2: 84 },
]

function WorkflowDiagram() {
  return (
    <div className="workflow-canvas" aria-label="Agent workflow from trigger to completed outcome">
      <svg className="workflow-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#6ee7d8" />
            <stop offset="55%" stopColor="#8ab4ff" />
            <stop offset="100%" stopColor="#f6c76f" />
          </linearGradient>
        </defs>
        {connectors.map((line) => (
          <line
            key={`${line.x1}-${line.y1}-${line.x2}-${line.y2}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {workflowNodes.map((node) => (
        <button
          className={`workflow-node node-${node.id}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          type="button"
          key={node.id}
          aria-label={`${node.label}: ${node.detail}`}
        >
          <span className="node-status" aria-hidden="true" />
          <strong>{node.label}</strong>
          <small>{node.detail}</small>
        </button>
      ))}
    </div>
  )
}

export default WorkflowDiagram
