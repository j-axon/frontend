# J-AXON FRONTEND - GITFLOW Y CONVENCIONES DE COMMITS

## ESTRUCTURA DE RAMAS

```
main          ← rama estable, solo se actualiza manualmente tras verificación
  ↑
develop       ← rama de integración, todos los PRs van aquí
  ↑
feature/*     ← ramas de nuevas funcionalidades
fix/*         ← ramas de corrección de bugs
```

## REGLAS DE RAMAS

1. **Nunca hacer commits directos a `main` ni `develop`.**
2. Crear ramas desde `develop`: `git checkout -b feature/<modulo>/<descripcion>` o `fix/<modulo>/<descripcion>`.
3. Los commits se realizan exclusivamente en la rama de trabajo.
4. Cuando la rama está lista, se crea un Pull Request hacia `develop`.
5. `main` solo se actualiza manualmente después de una verificación explícita.

## FLUJO DE TRABAJO

1. Sincronizar: `git fetch --all` y `git pull origin develop`.
2. Crear rama: `git checkout -b feature/<modulo>/<descripcion>` desde `develop`.
3. Desarrollar y hacer commits convencionales.
4. Ejecutar validadores antes de cada commit.
5. Push a la rama: `git push origin feature/<modulo>/<descripcion>`.
6. Crear PR hacia `develop`.
7. Obtener al menos 1 aprobación de compañero.
8. Merge a `develop` (no a `main`).

## CONVENTIONAL COMMITS

Obligatorio usar el formato:

```
<tipo>: <descripción corta>

[opcional: cuerpo del commit]

[opcional:footer]
```

### Tipos permitidos

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `refactor` | Reestructuración sin cambio funcional |
| `test` | Agregar o modificar pruebas |
| `chore` | Tareas de mantenimiento, dependencias, CI |

### Ejemplos

```bash
git commit -m "feat: agregar componente de gráfico de telemetría"
git commit -m "fix: corregir renderizado de alertas en móvil"
git commit -m "test: agregar tests de renderizado con Vitest"
git commit -m "chore: actualizar dependencias de TanStack Query"
```

## VALIDADORES PRE-COMMIT

Ejecutar antes de cada commit:

```bash
pnpm run lint
pnpm run test
```

## DEFINITION OF DONE (DoD)

- El código compila sin errores ni warnings críticos.
- Se respeta la arquitectura definida (SOLID en UI, hooks separados).
- No hay secretos, `console.log` innecesarios ni código comentado de debug.
- Tipado estricto: prohibido el uso de `any`.
- Criterios de aceptación cumplidos.
- Casos de prueba asociados ejecutados y pasando.
- Tests del módulo pasan.
- Componentes documentados si aplica.
- PR aprobado por al menos un compañero.
- Issue y tablero actualizados.
