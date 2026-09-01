function TestRunPanel({ workflow, testRun }) {
  return (
    <section className="test-run-panel" aria-labelledby="test-run-title">
      <div className="panel-title horizontal">
        <div>
          <h2 id="test-run-title">Test Run</h2>
          <p>{testRun.running ? `Elapsed ${testRun.elapsed.toFixed(1)}s` : 'Execution log for the latest simulation.'}</p>
        </div>
        <span className={`status status-${testRun.running ? 'running' : workflow.lastTest.status.toLowerCase()}`}>
          {testRun.running ? 'Running' : workflow.lastTest.status}
        </span>
      </div>
      <ol className="execution-log">
        {(testRun.log.length ? testRun.log : ['Ready to run a test execution.']).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  )
}

export default TestRunPanel
