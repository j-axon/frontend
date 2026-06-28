# J-AXON Frontend

Frontend web para J-AXON: Help Desk, inventario inteligente, escaneo QR, paneles por rol, tickets, activos, notificaciones en tiempo real e integración con resultados de IA.

## Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| UI | React 18, TypeScript |
| Estilos | Tailwind CSS |
| Testing | Vitest, Testing Library, Playwright |
| API Mock | MSW (Mock Service Worker) |
| Linting | ESLint, Next.js lint |
| WebSocket | @stomp/stompjs |
| Query | @tanstack/react-query |

## Requisitos Previos

- Node.js 18+
- npm 9+
- Git

## Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd frontend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local
```

## Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL del API backend | http://localhost:8080/api |
| `NEXT_PUBLIC_WS_URL` | URL del WebSocket | ws://localhost:8080/ws |
| `NEXT_PUBLIC_APP_NAME` | Nombre de la app | J-AXON |
| `NEXT_PUBLIC_APP_ENV` | Entorno | development |
| `E2E_BASE_URL` | URL para tests E2E | http://localhost:3000 |

⚠️ **Importante**: Nunca subir archivos `.env` reales al repositorio.

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Construir para producción |
| `npm run start` | Iniciar servidor de producción |
| `npm run lint` | Ejecutar ESLint |
| `npm run test` | Ejecutar tests unitarios |
| `npm run test:coverage` | Tests con coverage |
| `npm run test:e2e` | Ejecutar tests E2E |

## Estructura del Proyecto

```
src/
├── app/                    # Rutas Next.js App Router
│   ├── (auth)/            # Grupo: autenticación
│   ├── (dashboard)/      # Grupo: panel principal
│   ├── (protected)/    # Grupo: rutas protegidas
│   └── (public)/       # Grupo: acceso público
├── components/             # Componentes reutilizables
│   ├── common/
│   ├── forms/
│   ├── layout/
│   └── notifications/
├── features/              # Módulos por dominio
│   ├── audit/
│   ├── auth/
│   ├── notifications/
│   ├── reports/
│   └── tickets/
├── hooks/                # Hooks personalizados
├── lib/                  # Utilidades
│   ├── api/            # HTTP client
│   ├── auth/           # Auth utilities
│   └── websocket/      # WebSocket client
├── constants/           # Constantes
├── types/               # Tipos TypeScript
└── middleware.ts        # Protección de rutas
```

## Rutas

| Ruta | Descripción | Rol |
|------|------------|-----|
| `/login` | Login | Público |
| `/dashboard` | Panel principal | USER, TECHNICIAN, ADMIN |
| `/tickets` | Gestión de tickets | USER, TECHNICIAN, ADMIN |
| `/assets` | Gestión de activos | USER, TECHNICIAN, ADMIN |
| `/admin` | Administración | ADMIN |
| `/auditor/audit-logs` | Logs de auditoría | AUDITOR |
| `/auditor/reports` | Reportes | AUDITOR |
| `/scan/[qrToken]` | Escaneo QR | USER |

## Testing

### Tests Unitarios

```bash
# Ejecutar todos
npm run test

# Con coverage
npm run test:coverage

# Modo watch
npm run test -- --watch
```

### Tests E2E

```bash
# Ejecutar todos
npm run test:e2e

# Solo Chrome
npx playwright test --project=chromium

# Ver reporte
npx playwright show-report
```

## Documentación Adicional

- [Contribución](./CONTRIBUTING.md)
- [Convenciones](./docs/frontend/conventions.md)
- [Definition of Done](./docs/frontend/definition-of-done.md)
- [Testing E2E](./docs/frontend/testing-e2e.md)
- [Panel Auditor](./docs/frontend/auditor-panel.md)

## Scripts npm

```bash
# Desarrollo
npm run dev              # Dev server en puerto 3000

# Build
npm run build           # Build de producción
npm run start          # Iniciar producción

# Quality
npm run lint           # ESLint
npm run lint:fix       # ESLint fix

# Testing
npm run test            # Unit tests (Vitest)
npm run test:coverage # Coverage
npm run test:e2e       # E2E (Playwright)
```

## Licencia

Privado - J-AXON