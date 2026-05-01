import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ownerApi } from "../api/ownerApi.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Card } from "../components/Card.jsx";
import { InputField } from "../components/InputField.jsx";
import { MetricStrip } from "../components/MetricStrip.jsx";
import { PageSection } from "../components/PageSection.jsx";

export function OwnerPage() {
  const auth = useAuth();
  const { run } = useOutletContext();

  const [ownerId, setOwnerId] = useState("");
  const [homeName, setHomeName] = useState("");
  const [homeId, setHomeId] = useState("");
  const [keyCode, setKeyCode] = useState("");
  const [grantAdminId, setGrantAdminId] = useState("");
  const stats = [
    {
      label: "Properties",
      value: "Homes",
      note: "Create and review homes from one owner-focused page."
    },
    {
      label: "Access",
      value: "Admin handoff",
      note: "Grant an admin access when operational support is needed."
    },
    {
      label: "Keys",
      value: "Issue and track",
      note: "Key creation and ownership visibility stay together."
    }
  ];

  return (
    <div className="dashboard-page">
      <MetricStrip items={stats} />

      <PageSection
        eyebrow="Homes"
        title="Manage the owner's homes"
        description="Property actions live together so the owner page reads like a normal property-management screen."
      >
        <div className="feature-grid feature-grid--compact">
          <Card
            title="List Homes"
            subtitle="GET /api/user/owner/{ownerId}/homes"
            description="See every home currently assigned to this owner."
            actionLabel="Load homes"
            onSubmit={() =>
              run("Owner Homes", () => ownerApi.listHomes(auth, ownerId))
            }
          >
            <InputField
              label="Owner ID"
              placeholder="7"
              helper="Use the owner entity ID, not the user ID."
              value={ownerId}
              onChange={setOwnerId}
            />
          </Card>

          <Card
            title="Create Home"
            subtitle="POST /api/user/owner/{ownerId}/homes"
            description="Create a new home record for the selected owner."
            actionLabel="Create home"
            onSubmit={() =>
              run("Create Home", () => ownerApi.createHome(auth, ownerId, homeName))
            }
          >
            <InputField label="Owner ID" placeholder="7" value={ownerId} onChange={setOwnerId} />
            <InputField
              label="Home name"
              placeholder="North Gate Apartment"
              helper="Choose a label that will be easy to recognize in key lists."
              value={homeName}
              onChange={setHomeName}
            />
          </Card>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Coordination"
        title="Share access with admins"
        description="Operational access is separated from property creation, which makes the page easier to scan."
      >
        <div className="feature-grid feature-grid--compact">
          <Card
            title="Grant Admin Access"
            subtitle="POST /api/user/owner/{ownerId}/admins/{adminId}/access"
            description="Link the owner to an existing admin so that admin can manage related data."
            actionLabel="Grant access"
            onSubmit={() =>
              run("Grant Admin Access", () =>
                ownerApi.grantAdminAccess(auth, ownerId, grantAdminId)
              )
            }
          >
            <InputField label="Owner ID" placeholder="7" value={ownerId} onChange={setOwnerId} />
            <InputField
              label="Admin ID"
              placeholder="1"
              value={grantAdminId}
              onChange={setGrantAdminId}
            />
          </Card>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Keys"
        title="Issue keys and inspect ownership"
        description="Key creation and key visibility are grouped into a dedicated access-control section."
      >
        <div className="feature-grid">
          <Card
            title="List Owner Keys"
            subtitle="GET /api/user/owner/{ownerId}/keys"
            description="See every key for this owner's homes, including who currently holds it."
            actionLabel="Load keys"
            onSubmit={() =>
              run("Owner Keys", () => ownerApi.listKeys(auth, ownerId))
            }
          >
            <InputField label="Owner ID" placeholder="7" value={ownerId} onChange={setOwnerId} />
          </Card>

          <Card
            title="Create Key"
            subtitle="POST /api/user/owner/{ownerId}/homes/{homeId}/keys"
            description="Create a new key inside a specific home."
            actionLabel="Create key"
            onSubmit={() =>
              run("Create Key", () =>
                ownerApi.createKey(auth, ownerId, homeId, keyCode)
              )
            }
          >
            <InputField label="Owner ID" placeholder="7" value={ownerId} onChange={setOwnerId} />
            <InputField
              label="Home ID"
              placeholder="31"
              helper="Use a home that belongs to the selected owner."
              value={homeId}
              onChange={setHomeId}
            />
            <InputField
              label="Key code"
              placeholder="FRONT-DOOR-A"
              helper="This becomes the visible key label in backend responses."
              value={keyCode}
              onChange={setKeyCode}
            />
          </Card>
        </div>
      </PageSection>
    </div>
  );
}
