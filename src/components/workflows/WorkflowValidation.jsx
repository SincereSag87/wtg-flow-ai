function WorkflowValidation({ validation, feedback }) {
  if (!validation && !feedback) {
    return null
  }

  const tone = validation?.type ?? 'info'
  const messages = validation?.messages ?? [feedback]

  return (
    <section className={`workflow-feedback feedback-${tone}`} role="status" aria-live="polite">
      <strong>{validation?.title ?? 'Workflow update'}</strong>
      <ul>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </section>
  )
}

export default WorkflowValidation
