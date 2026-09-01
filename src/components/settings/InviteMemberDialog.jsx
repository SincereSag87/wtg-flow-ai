import { UserPlus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { teamRoles } from '../../data/settingsData'

function InviteMemberDialog({ open, onClose, onInvite }) {
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Viewer')

  useEffect(() => {
    if (!open) return undefined
    previousFocusRef.current = document.activeElement
    closeRef.current?.focus()
    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="drawer-backdrop publish-backdrop" role="presentation" onMouseDown={onClose}>
      <form className="publish-dialog" role="dialog" aria-modal="true" aria-labelledby="invite-title" onMouseDown={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); onInvite(email, role); setEmail(''); setRole('Viewer') }}>
        <header className="detail-header compact"><div><span className="dialog-kicker">Demo invite only</span><h2 id="invite-title">Invite Member</h2></div><button className="icon-button" type="button" aria-label="Close invite dialog" onClick={onClose} ref={closeRef}><X size={18} aria-hidden="true" /></button></header>
        <div className="form-grid"><label><span>Email</span><input required type="email" value={email} placeholder="teammate@company.com" onChange={(event) => setEmail(event.target.value)} /></label><label><span>Role</span><select value={role} onChange={(event) => setRole(event.target.value)}>{teamRoles.map((item) => <option key={item}>{item}</option>)}</select></label></div>
        <footer className="dialog-actions"><button className="ghost-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit"><UserPlus size={16} aria-hidden="true" />Invite Member</button></footer>
      </form>
    </div>
  )
}

export default InviteMemberDialog
