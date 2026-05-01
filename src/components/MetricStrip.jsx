export function MetricStrip({ items }) {
  return (
    <section className="metric-strip">
      {items.map((item) => (
        <article key={item.label} className="metric-card">
          <p className="metric-label">{item.label}</p>
          <strong className="metric-value">{item.value}</strong>
          <p className="metric-note">{item.note}</p>
        </article>
      ))}
    </section>
  );
}
