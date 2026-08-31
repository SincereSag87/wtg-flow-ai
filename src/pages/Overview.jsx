import AgentList from '../components/AgentList'
import BusinessImpact from '../components/BusinessImpact'
import MetricCard from '../components/MetricCard'
import PerformanceChart from '../components/PerformanceChart'
import RecentRuns from '../components/RecentRuns'
import SectionCard from '../components/SectionCard'
import WorkflowDiagram from '../components/WorkflowDiagram'
import { kpis } from '../data/dashboardData'

function Overview() {
  return (
    <div className="overview-page">
      <section className="hero-panel" aria-labelledby="dashboard-title">
        <div>
          <div className="status-indicator">
            <span aria-hidden="true" />
            All systems operational
          </div>
          <h1 id="dashboard-title">WTG Flow AI</h1>
          <p>AI automation built for real businesses.</p>
        </div>
        <div className="hero-stats" aria-label="Live automation summary">
          <span>Live workflows</span>
          <strong>38</strong>
          <small>Across support, finance, sales, and operations</small>
        </div>
      </section>

      <section className="kpi-grid" aria-label="Primary automation metrics">
        {kpis.map((metric) => (
          <MetricCard metric={metric} key={metric.label} />
        ))}
      </section>

      <div className="dashboard-grid">
        <SectionCard
          title="Agent Workflow"
          description="A governed automation path from business event to completed outcome."
          className="workflow-section"
        >
          <WorkflowDiagram />
        </SectionCard>

        <SectionCard title="Automation Performance" description="Activity volume over the last 7 days.">
          <PerformanceChart />
        </SectionCard>

        <SectionCard title="Active Agents" description="Production-ready agents currently handling operational work.">
          <AgentList />
        </SectionCard>

        <SectionCard title="Business Impact" description="Measured value from WTG Flow AI automation.">
          <BusinessImpact />
        </SectionCard>

        <SectionCard title="Recent Runs" description="Latest workflow executions across the workspace." className="runs-section">
          <RecentRuns />
        </SectionCard>
      </div>
    </div>
  )
}

export default Overview
