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
