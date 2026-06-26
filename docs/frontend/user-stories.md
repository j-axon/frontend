# J-AXON Frontend — User Stories

---

## HU-1: Base Setup

| Field | Value |
|---|---|
| Requirement Type | Technical |
| Story Points | — |
| Depends on | None |
| Blocks | HU-2, HU-3, HU-4 |

### User Story

**As** a developer  
**I want** the project scaffolded with the correct tooling, structure, and shared infrastructure  
**So that** I can build features on top of a solid foundation.

### What Was Implemented

**Scaffolding & tooling:**
- Next.js 16 with App Router, TypeScript strict mode, Tailwind CSS v4
- ESLint flat config, Vitest, Playwright, Axios, React Hook Form, Zod, MSW
- `@/` path alias mapping to `./src/`
- Docker multi-stage build (`node:22-alpine`)

**Shared infrastructure:**
- `src/shared/lib/env.ts` — centralized environment variables
- `src/shared/lib/http/client.ts` — Axios instance with Bearer token interceptor, 401 silent refresh, redirect on failure
- `src/shared/constants/routes.ts` — `PUBLIC_ROUTES` and `PROTECTED_ROUTES`
- `src/shared/types/` — `AuthUser`, `LoginRequest`, `LoginResponse`, `Asset`, `Ticket`, `AiPrediagnosis`

**Layout & navigation:**
- `Appshell` — authenticated app shell (mobile header + desktop sidebar + content area)
- `Sidebar` — desktop nav with role-filtered items
- `MobileMenu` — responsive hamburger drawer with role-filtered items

**Placeholder pages:**
- Home (landing), Dashboard, Tickets list/detail, Assets list/detail, Reports, QR scan

### Key Files

| File | Purpose |
|---|---|
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript with `@/*` alias |
| `postcss.config.js` | PostCSS + Tailwind v4 |
| `vitest.config.ts` | Vitest with jsdom, `@/` alias, global setup |
| `eslint.config.mjs` | ESLint flat config |
| `src/app/layout.tsx` | Root layout with `AuthProvider` |
| `src/app/page.tsx` | Landing page |
| `src/shared/lib/env.ts` | Environment variables |
| `src/shared/lib/http/client.ts` | Axios HTTP client |
| `src/shared/constants/routes.ts` | Route constants |
| `src/shared/components/layout/Appshell.tsx` | Authenticated shell |
| `src/shared/components/navigation/Sidebar.tsx` | Desktop sidebar |
| `src/shared/components/navigation/MobileMenu.tsx` | Mobile navigation |

---

## HU-2: Login / Logout / Session

| Field | Value |
|---|---|
| Requirement Type | Functional |
| Story Points | — |
| Depends on | ISSUE-FE-001 |
| Blocks | HU-3 |

### User Story

**As** a user  
**I want** to log in and log out of the system  
**So that** I can access protected resources and end my session securely.

### What Was Implemented

Full authentication flow with React Context, Zod validation, Axios-based API calls, and in-memory token storage.

### Key Files

| File | Purpose |
|---|---|
| `features/auth/types/auth.types.ts` | `LoginDTO`, `UserSessionDTO` types |
| `features/auth/schemas/login.schema.ts` | Zod schema (valid email, password >= 6 chars) |
| `features/auth/services/auth.service.ts` | `authService.Login()` and `logout()` |
| `features/auth/context/AuthProvider.tsx` | React context with `user`, `isAuthenticated`, `isLoading`, `loginUser`, `logoutUser` |
| `features/auth/hooks/useAuth.ts` | Context consumer hook |
| `features/auth/components/LoginForm.tsx` | Login form with validation and error handling |
| `app/login/page.tsx` | Route page rendering `<LoginForm />` |

### Flow

1. User submits email + password
2. Zod validates client-side
3. `AuthProvider.loginUser` calls `authService.Login` -> `POST /auth/login`
4. Success: store token in memory, set user in context, redirect to `/dashboard`
5. Failure: display error banner
6. Logout: clear token, clear user, `POST /auth/logout`

### Token Refresh

Axios interceptor catches 401 -> `POST /auth/refresh` -> retry original request -> on failure redirect to `/login?expired=true`

---

## HU-3: Admin / Authorization / RBAC

| Field | Value |
|---|---|
| Requirement Type | Functional |
| Story Points | — |
| Depends on | ISSUE-FE-002 |
| Blocks | None |

### User Story

**As** an administrator  
**I want** role-based access control on routes and navigation  
**So that** users only see and access what their role allows.

### What Was Implemented

Permission matrix, client-side route guard (`RoleGuard`), forbidden page, role-filtered navigation, and a middleware stub for future server-side enforcement.

### Permission Matrix

| Route | ADMIN | TECHNICAL | AUDITOR | USER |
|---|---|---|---|---|
| `/dashboard` | yes | yes | yes | yes |
| `/tickets` | yes | yes | yes | yes |
| `/reports` | yes | — | — | — |
| `/assets` | yes | yes | — | — |
| `/users` | yes | — | — | — |

### Key Files

| File | Purpose |
|---|---|
| `shared/lib/auth/permissions.ts` | Role-route mapping, `hasRoutePermission()` |
| `shared/constants/routes.ts` | Route constants |
| `shared/components/guards/Roleguard.tsx` | Client-side guard: auth check -> `/login` or `/403` or render children |
| `shared/components/guards/__test__/Roleguard.test.tsx` | 3 Vitest tests |
| `app/(protected)/layout.tsx` | Wraps children in `<RoleGuard>` |
| `app/403/page.tsx` | "Access Denied" page |
| `app/(dashboard)/admin/page.tsx` | Admin-only page |
| `middleware.ts` | Edge middleware stub |
| `navigation/Sidebar.tsx` | Role-filtered sidebar |
| `navigation/MobileMenu.tsx` | Role-filtered mobile menu |

---

## HU-4: Centralized HTTP Client

| Field | Value |
|---|---|
| Requirement Type | Technical |
| Story Points | 5 |
| Depends on | ISSUE-FE-002 |
| Blocks | None |

### User Story

**As** the Frontend System  
**I want** to centralize all HTTP calls  
**So that** I avoid duplication, improve error handling, and enforce security consistently.

### What Was Implemented

Centralized Axios HTTP client with typed errors, standardized status codes, TanStack Query integration, and reusable feedback components.

### Architecture

**HTTP Layer:**
- `client.ts` — Axios instance with Bearer token interceptor, 401 silent refresh, deduplicated concurrent refresh calls
- `api-error.ts` — `ApiError` class with `status`, `message`, `code`, `details`
- `http-status.ts` — `HttpStatus` enum (400, 401, 403, 404, 409, 500, etc.)

**Query Layer:**
- `query-client.ts` — TanStack Query client (`staleTime`: 5 min, `retry`: 1, `refetchOnWindowFocus`: false)

**Feedback Components:**
- `ApiErrorMessage` — structured error display with retry
- `LoadingState` — spinner / skeleton
- `EmptyState` — empty data placeholder

### Error Handling Strategy

| HTTP Status | Behaviour |
|---|---|
| 400 | Display validation errors |
| 401 | Silent refresh; redirect on failure |
| 403 | Permission error message |
| 404 | "Resource not found" |
| 409 | Conflict details |
| 500 | Generic error with retry |

### Files

**Created:**

| Category | File |
|---|---|
| HTTP Layer | `src/shared/lib/http/client.ts` |
| HTTP Layer | `src/shared/lib/http/api-error.ts` |
| HTTP Layer | `src/shared/lib/http/http-status.ts` |
| Query Layer | `src/shared/lib/query/query-client.ts` |
| Feedback | `src/shared/components/feedback/ApiErrorMessage.tsx` |
| Feedback | `src/shared/components/feedback/LoadingState.tsx` |
| Feedback | `src/shared/components/feedback/EmptyState.tsx` |
| Tests | `src/shared/lib/http/client.test.ts` |
| Tests | `src/shared/components/feedback/ApiErrorMessage.test.tsx` |

**Modified:**

| File | Change |
|---|---|
| `src/app/(protected)/layout.tsx` | Integrate loading / error states |
| `src/features/auth/services/auth.service.ts` | Use centralized HTTP client |

### Acceptance Criteria

- [ ] All features use the centralized HTTP client
- [ ] 401 on expired token triggers silent refresh
- [ ] 403 displays a permission error message
- [ ] Errors follow a consistent format (`ApiError` shape)
- [ ] Concurrent refresh calls are deduplicated

### Test Cases

| ID | Type | Description |
|---|---|---|
| CP-FE-HTTP-001 | Unit | Attach token to request headers |
| CP-FE-HTTP-002 | Unit | Silent refresh on 401 response |
| CP-FE-HTTP-003 | Component | Display API error message via `ApiErrorMessage` |

### Definition of Done

- Reusable HTTP client with interceptors
- Standardized error format
- All tests pass
- Documented

### HU-FE-005: Flujo de Escaneo QR para Tickets

Este módulo implementa la funcionalidad de escaneo de códigos QR mediante la cámara del dispositivo móvil para la identificación ágil de activos físicos y su posterior redirección al flujo de apertura de tickets en J-AXON.

### Características Clave
Escaneo Nativo: Integración con la cámara trasera mediante la librería html5-qrcode.

### Validación de Carga Últil (Payload):
 Motor regex para identificar UUIDs válidos antes de realizar peticiones innecesarias al backend.

### Integración del Cliente HTTP: 
Consumo del servicio centralizado mediante Axios (httpClient) para validar la existencia real del activo.

### Redirección Veloz: 
Inyección de query strings en los parámetros de la URL (/tickets/new?assetId=...) para el auto-llenado inmediato del formulario en la HU-6.

### Estructura del Módulo
### Plaintext
src/
├── app/
│   └── (protected)/
│       └── tickets/
│           └── scan/
│               └── page.tsx           # Página contenedora (Loading y Orquestación)
├── features/
│   ├── assets/
│   │   ├── services/
│   │   │   └── asset-qr.service.ts   # Endpoint /assets/qr/:uuid
│   │   └── types/
│   │       └── asset-qr.types.ts     # Interfaces y Contratos de Datos
│   └── qr/
│       ├── components/
│       │   └── QrScanner.tsx         # Componente de la cámara e interfaz de usuario
│       ├── hooks/
│       │   └── useQrScanner.ts       # Hook de ciclo de vida del scanner y permisos
│       └── utils/
│           └── validateQrPayload.ts  # Validador de formato UUID

### Flujo de Operación
Lectura: El usuario apunta al código QR. QrScanner.tsx captura el string codificado.

### Validación Local:
 validateQrPayload.ts comprueba si contiene un UUID válido. Si falla, corta el flujo e informa al usuario.

### Verificación de Red:
 El componente page.tsx activa el estado de carga (LoadingState) y realiza el fetch a través de assetQrService.getAssetByUuid.

### Navegación:
 Al recibir un código 200 OK, el cliente redirige con router.push() enviando el id y code del activo al formulario de tickets.

### Manejo de Errores e Impactos
Permiso de Cámara Denegado: Atrapa el error nativo del navegador informando amigablemente al operador con instrucciones para reactivar el acceso.

### Activo No Encontrado (404 / 500): 
Captura la excepción de red del httpClient y despliega un banner de reintento sin romper la aplicación.