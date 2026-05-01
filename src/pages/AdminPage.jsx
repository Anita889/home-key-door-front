import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { adminApi } from "../api/adminApi.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Card } from "../components/Card.jsx";
import { InputField } from "../components/InputField.jsx";
import { MetricStrip } from "../components/MetricStrip.jsx";
import { PageSection } from "../components/PageSection.jsx";

export function AdminPage() {
  const auth = useAuth();
  const { run } = useOutletContext();

  const [adminId, setAdminId] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [homeUserId, setHomeUserId] = useState("");
  const [ownerForm, setOwnerForm] = useState({
    id: "",
    firstName: "",
    secondName: "",
    email: ""
  });
  const [homeUserForm, setHomeUserForm] = useState({
    id: "",
    firstName: "",
    secondName: "",
    email: ""
  });
  const stats = [
    {
      label: "Dashboard",
      value: "Admin control",
      note: "Use this page to manage people and visibility."
    },
    {
      label: "Owner tools",
      value: "Create, edit, remove",
      note: "Owner management is grouped into its own section."
    },
    {
      label: "Resident tools",
      value: "Home users",
      note: "Resident actions are split from owner actions."
    }
  ];

  return (
    <div className="dashboard-page">
      <MetricStrip items={stats} />

      <PageSection
        eyebrow="Overview"
        title="Monitor people linked to this admin"
        description="Keep high-level lookup actions together so the page feels like a dashboard before it becomes a management tool."
      >
        <div className="feature-grid feature-grid--compact">
          <Card
            title="Admin Dashboard"
            subtitle="GET /api/user/admin/{adminId}/dashboard"
            description="Load the basic admin profile tied to the current admin ID."
            actionLabel="Load dashboard"
            onSubmit={() =>
              run("Admin Dashboard", () => adminApi.dashboard(auth, adminId))
            }
          >
            <InputField
              label="Admin ID"
              placeholder="1"
              helper="Use the backend admin entity ID."
              value={adminId}
              onChange={setAdminId}
            />
          </Card>

          <Card
            title="Owners"
            subtitle="GET /api/user/admin/{adminId}/owners"
            description="List all home owners available to this admin."
            actionLabel="Load owners"
            onSubmit={() =>
              run("Owners List", () => adminApi.listOwners(auth, adminId))
            }
          >
            <InputField
              label="Admin ID"
              placeholder="1"
              value={adminId}
              onChange={setAdminId}
            />
          </Card>

          <Card
            title="Home Users"
            subtitle="GET /api/user/admin/{adminId}/homeUsers"
            description="List all home users visible through this admin scope."
            actionLabel="Load home users"
            onSubmit={() =>
              run("Home Users List", () => adminApi.listHomeUsers(auth, adminId))
            }
          >
            <InputField
              label="Admin ID"
              placeholder="1"
              value={adminId}
              onChange={setAdminId}
            />
          </Card>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Owners"
        title="Manage home owners"
        description="Create, update, and remove owners in one dedicated section instead of mixing them with unrelated actions."
      >
        <div className="feature-grid">
          <Card
            title="Create Owner"
            subtitle="POST /api/user/admin/{adminId}/owners"
            description="Create a new owner record using the same DTO field names as the backend."
            actionLabel="Create owner"
            onSubmit={() =>
              run("Create Owner", () => adminApi.createOwner(auth, adminId, ownerForm))
            }
          >
            <InputField label="Admin ID" placeholder="1" value={adminId} onChange={setAdminId} />
            <InputField
              label="First name"
              placeholder="Anna"
              value={ownerForm.firstName}
              onChange={(firstName) =>
                setOwnerForm((current) => ({ ...current, firstName }))
              }
            />
            <InputField
              label="Second name"
              placeholder="Martinez"
              value={ownerForm.secondName}
              onChange={(secondName) =>
                setOwnerForm((current) => ({ ...current, secondName }))
              }
            />
            <InputField
              label="Email"
              placeholder="owner@example.com"
              value={ownerForm.email}
              onChange={(email) => setOwnerForm((current) => ({ ...current, email }))}
            />
          </Card>

          <Card
            title="Update Owner"
            subtitle="PUT /api/user/admin/owners/{ownerId}"
            description="Update an existing owner by ID."
            actionLabel="Update owner"
            onSubmit={() =>
              run("Update Owner", () => adminApi.updateOwner(auth, ownerId, ownerForm))
            }
          >
            <InputField label="Owner ID" placeholder="14" value={ownerId} onChange={setOwnerId} />
            <InputField
              label="First name"
              placeholder="Anna"
              value={ownerForm.firstName}
              onChange={(firstName) =>
                setOwnerForm((current) => ({ ...current, firstName }))
              }
            />
            <InputField
              label="Second name"
              placeholder="Martinez"
              value={ownerForm.secondName}
              onChange={(secondName) =>
                setOwnerForm((current) => ({ ...current, secondName }))
              }
            />
            <InputField
              label="Email"
              placeholder="owner@example.com"
              value={ownerForm.email}
              onChange={(email) => setOwnerForm((current) => ({ ...current, email }))}
            />
          </Card>

          <Card
            title="Delete Owner"
            subtitle="DELETE /api/user/admin/owners/{ownerId}"
            description="Remove an owner by ID. This writes directly to the backend."
            actionLabel="Delete owner"
            onSubmit={() =>
              run("Delete Owner", () => adminApi.deleteOwner(auth, ownerId))
            }
          >
            <InputField
              label="Owner ID"
              placeholder="14"
              helper="Double-check IDs before deleting."
              value={ownerId}
              onChange={setOwnerId}
            />
          </Card>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Residents"
        title="Manage home users"
        description="Home-user operations have their own area so the page reads like a normal people-management screen."
      >
        <div className="feature-grid">
          <Card
            title="Create Home User"
            subtitle="POST /api/user/admin/{adminId}/homeUsers"
            description="Create a new home-user account under the admin workspace."
            actionLabel="Create home user"
            onSubmit={() =>
              run("Create Home User", () =>
                adminApi.createHomeUser(auth, adminId, homeUserForm)
              )
            }
          >
            <InputField label="Admin ID" placeholder="1" value={adminId} onChange={setAdminId} />
            <InputField
              label="First name"
              placeholder="David"
              value={homeUserForm.firstName}
              onChange={(firstName) =>
                setHomeUserForm((current) => ({ ...current, firstName }))
              }
            />
            <InputField
              label="Second name"
              placeholder="Lee"
              value={homeUserForm.secondName}
              onChange={(secondName) =>
                setHomeUserForm((current) => ({ ...current, secondName }))
              }
            />
            <InputField
              label="Email"
              placeholder="resident@example.com"
              value={homeUserForm.email}
              onChange={(email) =>
                setHomeUserForm((current) => ({ ...current, email }))
              }
            />
          </Card>

          <Card
            title="Update Home User"
            subtitle="PUT /api/user/admin/homeUsers/{userId}"
            description="Update the name or email fields for an existing home user."
            actionLabel="Update home user"
            onSubmit={() =>
              run("Update Home User", () =>
                adminApi.updateHomeUser(auth, homeUserId, homeUserForm)
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
              label="First name"
              placeholder="David"
              value={homeUserForm.firstName}
              onChange={(firstName) =>
                setHomeUserForm((current) => ({ ...current, firstName }))
              }
            />
            <InputField
              label="Second name"
              placeholder="Lee"
              value={homeUserForm.secondName}
              onChange={(secondName) =>
                setHomeUserForm((current) => ({ ...current, secondName }))
              }
            />
            <InputField
              label="Email"
              placeholder="resident@example.com"
              value={homeUserForm.email}
              onChange={(email) =>
                setHomeUserForm((current) => ({ ...current, email }))
              }
            />
          </Card>

          <Card
            title="Delete Home User"
            subtitle="DELETE /api/user/admin/homeUsers/{userId}"
            description="Delete a home user by entity ID."
            actionLabel="Delete home user"
            onSubmit={() =>
              run("Delete Home User", () => adminApi.deleteHomeUser(auth, homeUserId))
            }
          >
            <InputField
              label="Home User ID"
              placeholder="22"
              helper="This action cannot be previewed from the UI."
              value={homeUserId}
              onChange={setHomeUserId}
            />
          </Card>
        </div>
      </PageSection>
    </div>
  );
}
