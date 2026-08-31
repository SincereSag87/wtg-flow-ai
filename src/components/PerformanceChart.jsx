import { performance } from '../data/dashboardData'

const points = performance.map((item, index) => {
  const x = 8 + index * 14
  const y = 104 - item.value
  return `${x},${y}`
})

function PerformanceChart() {
  return (
    <div className="chart-wrap">
      <svg className="performance-chart" viewBox="0 0 100 56" role="img" aria-label="Automation activity over the last seven days">
        <polyline className="chart-grid" points="8,42 92,42" />
        <polyline className="chart-grid" points="8,28 92,28" />
        <polyline className="chart-grid" points="8,14 92,14" />
        <polyline className="chart-area" points={`8,56 ${points.join(' ')} 92,56`} />
        <polyline className="chart-line" points={points.join(' ')} />
        {performance.map((item, index) => {
          const x = 8 + index * 14
          const y = 104 - item.value

          return <circle className="chart-point" cx={x} cy={y} r="1.6" key={item.day} />
        })}
      </svg>
      <div className="chart-days" aria-hidden="true">
        {performance.map((item) => (
          <span key={item.day}>{item.day}</span>
        ))}
      </div>
    </div>
  )
}

export default PerformanceChart
