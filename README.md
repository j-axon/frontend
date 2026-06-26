J-AXON Frontend
Frontend web para J-AXON: sistema de Help Desk, inventario inteligente, escaneo QR, paneles por rol, tickets, activos, notificaciones en tiempo real e integración con resultados de IA.

Stack base
Next.js
React
TypeScript
Tailwind CSS
ESLint
Vitest
Playwright
MSW
Estructura principal
src/
├── app/                  # Rutas Next.js App Router
├── components/           # Componentes reutilizables
├── features/             # Módulos funcionales por dominio
├── hooks/                # Hooks reutilizables
├── lib/                  # Clientes, utilidades e integraciones
├── constants/            # Rutas, roles y valores constantes
├── types/                # Tipos TypeScript compartidos
└── middleware.ts         # Protección de rutas / RBAC
Primeros pasos
npm install
cp .env.example .env.local
npm run dev
Scripts
npm run dev
npm run build
npm run lint
npm run test
npm run test:e2e
Variables de entorno
No subir archivos .env reales al repositorio. Usar .env.example como plantilla.