# J-AXON Frontend

Frontend web para J-AXON: sistema de Help Desk, inventario inteligente, escaneo QR, paneles por rol, tickets, activos, notificaciones en tiempo real e integración con resultados de IA.

## Stack base

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint
- Vitest
- Playwright
- MSW

## Estructura principal

```txt
src/
├── app/                  # Rutas Next.js App Router
├── components/           # Componentes reutilizables
├── features/             # Módulos funcionales por dominio
├── hooks/                # Hooks reutilizables
├── lib/                  # Clientes, utilidades e integraciones
├── constants/            # Rutas, roles y valores constantes
├── types/                # Tipos TypeScript compartidos
└── middleware.ts         # Protección de rutas / RBAC
```

## Primeros pasos

```bash
pnpm install
cp .env.example .env.local
pnpm run dev
```

## Scripts

```bash
pnpm run dev
pnpm run build
pnpm run lint
pnpm run test
pnpm run test:e2e
```

## Variables de entorno

No subir archivos `.env` reales al repositorio. Usar `.env.example` como plantilla.
