import { CheckCircle2, Circle, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { onboardingItems } from '../../data/settingsData'

function OnboardingPanel({ open, onClose, onNavigate }) {
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    previousFocusRef.current = document.activeElement
    window.setTimeout(() => closeRef.current?.focus(), 0)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  const completed = onboardingItems.filter((item) => item.done).length

  return (
    <section className="onboarding-panel" aria-labelledby="onboarding-title">
      <div className="section-heading"><div><h3 id="onboarding-title">Getting Started</h3><p>{completed} of {onboardingItems.length} completed</p></div><button className="icon-button" type="button" aria-label="Close onboarding checklist" onClick={onClose} ref={closeRef}><X size={18} aria-hidden="true" /></button></div>
      <div className="onboarding-progress"><span style={{ width: `${(completed / onboardingItems.length) * 100}%` }} /></div>
      <div className="onboarding-list">{onboardingItems.map((item) => <button type="button" onClick={() => { onNavigate(item.page); onClose() }} key={item.id}>{item.done ? <CheckCircle2 size={17} aria-hidden="true" /> : <Circle size={17} aria-hidden="true" />}<span>{item.label}</span></button>)}</div>
    </section>
  )
}

export default OnboardingPanel
