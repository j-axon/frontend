# Testing E2E con Playwright - Documentación Técnica

## ISSUE-FE-013

### Descripción

Configuración de pruebas end-to-end con Playwright para automatizar flujos críticos del sistema J-AXON.

### Configuración

#### playwright.config.ts

```typescript
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } }
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  }
});
```

### Estructura de Pruebas

```
tests/e2e/
├── fixtures/
│   └── auth.fixture.ts          # Fixtures de autenticación
├── utils/
│   └── test-users.ts       # Usuarios de prueba
├── auth/
│   └── login.spec.ts       # Pruebas de login
├── tickets/
│   └── create-ticket-from-qr.spec.ts
├── technician/
│   └── ticket-diagnosis.spec.ts
├── auditor/
│   └── readonly-panel.spec.ts
└── home.spec.ts          # Prueba existente
```

### Usuarios de Prueba

```typescript
export const testUsers = {
  ADMIN: { email: "admin@j-axon.com", password: "Admin123!", roles: ["ADMIN"] },
  TECHNICIAN: { email: "tecnico@j-axon.com", password: "Tech123!", roles: ["TECHNICIAN"] },
  USER: { email: "usuario@j-axon.com", password: "User123!", roles: ["USER"] },
  AUDITOR: { email: "auditor@j-axon.com", password: "Audit123!", roles: ["AUDITOR"] }
};
```

### Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run test:e2e` | Ejecutar todas las pruebas E2E |
| `npx playwright test` | Ejecutar con Playwright CLI |
| `npx playwright test --project=chromium` | Ejecutar solo en Chrome |
| `npx playwright show-report` | Mostrar reporte HTML |

### Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `E2E_BASE_URL` | URL base para pruebas | http://localhost:3000 |
| `CI` | Modo CI (más retries) | undefined |

### Casos de Prueba

| ID | Descripción |
|----|-------------|
| E2E-FE-AUTH-001 | Login exitoso |
| E2E-FE-AUTH-002 | Login con credenciales inválidas |
| E2E-FE-AUTH-003 | Validación de formulario |
| E2E-FE-TICKET-001 | Crear ticket desde QR |
| E2E-FE-TICKET-002 | QR inválido |
| E2E-FE-TICKET-003 | Usuario no autenticado |
| E2E-FE-TECH-001 | Acceso panel técnico |
| E2E-FE-AUDIT-001 | Acceso audit logs |
| E2E-FE-AUDIT-002 | Acceso reportes |

### Mejores Prácticas

1. **Fixtures reutilizables**: Usar fixtures para autenticación
2. **Datos de prueba**: Mocks en `test-users.ts`
3. **Timeouts**: Configurar timeouts apropiados
4. **Screenshot on failure**: Automático en fallos
5. **Navegación explícita**: Usar `waitForURL`

### Ejecución en CI

```yaml
# .github/workflows/e2e.yml
- name: E2E Tests
  run: npm run test:e2e
  env:
    CI: true
    E2E_BASE_URL: https://staging.j-axon.com
```

### Tips de Debug

```typescript
// Pausar en error
test.skip debugger;

// Ver trace
npx playwright show-trace trace.zip;

// Grabación de video
// Configurado automáticamente en failures
```