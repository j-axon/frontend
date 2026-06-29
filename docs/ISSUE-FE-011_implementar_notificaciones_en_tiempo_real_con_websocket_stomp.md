# ISSUE-FE-011 — Implementar notificaciones en tiempo real con WebSocket STOMP

**Módulo:** Frontend  
**Stack:** Next.js, React, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, STOMP, Vitest, MSW, Playwright.

## Objetivo

Implementar **Implementar notificaciones en tiempo real con WebSocket STOMP** sin romper el contrato con Backend. El refresh token nunca debe leerse ni guardarse en frontend; viaja por cookie HttpOnly enviada automáticamente con `credentials: 'include'`.

## Contratos backend relacionados

- `WebSocket /ws`
- `/user/queue/tickets`
- `/topic/tickets/technicians`
- `/topic/admin/alerts`
- `05_Contratos_Integracion/Contrato_WebSocket_STOMP_v6.md`

## Archivos completos a crear/modificar

| # | Categoría | Ruta | Clase/artefacto |
|---:|---|---|---|
| 1 | WS | `src/features/notifications/services/stompClient.ts` | `stompClient` |
| 2 | WS | `src/features/notifications/hooks/useRealtimeNotifications.ts` | `useRealtimeNotifications` |
| 3 | WS | `src/features/notifications/types/notification.types.ts` | `NotificationPayload` |
| 4 | UI | `src/features/notifications/components/NotificationsProvider.tsx` | `NotificationsProvider` |
| 5 | UI | `src/features/notifications/components/NotificationToast.tsx` | `NotificationToast` |
| 6 | WS admin | `src/features/notifications/services/adminAlertsSubscription.ts` | `adminAlertsSubscription` |
| 7 | UI admin | `src/features/notifications/components/AdminAlertToast.tsx` | `AdminAlertToast` |
| 8 | Test | `src/features/notifications/services/stompClient.test.ts` | `stompClientTest` |
| 9 | Test | `src/features/notifications/services/adminAlertsSubscription.test.ts` | `adminAlertsSubscriptionTest` |

## Reglas de integración

### Reglas específicas WebSocket STOMP

- Suscribirse a `/user/queue/tickets` para notificaciones privadas del usuario autenticado.
- Suscribirse a `/topic/tickets/technicians` solo si el usuario tiene rol `TECNICO` o `ADMIN`.
- Suscribirse a `/topic/admin/alerts` solo si el usuario tiene rol `ADMIN`.
- El payload debe mapearse desde `RealtimeNotificationPayload` / `NotificationPayload` según `Contrato_WebSocket_STOMP_v6.md`.


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

- `src/lib/websocket/stompClient.test.ts`: conecta/desconecta y reintenta.
- `src/features/notifications/services/adminAlertsSubscription.test.ts`: valida suscripción admin y rechazo para roles no permitidos.

### Tests de componentes

- `src/features/notifications/NotificationBell.test.tsx`: muestra contador y lista.

### Tests de integración con MSW

- `src/features/notifications/useNotifications.test.tsx`: mock STOMP events.

### Tests E2E Playwright

- `e2e/websocket-notifications.spec.ts`: notificación aparece en UI.
- `e2e/admin-alerts.spec.ts`: ADMIN recibe alerta en `/topic/admin/alerts`.

### Tests de accesibilidad

- `Notificaciones`: aria-live para eventos nuevos.


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
