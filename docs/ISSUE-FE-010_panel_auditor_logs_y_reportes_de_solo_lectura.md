# ISSUE-FE-010 — Panel Auditor: logs y reportes de solo lectura

**Módulo:** Frontend  
**Stack:** Next.js, React, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, STOMP, Vitest, MSW, Playwright.

## Objetivo

Implementar **Panel Auditor: logs y reportes de solo lectura** sin romper el contrato con Backend. El refresh token nunca debe leerse ni guardarse en frontend; viaja por cookie HttpOnly enviada automáticamente con `credentials: 'include'`.

## Contratos backend relacionados

- `GET /api/v1/audit/logs`
- `GET /api/v1/reports/tickets/summary`

## Archivos completos a crear/modificar

| # | Categoría | Ruta | Clase/artefacto |
|---:|---|---|---|
| 1 | Page | `src/app/(protected)/auditor/audit/page.tsx` | `AuditLogsPage` |
| 2 | Page | `src/app/(protected)/auditor/reports/page.tsx` | `ReportsPage` |
| 3 | Feature | `src/features/audit/components/AuditLogsTable.tsx` | `AuditLogsTable` |
| 4 | Feature | `src/features/audit/components/AuditFilters.tsx` | `AuditFilters` |
| 5 | Feature | `src/features/audit/services/auditService.ts` | `auditService` |
| 6 | Feature | `src/features/reports/components/TicketMetricsCards.tsx` | `TicketMetricsCards` |
| 7 | Feature | `src/features/reports/components/AssetsIncidentsChart.tsx` | `AssetsIncidentsChart` |
| 8 | Feature | `src/features/reports/services/reportsService.ts` | `reportsService` |

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

- `src/features/audit/auditFilters.test.ts`: filtros de logs y reportes.

### Tests de componentes

- `src/features/audit/AuditLogTable.test.tsx`: tabla logs.
- `src/features/reports/TicketMetricsCard.test.tsx`: métricas.

### Tests de integración con MSW

- `src/features/audit/AuditorPanel.test.tsx`: consulta con MSW.

### Tests E2E Playwright

- `e2e/auditor-readonly.spec.ts`: auditor solo lectura.

### Tests de accesibilidad

- `Reportes`: gráficos con texto alternativo/resumen.


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
