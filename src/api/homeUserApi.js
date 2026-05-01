import { apiRequest } from "./httpClient.js";

export const homeUserApi = {
  listKeys(auth, homeUserId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/user/home-user/${homeUserId}/keys`
    });
  },

  takeKey(auth, homeUserId, keyId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "POST",
      path: `/api/user/home-user/${homeUserId}/keys/${keyId}/take`,
      body: {}
    });
  },

  returnKey(auth, homeUserId, keyId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "POST",
      path: `/api/user/home-user/${homeUserId}/keys/${keyId}/return`,
      body: {}
    });
  },

  reportLost(auth, homeUserId, keyId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "POST",
      path: `/api/user/home-user/${homeUserId}/keys/${keyId}/report-lost`,
      body: {}
    });
  }
};
