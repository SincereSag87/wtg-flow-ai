import { Trash2, UserPlus } from 'lucide-react'
import StatusBadge from '../agents/StatusBadge'
import { rolePermissions, teamRoles } from '../../data/settingsData'

function TeamRoles({ members, onRoleChange, onRemove, onInvite }) {
  return (
    <section className="settings-card" aria-labelledby="team-title">
      <div className="section-heading"><div><h3 id="team-title">Team & Roles</h3><p>Manage fictional demo users and workspace permissions.</p></div><button className="primary-button subtle" type="button" onClick={onInvite}><UserPlus size={16} aria-hidden="true" />Invite Member</button></div>
      <div className="runs-table-wrap"><table className="runs-table compact-table"><thead><tr><th>Member</th><th>Role</th><th>Status</th><th>Action</th></tr></thead><tbody>{members.map((member) => <tr key={member.id}><td><strong>{member.name}</strong><br /><span>{member.email}</span></td><td><select value={member.role} onChange={(event) => onRoleChange(member.id, event.target.value)} aria-label={`Change role for ${member.name}`}>{teamRoles.map((role) => <option key={role}>{role}</option>)}</select></td><td><StatusBadge status={member.status} /></td><td><button className="ghost-button compact danger" type="button" onClick={() => onRemove(member.id)}><Trash2 size={14} aria-hidden="true" />Remove</button></td></tr>)}</tbody></table></div>
      <div className="permissions-grid">{rolePermissions.map(([role, description]) => <article key={role}><strong>{role}</strong><span>{description}</span></article>)}</div>
    </section>
  )
}

export default TeamRoles
