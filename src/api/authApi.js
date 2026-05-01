import { apiRequest } from "./httpClient.js";

export const authApi = {
  login(auth, payload) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "POST",
      path: "/api/user/authentication/login",
      body: payload,
      allowRefresh: false
    });
  },

  refresh(auth) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: "/api/user/authentication/refreshToken",
      headers: {
        "REFRESH-TOKEN": auth.session.refreshToken || ""
      },
      allowRefresh: false
    });
  },

  requestPasswordChange(auth, email) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/user/authentication/password/change?email=${encodeURIComponent(email)}`,
      allowRefresh: false
    });
  },

  checkPasswordKey(auth, email, key) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/user/authentication/password/check/${encodeURIComponent(email)}/${encodeURIComponent(key)}`,
      allowRefresh: false
    });
  },

  resetPassword(auth, email, key, password) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "PUT",
      path: `/api/user/authentication/password/change/${encodeURIComponent(email)}/${encodeURIComponent(key)}`,
      body: { password },
      allowRefresh: false
    });
  }
};
