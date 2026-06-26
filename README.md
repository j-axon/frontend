# J-AXON Frontend

Frontend web para el ecosistema **J-AXON**: un sistema avanzado de Help Desk con inventario inteligente, escaneo de códigos QR, paneles adaptados por rol, gestión de tickets, control de activos, notificaciones en tiempo real e integración directa con resultados de IA.

---

## Stack Tecnológico Base

| Categoría | Tecnologías Utilizadas |
| :--- | :--- |
| **Core** | Next.js (App Router), React, TypeScript |
| **Estilos** | Tailwind CSS |
| **Calidad de Código** | ESLint |
| **Pruebas (Testing)** | Vitest, Playwright, MSW (Mock Service Worker) |

---

## Estructura Principal del Proyecto

```text
src/
├── app/                  # Rutas y páginas de Next.js (App Router)
├── components/           # Componentes UI globales y reutilizables
├── features/             # Módulos funcionales organizados por dominio
├── hooks/                # Custom hooks globales compartidos
├── lib/                  # Clientes de API (httpClient), utilidades e integraciones
├── constants/            # Rutas de navegación, roles y valores fijos
├── types/                # Definiciones de tipos TypeScript compartidos
└── middleware.ts         # Protección de rutas y control de acceso (RBAC)
```
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