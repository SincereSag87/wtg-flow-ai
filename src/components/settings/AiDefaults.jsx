function AiDefaults({ settings, onChange }) {
  return (
    <section className="settings-card" aria-labelledby="ai-defaults-title">
      <div className="section-heading"><div><h3 id="ai-defaults-title">AI Defaults</h3><p>Demo-only workspace defaults for mock agent configuration.</p></div></div>
      <div className="settings-form-grid">
        <label><span>Default Model</span><select value={settings.model} onChange={(event) => onChange('model', event.target.value)}><option>GPT-5</option><option>FlowMind Enterprise</option><option>FlowMind Analyst</option></select><small>Used as the starting model selection for new demo agents.</small></label>
        <label><span>Temperature</span><input value={settings.temperature} onChange={(event) => onChange('temperature', event.target.value)} /><small>Controls mock response variability in this interface only.</small></label>
        <label><span>Max Runtime</span><input value={settings.maxRuntime} onChange={(event) => onChange('maxRuntime', event.target.value)} /><small>Displayed as a default execution limit for agent setup.</small></label>
        <label><span>Human Approval Threshold</span><select value={settings.approvalThreshold} onChange={(event) => onChange('approvalThreshold', event.target.value)}><option>Low Risk</option><option>Medium Risk</option><option>High Risk</option></select><small>Determines when mock workflows route to human review.</small></label>
        <label><span>Default Retry Attempts</span><input value={settings.retryAttempts} onChange={(event) => onChange('retryAttempts', event.target.value)} /><small>Suggested retry count for new automations.</small></label>
        <label className="toggle-row compact"><span><strong>Agent Memory</strong>Enable demo memory indicators for agents.</span><input type="checkbox" checked={settings.memory} onChange={(event) => onChange('memory', event.target.checked)} /></label>
      </div>
    </section>
  )
}

export default AiDefaults
