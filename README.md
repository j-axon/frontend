# J-AXON · Frontend

Frontend web del sistema Help Desk e inventario inteligente **J-AXON**.
Construido con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**,
**TanStack Query**, **React Hook Form + Zod**, **STOMP** y **Vitest + MSW + Playwright**.

> Contrato base: `Contrato_API_Backend_Frontend_v6.md`.
> Eventos: `Contrato_WebSocket_STOMP_v6.md`.

> 📚 Documentación extendida: `docs/frontend/`.

## 🚀 Stack

- **Framework:** Next.js 14 App Router
- **Lenguaje:** TypeScript estricto
- **Estilos:** Tailwind CSS con tema oscuro
- **Estado servidor:** TanStack Query v5
- **Formularios:** React Hook Form + Zod
- **Realtime:** STOMP.js sobre WebSocket
- **Estado cliente:** Zustand
- **HTTP cliente propio** con `credentials: "include"` y refresh silencioso
- **Tests unitarios / componentes:** Vitest + Testing Library + MSW
- **Tests E2E:** Playwright

## 📂 Estructura

```text
src/
├── app/                  # Rutas App Router (auth, protected, public)
├── shared/               # Componentes UI reutilizables, clientes HTTP, tipos
│   ├── components/{ui,layout,feedback}
│   ├── lib/{http,env}
│   ├── types
│   └── config
├── features/             # Módulos por dominio (auth, qr, tickets, ai, assets, …)
├── constants/            # Rutas y roles
├── types/                # Tipos compartidos backend
├── test/                 # Setup Vitest + MSW handlers + utilities
└── middleware.ts         # Middleware Next.js
tests/e2e/                # Playwright specs + helpers + fixtures
docs/                     # Documentación de issues (FE-001..FE-014) y frontend
```

## 🧭 Issues implementadas (FE-001 → FE-014)

| ID | Foco |
|----|------|
| FE-001 | Inicialización Next.js + TypeScript + estructura base + UI compartido |
| FE-002 | Login, logout y manejo de sesión |
| FE-003 | Rutas protegidas y navegación por rol |
| FE-004 | Cliente HTTP, errores globales y refresh silencioso |
| FE-005 | Escaneo de QR desde cámara móvil |
| FE-006 | Formulario de ticket precargado desde QR |
| FE-007 | Panel usuario normal: mis tickets + notificaciones |
| FE-008 | Panel técnico: cola, detalle, diagnóstico IA |
| FE-009 | Panel admin: activos, QR, huérfanos, alertas |
| FE-010 | Panel auditor: logs y reportes de solo lectura |
| FE-011 | WebSocket STOMP y notificaciones en tiempo real |
| FE-012 | Pruebas de componentes y mocks de API (MSW) |
| FE-013 | Pruebas E2E críticas con Playwright |
| FE-014 | Documentación (README + CONTRIBUTING + docs/frontend/*) |

## 🖼️ Cómo se ve el front (resumen visual)

A grandes rasgos, las pantallas y secciones que verás al levantar `npm run dev`:

### Landing `/`
- Fondo con gradiente índigo/cian.
- Hero con titular grande con gradiente.
- Botones **Iniciar sesión** y **Ver características**.
- Sección de 4 tarjetas: **QR móvil**, **Tickets**, **Diagnóstico IA**, **Tiempo real**.
- Footer con año dinámico.

### Login `/login`
- Layout centrado sobre fondo dark.
- Card con borde suave, ícono del logo ⚡.
- **Inputs con icono**: mail y lock.
- Botón grande `Iniciar sesión` con spinner de loading.
- Errores inline + alerta general con `role="alert"`.
- Enlace a soporte.

### Dashboard `/dashboard`
- Saludo dinámico ("Buenos días/tardes/noches, Ada").
- 6 tarjetas de acción rápida (visibles según rol):
  - 📷 Escanear QR
  - 🎫 Mis tickets
  - 🛠️ Cola de tickets
  - 📦 Gestión de activos
  - 🧩 Activos huérfanos
  - 📊 Reportes
- Card de "Atajos" con tips.

### AppShell (todas las páginas protegidas)
- **Topbar sticky** con:
  - Logo + nombre + badge de conexión STOMP (verde/cyan/gris).
  - 🔔 Campana con contador de notificaciones no leídas → `/notifications`.
  - Datos del usuario (avatar con iniciales, roles).
  - Botón **Salir** (logout).
- **Sidebar lateral** (oculta en mobile, visible ≥ lg): muestra solo los módulos del rol (`navigationFor(roles)`).
- En mobile, el sidebar se oculta y queda solo topbar con menú hamburguesa visual.
- Link "Saltar al contenido principal" para accesibilidad.

### Mis tickets `/my-tickets`
- Cabecera con título y campana de notificaciones.
- Tabla responsive con columnas: Código, Título, Activo, Estado, Creado.
- Badges de estado (`Abierto / En progreso / Resuelto / Cerrado / Cancelado`).
- Empty state con CTA "Escanea el QR".

### Escanear QR `/qr/scan`
- Marco animado (pulse) sobre fondo negro con `id` dinámico.
- Botones: **📷 Iniciar cámara** y **Detener cámara**.
- Mensaje de estado del permiso (IDLE/PROMPT/GRANTED/DENIED/UNSUPPORTED/ERROR).
- Al leer UUID, redirige a `/tickets/new/{uuid}`.

### Nuevo ticket desde QR `/tickets/new/[qrUuid]`
- Header con UUID del activo.
- **AssetReadonlyCard** con datos del activo (código, asignado, estado).
- **CreateTicketForm** con:
  - Título
  - Descripción (textarea)
  - Categoría (HARDWARE/SOFTWARE/NETWORK/PERIPHERAL/OTHER)
  - Prioridad (LOW/MEDIUM/HIGH/CRITICAL)
  - Botón **Crear ticket**
- Errores en línea asociados a inputs (`aria-invalid`, `aria-describedby`).

### Cola del técnico `/technician/tickets`
- Lista clicable con cada ticket (título, código, activo, prioridad coloreada, badge de estado).
- Se auto-refresca cada 30 s.
- Empty state si no hay pendientes.

### Detalle de ticket del técnico `/technician/tickets/[ticketId]`
- **TicketDetailPanel** con toda la metadata + descripción.
- **AiDiagnosisCard** debajo: botón `🤖 Generar diagnóstico`. Al pedirlo muestra:
  - Resumen.
  - Título, justificación, lista de pasos, link al KB relacionado.
  - **ConfidenceBadge** (🟢 Alta / 🔵 Media / 🟡 Baja) + porcentaje.
  - Botón **Regenerar**.

### Admin: activos `/admin/assets`
- Cabecera con CTA **➕ Nuevo activo**.
- Tabla con Código, Nombre, Estado (Badge), Asignado, enlace "Ver QR".

### Admin: crear activo `/admin/assets/new`
- Formulario con código, nombre, serial, descripción, asignado.
- Validación Zod con mensajes en español.

### Admin: huérfanos `/admin/orphans`
- Sección **Alertas en vivo** (consume `/topic/admin/alerts` desde STOMP): tarjetas por alerta con badge por severidad y timestamp.
- Sección **Pendientes de adopción** con tabla y botón **Adoptar** por fila (invalidación de caché React Query al éxito).

### Auditor: logs `/auditor/audit`
- Filtros (actor, acción, desde, hasta) + botón **Aplicar**.
- Tabla con fecha, actor, acción (Badge), recurso.
- Empty state informativo.

### Auditor: reportes `/auditor/reports`
- 5 tarjetas KPI (Total, Abiertos, En progreso, Resueltos, Críticos) + tiempo medio de resolución.
- Gráfico de barras custom (sin libs externas) **Top 10 activos con más incidentes**, accesible (`aria-label`, texto `sr-only`).

### Notificaciones `/notifications`
- Cabecera con dos botones: **Marcar todas leídas** y **Limpiar**.
- Lista con badge de tipo, título, mensaje, fecha.
- Conexión STOMP en vivo arriba (`/user/queue/tickets` para todos, `/topic/tickets/technicians` para TECNICO/ADMIN, `/topic/admin/alerts` para ADMIN).
- Toast efímero en la esquina superior cuando llega una notificación nueva.

> Todas las páginas usan `LoadingState` con skeleton y `ErrorState` con reintento.

## ⚙️ Configuración

```bash
# 1. Instalar dependencias
npm install

# 2. Variables de entorno (opcional)
cp .env.example .env.local

# 3. Levantar en desarrollo
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000).

### Variables de entorno (frontend, todas `NEXT_PUBLIC_*`)

| Variable | Default | Descripción |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8080/api/v1` | URL base del backend v6 |
| `NEXT_PUBLIC_WS_URL` | `ws://localhost:8080/ws` | Endpoint STOMP |
| `NEXT_PUBLIC_APP_NAME` | `J-AXON` | Nombre visible |
| `NEXT_PUBLIC_APP_ENV` | `development` | Entorno |
| `NEXT_PUBLIC_QR_SCAN_ROUTE` | `/qr/scan` | Ruta de escaneo |

## 🔒 Seguridad y sesión

- El **access token** vive solo en memoria (`tokenMemoryStore`).
- El **refresh token** viaja en cookie `HttpOnly` gestionada por el backend y se envía automáticamente con `credentials: "include"`.
- Frontend oculta acciones por **rol**, pero el **backend sigue siendo la fuente real de autorización**.
- El QR se lee por **cámara del cliente**; nunca se pega texto manual como flujo principal.
- Tests verifican que **nada** del token aterriza en `localStorage`/`sessionStorage`.

## 🧪 Tests

```bash
# Unit + integration (Vitest + MSW)
npm run test
npm run test:run   # single run

# E2E (Playwright)
npm run test:e2e:install   # primera vez
npm run test:e2e
```

### Cobertura incluida

- `src/features/auth/store/authStore.test.ts` — confirma in-memory only.
- `src/shared/lib/http/client.test.ts` — Authorization header + skipAuth.
- `src/features/qr/utils/parseQrPayload.test.ts` — UUID, /scan/{uuid}, ?uuid=.
- `src/features/auth/components/RoleGuard.test.tsx` — matriz de roles.
- `src/features/auth/components/LoginForm.test.tsx` — validación visible.
- `src/features/auth/services/authService.test.ts` — login/logout/refresh con MSW.
- `src/features/tickets/components/CreateTicketForm.test.tsx` — precarga con qrUuid.
- `src/features/tickets/components/MyTicketsTable.test.tsx` — empty/content.
- `tests/e2e/auth-login.spec.ts` — flujo de login.
- `tests/e2e/qr-ticket.spec.ts` — ruta escaneo.
- `tests/e2e/rbac-navigation.spec.ts` — ADMIN/TECNICO/AUDITOR.
- `tests/e2e/session-refresh.spec.ts` — navegación post-login.
- `tests/e2e/websocket-notifications.spec.ts` — panel de notificaciones.
- `tests/e2e/admin-alerts.spec.ts` — admin ve alerta.

## 📡 WebSocket STOMP

Suscripciones realizadas según rol (`Contrato_WebSocket_STOMP_v6.md`):

| Rol | Tópicos |
|-----|---------|
| Todos los usuarios autenticados | `/user/queue/tickets` |
| `TECNICO`, `ADMIN` | `/topic/tickets/technicians` |
| `ADMIN` | `/topic/admin/alerts` |

Eventos esperados: `TICKET_CREATED`, `TICKET_UPDATED`, `TICKET_ASSIGNED`, `TICKET_RESOLVED`, `ASSET_ORPHAN_DETECTED`, `ADMIN_ALERT`, `SYSTEM_ALERT`, `AI_DIAGNOSIS_READY`.

## 🚦 Comandos antes de push

```bash
npm run lint
npm run test
npm run build
npx playwright test    # si la issue toca flujos críticos
```

## 🧱 Próximas integraciones con backend

Cuando el backend v6 implemente los endpoints reales, ajustar:

- `/api/v1/auth/*`, `/auth/me`, `/auth/refresh`
- `/api/v1/tickets`, `/api/v1/tickets/my`, `/api/v1/ai/tickets/{id}/diagnose`
- `/api/v1/assets/qr/{uuid}`, `/api/v1/orphans*`
- `/api/v1/audit/logs`, `/api/v1/reports/tickets/summary`
- Tópicos STOMP arriba listados

## 📚 Documentación adicional

- `CONTRIBUTING.md`: guía para contribuir.
- `docs/frontend/env.md`: variables de entorno.
- `docs/frontend/architecture.md`: arquitectura y flujo de datos.
- `docs/frontend/testing.md`: guía de tests.
- `docs/frontend/api-contracts.md`: contratos REST + WebSocket.

---

© J-AXON · v6
