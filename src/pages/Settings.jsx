import { CheckCircle2, Save } from 'lucide-react'
import { useMemo, useState } from 'react'
import AiDefaults from '../components/settings/AiDefaults'
import BillingPlan from '../components/settings/BillingPlan'
import GeneralSettings from '../components/settings/GeneralSettings'
import InviteMemberDialog from '../components/settings/InviteMemberDialog'
import NotificationSettings from '../components/settings/NotificationSettings'
import SecuritySettings from '../components/settings/SecuritySettings'
import SettingsTabs from '../components/settings/SettingsTabs'
import TeamRoles from '../components/settings/TeamRoles'
import {
  aiDefaults,
  generalDefaults,
  initialApiKeys,
  initialTeamMembers,
  notificationCategories,
  notificationChannels,
  securityDefaults,
  settingsTabs,
} from '../data/settingsData'

const createNotificationMatrix = () =>
  Object.fromEntries(
    notificationCategories.map((category) => [
      category,
      Object.fromEntries(notificationChannels.map((channel) => [channel, channel !== 'Slack' || !category.includes('Billing')])),
    ]),
  )

function Settings({ onFeedback }) {
  const [activeTab, setActiveTab] = useState(settingsTabs[0])
  const [generalSettings, setGeneralSettings] = useState(generalDefaults)
  const [members, setMembers] = useState(initialTeamMembers)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [notifications, setNotifications] = useState(createNotificationMatrix)
  const [quietHours, setQuietHours] = useState({ start: '10:00 PM', end: '7:00 AM' })
  const [aiSettings, setAiSettings] = useState(aiDefaults)
  const [securitySettings, setSecuritySettings] = useState(securityDefaults)
  const [apiKeys, setApiKeys] = useState(initialApiKeys)
  const [localMessage, setLocalMessage] = useState('Settings are stored locally for this demo.')

  const statusCopy = useMemo(() => `${members.length} team members / ${apiKeys.length} demo keys`, [members.length, apiKeys.length])

  const showFeedback = (message) => {
    setLocalMessage(message)
    onFeedback?.(message)
  }

  const updateGeneral = (field, value) => setGeneralSettings((current) => ({ ...current, [field]: value }))
  const updateAi = (field, value) => setAiSettings((current) => ({ ...current, [field]: value }))
  const toggleSecurity = (field) => setSecuritySettings((current) => ({ ...current, [field]: !current[field] }))

  const toggleNotification = (category, channel) => {
    setNotifications((current) => ({
      ...current,
      [category]: {
        ...current[category],
        [channel]: !current[category][channel],
      },
    }))
  }

  const inviteMember = (email, role) => {
    const name = email.split('@')[0].split(/[._-]/).filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join(' ') || 'Invited Member'
    setMembers((current) => [{ id: `member-${Date.now()}`, name, email, role, status: 'Invited' }, ...current])
    setInviteOpen(false)
    showFeedback(`Invite prepared for ${email}.`)
  }

  const createDemoKey = () => {
    setApiKeys((current) => [
      { id: `key-${Date.now()}`, name: 'New Demo Key', token: 'wtg_demo_********7X4R', created: 'Sep 1, 2026' },
      ...current,
    ])
    showFeedback('Demo API key created locally.')
  }

  const renderActiveSection = () => {
    if (activeTab === 'General') return <GeneralSettings settings={generalSettings} onChange={updateGeneral} />
    if (activeTab === 'Team & Roles') return <TeamRoles members={members} onInvite={() => setInviteOpen(true)} onRemove={(id) => { setMembers((current) => current.filter((member) => member.id !== id)); showFeedback('Team member removed locally.') }} onRoleChange={(id, role) => setMembers((current) => current.map((member) => member.id === id ? { ...member, role } : member))} />
    if (activeTab === 'Notifications') return <NotificationSettings matrix={notifications} quietHours={quietHours} onToggle={toggleNotification} onQuietChange={(field, value) => setQuietHours((current) => ({ ...current, [field]: value }))} />
    if (activeTab === 'AI Defaults') return <AiDefaults settings={aiSettings} onChange={updateAi} />
    if (activeTab === 'Security') return <SecuritySettings settings={securitySettings} apiKeys={apiKeys} onToggle={toggleSecurity} onCreateKey={createDemoKey} onRevokeKey={(id) => { setApiKeys((current) => current.filter((key) => key.id !== id)); showFeedback('Demo key revoked locally.') }} />
    return <BillingPlan onFeedback={showFeedback} />
  }

  return (
    <section className="settings-page" aria-labelledby="settings-title">
      <div className="settings-hero">
        <div>
          <p className="eyebrow">Workspace controls</p>
          <h1 id="settings-title">Settings</h1>
          <p>Manage workspace preferences, team access, AI defaults, security posture, and portfolio-only billing controls.</p>
        </div>
        <div className="settings-hero-actions">
          <div className="status-indicator"><span aria-hidden="true" />{statusCopy}</div>
          <button className="primary-button" type="button" onClick={() => showFeedback('Settings saved locally.')}><Save size={16} aria-hidden="true" />Save Changes</button>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsTabs tabs={settingsTabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="settings-content" role="tabpanel" aria-label={activeTab}>
          {renderActiveSection()}
          <div className="settings-feedback" role="status" aria-live="polite"><CheckCircle2 size={16} aria-hidden="true" />{localMessage}</div>
        </div>
      </div>

      <InviteMemberDialog open={inviteOpen} onClose={() => setInviteOpen(false)} onInvite={inviteMember} />
    </section>
  )
}

export default Settings
