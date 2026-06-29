# Arquitectura — Frontend J-AXON

## Capas principales

```text
                ┌──────────────────────┐
                │   App Router (Next)  │
                │  /(auth) / /(protected)
                └────────┬─────────────┘
                         │ Pages & layouts
                         ▼
┌──────────────────────────────────────────┐
│             Features (dominio)           │
│ auth · qr · tickets · ai · assets · …     │
└────────┬──────────────────────┬──────────┘
         │                      │
         ▼                      ▼
┌────────────────┐    ┌────────────────────────┐
│  Shared UI     │    │ Shared Lib              │
│ Button/Input/  │    │ apiClient · queryClient │
│ Card/Badge/    │    │ env · roles             │
│ Toast / etc.   │    └────────────────────────┘
└────────────────┘
```

## Flujo de autenticación

```text
LoginForm ── submit ─▶ useLogin (mutation)
                          │
                          ▼
                     authService.login (apiClient)
                          │          │
              credentials:include    Bearer token
                          ▼          ▼
                     backend      tokenMemoryStore.set(...)
                          │
                          ▼
                  router.replace(/dashboard)
```

## Flujo de refresh silencioso

```text
apiClient.request
   │ 401
   ▼
tryRefresh()  ── único en vuelo ──▶ POST /auth/refresh (credentials:include)
                                     │
                       nuevo accessToken ──▶ tokenMemoryStore.set
                                     │
                                     ▼
                          reintenta request original con nuevo bearer
```

## Convenciones

- Toda llamada HTTP usa `credentials: "include"` cuando el endpoint
  depende de cookies HttpOnly (`/auth/login`, `/auth/refresh`,
  `/auth/logout`).
- Las suscripciones STOMP se desmontan en `useEffect` cleanup.
- El **frontend oculta** UI por rol; **backend autoriza**.

## Estructura

```text
src/
├── app/                # Next.js App Router
├── shared/
│   ├── components/ui/  # Button, Input, Card, Badge
│   ├── components/layout/  # AppShell, Sidebar, Topbar
│   ├── components/feedback/ # Toast, Error, Loading
│   ├── lib/http/       # apiClient, queryClient, errors
│   ├── lib/env.ts      # Variables validadas
│   ├── types/api.ts    # ApiError, Page
│   └── config/         # navigationByRole
├── features/
│   ├── auth/{components,hooks,services,schemas,store,utils,types}
│   ├── qr/
│   ├── tickets/
│   ├── ai/
│   ├── assets/
│   ├── orphans/
│   ├── audit/
│   ├── reports/
│   ├── admin/alerts/
│   └── notifications/
├── constants/{routes,roles}.ts
├── types/{auth,ticket,asset,ai}.ts
└── middleware.ts
```
