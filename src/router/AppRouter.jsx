import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { ProtectedRoute } from "../auth/ProtectedRoute.jsx";
import { AppShell } from "../components/AppShell.jsx";
import { AuthenticationPage } from "../pages/AuthenticationPage.jsx";
import { AdminPage } from "../pages/AdminPage.jsx";
import { OwnerPage } from "../pages/OwnerPage.jsx";
import { HomeUserPage } from "../pages/HomeUserPage.jsx";
import { ExplorerPage } from "../pages/ExplorerPage.jsx";
import { UnauthorizedPage } from "../pages/UnauthorizedPage.jsx";
import { defaultRoute } from "../utils/roles.js";

function IndexRedirect() {
  const auth = useAuth();

  return <Navigate to={defaultRoute(auth.user)} replace />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<IndexRedirect />} />
        <Route path="/auth" element={<AuthenticationPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/explorer" element={<ExplorerPage />} />

            <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["ROLE_HOME_OWNER"]} />}
            >
              <Route path="/owner" element={<OwnerPage />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["ROLE_HOME_USER"]} />}
            >
              <Route path="/home-user" element={<HomeUserPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
