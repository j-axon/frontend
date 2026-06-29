# Variables de entorno — Frontend

Todas las variables expuestas al cliente deben estar prefixadas con
`NEXT_PUBLIC_`. Las claves privadas no se exponen.

| Variable | Default | Descripción |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8080/api/v1` | Base URL del backend v6. |
| `NEXT_PUBLIC_WS_URL` | `ws://localhost:8080/ws` | Endpoint STOMP para WebSocket. |
| `NEXT_PUBLIC_APP_NAME` | `J-AXON` | Nombre de la app en UI. |
| `NEXT_PUBLIC_APP_ENV` | `development` | Entorno: `development`, `staging`, `production`. |
| `NEXT_PUBLIC_QR_SCAN_ROUTE` | `/qr/scan` | Ruta de la página de escaneo QR. |

## Reglas

- **Nunca** se exponen secretos ni claves de API.
- El **refresh token** no se guarda en variables; viaja en cookie HttpOnly.
- Variables sin prefijo `NEXT_PUBLIC_` solo están disponibles en el
  servidor (build / runtime) — no las uses directamente en componentes
  cliente.
