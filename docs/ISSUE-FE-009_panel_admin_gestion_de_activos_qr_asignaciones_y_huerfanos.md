# ISSUE-FE-009 — Panel Admin: gestión de activos, QR, asignaciones y huérfanos

**Módulo:** Frontend  
**Stack:** Next.js, React, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, STOMP, Vitest, MSW, Playwright.

## Objetivo

Implementar **Panel Admin: gestión de activos, QR, asignaciones y huérfanos** sin romper el contrato con Backend. El refresh token nunca debe leerse ni guardarse en frontend; viaja por cookie HttpOnly enviada automáticamente con `credentials: 'include'`.

## Contratos backend relacionados

- `POST /api/v1/assets`
- `GET /api/v1/orphans`
- `POST /api/v1/orphans/{id}/adopt`
- `WebSocket /topic/admin/alerts`
- `05_Contratos_Integracion/Contrato_WebSocket_STOMP_v6.md`

## Archivos completos a crear/modificar

| # | Categoría | Ruta | Clase/artefacto |
|---:|---|---|---|
| 1 | Page | `src/app/(protected)/admin/assets/page.tsx` | `AdminAssetsPage` |
| 2 | Page | `src/app/(protected)/admin/assets/new/page.tsx` | `CreateAssetPage` |
| 3 | Page | `src/app/(protected)/admin/orphans/page.tsx` | `OrphansPage` |
| 4 | Feature | `src/features/assets/components/CreateAssetForm.tsx` | `CreateAssetForm` |
| 5 | Feature | `src/features/assets/components/AssetQrCard.tsx` | `AssetQrCard` |
| 6 | Feature | `src/features/assets/components/AssetsTable.tsx` | `AssetsTable` |
| 7 | Feature | `src/features/assets/services/adminAssetsService.ts` | `adminAssetsService` |
| 8 | Feature | `src/features/assets/schemas/assetsSchemas.ts` | `assetSchema` |
| 9 | Feature | `src/features/orphans/components/OrphansTable.tsx` | `OrphansTable` |
| 10 | Feature | `src/features/orphans/services/orphansService.ts` | `orphansService` |
| 11 | Admin alerts | `src/features/admin/alerts/components/AdminAlertsPanel.tsx` | `AdminAlertsPanel` |
| 12 | Admin alerts | `src/features/admin/alerts/hooks/useAdminAlerts.ts` | `useAdminAlerts` |

## Integración con alertas administrativas en tiempo real

El panel admin es dueño visual de las alertas administrativas publicadas en `/topic/admin/alerts`. Debe consumirlas mediante la infraestructura STOMP creada en `ISSUE-FE-011` y mostrarlas sin duplicar lógica de conexión.

Eventos esperados:

```text
ASSET_ORPHAN_DETECTED
ADMIN_ALERT
SYSTEM_ALERT
```

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

- `src/features/admin/assetsSchema.test.ts`: validación de activo.

### Tests de componentes

- `src/features/admin/AssetForm.test.tsx`: crear activo.
- `src/features/admin/OrphanAssetsTable.test.tsx`: acciones adoptar/rechazar.

### Tests de integración con MSW

- `src/features/admin/AdminAssetsPage.test.tsx`: lista/crea/adopta con MSW.

### Tests E2E Playwright

- `e2e/admin-assets.spec.ts`: admin crea activo y ve QR.
- `e2e/admin-alerts.spec.ts`: admin ve alerta recibida desde `/topic/admin/alerts`.

### Tests de accesibilidad

- `Panel admin`: tablas con encabezados.


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
- [ ] Panel admin consume o visualiza eventos de `/topic/admin/alerts` según `Contrato_WebSocket_STOMP_v6.md`.


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
