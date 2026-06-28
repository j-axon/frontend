# Guía de Contribución - J-AXON Frontend

## Flujo de Trabajo

1. **Fork** del repositorio
2. **Clonar** tu fork localmente
3. **Crear** una rama para tu feature/fix
4. **Desarrollar** con tests
5. **Hacer commit** siguiendo convenciones
6. **Push** a tu fork
7. **Crear Pull Request**

## Ramas

| Rama | Propósito | Ejemplo |
|------|-----------|---------|
| `main` | Producción estable | - |
| `develop` | Integración | - |
| `feature/ISSUE-XXX` | Nueva funcionalidad | feature/FE-010 |
| `fix/ISSUE-XXX` | Corrección de bug | fix/FE-005 |
| `hotfix/XXX` | Corrección urgente | hotfix/001 |
| `docs/XXX` | Documentación | docs/README |

## Commits

### Formato

```
<tipo>(<área>): <descripción短的>

[opcional: cuerpo]

[opcional: footer]
```

### Tipos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Documentación |
| `style` | Formato (no lógica) |
| `refactor` | Refactorización |
| `test` | Tests |
| `chore` | Mantenimiento |

### Ejemplos

```bash
# Feature
feat(audit): add AuditLogTable component with filters

# Fix
fix(tickets): resolve ticket creation validation error

# Docs
docs(readme): update installation instructions
```

### Reglas

- Usar imperativo: "add" no "added"
- Máximo 72 caracteres en título
- Cuerpo separado por línea en blanco
- Footer para referencias: `Closes #123`

## Pull Requests

### Requisitos

1. **Título claro**: `[ISSUE-XXX] Descripción`
2. **Descripción**: Qué, por qué, cómo
3. **Checklist de DoD** completada
4. **Tests pasando**
5. **Linting sin errores**

### Checklist de DoD

- [ ] Código sigue convenciones
- [ ] Tests unitarios creados/actualizados
- [ ] Tests E2E actualizados si aplica
- [ ] Documentación actualizada
- [ ] Build pasa sin errores
- [ ] Linting sin warnings

### Proceso

```
1. Crear rama desde develop
2. Desarrollar y testear localmente
3. Hacer push y abrir PR
4. Solicitar reviewers
5. Address feedback
6. Mergear cuando approved
```

## Convenciones de Código

### TypeScript

```typescript
// Interfaces para tipos
interface User {
  id: string;
  name: string;
}

// Types para uniones
type UserRole = "ADMIN" | "TECHNICIAN" | "USER" | "AUDITOR";

// Funciones con tipos explícitos
function getUser(id: string): Promise<User> {
  // ...
}
```

### Componentes React

```typescript
// Usar "use client" solo cuando sea necesario
"use client";

import { useState, useEffect } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}
```

### Nombres

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Archivos | kebab-case | `audit-log-table.tsx` |
| Componentes | PascalCase | `AuditLogTable.tsx` |
| Funciones | camelCase | `getAuditLogs()` |
| Constantes | UPPER_SNAKE_CASE | `MAX_RECONNECT_ATTEMPTS` |
| Hooks | use prefix | `useAuth()` |
| Tests | nombre.spec.ts | `audit-log-table.test.tsx` |

### Rutas

```typescript
// Usar alias @
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth";
```

## Testing

### Tests Unitarios

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### Tests E2E

```typescript
import { test, expect } from "@playwright/test";

test("login flow", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[name="email"]', "test@test.com");
  await page.fill('input[name="password"]', "password");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard");
});
```

## Build y Deployment

```bash
# Desarrollo
npm run dev

# Build local
npm run build

# Verificar errores
npm run lint
npm run test
npm run test:e2e
```

## Recursos

- [Testing E2E](./docs/frontend/testing-e2e.md)
- [Convenciones](./docs/frontend/conventions.md)
- [Definition of Done](./docs/frontend/definition-of-done.md)