# Testing — Frontend J-AXON

## Niveles

1. **Unit / Componentes**: Vitest + Testing Library + jsdom.
2. **Integration (API mock)**: MSW sobre `setupServer`.
3. **E2E**: Playwright (chromium por defecto).

## Estructura de tests

```text
src/
├── shared/lib/env.test.ts             (unit)
├── shared/lib/http/client.test.ts     (integration / apiClient)
├── features/qr/utils/parseQrPayload.test.ts (unit)
├── features/auth/store/authStore.test.ts    (unit, garantiza no localStorage)
├── features/auth/services/authService.test.ts (integration con MSW)
├── features/auth/components/RoleGuard.test.tsx (lógica pura de roles)
├── features/auth/components/LoginForm.test.tsx (componente con MSW)
└── features/tickets/components/MyTicketsTable.test.tsx

tests/e2e/
├── auth-login.spec.ts
├── qr-ticket.spec.ts
├── technician-flow.spec.ts
├── auditor-readonly.spec.ts
├── rbac-navigation.spec.ts
├── session-refresh.spec.ts
├── websocket-notifications.spec.ts
└── admin-alerts.spec.ts
```

## Comandos

```bash
npm run test           # modo watch
npm run test:run       # single run
npm run test:coverage  # con coverage (vitest)
npm run test:e2e       # Playwright
```

## Buenas prácticas

- **Mock del backend con MSW** en cualquier test que haga fetch.
- **No** guardar tokens en `localStorage` ni `sessionStorage` en tests.
- Usar `renderWithProviders` para envolver con `QueryClientProvider`.
- En E2E, aislar el estado con `await page.context().clearCookies()`.
- Validar accesibilidad con `axe` opcionalmente (`@axe-core/playwright`).
