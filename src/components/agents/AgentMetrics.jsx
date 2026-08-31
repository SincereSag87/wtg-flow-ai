function AgentMetrics({ agents }) {
  const deployedStatuses = ['Active', 'Running', 'Needs Review']
  const completedAgents = agents.filter((agent) => agent.successRate > 0)
  const avgSuccess = completedAgents.length
    ? completedAgents.reduce((total, agent) => total + agent.successRate, 0) / completedAgents.length
    : 0

  const metrics = [
    { label: 'Total Agents', value: agents.length.toString(), detail: 'Across 6 capability areas', tone: 'blue' },
    {
      label: 'Active',
      value: agents.filter((agent) => deployedStatuses.includes(agent.status)).length.toString(),
      detail: 'Deployed or reviewing work',
      tone: 'green',
    },
    {
      label: 'Running Tasks',
      value: agents.reduce((total, agent) => total + agent.runningTasks, 0).toString(),
      detail: 'Live queue load',
      tone: 'teal',
    },
    { label: 'Avg. Success Rate', value: `${avgSuccess.toFixed(1)}%`, detail: 'Measured agents', tone: 'amber' },
  ]

  return (
    <section className="agent-metrics-grid" aria-label="AI agent summary metrics">
      {metrics.map((metric) => (
        <article className={`agent-metric metric-${metric.tone}`} key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <small>{metric.detail}</small>
        </article>
      ))}
    </section>
  )
}

export default AgentMetrics
