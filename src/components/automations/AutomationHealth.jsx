function AutomationHealth({ automations }) {
  const healthy = automations.filter((item) => item.health === 'Healthy').length
  const degraded = automations.filter((item) => item.health === 'Degraded').length
  const paused = automations.filter((item) => item.status === 'Paused').length
  const draft = automations.filter((item) => item.status === 'Draft').length
  const totalRuns = automations.reduce((total, item) => total + item.runsToday, 0)

  return (
    <section className="automation-health section-card" aria-labelledby="automation-health-title">
      <div className="section-heading">
        <div>
          <h3 id="automation-health-title">Automation Health</h3>
          <p>Run volume and operational health across active workflows.</p>
        </div>
        <strong>98.7%</strong>
      </div>
      <div className="health-bars" aria-label="Health distribution">
        <span style={{ width: `${(healthy / automations.length) * 100}%` }} />
        <span style={{ width: `${(degraded / automations.length) * 100}%` }} />
        <span style={{ width: `${((paused + draft) / automations.length) * 100}%` }} />
      </div>
      <div className="health-grid">
        <span><strong>{healthy}</strong> Healthy</span>
        <span><strong>{degraded}</strong> Needs attention</span>
        <span><strong>{paused + draft}</strong> Paused or draft</span>
        <span><strong>{totalRuns.toLocaleString()}</strong> Runs today</span>
      </div>
    </section>
  )
}

export default AutomationHealth
