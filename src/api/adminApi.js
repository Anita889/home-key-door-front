import { apiRequest } from "./httpClient.js";

export const adminApi = {
  dashboard(auth, adminId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/user/admin/${adminId}/dashboard`
    });
  },

  listOwners(auth, adminId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/user/admin/${adminId}/owners`
    });
  },

  listHomeUsers(auth, adminId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "GET",
      path: `/api/user/admin/${adminId}/homeUsers`
    });
  },

  createOwner(auth, adminId, payload) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "POST",
      path: `/api/user/admin/${adminId}/owners`,
      body: payload
    });
  },

  updateOwner(auth, ownerId, payload) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "PUT",
      path: `/api/user/admin/owners/${ownerId}`,
      body: payload
    });
  },

  deleteOwner(auth, ownerId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "DELETE",
      path: `/api/user/admin/owners/${ownerId}`
    });
  },

  createHomeUser(auth, adminId, payload) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "POST",
      path: `/api/user/admin/${adminId}/homeUsers`,
      body: payload
    });
  },

  updateHomeUser(auth, homeUserId, payload) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "PUT",
      path: `/api/user/admin/homeUsers/${homeUserId}`,
      body: payload
    });
  },

  deleteHomeUser(auth, homeUserId) {
    return apiRequest({
      session: auth.session,
      updateSession: auth.updateSession,
      clearSession: auth.clearSession,
      method: "DELETE",
      path: `/api/user/admin/homeUsers/${homeUserId}`
    });
  }
};
