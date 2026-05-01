import { createContext, startTransition, useContext, useEffect, useState } from "react";
import {
  initialSession,
  readStoredSession,
  writeStoredSession
} from "./auth-storage.js";
import { hasAnyRole } from "../utils/roles.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  useEffect(() => {
    writeStoredSession(session);
  }, [session]);

  const updateSession = (patch) => {
    startTransition(() => {
      setSession((current) => ({
        ...current,
        ...patch
      }));
    });
  };

  const setApiBaseUrl = (apiBaseUrl) => {
    updateSession({ apiBaseUrl });
  };

  const applyAuthPayload = (payload) => {
    updateSession({
      accessToken: payload.accessToken || "",
      refreshToken: payload.refreshToken || session.refreshToken || "",
      user: payload.user || null
    });
  };

  const clearSession = () => {
    setSession((current) => ({
      ...initialSession,
      apiBaseUrl: current.apiBaseUrl
    }));
  };

  const value = {
    session,
    user: session.user,
    isAuthenticated: Boolean(session.accessToken && session.user),
    updateSession,
    setApiBaseUrl,
    applyAuthPayload,
    clearSession,
    hasRole: (roles) => hasAnyRole(session.user, roles)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
