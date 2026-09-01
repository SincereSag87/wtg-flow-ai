function CategoryPerformance({ rows }) {
  const max = Math.max(...rows.map((row) => row.volume))
  return (
    <section className="analytics-card category-performance" aria-labelledby="category-performance-title">
      <div className="section-heading"><div><h3 id="category-performance-title">Performance by Category</h3><p>Run volume, success, savings, and review rate.</p></div></div>
      <div className="category-bars">{rows.map((row) => <article key={row.category}><div><strong>{row.category}</strong><span>{row.volume.toLocaleString()} runs / {row.successRate}% success</span></div><div className="category-bar"><span style={{ width: `${(row.volume / max) * 100}%` }} /></div><small>{row.savings} saved / {row.reviewRate}% review rate</small></article>)}</div>
    </section>
  )
}

export default CategoryPerformance
