# Panel de Auditoría - Documentación Técnica

## ISSUE-FE-010

### Descripción

El Panel de Auditoría es una sección de solo lectura destinada al rol **AUDITOR**. Permite consultar registros de auditoría y reportes agregados sin posibilidad de modificación.

### Requisitos Funcionales

1. **Registros de Auditoría (Audit Logs)**
   - Tabla filtrable con paginación
   - Filtros por: acción, tipo de entidad, rango de fechas
   - Solo lectura - sin botones de crear/editar/eliminar
   - Acceso mediante endpoints GET

2. **Reportes Agregados**
   - Cards de KPI (total tickets, tickets abiertos, tickets resueltos, total activos)
   - Gráfica de tickets por categoría (bar chart simple)
   - Lista de activos con más incidencias
   - Solo lectura - sin botones de modificar

### Rutas

| Ruta | Descripción |
|------|-------------|
| `/auditor/audit-logs` | Registros de auditoría |
| `/auditor/reports` | Reportes agregados |

### Estructura de Archivos

```
src/
├── app/(protected)/auditor/
│   ├── layout.tsx              # Layout del panel de auditor
│   ├── audit-logs/page.tsx    # Página de logs
│   └── reports/page.tsx       # Página de reportes
├── features/
│   ├── audit/
│   │   ├── components/
│   │   │   ├── AuditFilters.tsx
│   │   │   └── AuditLogTable.tsx
│   │   └── services/
│   │       └── audit.service.ts
│   └── reports/
│       ├── components/
│       │   ├── ReportKpiCard.tsx
│       │   └── TicketsByCategoryChart.tsx
│       └── services/
│           └── reports.service.ts
├── types/
│   ├── audit.ts
│   └── reports.ts
└── shared/components/navigation/
    └── Sidebar.tsx
```

### Servicios API

#### Audit Service

```typescript
// GET /api/audit/logs?page=1&pageSize=20&action=LOGIN&startDate=2024-01-01
getAuditLogs(params: {
  userId?: string;
  action?: AuditAction;
  entityType?: "TICKET" | "ASSET" | "USER" | "REPORT";
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}): Promise<AuditLogsResponse>
```

#### Reports Service

```typescript
// GET /api/reports/summary
getReportsSummary(params: ReportsFilters): Promise<ReportsSummary>

// GET /api/reports/kpis
getKPIs(): Promise<ReportKPI[]>

// GET /api/reports/tickets-by-category
getTicketsByCategory(): Promise<TicketsByCategory[]>
```

### Criterios de Aceptación

- [x] Auditor ve logs filtrables
- [x] Auditor ve reportes agregados  
- [x] No existen botones de crear/editar/eliminar
- [x] Acceso a endpoints es GET
- [x] Otros roles sin permiso no acceden (RBAC)

### Casos de Prueba

| ID | Tipo | Descripción |
|----|------|-------------|
| CP-FE-AUDIT-001 | Componente | Tabla de logs renderiza correctamente |
| CP-FE-REPORT-001 | Componente | Cards KPI muestran valores |
| E2E-FE-AUDIT-001 | E2E | Acceso al panel solo lectura |

### Dependencias

- ** ISSUE-FE-003**: Autenticación y RBAC
- ** ISSUE-BE-AUDIT-REPORTS**: Endpoints de auditoría y reportes

### Notas Técnicas

- Los componentes usan `use client` para manejar estado local de filtros y paginación
- No se utiliza ninguna librería de gráficos externa - implementación con CSS/HTML
- Los filtros se gestionan localmente y se envían como query parameters
- La paginación es client-side con datos del servidor