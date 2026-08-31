function SectionCard({ title, description, children, className = '', action }) {
  return (
    <section className={`section-card ${className}`} aria-labelledby={`${title.replaceAll(' ', '-').toLowerCase()}-title`}>
      <div className="section-heading">
        <div>
          <h3 id={`${title.replaceAll(' ', '-').toLowerCase()}-title`}>{title}</h3>
          {description ? <p>{description}</p> : null}
        </div>
        {action ? <div className="section-action">{action}</div> : null}
      </div>
      {children}
    </section>
  )
}

export default SectionCard
