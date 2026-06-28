# Convenciones de Código - J-AXON Frontend

## Propósito

Este documento establece las convenciones de código para mantener consistencia en el proyecto J-AXON Frontend.

## TypeScript

### Tipos e Interfaces

```typescript
// Interfaces para objetos
interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

// Types para uniones/enums
type UserRole = "ADMIN" | "TECHNICIAN" | "USER" | "AUDITOR";
type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

// Types para funciones
type FetchUser = (id: string) => Promise<User>;
type UserCallback = (user: User) => void;
```

### Nombres de Archivos

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes | PascalCase | `AuditLogTable.tsx` |
| Hooks | useNombre.ts | `useAuth.ts` |
| Servicios | nombre.service.ts | `audit.service.ts` |
| Tipos | nombre.types.ts | `audit.types.ts` |
| Constantes | nombre.ts | `routes.ts` |
| Utilidades | utils.ts | `http-client.ts` |
| Tests | nombre.test.tsx | `AuditLogTable.test.tsx` |

### Imports

```typescript
// Usar alias @/
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth";
import { httpClient } from "@/lib/api/http-client";
import type { AuditLog } from "@/types/audit";

// Imports relativos cuando sea necesario
import { AuditLogTable } from "./AuditLogTable";
```

## React

### Componentes

```typescript
// "use client" solo cuando sea necesario
"use client";

import { useState, useEffect } from "react";

interface Props {
  title: string;
  onChange?: (value: string) => void;
}

export function MyComponent({ title, onChange }: Props) {
  const [value, setValue] = useState("");
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  const handleClick = () => {
    onChange?.(value);
  };
  
  return (
    <div className="my-component">
      <h1>{title}</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
```

### Props

```typescript
// Tipos explícitos
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

// Valores por defecto
function Button({ variant = "primary", ... }: ButtonProps) {
  // ...
}
```

### Hooks Personalizados

```typescript
// useNombre.ts
import { useState, useCallback } from "react";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  
  const login = useCallback(async (credentials) => {
    // Login logic
  }, []);
  
  const logout = useCallback(() => {
    setUser(null);
  }, []);
  
  return { user, login, logout, isAuthenticated: !!user };
}
```

## Estilos (Tailwind CSS)

### Clases

```html
<!-- Layout -->
<div className="flex items-center justify-between gap-4">

<!-- Espaciado -->
<div className="p-4 m-2">

<!-- Tipografía -->
<p className="text-sm font-medium text-gray-900">

<!-- Estados -->
<button className="hover:bg-gray-100 disabled:opacity-50">
```

### Orden de Clases

1. Layout (flex, grid, block)
2. Dimensiones (w, h, min-, max-)
3. Espaciado (p, m)
4. Fondo (bg-)
5. Texto (text-, font-)
6. Bordes (border, rounded)
7. Estados (hover:, focus:, disabled:)

## Git

### Commits

```
feat(auth): add login form validation
fix(tickets): resolve status update bug
docs(readme): update installation steps
refactor(audit): simplify filter logic
test(reports): add KPI card tests
```

### Ramas

```
feature/FE-010    # Nueva funcionalidad
fix/FE-005       # Corrección
docs/README       # Documentación
```

## Testing

### Unitarios (Vitest)

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders title", () => {
    render(<MyComponent title="Hello" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### E2E (Playwright)

```typescript
import { test, expect } from "@playwright/test";

test("user can login", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[name="email"]', "test@test.com");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard");
});
```

## API

### Servicios

```typescript
// GET
async function getTickets(): Promise<Ticket[]> {
  return httpClient<Ticket[]>("/tickets", { method: "GET" });
}

// POST
async function createTicket(data: CreateTicketDTO): Promise<Ticket> {
  return httpClient<Ticket>("/tickets", { method: "POST", body: data });
}

// Con tipos específicos
interface GetTicketsParams {
  status?: TicketStatus;
  page?: number;
  pageSize?: number;
}
```

## Errores Comunes a Evitar

| Error | Solución |
|-------|---------|
| `any` | Usar tipos explícitos |
| `console.log` | Usar logger o eliminar |
| Magic strings | Usar constantes |
| Props any | Definir interfaz |
| Sin tests | Agregar tests |
| Nombres inconsistentes | Seguir convenciones |

## Recursos

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev)
- [Playwright](https://playwright.dev)