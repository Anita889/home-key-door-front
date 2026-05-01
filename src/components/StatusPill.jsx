export function StatusPill({ busy }) {
  return (
    <div className={busy ? "status-pill busy" : "status-pill"}>
      <span className="dot" />
      {busy ? "Request in flight" : "Idle"}
    </div>
  );
}
