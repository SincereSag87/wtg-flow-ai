import { useState } from 'react'
import AgentPerformanceTable from '../components/analytics/AgentPerformanceTable'
import AnalyticsFilters from '../components/analytics/AnalyticsFilters'
import AnalyticsMetrics from '../components/analytics/AnalyticsMetrics'
import AutomationPerformanceChart from '../components/analytics/AutomationPerformanceChart'
import AutomationPerformanceTable from '../components/analytics/AutomationPerformanceTable'
import BusinessImpact from '../components/analytics/BusinessImpact'
import CategoryPerformance from '../components/analytics/CategoryPerformance'
import FailureAnalytics from '../components/analytics/FailureAnalytics'
import TimeSavingsTrend from '../components/analytics/TimeSavingsTrend'
import { agentPerformance, automationPerformance, categoryPerformance, failureAnalytics, getAnalyticsForRange } from '../data/analyticsData'

function Analytics({ onNavigate }) {
  const [range, setRange] = useState('Last 30 Days')
  const [agentSort, setAgentSort] = useState('Tasks')
  const [feedback, setFeedback] = useState('')
  const analytics = getAnalyticsForRange(range)

  const showFeedback = (message) => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 2600)
  }

  return (
    <div className="analytics-page">
      <section className="ops-hero analytics-hero" aria-labelledby="analytics-title">
        <div>
          <div className="status-indicator"><span aria-hidden="true" />Reporting synced 2 minutes ago</div>
          <h1 id="analytics-title">Analytics</h1>
          <p>Measure automation performance, agent efficiency, and business impact across your workspace.</p>
        </div>
        <div className="analytics-action-stack">
          {feedback ? <div className="action-feedback inline" role="status">{feedback}</div> : null}
          <AnalyticsFilters
            range={range}
            onRangeChange={setRange}
            onExport={(type) => showFeedback(`${type} analytics report prepared for export.`)}
            onCompare={() => showFeedback('Comparison period prepared against previous range.')}
          />
        </div>
      </section>

      <AnalyticsMetrics metrics={analytics.kpis} />

      <div className="analytics-grid">
        <AutomationPerformanceChart data={analytics.performance} range={range} />
        <BusinessImpact impact={analytics.impact} />
        <AgentPerformanceTable rows={agentPerformance} sort={agentSort} onSort={setAgentSort} />
        <AutomationPerformanceTable rows={automationPerformance} />
        <CategoryPerformance rows={categoryPerformance} />
        <FailureAnalytics failures={failureAnalytics} onViewActivity={() => onNavigate('Activity')} />
        <TimeSavingsTrend data={analytics.savingsTrend} />
      </div>
    </div>
  )
}

export default Analytics
