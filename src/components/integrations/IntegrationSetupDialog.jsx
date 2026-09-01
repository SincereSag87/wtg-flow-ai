import { PlugZap, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { setupCapabilityDefaults } from '../../data/integrationsData'

function IntegrationSetupDialog({ integration, onClose, onConnect }) {
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)
  const [form, setForm] = useState({ workspace: 'WTG Operations', auth: 'OAuth 2.0', environment: 'Production', permissions: 'Read and write demo access' })

  useEffect(() => {
    if (!integration) return undefined
    previousFocusRef.current = document.activeElement
    closeRef.current?.focus()
    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [integration, onClose])

  if (!integration) return null

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const capabilities = integration.capabilities.length ? integration.capabilities : setupCapabilityDefaults

  return (
    <div className="drawer-backdrop publish-backdrop" role="presentation" onMouseDown={onClose}>
      <form className="create-agent-dialog" role="dialog" aria-modal="true" aria-labelledby="setup-title" onMouseDown={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); onConnect(integration, form, capabilities) }}>
        <header className="detail-header compact"><div><span className="dialog-kicker">Demo credentials only</span><h2 id="setup-title">Connect {integration.name}</h2></div><button className="icon-button" type="button" aria-label="Close setup dialog" onClick={onClose} ref={closeRef}><X size={18} aria-hidden="true" /></button></header>
        <div className="form-grid">
          <label><span>Workspace / Account</span><input value={form.workspace} onChange={(event) => update('workspace', event.target.value)} /></label>
          <label><span>Authentication Method</span><select value={form.auth} onChange={(event) => update('auth', event.target.value)}><option>OAuth 2.0</option><option>Service account</option><option>Signed token</option></select></label>
          <label><span>Environment</span><select value={form.environment} onChange={(event) => update('environment', event.target.value)}><option>Production</option><option>Sandbox</option><option>Development</option></select></label>
          <label><span>Permissions</span><input value={form.permissions} onChange={(event) => update('permissions', event.target.value)} /></label>
        </div>
        <fieldset className="capability-fieldset"><legend>Capabilities</legend><div className="capability-picker">{capabilities.map((capability) => <label key={capability}><input type="checkbox" defaultChecked /> <span>{capability}</span></label>)}</div></fieldset>
        <footer className="dialog-actions"><button className="ghost-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit"><PlugZap size={16} aria-hidden="true" />Connect Integration</button></footer>
      </form>
    </div>
  )
}

export default IntegrationSetupDialog
