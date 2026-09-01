function GeneralSettings({ settings, onChange }) {
  return (
    <section className="settings-card" aria-labelledby="general-settings-title">
      <div className="section-heading"><div><h3 id="general-settings-title">General</h3><p>Workspace defaults for the WTG Operations demo environment.</p></div></div>
      <div className="settings-form-grid">
        <label><span>Workspace Name</span><input value={settings.workspaceName} onChange={(event) => onChange('workspaceName', event.target.value)} /></label>
        <label><span>Workspace ID</span><input value={settings.workspaceId} onChange={(event) => onChange('workspaceId', event.target.value)} /></label>
        <label><span>Default Time Zone</span><select value={settings.timezone} onChange={(event) => onChange('timezone', event.target.value)}><option>Eastern Time</option><option>Central Time</option><option>Pacific Time</option><option>UTC</option></select></label>
        <label><span>Default Date Format</span><select value={settings.dateFormat} onChange={(event) => onChange('dateFormat', event.target.value)}><option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option></select></label>
        <label><span>Default Start Page</span><select value={settings.startPage} onChange={(event) => onChange('startPage', event.target.value)}><option>Overview</option><option>AI Agents</option><option>Workflow Builder</option><option>Automations</option><option>Analytics</option></select></label>
        <label><span>Appearance</span><select value={settings.appearance} onChange={(event) => onChange('appearance', event.target.value)}><option>Dark</option><option>System</option></select></label>
      </div>
    </section>
  )
}

export default GeneralSettings
