export const STORAGE_KEY = "home-key-door-console";

export const initialSession = {
  apiBaseUrl: "http://localhost:8080",
  accessToken: "",
  refreshToken: "",
  user: null
};

export function readStoredSession() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) {
      return initialSession;
    }

    return {
      ...initialSession,
      ...JSON.parse(value)
    };
  } catch {
    return initialSession;
  }
}

export function writeStoredSession(session) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}
