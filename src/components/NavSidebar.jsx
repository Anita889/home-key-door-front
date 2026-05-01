import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../config/navigation.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { defaultRoute, roleName } from "../utils/roles.js";

export function NavSidebar() {
  const auth = useAuth();
  const visibleItems = NAV_ITEMS.filter((item) => {
    if (item.to === "/auth") {
      return false;
    }

    if (item.public) {
      return true;
    }

    if (item.authenticated && !auth.isAuthenticated) {
      return false;
    }

    if (item.roles && !auth.hasRole(item.roles)) {
      return false;
    }

    return true;
  });

  return (
    <aside className="sidebar">
      <div className="brand">
        <p className="eyebrow">React Console</p>
        <h1>Home Key Door</h1>
        <p className="muted">
          A friendlier control panel for the current Spring backend.
        </p>
      </div>

      <label className="field">
        <span>API base URL</span>
        <input
          value={auth.session.apiBaseUrl}
          placeholder="http://localhost:8080"
          onChange={(event) => auth.setApiBaseUrl(event.target.value.trim())}
        />
        <small className="field-help field-help-inverse">
          Point this to the running backend environment you want to test.
        </small>
      </label>

      <div className="session-card">
        <p className="section-label">Session</p>
        <strong>{auth.user?.email || "Not logged in"}</strong>
        <p>{roleName(auth.user)}</p>
        <p className="token-state">
          Access token: {auth.session.accessToken ? "present" : "missing"}
        </p>
        <p className="token-state">
          Refresh token: {auth.session.refreshToken ? "present" : "missing"}
        </p>
        <p className="session-tip">
          Sign in once, then switch workspaces based on your current role.
        </p>
        <div className="session-actions">
          <button className="ghost" onClick={auth.clearSession}>
            Clear session
          </button>
          {auth.isAuthenticated ? (
            <NavLink className="ghost-link" to={defaultRoute(auth.user)}>
              Open workspace
            </NavLink>
          ) : null}
        </div>
      </div>

      <nav className="nav">
        <p className="section-label">Workspaces</p>
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
