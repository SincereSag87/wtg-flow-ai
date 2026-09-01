import { Activity, BarChart3, Bot, Cable, LayoutDashboard, Plus, Search, Settings, Workflow, X, Zap } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const actions = [
  { id: 'overview', label: 'Overview', group: 'Navigate', page: 'Overview', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Agents', group: 'Navigate', page: 'AI Agents', icon: Bot },
  { id: 'builder', label: 'Workflow Builder', group: 'Navigate', page: 'Workflow Builder', icon: Workflow },
  { id: 'automations', label: 'Automations', group: 'Navigate', page: 'Automations', icon: Zap },
  { id: 'integrations', label: 'Integrations', group: 'Navigate', page: 'Integrations', icon: Cable },
  { id: 'analytics', label: 'Analytics', group: 'Navigate', page: 'Analytics', icon: BarChart3 },
  { id: 'activity', label: 'Activity', group: 'Navigate', page: 'Activity', icon: Activity },
  { id: 'settings', label: 'Settings', group: 'Navigate', page: 'Settings', icon: Settings },
  { id: 'new-agent', label: 'New Agent', group: 'Create', page: 'AI Agents', icon: Plus },
  { id: 'new-workflow', label: 'New Workflow', group: 'Create', page: 'Workflow Builder', icon: Plus },
  { id: 'new-automation', label: 'New Automation', group: 'Create', page: 'Automations', icon: Plus },
  { id: 'connect-integration', label: 'Connect Integration', group: 'Create', page: 'Integrations', icon: Plus },
]

function CommandMenu({ open, onClose, onNavigate, onFeedback }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const previousFocusRef = useRef(null)
  const filtered = useMemo(() => actions.filter((action) => `${action.group} ${action.label}`.toLowerCase().includes(query.toLowerCase())), [query])

  useEffect(() => {
    if (!open) return undefined
    previousFocusRef.current = document.activeElement
    window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => {
      previousFocusRef.current?.focus?.()
    }
  }, [open])

  if (!open) return null

  const runAction = (action) => {
    onNavigate(action.page)
    if (action.group === 'Create') onFeedback(`${action.label} intent opened in ${action.page}.`)
    onClose()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') onClose()
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => Math.min(current + 1, Math.max(filtered.length - 1, 0)))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => Math.max(current - 1, 0))
    }
    if (event.key === 'Enter' && filtered[activeIndex]) {
      event.preventDefault()
      runAction(filtered[activeIndex])
    }
  }

  return (
    <div className="drawer-backdrop command-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="command-menu" role="dialog" aria-modal="true" aria-labelledby="command-title" onMouseDown={(event) => event.stopPropagation()} onKeyDown={handleKeyDown}>
        <header><Search size={18} aria-hidden="true" /><h2 id="command-title" className="sr-only">Command Menu</h2><input ref={inputRef} value={query} placeholder="Search or jump to..." onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }} /><button className="icon-button" type="button" aria-label="Close command menu" onClick={onClose}><X size={18} aria-hidden="true" /></button></header>
        <div className="command-list" role="listbox" aria-label="Available commands">{filtered.length ? filtered.map((action, index) => { const Icon = action.icon; return <button className={index === activeIndex ? 'active' : ''} type="button" role="option" aria-selected={index === activeIndex} onMouseEnter={() => setActiveIndex(index)} onClick={() => runAction(action)} key={action.id}><Icon size={17} aria-hidden="true" /><span><strong>{action.label}</strong><small>{action.group}</small></span></button> }) : <p>No commands match this search.</p>}</div>
      </section>
    </div>
  )
}

export default CommandMenu
