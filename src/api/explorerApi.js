import { apiRequest } from "./httpClient.js";

export const explorerApi = {
  getHome(auth, homeId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/homes/${homeId}`
    });
  },

  getHomesByOwner(auth, ownerId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/homes?ownerId=${ownerId}`
    });
  },

  getKey(auth, keyId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/keys/${keyId}`
    });
  },

  getKeysByOwner(auth, ownerId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/keys?ownerId=${ownerId}`
    });
  },

  getKeysByHomeUser(auth, homeUserId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/keys?homeUserId=${homeUserId}`
    });
  }
};
