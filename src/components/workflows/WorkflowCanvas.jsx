import WorkflowConnector from './WorkflowConnector'
import WorkflowNode from './WorkflowNode'

const canvasSize = { width: 920, height: 1040 }

function WorkflowCanvas({ workflow, selectedNodeId, runStates, zoom, onSelectNode, onCanvasAction }) {
  return (
    <section className="builder-canvas-panel" aria-label="Workflow canvas">
      <div className="canvas-toolbar" aria-label="Canvas controls">
        <button className="icon-button" type="button" onClick={() => onCanvasAction('zoomOut')} aria-label="Zoom out">-</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button className="icon-button" type="button" onClick={() => onCanvasAction('zoomIn')} aria-label="Zoom in">+</button>
        <button className="ghost-button compact" type="button" onClick={() => onCanvasAction('reset')}>Reset</button>
        <button className="ghost-button compact" type="button" onClick={() => onCanvasAction('fit')}>Fit</button>
      </div>

      <div className="builder-canvas-scroll">
        <div className="builder-canvas-stage" style={{ width: canvasSize.width, height: canvasSize.height }}>
          <div className="builder-canvas-zoom" style={{ transform: `scale(${zoom})` }}>
            <svg className="builder-connectors" width={canvasSize.width} height={canvasSize.height} aria-hidden="true">
              <defs>
                <linearGradient id="builderLine" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6ee7d8" />
                  <stop offset="100%" stopColor="#8ab4ff" />
                </linearGradient>
              </defs>
              {workflow.connections.map((connection) => (
                <WorkflowConnector
                  connection={connection}
                  nodes={workflow.nodes}
                  active={runStates[connection.source] === 'Completed'}
                  key={connection.id}
                />
              ))}
            </svg>
            {workflow.nodes.map((node) => (
              <WorkflowNode
                node={node}
                selected={node.id === selectedNodeId}
                runState={runStates[node.id]}
                onSelect={onSelectNode}
                key={node.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkflowCanvas
