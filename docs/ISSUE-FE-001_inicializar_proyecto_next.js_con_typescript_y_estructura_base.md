# ISSUE-FE-001 — Inicializar proyecto Next.js con TypeScript y estructura base

**Módulo:** Frontend  
**Stack:** Next.js, React, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, STOMP, Vitest, MSW, Playwright.

## Objetivo

Implementar **Inicializar proyecto Next.js con TypeScript y estructura base** sin romper el contrato con Backend. El refresh token nunca debe leerse ni guardarse en frontend; viaja por cookie HttpOnly enviada automáticamente con `credentials: 'include'`.

## Contratos backend relacionados

- Sin contrato backend directo en esta issue.

## Archivos completos a crear/modificar

| # | Categoría | Ruta | Clase/artefacto |
|---:|---|---|---|
| 1 | Config | `package.json` | `scripts y dependencias` |
| 2 | Config | `next.config.ts` | `NextConfig` |
| 3 | Config | `tsconfig.json` | `paths @/*` |
| 4 | Config | `postcss.config.mjs` | `Tailwind` |
| 5 | Config | `tailwind.config.ts` | `Tailwind theme` |
| 6 | Env | `env.example` | `NEXT_PUBLIC_API_BASE_URL` |
| 7 | App | `src/app/layout.tsx` | `RootLayout` |
| 8 | App | `src/app/page.tsx` | `RedirectHome` |
| 9 | Styles | `src/app/globals.css` | `global styles` |
| 10 | Shared | `src/shared/components/ui/Button.tsx` | `Button` |
| 11 | Shared | `src/shared/components/ui/Input.tsx` | `Input` |
| 12 | Shared | `src/shared/components/ui/Card.tsx` | `Card` |
| 13 | Shared | `src/shared/components/layout/AppShell.tsx` | `AppShell` |
| 14 | Shared | `src/shared/lib/env.ts` | `env` |
| 15 | Shared | `src/shared/types/api.ts` | `ApiError` |
| 16 | Tests | `src/test/setup.ts` | `test setup` |

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

- `src/lib/config/env.test.ts`: env config valida variables obligatorias.
- `src/app/layout.test.tsx`: layout renderiza providers sin romper.

### Tests de integración con MSW

- `src/test/setup/msw.test.ts`: MSW inicia y resetea handlers.

### Tests E2E Playwright

- `e2e/smoke.spec.ts`: la app carga landing/login.

### Tests de accesibilidad

- `Login o página base`: sin violaciones críticas de accesibilidad.


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
