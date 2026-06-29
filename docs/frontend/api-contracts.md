# Contratos API — Frontend J-AXON

Fuente normativa: `Contrato_API_Backend_Frontend_v6.md` y
`Contrato_WebSocket_STOMP_v6.md`.

## Auth

```text
POST /api/v1/auth/login
body: { email: string; password: string }
credentials: include
response: { accessToken, tokenType, expiresIn, usuario }

POST /api/v1/auth/refresh
credentials: include
response: { accessToken, tokenType, expiresIn, usuario }

POST /api/v1/auth/logout
credentials: include
response: { mensaje: string }

GET /api/v1/auth/me
Authorization: Bearer <token>
response: AuthUser
```

## Tickets

```text
GET    /api/v1/tickets/my
GET    /api/v1/tickets
GET    /api/v1/tickets/:id
POST   /api/v1/tickets
PATCH  /api/v1/tickets/:id
POST   /api/v1/ai/tickets/:ticketId/diagnose
```

## Assets

```text
GET    /api/v1/assets
GET    /api/v1/assets/qr/:uuid
POST   /api/v1/assets
GET    /api/v1/assets/:id/qr
DELETE /api/v1/assets/:id

GET    /api/v1/orphans
POST   /api/v1/orphans/:id/adopt
```

## Auditoría / Reportes

```text
GET /api/v1/audit/logs
GET /api/v1/reports/tickets/summary
GET /api/v1/reports/assets/incidents
```

## WebSocket STOMP (tópicos)

```text
/ws

/user/queue/tickets     # por usuario autenticado
/topic/tickets/technicians # rol TECNICO o ADMIN
/topic/admin/alerts     # rol ADMIN
```

### Tipos de mensaje

```ts
type NotificationType =
  | "TICKET_CREATED"
  | "TICKET_UPDATED"
  | "TICKET_ASSIGNED"
  | "TICKET_RESOLVED"
  | "ASSET_ORPHAN_DETECTED"
  | "ADMIN_ALERT"
  | "SYSTEM_ALERT"
  | "AI_DIAGNOSIS_READY";
```

> Cualquier campo no listado se ignora en frontend. No inventar campos.
