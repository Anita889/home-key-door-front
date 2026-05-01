import { Link } from "react-router-dom";

export function UnauthorizedPage() {
  return (
    <section className="empty-state">
      <p className="eyebrow">Authorization</p>
      <h3>Current JWT role cannot access this route.</h3>
      <p className="empty-copy">
        Use a token with the required backend role, or go back to authentication.
      </p>
      <Link className="inline-link" to="/auth">
        Return to authentication
      </Link>
    </section>
  );
}
