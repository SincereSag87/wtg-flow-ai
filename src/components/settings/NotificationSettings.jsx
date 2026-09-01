import { notificationChannels } from '../../data/settingsData'

function NotificationSettings({ matrix, quietHours, onToggle, onQuietChange }) {
  return (
    <section className="settings-card" aria-labelledby="notifications-title">
      <div className="section-heading"><div><h3 id="notifications-title">Notifications</h3><p>Choose how the workspace receives operational updates.</p></div></div>
      <div className="notification-matrix">{Object.entries(matrix).map(([category, channels]) => <article key={category}><strong>{category}</strong>{notificationChannels.map((channel) => <label key={channel}><input type="checkbox" checked={channels[channel]} onChange={() => onToggle(category, channel)} />{channel}</label>)}</article>)}</div>
      <div className="quiet-hours"><strong>Quiet Hours</strong><label><span>Start</span><input value={quietHours.start} onChange={(event) => onQuietChange('start', event.target.value)} /></label><label><span>End</span><input value={quietHours.end} onChange={(event) => onQuietChange('end', event.target.value)} /></label></div>
    </section>
  )
}

export default NotificationSettings
