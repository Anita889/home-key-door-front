import { apiRequest } from "./httpClient.js";

export const ownerApi = {
  listHomes(auth, ownerId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/user/owner/${ownerId}/homes`
    });
  },

  createHome(auth, ownerId, name) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "POST",
      path: `/api/user/owner/${ownerId}/homes`,
      body: { name }
    });
  },

  grantAdminAccess(auth, ownerId, adminId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "POST",
      path: `/api/user/owner/${ownerId}/admins/${adminId}/access`,
      body: {}
    });
  },

  listKeys(auth, ownerId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/user/owner/${ownerId}/keys`
    });
  },

  createKey(auth, ownerId, homeId, code) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "POST",
      path: `/api/user/owner/${ownerId}/homes/${homeId}/keys`,
      body: { code }
    });
  }
};
