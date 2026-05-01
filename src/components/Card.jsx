export function Card({
  title,
  subtitle,
  description,
  actionLabel,
  children,
  onSubmit
}) {
  return (
    <div className="card">
      <div className="card-head">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        {description ? <p className="card-description">{description}</p> : null}
      </div>
      <div className="card-body">{children}</div>
      <div className="card-actions">
        <button onClick={onSubmit}>{actionLabel}</button>
      </div>
    </div>
  );
}
