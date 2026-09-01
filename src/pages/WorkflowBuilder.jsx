import { useEffect, useMemo, useRef, useState } from 'react'
import NodeConfigPanel from '../components/workflows/NodeConfigPanel'
import NodeLibrary from '../components/workflows/NodeLibrary'
import PublishDialog from '../components/workflows/PublishDialog'
import TestRunPanel from '../components/workflows/TestRunPanel'
import WorkflowCanvas from '../components/workflows/WorkflowCanvas'
import WorkflowSummary from '../components/workflows/WorkflowSummary'
import WorkflowTemplates from '../components/workflows/WorkflowTemplates'
import WorkflowToolbar from '../components/workflows/WorkflowToolbar'
import WorkflowValidation from '../components/workflows/WorkflowValidation'
import { defaultWorkflow, testRunSteps, workflowTemplates } from '../data/workflowsData'

const cloneWorkflow = (workflow) => ({
  ...workflow,
  nodes: workflow.nodes.map((node) => ({
    ...node,
    position: { ...node.position },
    config: { ...node.config },
  })),
  connections: workflow.connections.map((connection) => ({ ...connection })),
  lastTest: { ...workflow.lastTest },
})

const defaultTestRun = {
  running: false,
  elapsed: 0,
  log: [],
  activeNodeId: null,
  completedNodeIds: [],
}

function WorkflowBuilder() {
  const [workflow, setWorkflow] = useState(() => cloneWorkflow(defaultWorkflow))
  const [selectedNodeId, setSelectedNodeId] = useState(defaultWorkflow.nodes[2].id)
  const [templateId, setTemplateId] = useState(workflowTemplates[0].id)
  const [zoom, setZoom] = useState(0.88)
  const [validation, setValidation] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [publishOpen, setPublishOpen] = useState(false)
  const [testRun, setTestRun] = useState(defaultTestRun)
  const timerRef = useRef(null)
  const elapsedRef = useRef(null)

  const selectedNode = useMemo(
    () => workflow.nodes.find((node) => node.id === selectedNodeId),
    [workflow.nodes, selectedNodeId],
  )

  const runStates = useMemo(() => {
    const states = {}

    testRun.completedNodeIds.forEach((nodeId) => {
      states[nodeId] = 'Completed'
    })

    if (testRun.activeNodeId) {
      states[testRun.activeNodeId] = 'Running'
    }

    return states
  }, [testRun])

  useEffect(() => () => {
    window.clearInterval(timerRef.current)
    window.clearInterval(elapsedRef.current)
  }, [])

  const showFeedback = (message) => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 2600)
  }

  const updateWorkflow = (updater) => {
    setWorkflow((current) => ({ ...updater(current), updatedAt: 'Unsaved changes' }))
  }

  const handleUpdateNode = (nodeId, updates) => {
    updateWorkflow((current) => ({
      ...current,
      status: current.status === 'Published' || current.status === 'Template' ? 'Draft' : current.status,
      nodes: current.nodes.map((node) => (node.id === nodeId ? { ...node, ...updates } : node)),
    }))
  }

  const handleAddNode = (nodeDefinition) => {
    const positionIndex = workflow.nodes.length
    const newNode = {
      id: `${nodeDefinition.type}-${Date.now()}`,
      type: nodeDefinition.type,
      title: nodeDefinition.title,
      category: nodeDefinition.category,
      status: 'Needs Setup',
      position: {
        x: 130 + (positionIndex % 4) * 190,
        y: 930 + Math.floor(positionIndex / 4) * 118,
      },
      config: {
        instructions: nodeDefinition.description,
        event: '',
        source: '',
        schedule: '',
        condition: '',
        operator: 'equals',
        value: '',
        destination: '',
        payload: '',
        retry: 'Retry once, then alert operator',
        reviewer: '',
        timeout: '2 hours',
        escalation: '',
      },
    }

    updateWorkflow((current) => ({
      ...current,
      status: 'Draft',
      nodes: [...current.nodes, newNode],
    }))
    setSelectedNodeId(newNode.id)
    showFeedback(`${nodeDefinition.title} added to canvas`)
  }

  const handleDeleteNode = (nodeId) => {
    updateWorkflow((current) => ({
      ...current,
      status: 'Draft',
      nodes: current.nodes.filter((node) => node.id !== nodeId),
      connections: current.connections.filter((connection) => connection.source !== nodeId && connection.target !== nodeId),
    }))
    setSelectedNodeId(null)
    showFeedback('Node deleted from workflow')
  }

  const handleDuplicateNode = (nodeId) => {
    const node = workflow.nodes.find((item) => item.id === nodeId)

    if (!node) {
      return
    }

    const duplicate = {
      ...node,
      id: `${node.id}-copy-${Date.now()}`,
      title: `${node.title} Copy`,
      status: 'Needs Setup',
      position: { x: node.position.x + 36, y: node.position.y + 96 },
      config: { ...node.config },
    }

    updateWorkflow((current) => ({
      ...current,
      status: 'Draft',
      nodes: [...current.nodes, duplicate],
    }))
    setSelectedNodeId(duplicate.id)
    showFeedback('Node duplicated as a draft')
  }

  const handleToggleNode = (nodeId) => {
    const node = workflow.nodes.find((item) => item.id === nodeId)

    if (!node) {
      return
    }

    handleUpdateNode(nodeId, { status: node.status === 'Disabled' ? 'Needs Setup' : 'Disabled' })
    showFeedback(node.status === 'Disabled' ? 'Node enabled' : 'Node disabled')
  }

  const handleCanvasAction = (action) => {
    if (action === 'zoomIn') {
      setZoom((current) => Math.min(1.2, Number((current + 0.08).toFixed(2))))
    }

    if (action === 'zoomOut') {
      setZoom((current) => Math.max(0.62, Number((current - 0.08).toFixed(2))))
    }

    if (action === 'reset') {
      setZoom(0.88)
      showFeedback('Canvas view reset')
    }

    if (action === 'fit') {
      setZoom(0.74)
      showFeedback('Workflow centered for review')
    }
  }

  const handleLoadTemplate = (template) => {
    const nextWorkflow = cloneWorkflow(template.workflow)
    setWorkflow(nextWorkflow)
    setTemplateId(template.id)
    setSelectedNodeId(nextWorkflow.nodes[0]?.id ?? null)
    setValidation(null)
    setTestRun(defaultTestRun)
    showFeedback(`${template.name} template loaded`)
  }

  const validateWorkflow = () => {
    const messages = []
    const errors = []

    workflow.nodes.forEach((node) => {
      if (node.category === 'Human' && !node.config.reviewer) {
        messages.push(`${node.title} has no assigned reviewer.`)
      }

      if (node.category === 'Logic' && (!node.config.condition || !node.config.value)) {
        errors.push(`${node.title} has an incomplete condition.`)
      }
    })

    if (!workflow.nodes.length) {
      errors.push('Workflow has no nodes.')
    }

    if (errors.length) {
      setValidation({ type: 'error', title: 'Validation failed', messages: errors })
      return false
    }

    if (messages.length) {
      setValidation({ type: 'warning', title: 'Validation warning', messages })
      return true
    }

    setValidation({ type: 'success', title: 'Workflow is ready to run.', messages: ['All nodes are configured and connected.'] })
    return true
  }

  const runTest = () => {
    window.clearInterval(timerRef.current)
    window.clearInterval(elapsedRef.current)

    const enabledNodes = workflow.nodes.filter((node) => node.status !== 'Disabled')
    const preferredTypes = ['email', 'classify', 'ai-agent', 'decision', 'human-review', 'complete']
    const pathNodeIds = preferredTypes
      .map((type) => enabledNodes.find((node) => node.type === type)?.id)
      .filter(Boolean)

    if (pathNodeIds.length < 3) {
      pathNodeIds.push(...enabledNodes.slice(0, Math.min(6, enabledNodes.length)).map((node) => node.id))
    }

    if (!pathNodeIds.length) {
      setValidation({ type: 'error', title: 'Test run blocked', messages: ['Workflow has no enabled nodes to execute.'] })
      return
    }

    setValidation(null)
    setTestRun({ running: true, elapsed: 0, log: [], activeNodeId: pathNodeIds[0], completedNodeIds: [] })

    const startedAt = Date.now()
    let stepIndex = 0

    elapsedRef.current = window.setInterval(() => {
      setTestRun((current) => ({ ...current, elapsed: (Date.now() - startedAt) / 1000 }))
    }, 120)

    timerRef.current = window.setInterval(() => {
      const currentNodeId = pathNodeIds[stepIndex]
      const message = testRunSteps[stepIndex] ?? `${workflow.nodes.find((node) => node.id === currentNodeId)?.title} completed`
      const nextNodeId = pathNodeIds[stepIndex + 1] ?? null

      setTestRun((current) => ({
        ...current,
        log: [...current.log, message],
        activeNodeId: nextNodeId,
        completedNodeIds: [...current.completedNodeIds, currentNodeId],
      }))

      stepIndex += 1

      if (stepIndex >= pathNodeIds.length) {
        window.clearInterval(timerRef.current)
        window.clearInterval(elapsedRef.current)
        setWorkflow((current) => ({
          ...current,
          lastTest: { status: 'Success', duration: `${((Date.now() - startedAt) / 1000).toFixed(1)} seconds` },
        }))
        setTestRun((current) => ({ ...current, running: false, activeNodeId: null, elapsed: (Date.now() - startedAt) / 1000 }))
        setValidation({ type: 'success', title: 'Workflow is ready to run.', messages: ['Mock test execution completed successfully.'] })
      }
    }, 760)
  }

  const saveDraft = () => {
    setWorkflow((current) => ({ ...current, status: current.status === 'Template' ? 'Draft' : current.status, updatedAt: 'Saved just now' }))
    showFeedback('Draft saved locally')
  }

  const publishWorkflow = () => {
    setWorkflow((current) => ({
      ...current,
      status: 'Published',
      updatedAt: 'Published just now',
      lastPublished: 'Published just now',
    }))
    setPublishOpen(false)
    showFeedback('Workflow published successfully')
  }

  return (
    <div className="workflow-builder-page">
      <WorkflowToolbar
        workflow={workflow}
        running={testRun.running}
        onSave={saveDraft}
        onValidate={validateWorkflow}
        onRunTest={runTest}
        onPublish={() => setPublishOpen(true)}
      />

      <WorkflowValidation validation={validation} feedback={feedback} />

      <div className="builder-layout">
        <div className="builder-left-panel">
          <WorkflowTemplates currentTemplateId={templateId} onLoadTemplate={handleLoadTemplate} />
          <NodeLibrary onAddNode={handleAddNode} />
        </div>
        <div className="builder-center-panel">
          <WorkflowCanvas
            workflow={workflow}
            selectedNodeId={selectedNodeId}
            runStates={runStates}
            zoom={zoom}
            onSelectNode={setSelectedNodeId}
            onCanvasAction={handleCanvasAction}
          />
          <WorkflowSummary workflow={workflow} />
          <TestRunPanel workflow={workflow} testRun={testRun} />
        </div>
        <NodeConfigPanel
          node={selectedNode}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
          onDuplicateNode={handleDuplicateNode}
          onToggleNode={handleToggleNode}
        />
      </div>

      <PublishDialog
        open={publishOpen}
        workflow={workflow}
        onClose={() => setPublishOpen(false)}
        onConfirm={publishWorkflow}
      />
    </div>
  )
}

export default WorkflowBuilder
