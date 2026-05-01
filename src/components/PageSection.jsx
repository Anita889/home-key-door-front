export function PageSection({ eyebrow, title, description, children }) {
  return (
    <section className="page-section">
      <div className="page-section-head">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
