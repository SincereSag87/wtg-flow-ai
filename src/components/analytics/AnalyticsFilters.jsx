import { Download, FileBarChart } from 'lucide-react'
import { datePresets } from '../../data/analyticsData'

function AnalyticsFilters({ range, onRangeChange, onExport, onCompare }) {
  return (
    <div className="analytics-controls" aria-label="Analytics controls">
      <label>
        <span>Date Range</span>
        <select value={range} onChange={(event) => onRangeChange(event.target.value)}>
          {datePresets.map((preset) => <option key={preset}>{preset}</option>)}
        </select>
      </label>
      <button className="ghost-button" type="button" onClick={() => onExport('CSV')}><Download size={16} aria-hidden="true" />Export Report</button>
      <button className="primary-button subtle" type="button" onClick={onCompare}><FileBarChart size={16} aria-hidden="true" />Compare Period</button>
    </div>
  )
}

export default AnalyticsFilters
