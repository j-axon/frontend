# API Tickets Frontend

## Crear ticket desde QR
- Metodo: POST
- Endpoint: /api/v1/tickets

### Request
{
  "assetUuid": "string",
  "descripcion": "string",
  "categoria": "HARDWARE|SOFTWARE|NETWORK|ACCESS|OTHER",
  "prioridad": "LOW|MEDIUM|HIGH|CRITICAL",
  "adjuntos": ["string"]
}

### Response esperada
{
  "uuid": "string",
  "codigo": "string",
  "estado": "string",
  "createdAt": "ISO-8601"
}

### Errores manejados
- 403: Mensaje de autorizacion sin exponer payload sensible.
- Otros: Mensaje generico de fallo de creacion.
# API — Endpoints de tickets (Frontend)

Base URL: `NEXT_PUBLIC_API_URL` (por defecto `http://localhost:8080/api`)

## GET /v1/assets/qr/:uuid

Obtiene los datos públicos/seguros de un activo a partir del token QR.

### Response 200

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Servidor Principal",
  "code": "AST-001",
  "status": "ACTIVE",
  "serialNumber": "SN-12345",
  "location": "Sala de servidores"
}
```

### Errores

| Código | Descripción |
|---|---|
| 404 | Activo no encontrado |
| 403 | Sin permiso para consultar el activo |

---

## POST /v1/tickets

Crea un ticket asociado a un activo.

### Request body

```json
{
  "assetUuid": "550e8400-e29b-41d4-a716-446655440000",
  "description": "Descripción detallada de la falla (mín. 10 caracteres)",
  "category": "Mantenimiento",
  "priority": "Media"
}
```

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `assetUuid` | string | Sí | UUID del activo |
| `description` | string | Sí | Mínimo 10 caracteres |
| `category` | enum | Sí | `Mantenimiento`, `Soporte Técnico`, `Infraestructura`, `Otros` |
| `priority` | enum | No | `Baja`, `Media`, `Alta` |

### Response 201

```json
{
  "id": "ticket-uuid",
  "message": "Ticket created successfully"
}
```

### Errores

| Código | Comportamiento Frontend |
|---|---|
| 403 | Mensaje genérico de permisos (sin exponer detalles del backend) |
| 400 | Validación rechazada por el backend |
| 500 | Error genérico al usuario |

## Referencia de implementación

- Servicio activo: `src/features/assets/services/asset-qr.service.ts`
- Servicio ticket: `src/features/tickets/services/ticket.service.ts`
- Tipos: `src/features/assets/types/asset-qr.types.ts`, `src/features/tickets/types/ticket.types.ts`
