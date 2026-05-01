import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Card } from "../components/Card.jsx";
import { InputField } from "../components/InputField.jsx";
import { ResultPanel } from "../components/ResultPanel.jsx";
import { useRequestRunner } from "../hooks/useRequestRunner.js";
import { defaultRoute } from "../utils/roles.js";

export function AuthenticationPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { run, result } = useRequestRunner();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [passwordRequestEmail, setPasswordRequestEmail] = useState("");
  const [passwordCheck, setPasswordCheck] = useState({ email: "", key: "" });
  const [passwordReset, setPasswordReset] = useState({
    email: "",
    key: "",
    password: ""
  });

  return (
    <div className="auth-page">
      <section className="auth-showcase">
        <p className="eyebrow">Home Key Door</p>
        <h1>Sign in to the workspace that matches your role.</h1>
        <p className="auth-copy">
          Admins, home owners, and home users each get their own page after
          login. Authentication stays aligned with the current Spring backend.
        </p>

        <div className="auth-feature-list">
          <div className="auth-feature">
            <strong>Separate experiences</strong>
            <span>Each role opens its own dashboard instead of one shared console.</span>
          </div>
          <div className="auth-feature">
            <strong>JWT-based session</strong>
            <span>Access and refresh tokens still use the existing backend headers.</span>
          </div>
          <div className="auth-feature">
            <strong>Recovery tools included</strong>
            <span>Password reset utilities stay available on the sign-in screen.</span>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-head">
          <p className="eyebrow">Authentication</p>
          <h2>Welcome back</h2>
          <p>Sign in first, then the app routes you to the correct page automatically.</p>
        </div>

        <Card
          title="Login"
          subtitle="POST /api/user/authentication/login"
          description="Authenticate with a registered backend user and open the matching workspace automatically."
          actionLabel="Login"
          onSubmit={() =>
            run("Login", async () => {
              const data = await authApi.login(auth, loginForm);
              auth.applyAuthPayload(data);

              if (data.user) {
                navigate(defaultRoute(data.user));
              }

              return data;
            })
          }
        >
          <InputField
            label="Email"
            placeholder="name@example.com"
            helper="Use the same registered email the Spring backend expects."
            value={loginForm.email}
            onChange={(email) => setLoginForm((current) => ({ ...current, email }))}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            helper="The backend verifies this against its stored BCrypt password."
            value={loginForm.password}
            onChange={(password) =>
              setLoginForm((current) => ({ ...current, password }))
            }
          />
        </Card>

        <div className="auth-tools-grid">
          <Card
            title="Refresh Token"
            subtitle="GET /api/user/authentication/refreshToken"
            description="Request a new access token without logging in again."
            actionLabel="Refresh access token"
            onSubmit={() =>
              run("Refresh Token", async () => {
                const data = await authApi.refresh(auth);
                auth.updateSession({ accessToken: data.accessToken || "" });
                return data;
              })
            }
          />

          <Card
            title="Request Password Change"
            subtitle="GET /api/user/authentication/password/change?email="
            description="Generate a reset flow for a registered user email."
            actionLabel="Send request"
            onSubmit={() =>
              run("Request Password Change", () =>
                authApi.requestPasswordChange(auth, passwordRequestEmail)
              )
            }
          >
            <InputField
              label="Email"
              placeholder="name@example.com"
              helper="This calls the backend password-change request endpoint."
              value={passwordRequestEmail}
              onChange={setPasswordRequestEmail}
            />
          </Card>

          <Card
            title="Check Reset Key"
            subtitle="GET /api/user/authentication/password/check/{email}/{key}"
            description="Validate whether a reset key is still valid before submitting a new password."
            actionLabel="Check key"
            onSubmit={() =>
              run("Check Password Key", () =>
                authApi.checkPasswordKey(auth, passwordCheck.email, passwordCheck.key)
              )
            }
          >
            <InputField
              label="Email"
              placeholder="name@example.com"
              value={passwordCheck.email}
              onChange={(email) =>
                setPasswordCheck((current) => ({ ...current, email }))
              }
            />
            <InputField
              label="Key"
              placeholder="reset-token-or-uuid"
              helper="Paste the exact key issued by the backend."
              value={passwordCheck.key}
              onChange={(key) => setPasswordCheck((current) => ({ ...current, key }))}
            />
          </Card>

          <Card
            title="Reset Password"
            subtitle="PUT /api/user/authentication/password/change/{email}/{key}"
            description="Submit a new password after the key has been verified."
            actionLabel="Reset password"
            onSubmit={() =>
              run("Reset Password", () =>
                authApi.resetPassword(
                  auth,
                  passwordReset.email,
                  passwordReset.key,
                  passwordReset.password
                )
              )
            }
          >
            <InputField
              label="Email"
              placeholder="name@example.com"
              value={passwordReset.email}
              onChange={(email) =>
                setPasswordReset((current) => ({ ...current, email }))
              }
            />
            <InputField
              label="Key"
              placeholder="reset-token-or-uuid"
              value={passwordReset.key}
              onChange={(key) => setPasswordReset((current) => ({ ...current, key }))}
            />
            <InputField
              label="New password"
              type="password"
              placeholder="Choose a new password"
              helper="Use a password that matches your backend validation rules."
              value={passwordReset.password}
              onChange={(password) =>
                setPasswordReset((current) => ({ ...current, password }))
              }
            />
          </Card>
        </div>

        <ResultPanel result={result} />
      </section>
    </div>
  );
}
