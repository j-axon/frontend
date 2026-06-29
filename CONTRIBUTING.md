# Contribuir al Frontend J-AXON

¡Gracias por sumarte! Esta guía explica el flujo de trabajo para
contribuir en `j-axon-frontend`.

## Flujo de ramas

- `main`: estable, recibe merges desde `develop`.
- `develop`: rama de integración.
- Ramas feature: `feature/FE-001-nombre-corto` (sigue el ID de las issues).

## Antes de empezar

1. Hacer fork y clonar tu fork.
2. Crear rama `feature/FE-###-descripcion`.
3. Instalar dependencias: `npm install`.
4. Crear `.env.local` desde `.env.example`.

## Estilo de código

- TypeScript en modo estricto (`strict: true`).
- ESLint con `next/core-web-vitals` y `next/typescript`.
- Tailwind CSS para estilos. No usar CSS modules a menos que sea necesario.
- Componentes en `src/shared/components` (UI genérico) o `src/features/<feature>/components`.
- Lógica de negocio y llamadas HTTP siempre en `services/`.
- Hooks en `hooks/`.
- Schemas de validación en `schemas/`.

## Validación antes de push

```bash
npm run lint
npm run test
npm run build
```

Si trabajas en un flujo crítico:

```bash
npx playwright test
```

## Reglas de integración con Backend

- Coincide con `Contrato_API_Backend_Frontend_v6.md`.
- El **refresh token** viaja en cookie `HttpOnly`; el frontend **no** lo lee ni lo guarda.
- Las llamadas que dependen de cookies usan `credentials: "include"`.
- Tipos de respuesta: `accessToken`, `tokenType`, `expiresIn`, `usuario`.
- Roles v6: `ADMIN`, `TECNICO`, `USUARIO`, `AUDITOR`.

## Estructura de carpetas por feature

```text
src/features/<feature>/
├── components/
├── hooks/
├── schemas/
├── services/
├── types/
└── utils/
```

## Nombrado

- Componentes: `PascalCase`.
- Hooks: `useAlgo`.
- Servicios: `algoService.ts`.
- Tipos: re-exportar desde `src/types/` cuando son contratos.

## Cómo abrir un PR

- Título: `[FE-###] Breve descripción`.
- Vincular la issue correspondiente.
- Incluir checklist v6 del issue.
- Adjuntar screenshots si hay cambios visuales.

## Reporte de bugs

Usa el comando `/reportbug` en el chat o abre una issue con:

- Pasos para reproducir.
- Resultado esperado vs actual.
- Logs/errores.
- Navegador y sistema.

---

Mantén el README y `docs/frontend/` actualizados al cerrar cada issue.
