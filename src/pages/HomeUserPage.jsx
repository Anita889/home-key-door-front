import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { homeUserApi } from "../api/homeUserApi.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Card } from "../components/Card.jsx";
import { InputField } from "../components/InputField.jsx";
import { MetricStrip } from "../components/MetricStrip.jsx";
import { PageSection } from "../components/PageSection.jsx";

export function HomeUserPage() {
  const auth = useAuth();
  const { run } = useOutletContext();

  const [homeUserId, setHomeUserId] = useState("");
  const [keyId, setKeyId] = useState("");
  const stats = [
    {
      label: "Key list",
      value: "My access",
      note: "Start with the list to confirm which key IDs belong to you."
    },
    {
      label: "Take / return",
      value: "Live state",
      note: "Actions operate directly against the backend key status."
    },
    {
      label: "Lost reporting",
      value: "Escalation",
      note: "Use the report flow only when the current holder is this user."
    }
  ];

  return (
    <div className="dashboard-page">
      <MetricStrip items={stats} />

      <PageSection
        eyebrow="Overview"
        title="See the keys assigned to this user"
        description="The home-user page starts with visibility, then moves into actions. That makes it feel closer to a normal account screen."
      >
        <div className="feature-grid feature-grid--compact">
          <Card
            title="My Keys"
            subtitle="GET /api/user/home-user/{homeUserId}/keys"
            description="Load the keys that are currently associated with this home user."
            actionLabel="Load keys"
            onSubmit={() =>
              run("Home User Keys", () => homeUserApi.listKeys(auth, homeUserId))
            }
          >
            <InputField
              label="Home User ID"
              placeholder="22"
              helper="Use this first if you want to confirm a key ID before taking action."
              value={homeUserId}
              onChange={setHomeUserId}
            />
          </Card>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Actions"
        title="Take action on keys"
        description="Operational actions are split into clear cards so the user flow reads naturally: take, return, then escalate."
      >
        <div className="feature-grid">
          <Card
            title="Take Key"
            subtitle="POST /api/user/home-user/{homeUserId}/keys/{keyId}/take"
            description="Assign an available key to this home user."
            actionLabel="Take"
            onSubmit={() =>
              run("Take Key", () => homeUserApi.takeKey(auth, homeUserId, keyId))
            }
          >
            <InputField
              label="Home User ID"
              placeholder="22"
              value={homeUserId}
              onChange={setHomeUserId}
            />
            <InputField
              label="Key ID"
              placeholder="45"
              helper="The key must currently be AVAILABLE."
              value={keyId}
              onChange={setKeyId}
            />
          </Card>

          <Card
            title="Return Key"
            subtitle="POST /api/user/home-user/{homeUserId}/keys/{keyId}/return"
            description="Return a key that is currently checked out by this user."
            actionLabel="Return"
            onSubmit={() =>
              run("Return Key", () => homeUserApi.returnKey(auth, homeUserId, keyId))
            }
          >
            <InputField
              label="Home User ID"
              placeholder="22"
              value={homeUserId}
              onChange={setHomeUserId}
            />
            <InputField
              label="Key ID"
              placeholder="45"
              helper="The current holder must match this home user."
              value={keyId}
              onChange={setKeyId}
            />
          </Card>

          <Card
            title="Report Lost"
            subtitle="POST /api/user/home-user/{homeUserId}/keys/{keyId}/report-lost"
            description="Mark a currently held key as lost."
            actionLabel="Report"
            onSubmit={() =>
              run("Report Lost Key", () =>
                homeUserApi.reportLost(auth, homeUserId, keyId)
              )
            }
          >
            <InputField
              label="Home User ID"
              placeholder="22"
              value={homeUserId}
              onChange={setHomeUserId}
            />
            <InputField
              label="Key ID"
              placeholder="45"
              helper="Use only for keys already taken by this user."
              value={keyId}
              onChange={setKeyId}
            />
          </Card>
        </div>
      </PageSection>
    </div>
  );
}
