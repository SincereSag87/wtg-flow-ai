export const datePresets = ['Today', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days']

const rangeScales = {
  Today: 0.08,
  'Last 7 Days': 0.28,
  'Last 30 Days': 1,
  'Last 90 Days': 2.7,
}

export const baseAnalytics = {
  kpis: [
    { label: 'Automated Tasks', value: 24892, suffix: '', trend: '+18.4%', positive: true },
    { label: 'Hours Saved', value: 1482, suffix: '', trend: '+12.7%', positive: true },
    { label: 'Estimated Savings', value: 184600, prefix: '$', suffix: '', trend: '+21.3%', positive: true },
    { label: 'Success Rate', value: 98.4, suffix: '%', trend: '+0.8%', positive: true },
    { label: 'Human Handoff Rate', value: 4.7, suffix: '%', trend: '-1.2%', positive: true },
    { label: 'Avg. Runtime', value: 5.8, suffix: 's', trend: '-0.6s', positive: true },
  ],
  performance: [
    { label: 'Week 1', runs: 4820, successful: 4742, failed: 78 },
    { label: 'Week 2', runs: 5510, successful: 5418, failed: 92 },
    { label: 'Week 3', runs: 6124, successful: 6026, failed: 98 },
    { label: 'Week 4', runs: 6948, successful: 6842, failed: 106 },
    { label: 'This Week', runs: 1490, successful: 1466, failed: 24 },
  ],
  impact: [
    { label: 'Time Saved', value: '1,482 hrs' },
    { label: 'Estimated Cost Savings', value: '$184,600' },
    { label: 'Manual Steps Avoided', value: '38,421' },
    { label: 'Human Handoffs Avoided', value: '4,218' },
    { label: 'Revenue Influenced', value: '$1.26M' },
  ],
  savingsTrend: [
    { label: 'W1', hours: 274 },
    { label: 'W2', hours: 318 },
    { label: 'W3', hours: 392 },
    { label: 'W4', hours: 421 },
    { label: 'Now', hours: 77 },
  ],
}

export const agentPerformance = [
  { agent: 'Invoice Processing Agent', tasks: 6824, successRate: 99.2, runtime: 5.9, handoffRate: 2.8, trend: '+9.4%' },
  { agent: 'Customer Support Agent', tasks: 6218, successRate: 98.9, runtime: 4.2, handoffRate: 3.1, trend: '+14.8%' },
  { agent: 'Lead Qualification Agent', tasks: 5021, successRate: 97.7, runtime: 5.1, handoffRate: 6.2, trend: '+7.6%' },
  { agent: 'Operations Analyst', tasks: 3810, successRate: 97.4, runtime: 8.5, handoffRate: 5.6, trend: '+11.1%' },
  { agent: 'Developer Assistant', tasks: 3019, successRate: 97.1, runtime: 9.2, handoffRate: 8.8, trend: '+5.2%' },
]

export const automationPerformance = [
  { automation: 'Customer Support Escalation', runs: 8420, successRate: 99.1, failures: 72, runtime: 4.8, impact: 96 },
  { automation: 'Invoice Processing', runs: 6311, successRate: 99.4, failures: 38, runtime: 6.2, impact: 94 },
  { automation: 'Lead Qualification', runs: 4898, successRate: 96.7, failures: 162, runtime: 5.1, impact: 87 },
  { automation: 'Security Incident Triage', runs: 2917, successRate: 91.8, failures: 239, runtime: 8.9, impact: 78 },
  { automation: 'Contract Review', runs: 2346, successRate: 97.6, failures: 56, runtime: 11.4, impact: 82 },
]

export const categoryPerformance = [
  { category: 'Customer Support', volume: 8420, successRate: 99.1, savings: '$58.2K', reviewRate: 3.2 },
  { category: 'Finance', volume: 6311, successRate: 99.4, savings: '$47.8K', reviewRate: 2.4 },
  { category: 'Sales', volume: 4898, successRate: 96.7, savings: '$31.6K', reviewRate: 6.8 },
  { category: 'Operations', volume: 3650, successRate: 97.6, savings: '$28.1K', reviewRate: 5.9 },
  { category: 'Development', volume: 1984, successRate: 97.1, savings: '$12.4K', reviewRate: 8.8 },
  { category: 'Security', volume: 1629, successRate: 91.8, savings: '$6.5K', reviewRate: 9.4 },
]

export const failureAnalytics = [
  { reason: 'API rate limit', count: 38, trend: '+6', affected: 'Security Incident Triage, Lead Qualification', percent: 31 },
  { reason: 'Timeout', count: 29, trend: '-4', affected: 'Contract Review, Invoice Processing', percent: 24 },
  { reason: 'Validation failure', count: 22, trend: '-8', affected: 'Content Approval', percent: 18 },
  { reason: 'Authentication error', count: 17, trend: '+2', affected: 'PostgreSQL sync', percent: 14 },
  { reason: 'Human review timeout', count: 16, trend: '-3', affected: 'Customer Support Escalation', percent: 13 },
]

export const getAnalyticsForRange = (range) => {
  const scale = rangeScales[range] ?? 1
  return {
    ...baseAnalytics,
    kpis: baseAnalytics.kpis.map((kpi) => ({
      ...kpi,
      value: kpi.suffix === '%' || kpi.suffix === 's' ? kpi.value : Math.round(kpi.value * scale),
    })),
    performance: baseAnalytics.performance.map((item) => ({
      ...item,
      runs: Math.round(item.runs * scale),
      successful: Math.round(item.successful * scale),
      failed: Math.max(1, Math.round(item.failed * scale)),
    })),
    savingsTrend: baseAnalytics.savingsTrend.map((item) => ({ ...item, hours: Math.round(item.hours * scale) })),
  }
}
