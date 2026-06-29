# ISSUE-FE-003 — Crear rutas protegidas y navegación por rol

**Módulo:** Frontend  
**Stack:** Next.js, React, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, STOMP, Vitest, MSW, Playwright.

## Objetivo

Implementar **Crear rutas protegidas y navegación por rol** sin romper el contrato con Backend. El refresh token nunca debe leerse ni guardarse en frontend; viaja por cookie HttpOnly enviada automáticamente con `credentials: 'include'`.

## Contratos backend relacionados

- Sin contrato backend directo en esta issue.

## Archivos completos a crear/modificar

| # | Categoría | Ruta | Clase/artefacto |
|---:|---|---|---|
| 1 | App | `src/app/(protected)/layout.tsx` | `ProtectedLayout` |
| 2 | Middleware | `src/middleware.ts` | `middleware` |
| 3 | Feature | `src/features/auth/components/RequireAuth.tsx` | `RequireAuth` |
| 4 | Feature | `src/features/auth/components/RoleGuard.tsx` | `RoleGuard` |
| 5 | Feature | `src/features/auth/hooks/useCurrentUser.ts` | `useCurrentUser` |
| 6 | Navigation | `src/shared/components/layout/Sidebar.tsx` | `Sidebar` |
| 7 | Navigation | `src/shared/components/layout/Topbar.tsx` | `Topbar` |
| 8 | Navigation | `src/shared/config/navigation.ts` | `navigationByRole` |
| 9 | Page | `src/app/(protected)/dashboard/page.tsx` | `DashboardPage` |
| 10 | Test | `src/features/auth/components/RoleGuard.test.tsx` | `RoleGuardTest` |

## Reglas de integración

- `accessToken` se guarda solo en memoria.
- Las llamadas a `/auth/refresh` y `/auth/logout` deben usar `credentials: 'include'`.
- Los tipos de respuesta deben coincidir con backend v6: `accessToken`, `tokenType`, `expiresIn`, `usuario`.
- El frontend oculta acciones por rol, pero el backend es la fuente real de autorización.
- El QR se lee por cámara y se decodifica en cliente; no se pega texto manual como flujo principal.

## Pruebas mínimas

- Component test de la vista o componente principal.
- Mock de API con MSW cuando aplique.
- E2E en Playwright para flujos críticos.

## Implementación obligatoria de pruebas, contrato API y validación


### Dependencias NPM obligatorias o a validar

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw playwright @playwright/test
```

Si se usan tests de accesibilidad:

```bash
npm install -D axe-core @axe-core/playwright jest-axe
```

### Swagger/OpenAPI

**Aplica:** no se implementa Swagger en Frontend.

Obligatorio para cada issue Frontend que consuma Backend:

- revisar `05_Contratos_Integracion/Contrato_API_Backend_Frontend_v6.md`;
- validar que los tipos TypeScript coinciden con OpenAPI del backend;
- no inventar campos que el backend no devuelve;
- usar `credentials: 'include'` cuando el endpoint dependa de cookies HttpOnly.

### Tests unitarios

- `src/shared/auth/roleGuard.test.ts`: roles permiten/deniegan navegación.

### Tests de componentes

- `src/components/layout/Sidebar.test.tsx`: menú cambia por rol.

### Tests de integración con MSW

- `src/app/(protected)/layout.test.tsx`: redirige si no hay sesión.

### Tests E2E Playwright

- `e2e/rbac-navigation.spec.ts`: ADMIN/TECHNICIAN/AUDITOR ven módulos correctos.

### Tests de accesibilidad

- `Navegación`: foco visible y aria-current.


### Comandos obligatorios antes del push

```bash
npm run lint
npm run test
npm run build
```

Si la issue toca flujo crítico:

```bash
npx playwright test
```

El push solo debe hacerse cuando build, lint y tests aplicables pasen.

## Criterios de aceptación

- [ ] Archivos creados en rutas indicadas.
- [ ] UI responsive y mobile-first cuando aplique.
- [ ] Manejo de loading, error y empty state.
- [ ] No se expone refresh token ni datos sensibles en localStorage/sessionStorage.
- [ ] Integración lista contra endpoints de Backend v6.


## Checklist v6 antes de push / PR

```text
- [ ] Archivos de la issue creados/modificados en las rutas indicadas.
- [ ] Tests aplicables implementados.
- [ ] Comandos de validación ejecutados correctamente.
- [ ] Swagger/OpenAPI actualizado si aplica endpoint REST de Backend.
- [ ] Contrato alternativo actualizado si aplica WebSocket, Collector, IA o n8n.
- [ ] Sin secretos hardcodeados.
- [ ] Sin romper contratos entre Backend, Frontend, Collector, IA y n8n.
```
