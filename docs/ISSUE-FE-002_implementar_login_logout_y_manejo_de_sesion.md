# ISSUE-FE-002 — Implementar login, logout y manejo de sesión

**Módulo:** Frontend  
**Stack:** Next.js, React, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, STOMP, Vitest, MSW, Playwright.

## Objetivo

Implementar **Implementar login, logout y manejo de sesión** sin romper el contrato con Backend. El refresh token nunca debe leerse ni guardarse en frontend; viaja por cookie HttpOnly enviada automáticamente con `credentials: 'include'`.

## Contratos backend relacionados

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`

## Archivos completos a crear/modificar

| # | Categoría | Ruta | Clase/artefacto |
|---:|---|---|---|
| 1 | Page | `src/app/(auth)/login/page.tsx` | `LoginPage` |
| 2 | Feature | `src/features/auth/components/LoginForm.tsx` | `LoginForm` |
| 3 | Feature | `src/features/auth/hooks/useLogin.ts` | `useLogin` |
| 4 | Feature | `src/features/auth/hooks/useLogout.ts` | `useLogout` |
| 5 | Feature | `src/features/auth/services/authService.ts` | `authService` |
| 6 | Feature | `src/features/auth/schemas/authSchemas.ts` | `loginSchema` |
| 7 | Feature | `src/features/auth/types/auth.types.ts` | `LoginRequest/LoginResponse/AuthUser` |
| 8 | Store | `src/features/auth/store/authStore.ts` | `authStore` |
| 9 | Feature | `src/features/auth/utils/tokenMemoryStore.ts` | `tokenMemoryStore` |
| 10 | Test | `src/features/auth/components/LoginForm.test.tsx` | `LoginFormTest` |

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

- `src/features/auth/services/authService.test.ts`: login/logout llaman endpoints correctos con credentials include.
- `src/features/auth/store/authStore.test.ts`: access token solo vive en memoria.

### Tests de componentes

- `src/features/auth/components/LoginForm.test.tsx`: valida campos, loading y error.

### Tests de integración con MSW

- `src/features/auth/hooks/useLogin.test.tsx`: integra TanStack Query + MSW.

### Tests E2E Playwright

- `e2e/auth-login-logout.spec.ts`: login, navegación autenticada y logout.

### Tests de accesibilidad

- `LoginForm`: labels, foco y mensajes accesibles.


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
