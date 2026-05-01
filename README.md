# Home Key Door Frontend

React + Vite frontend that mirrors the current Spring backend endpoints in this repository.

## Run

```bash
cd frontend
npm install
npm run dev
```

The UI defaults to `http://localhost:8080` as the API base URL, but you can change it from the sidebar.

## Covered backend areas

- `POST /api/user/authentication/login`
- `GET /api/user/authentication/refreshToken`
- `GET /api/user/authentication/password/change`
- `GET /api/user/authentication/password/check/{email}/{key}`
- `PUT /api/user/authentication/password/change/{email}/{key}`
- `GET /api/user/admin/{adminId}/dashboard`
- `GET/POST /api/user/admin/{adminId}/owners`
- `GET/POST /api/user/admin/{adminId}/homeUsers`
- `PUT/DELETE /api/user/admin/owners/{ownerId}`
- `PUT/DELETE /api/user/admin/homeUsers/{userId}`
- `GET/POST /api/user/owner/{ownerId}/homes`
- `POST /api/user/owner/{ownerId}/admins/{adminId}/access`
- `GET /api/user/owner/{ownerId}/keys`
- `POST /api/user/owner/{ownerId}/homes/{homeId}/keys`
- `GET /api/user/home-user/{homeUserId}/keys`
- `POST /api/user/home-user/{homeUserId}/keys/{keyId}/take`
- `POST /api/user/home-user/{homeUserId}/keys/{keyId}/return`
- `POST /api/user/home-user/{homeUserId}/keys/{keyId}/report-lost`
- `GET /api/homes/{id}`
- `GET /api/homes?ownerId=...`
- `GET /api/keys/{id}`
- `GET /api/keys?ownerId=...`
- `GET /api/keys?homeUserId=...`

## Notes

- The client sends the access token in the `Authorization` header exactly as stored from login.
- Refresh calls send the stored refresh token in the `REFRESH-TOKEN` header.
- This environment did not have network access for dependency installation, so `npm install` and `vite build` were not executed here.
