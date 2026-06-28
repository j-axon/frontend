# Formulario de ticket desde QR (HU-FE-006)

## Descripción

Permite a un **Usuario Normal** reportar una falla sobre un activo identificado por QR, con los datos técnicos del activo precargados y no editables.

## Flujo

```text
1. Usuario escanea QR (HU-FE-005) o abre deep-link /tickets/scan/[qrToken]
2. Se valida el activo: GET /v1/assets/qr/:uuid
3. Redirección a /tickets/new?assetId=:uuid&code=:code
4. Usuario completa descripción, categoría y prioridad (opcional)
5. POST /v1/tickets → confirmación o error genérico (403)
```

## Rutas

| Ruta | Propósito |
|---|---|
| `/tickets/scan` | Entrada del escáner QR (FE-005) o identificador manual |
| `/tickets/scan/[qrToken]` | Deep-link QR → redirige a `/tickets/new` |
| `/tickets/new?assetId=` | Formulario con activo precargado |

## Componentes

| Componente | Responsabilidad |
|---|---|
| `TicketFromQrForm` | Formulario RHF + Zod, envío y estados |
| `AssetPrefillCard` | Datos del activo en solo lectura |

## Validaciones (Zod)

- **description**: obligatoria, mínimo 10 caracteres
- **category**: obligatoria (`Mantenimiento`, `Soporte Técnico`, `Infraestructura`, `Otros`)
- **priority**: opcional (`Baja`, `Media`, `Alta`)
- **assetUuid**: obligatorio (hidden, precargado desde el activo)

## Manejo de errores

| Código | Comportamiento en UI |
|---|---|
| 403 | Mensaje genérico de permisos, sin datos sensibles |
| Otros | Mensaje genérico de error al crear ticket |
| 404 (activo) | Página `notFound` en `/tickets/new` |

## Dependencias

- **ISSUE-FE-005**: escaneo QR y redirección a `/tickets/new`
- **ISSUE-BE-TICKET-CREATE**: contrato POST `/v1/tickets`

## Tests

| ID | Archivo |
|---|---|
| CP-FE-TICKET-001 | `AssetPrefillCard.test.tsx`, `TicketFromQrForm.test.tsx` |
| CP-FE-TICKET-002 | `TicketFromQrForm.test.tsx` |
| E2E-FE-TICKET-001 | `tests/e2e/tickets/create-ticket-from-qr.spec.ts` |
