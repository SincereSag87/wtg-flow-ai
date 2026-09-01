function SettingsTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="settings-tabs" role="tablist" aria-label="Settings sections">
      {tabs.map((tab) => (
        <button className={activeTab === tab ? 'active' : ''} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => onChange(tab)} key={tab}>
          {tab}
        </button>
      ))}
    </div>
  )
}

export default SettingsTabs
