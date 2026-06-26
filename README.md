# J-AXON Frontend

Help Desk, smart inventory, QR scanning and AI-assisted diagnostics.

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **HTTP Client:** Axios (with interceptors for token injection & silent refresh)
- **Forms:** React Hook Form + Zod validation
- **Unit Tests:** Vitest + @testing-library/react (jsdom)
- **E2E Tests:** Playwright
- **Linter:** ESLint (flat config)

## Project Structure

```
src/
├── app/                            # Next.js App Router (routes, layouts, pages)
│   ├── (dashboard)/                #   Dashboard route group (authenticated)
│   ├── (protected)/                #   Wraps children in RoleGuard
│   ├── (public)/                   #   Public route group (no auth)
│   ├── 403/                        #   Forbidden page
│   ├── login/                      #   Login page
│   └── page.tsx                    #   Landing / home page
├── features/                       # Domain modules (feature-sliced design)
│   ├── auth/                       #   Authentication (login, logout, session)
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── types/
│   ├── rbac/                       #   Role-based access control (stub)
│   ├── tickets/                    #   (stub)
│   ├── assets/                     #   (stub)
│   ├── ai/                         #   (stub)
│   └── ...
├── shared/                         # Reusable shared layer
│   ├── components/
│   │   ├── guards/                 #   RoleGuard (client-side RBAC)
│   │   ├── layout/                 #   AppShell
│   │   └── navigation/            #   Sidebar, MobileMenu
│   ├── constants/                  #   Route constants
│   ├── lib/
│   │   ├── auth/                   #   Permissions (role-route matrix)
│   │   ├── env.ts                  #   Environment config
│   │   └── http/                   #   Axios client with interceptors
│   └── types/                      #   Shared TypeScript types
├── middleware.ts                   # Next.js Edge middleware (RBAC enforcement)
├── test/
│   └── setup.ts                    # Vitest setup
└── globals.css                     # Tailwind v4 base styles
```

## HU-1: Base Setup

Establishes the project foundation, tooling, and shared infrastructure.

**Scaffolding & tooling:**
- Next.js 16 with App Router, TypeScript strict mode, Tailwind CSS v4
- ESLint flat config, Vitest, Playwright, Axios, React Hook Form, Zod, MSW
- `@/` path alias → `./src/`
- Docker multi-stage build (`node:22-alpine`)

**Shared infrastructure:**
- `src/shared/lib/env.ts` — centralized environment variables
- `src/shared/lib/http/client.ts` — Axios instance with:
  - Bearer token request interceptor (in-memory storage)
  - 401 response interceptor with silent refresh (`/auth/refresh`)
  - Redirect to `/login?expired=true` on refresh failure
- `src/shared/constants/routes.ts` — `PUBLIC_ROUTES` and `PROTECTED_ROUTES`
- `src/shared/types/` — `AuthUser`, `LoginRequest`, `LoginResponse`, `Asset`, `Ticket`, `AiPrediagnosis`

**Layout & navigation:**
- `Appshell` — authenticated app shell (mobile header + desktop sidebar + content area)
- `Sidebar` — desktop nav with role-filtered items
- `MobileMenu` — responsive hamburger drawer with role-filtered items

**Placeholder pages:**
- Home (landing), Dashboard, Tickets list/detail, Assets list/detail, Reports, QR scan

## HU-2: Login / Logout / Session

Implements the full authentication flow.

**Files:**

| File | Purpose |
|---|---|
| `features/auth/types/auth.types.ts` | `LoginDTO` (email, password), `UserSessionDTO` (user, role, accessToken, nested user) |
| `features/auth/schemas/login.schema.ts` | Zod schema: valid email, password ≥ 6 chars. Exports `LoginFormData` type |
| `features/auth/services/auth.service.ts` | `authService.Login()` POSTs to `/auth/login`, `logout()` POSTs to `/auth/logout` |
| `features/auth/context/AuthProvider.tsx` | React context with `user`, `isAuthenticated`, `isLoading` state. Exposes `loginUser` and `logoutUser` |
| `features/auth/hooks/useAuth.ts` | `useContext(AuthContext)` wrapper — throws if used outside provider |
| `features/auth/components/LoginForm.tsx` | Form with email/password + Zod validation, calls `loginUser`, redirects to `/dashboard` |
| `app/login/page.tsx` | Route page that renders `<LoginForm />` |
| `app/layout.tsx` (root) | Wraps all routes in `<AuthProvider>` |

**Flow:**
1. User submits email + password
2. Zod validates client-side
3. `AuthProvider.loginUser` → `authService.Login` → `POST /auth/login`
4. On success: token stored in memory, user set in context, redirect to `/dashboard`
5. On failure: error banner displayed
6. Logout clears token, clears user, calls `POST /auth/logout`

**Token refresh:** Axios interceptor catches 401 → `POST /auth/refresh` → retry original request → on failure redirect to `/login?expired=true`

## HU-3: Admin / Authorization / RBAC

Implements role-based access control (client-side guard + route permissions).

**Permission matrix** (`shared/lib/auth/permissions.ts`):

| Route | ADMIN | TECHNICAL | AUDITOR | USER |
|---|---|---|---|---|
| `/dashboard` | ✓ | ✓ | ✓ | ✓ |
| `/tickets` | ✓ | ✓ | ✓ | ✓ |
| `/reports` | ✓ | — | — | — |
| `/assets` | ✓ | ✓ | — | — |
| `/users` | ✓ | — | — | — |

**Files:**

| File | Purpose |
|---|---|
| `shared/lib/auth/permissions.ts` | Role-route mapping, `hasRoutePermission(role, route)` |
| `shared/constants/routes.ts` | Route constants consumed by permissions |
| `shared/components/guards/Roleguard.tsx` | Client-side guard: checks auth → redirects to `/login` or `/403`, renders children if authorized |
| `shared/components/guards/__test__/Roleguard.test.tsx` | 3 tests: unauthenticated, unauthorized role, authorized role |
| `app/(protected)/layout.tsx` | Route group layout wrapping children in `<RoleGuard>` |
| `app/403/page.tsx` | "Access Denied" page with return link |
| `app/(dashboard)/admin/page.tsx` | Admin-only page (requires ADMIN role) |
| `middleware.ts` | Edge middleware stub — matcher configured for future server-side enforcement |
| `navigation/Sidebar.tsx` | Filters nav items by role |
| `navigation/MobileMenu.tsx` | Same role-based filtering for mobile |

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001/ws
NEXT_PUBLIC_APP_NAME=J-AXON
NEXT_PUBLIC_QR_SCAN_ROUTE=/scan
```

Copy `.env.example` → `.env.local` to get started.

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build (type-check + compile)
npm run lint         # ESLint
npm run test         # Vitest (unit)
npm run test:e2e     # Playwright (E2E)
npm run test:coverage
```
# Arquitectura de Red y Centralización de Peticiones HTTP — HU-FE-004

Este documento detalla la especificación e implementación técnica de la capa de red del Frontend de J-AXON, centralizada mediante un cliente unificado de **Axios** y gobernada por el motor de estados asíncronos **TanStack Query (React Query)**.

## 1. Estructura de Archivos Creados

El desarrollo se acopla estrictamente a la arquitectura *Feature-Sliced Design (FSD)* bajo la capa unificada `src/shared/`:

| Ruta del Archivo | Tipo | Propósito |
| :--- | :---: | :--- |
| `src/shared/lib/http/http-status.ts` | Constante | Diccionario estricto de códigos HTTP (Enum-like) para erradicar números mágicos. |
| `src/shared/lib/http/api-error.ts` | Clase | Extensión nativa de `Error` que unifica los esquemas de excepciones del Backend. |
| `src/shared/lib/http/client.ts` | Servicio | Instancia central de Axios equipada con inyección de tokens y semáforo anti-duplicación. |
| `src/shared/lib/query/query-client.ts` | Config | Instancia global de React Query con políticas inteligentes de `retry` por código de error. |
| `src/shared/components/feedback/ApiErrorMessage.tsx` | UI Component | Renderizado condicional de alertas según la severidad del error HTTP obtenido. |
| `src/shared/components/feedback/LoadingState.tsx` | UI Component | Esqueleto e indicador de carga asíncrona unificado con Tailwind CSS v4. |
| `src/shared/components/feedback/EmptyState.tsx` | UI Component | Estado vacío reutilizable para arrays de colecciones de datos sin registros. |
| `src/shared/lib/http/client.test.ts` | Test Unitario | Suite de pruebas automatizadas en Vitest para la verificación de interceptores. |

---

## 2. Flujo de Control: Silent Refresh y Anti-Duplicación (Concurrencia)

Uno de los requerimientos críticos de seguridad y rendimiento de la historia es evitar colisiones o múltiples llamadas simultáneas al endpoint de actualización (`/auth/refresh`) cuando una vista densa inicializa múltiples peticiones al mismo tiempo con un token expirado.

Para mitigar esto, se implementó un mecanismo de **semáforo de control asíncrono** combinado con una cola FIFO (`failedQueue`):

```typescript
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];