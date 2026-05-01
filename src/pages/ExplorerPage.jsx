import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { explorerApi } from "../api/explorerApi.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Card } from "../components/Card.jsx";
import { InputField } from "../components/InputField.jsx";
import { WorkspaceLayout } from "../components/WorkspaceLayout.jsx";

export function ExplorerPage() {
  const auth = useAuth();
  const { run } = useOutletContext();

  const [homeId, setHomeId] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [keyId, setKeyId] = useState("");
  const [homeUserId, setHomeUserId] = useState("");

  return (
    <WorkspaceLayout>
      <Card
        title="Get Home"
        subtitle="GET /api/homes/{id}"
        description="Fetch a single home record by ID."
        actionLabel="Fetch home"
        onSubmit={() => run("Get Home", () => explorerApi.getHome(auth, homeId))}
      >
        <InputField
          label="Home ID"
          placeholder="31"
          helper="Useful after creating a new home."
          value={homeId}
          onChange={setHomeId}
        />
      </Card>

      <Card
        title="List Homes By Owner"
        subtitle="GET /api/homes?ownerId="
        description="List every home for a specific owner."
        actionLabel="Fetch homes"
        onSubmit={() =>
          run("Homes By Owner", () => explorerApi.getHomesByOwner(auth, ownerId))
        }
      >
        <InputField label="Owner ID" placeholder="7" value={ownerId} onChange={setOwnerId} />
      </Card>

      <Card
        title="Get Key"
        subtitle="GET /api/keys/{id}"
        description="Fetch a single key with ownership and holder details."
        actionLabel="Fetch key"
        onSubmit={() => run("Get Key", () => explorerApi.getKey(auth, keyId))}
      >
        <InputField label="Key ID" placeholder="45" value={keyId} onChange={setKeyId} />
      </Card>

      <Card
        title="List Keys By Owner"
        subtitle="GET /api/keys?ownerId="
        description="List keys for all homes owned by one owner."
        actionLabel="Fetch owner keys"
        onSubmit={() =>
          run("Keys By Owner", () => explorerApi.getKeysByOwner(auth, ownerId))
        }
      >
        <InputField label="Owner ID" placeholder="7" value={ownerId} onChange={setOwnerId} />
      </Card>

      <Card
        title="List Keys By Home User"
        subtitle="GET /api/keys?homeUserId="
        description="List keys currently associated with a single home user."
        actionLabel="Fetch user keys"
        onSubmit={() =>
          run("Keys By Home User", () =>
            explorerApi.getKeysByHomeUser(auth, homeUserId)
          )
        }
      >
        <InputField
          label="Home User ID"
          placeholder="22"
          value={homeUserId}
          onChange={setHomeUserId}
        />
      </Card>
    </WorkspaceLayout>
  );
}
