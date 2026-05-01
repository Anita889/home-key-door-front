export function ResultPanel({ result }) {
  const isError = Boolean(result?.data?.error);

  return (
    <section className="result-panel">
      <div className="result-head">
        <p className="eyebrow">Latest Response</p>
        <h3>{result.title}</h3>
        <span className={isError ? "result-badge error" : "result-badge success"}>
          {isError ? "Error" : "Response"}
        </span>
      </div>
      <pre>{JSON.stringify(result.data, null, 2)}</pre>
    </section>
  );
}
