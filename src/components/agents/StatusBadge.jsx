function StatusBadge({ status }) {
  return <span className={`status status-${status.toLowerCase().replaceAll(' ', '-')}`}>{status}</span>
}

export default StatusBadge
