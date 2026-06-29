# ISSUE-FE-004 — Implementar cliente HTTP, errores globales y refresh silencioso

**Módulo:** Frontend  
**Stack:** Next.js, React, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, STOMP, Vitest, MSW, Playwright.

## Objetivo

Implementar **Implementar cliente HTTP, errores globales y refresh silencioso** sin romper el contrato con Backend. El refresh token nunca debe leerse ni guardarse en frontend; viaja por cookie HttpOnly enviada automáticamente con `credentials: 'include'`.

## Contratos backend relacionados

- `POST /api/v1/auth/refresh con credentials include`

## Archivos completos a crear/modificar

| # | Categoría | Ruta | Clase/artefacto |
|---:|---|---|---|
| 1 | HTTP | `src/shared/lib/http/client.ts` | `apiClient` |
| 2 | HTTP | `src/shared/lib/http/errors.ts` | `normalizeApiError` |
| 3 | HTTP | `src/shared/lib/http/queryClient.ts` | `queryClient` |
| 4 | Provider | `src/app/providers.tsx` | `AppProviders` |
| 5 | Feature | `src/features/auth/services/sessionService.ts` | `sessionService` |
| 6 | Feature | `src/features/auth/hooks/useRefreshSession.ts` | `useRefreshSession` |
| 7 | UI | `src/shared/components/feedback/ToastProvider.tsx` | `ToastProvider` |
| 8 | UI | `src/shared/components/feedback/ErrorState.tsx` | `ErrorState` |
| 9 | UI | `src/shared/components/feedback/LoadingState.tsx` | `LoadingState` |
| 10 | Test | `src/shared/lib/http/client.test.ts` | `clientTest` |

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

- `src/lib/http/apiClient.test.ts`: adjunta bearer en requests.
- `src/lib/http/refreshQueue.test.ts`: una sola renovación ante múltiples 401.

### Tests de integración con MSW

- `src/lib/http/apiClient.integration.test.ts`: refresh silencioso con MSW.

### Tests E2E Playwright

- `e2e/session-refresh.spec.ts`: sesión renueva token y sigue navegando.


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
