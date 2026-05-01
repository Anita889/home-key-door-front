import { StatusPill } from "./StatusPill.jsx";

export function PageHero({ title, description, highlights = [], busy }) {
  return (
    <header className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Backend Mirror</p>
        <h2>{title}</h2>
        <p className="muted">{description}</p>
        {highlights.length > 0 ? (
          <div className="hero-highlights">
            {highlights.map((item) => (
              <span key={item} className="hero-highlight">
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <StatusPill busy={busy} />
    </header>
  );
}
