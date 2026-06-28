# Estructura Frontend J-AXON

Este documento describe la estructura inicial del repositorio frontend.

## Capas

- `app`: rutas y layouts de Next.js.
- `components`: componentes visuales reutilizables.
- `features`: lógica agrupada por dominio funcional.
- `lib`: integraciones técnicas como HTTP, WebSocket, validaciones y manejo de sesión.
- `types`: contratos TypeScript compartidos.
- `constants`: rutas, roles y valores fijos.
- `tests`: pruebas unitarias, integración y E2E.

## Flujo de ramas

- `main`: rama estable.
- `develop`: rama de integración.
- ramas feature: `feature/FE-001-nombre-corto`.