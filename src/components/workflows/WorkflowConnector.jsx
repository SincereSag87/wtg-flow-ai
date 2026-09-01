const nodeWidth = 172
const nodeHeight = 74

const portPoint = (node, port) => {
  const { x, y } = node.position

  if (port === 'left') {
    return { x, y: y + nodeHeight / 2 }
  }

  if (port === 'right') {
    return { x: x + nodeWidth, y: y + nodeHeight / 2 }
  }

  if (port === 'top') {
    return { x: x + nodeWidth / 2, y }
  }

  return { x: x + nodeWidth / 2, y: y + nodeHeight }
}

function WorkflowConnector({ connection, nodes, active }) {
  const source = nodes.find((node) => node.id === connection.source)
  const target = nodes.find((node) => node.id === connection.target)

  if (!source || !target) {
    return null
  }

  const start = portPoint(source, connection.sourcePort)
  const end = portPoint(target, connection.targetPort)
  const verticalDistance = Math.max(64, Math.abs(end.y - start.y) * 0.48)
  const controlA = { x: start.x, y: start.y + verticalDistance }
  const controlB = { x: end.x, y: end.y - verticalDistance }

  return (
    <path
      className={`builder-connector${active ? ' active' : ''}`}
      d={`M ${start.x} ${start.y} C ${controlA.x} ${controlA.y}, ${controlB.x} ${controlB.y}, ${end.x} ${end.y}`}
    />
  )
}

export default WorkflowConnector
