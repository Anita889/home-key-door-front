async function parseResponse(response) {
  const text = await response.text();
  let data = text;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const error = new Error(
      typeof data === "string"
        ? data
        : data?.message || data?.error || "Request failed"
    );
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
}

async function performFetch(apiBaseUrl, method, path, body, headers) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  return parseResponse(response);
}

async function refreshAccessToken(session) {
  if (!session.refreshToken) {
    throw new Error("Refresh token is missing");
  }

  return performFetch(
    session.apiBaseUrl,
    "GET",
    "/api/user/authentication/refreshToken",
    undefined,
    {
      "Content-Type": "application/json",
      "REFRESH-TOKEN": session.refreshToken
    }
  );
}

function buildHeaders(session, headers = {}) {
  const mergedHeaders = {
    "Content-Type": "application/json",
    ...headers
  };

  if (session.accessToken) {
    mergedHeaders.Authorization = session.accessToken;
  }

  return mergedHeaders;
}

export async function apiRequest({
  session,
  updateSession,
  clearSession,
  method,
  path,
  body,
  headers,
  allowRefresh = true
}) {
  try {
    return await performFetch(
      session.apiBaseUrl,
      method,
      path,
      body,
      buildHeaders(session, headers)
    );
  } catch (error) {
    if (
      error.status !== 401 ||
      !allowRefresh ||
      !session.refreshToken ||
      path === "/api/user/authentication/refreshToken"
    ) {
      throw error;
    }

    try {
      const refreshed = await refreshAccessToken(session);
      const nextAccessToken = refreshed.accessToken || "";

      updateSession({
        accessToken: nextAccessToken
      });

      return await performFetch(
        session.apiBaseUrl,
        method,
        path,
        body,
        buildHeaders(
          {
            ...session,
            accessToken: nextAccessToken
          },
          headers
        )
      );
    } catch (refreshError) {
      clearSession();
      throw refreshError;
    }
  }
}
