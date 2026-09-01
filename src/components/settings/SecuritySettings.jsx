import { KeyRound, Trash2 } from 'lucide-react'
import StatusBadge from '../agents/StatusBadge'

function SecuritySettings({ settings, apiKeys, onToggle, onCreateKey, onRevokeKey }) {
  return (
    <section className="settings-card" aria-labelledby="security-title">
      <div className="section-heading"><div><h3 id="security-title">Security</h3><p>Demo controls for enterprise security posture and masked API keys.</p></div></div>
      <div className="security-grid">
        <article><span>Two-Factor Authentication</span><StatusBadge status={settings.twoFactor ? 'Enabled' : 'Disabled'} /><button className="ghost-button compact" type="button" onClick={() => onToggle('twoFactor')}>Toggle</button></article>
        <article><span>SSO</span><strong>{settings.sso}</strong></article>
        <article><span>Session Timeout</span><strong>{settings.sessionTimeout}</strong></article>
        <article><span>API Access</span><StatusBadge status={settings.apiAccess ? 'Enabled' : 'Disabled'} /><button className="ghost-button compact" type="button" onClick={() => onToggle('apiAccess')}>Toggle</button></article>
        <article><span>Audit Logging</span><StatusBadge status={settings.auditLogging ? 'Enabled' : 'Disabled'} /></article>
        <article><span>Data Retention</span><strong>{settings.retention}</strong></article>
      </div>
      <div className="api-keys"><div className="section-heading"><div><h3>API Keys</h3><p>Masked demo keys only. No real secrets are generated or stored.</p></div><button className="primary-button subtle" type="button" onClick={onCreateKey}><KeyRound size={16} aria-hidden="true" />Create Demo Key</button></div>{apiKeys.map((key) => <article key={key.id}><div><strong>{key.name}</strong><span>{key.token} / {key.created}</span></div><button className="ghost-button compact danger" type="button" onClick={() => onRevokeKey(key.id)}><Trash2 size={14} aria-hidden="true" />Revoke</button></article>)}</div>
    </section>
  )
}

export default SecuritySettings
