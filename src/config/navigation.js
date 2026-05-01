export const NAV_ITEMS = [
  { to: "/auth", label: "Authentication", public: true },
  { to: "/admin", label: "Admin", authenticated: true, roles: ["ROLE_ADMIN"] },
  {
    to: "/owner",
    label: "Home Owner",
    authenticated: true,
    roles: ["ROLE_HOME_OWNER"]
  },
  {
    to: "/home-user",
    label: "Home User",
    authenticated: true,
    roles: ["ROLE_HOME_USER"]
  },
  { to: "/explorer", label: "API Explorer", authenticated: true }
];

export const ROUTE_META = {
  "/auth": {
    title: "Authenticate and manage JWT sessions",
    description:
      "Login, refresh tokens, and use the password reset endpoints exposed by the Spring auth controller.",
    highlights: [
      "Start here before opening protected workspaces.",
      "Your JWT tokens are stored locally in this browser.",
      "Use refresh when the backend access token expires."
    ]
  },
  "/admin": {
    title: "Admin workspace",
    description:
      "Manage owners and home users through the guarded admin endpoints.",
    highlights: [
      "Use one admin ID consistently across dashboard and list actions.",
      "Owner and home-user forms follow backend DTO field names exactly.",
      "Delete actions call the live backend immediately."
    ]
  },
  "/owner": {
    title: "Home owner workspace",
    description:
      "Create homes, issue keys, and grant admin access using the owner API.",
    highlights: [
      "Create a home first, then create keys inside that home.",
      "Granting admin access links an owner to an existing admin.",
      "Owner key lists show who currently holds each key."
    ]
  },
  "/home-user": {
    title: "Home user workspace",
    description:
      "Take, return, and report lost keys against the current home-user backend contract.",
    highlights: [
      "Keys can be taken only when they are available.",
      "Return and report-lost actions require the current key holder.",
      "Use the key list first if you need to confirm IDs."
    ]
  },
  "/explorer": {
    title: "Explorer workspace",
    description:
      "Read homes and keys directly from the shared authenticated API endpoints.",
    highlights: [
      "Use this page for quick lookups without changing data.",
      "Owner and home-user filters map directly to backend query params.",
      "Good for verifying IDs before write operations."
    ]
  },
  "/unauthorized": {
    title: "Authorization required",
    description:
      "This route is visible only when the current JWT role does not satisfy the page guard.",
    highlights: [
      "Sign in with a different role if you need access.",
      "Role checks use backend role names, not frontend aliases."
    ]
  },
  default: {
    title: "Home Key Door",
    description:
      "Frontend scopes are now separated by route, auth state, and backend service domain.",
    highlights: [
      "Choose a workspace from the left navigation.",
      "Results appear in the response panel below the forms."
    ]
  }
};
