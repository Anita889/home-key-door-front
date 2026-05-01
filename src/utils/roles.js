const ROLE_PRIORITY = ["ROLE_ADMIN", "ROLE_HOME_OWNER", "ROLE_HOME_USER"];

export function hasAnyRole(user, allowedRoles = []) {
  if (allowedRoles.length === 0) {
    return true;
  }

  const currentRoles = user?.roles?.map((role) => role.name) || [];
  return allowedRoles.some((role) => currentRoles.includes(role));
}

export function roleName(user) {
  const currentRoles = user?.roles?.map((role) => role.name) || [];
  const matchingRole = ROLE_PRIORITY.find((role) => currentRoles.includes(role));

  if (!matchingRole) {
    return "Guest";
  }

  return matchingRole.replace("ROLE_", "");
}

export function defaultRoute(user) {
  if (hasAnyRole(user, ["ROLE_ADMIN"])) {
    return "/admin";
  }

  if (hasAnyRole(user, ["ROLE_HOME_OWNER"])) {
    return "/owner";
  }

  if (hasAnyRole(user, ["ROLE_HOME_USER"])) {
    return "/home-user";
  }

  if (user) {
    return "/explorer";
  }

  return "/auth";
}
