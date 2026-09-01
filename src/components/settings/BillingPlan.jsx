import { plans, usageStats } from '../../data/settingsData'

function BillingPlan({ onFeedback }) {
  return (
    <section className="settings-card plan-card" aria-labelledby="billing-title">
      <div className="section-heading"><div><h3 id="billing-title">Billing / Plan</h3><p>Portfolio-only plan and usage display. No payment flow is implemented.</p></div></div>
      <div className="current-plan"><span>Current Plan</span><strong>Scale</strong><small>$249 / month</small></div>
      <div className="usage-list">{usageStats.map(([label, used, total, percent]) => <article key={label}><div><strong>{label}</strong><span>{used} / {total}</span></div><div className="category-bar"><span style={{ width: `${percent}%` }} /></div></article>)}</div>
      <div className="plan-options">{plans.map((plan) => <button className={plan === 'Scale' ? 'active' : ''} type="button" onClick={() => onFeedback(`${plan} plan selected for comparison`)} key={plan}>{plan}</button>)}</div>
      <div className="detail-actions"><button className="ghost-button" type="button" onClick={() => onFeedback('Change plan flow prepared')}>Change Plan</button><button className="ghost-button" type="button" onClick={() => onFeedback('Sales contact request prepared')}>Contact Sales</button><button className="primary-button subtle" type="button" onClick={() => onFeedback('Usage details opened')}>View Usage</button></div>
    </section>
  )
}

export default BillingPlan
