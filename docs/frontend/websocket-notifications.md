# Notificaciones WebSocket - Documentación Técnica

## ISSUE-FE-011

### Descripción

Sistema de notificaciones en tiempo real usando WebSocket (STOMP) para el rol de Usuario autenticado. Permite recibir actualizaciones de tickets sin recargar la página.

### Requisitos Funcionales

1. **Conexión WebSocket**
   - Conexión automática tras login exitoso
   - Reconexión automática con control de intentos
   - Desconexión limpia al hacer logout

2. **Notificaciones en Tiempo Real**
   - Ticket creado/actualizado/asignado/resuelto/cerrado
   - Diagnóstico IA completado
   - Alertas del sistema

3. **Interfaz de Notificaciones**
   - Bell icon con contador de no leídas
   - Dropdown con lista de notificaciones
   - Toast temporal para nuevas notificaciones
   - Marcar como leída, eliminar, limpiar todo

### Stack Técnico

- **@stomp/stompjs**: Cliente STOMP para WebSocket
- **React Hooks**: Estado y ciclo de vida
- **TanStack Query**: Cache de datos (opcional)

### Estructura de Archivos

```
src/
├── features/
│   └── notifications/
│       ├── components/
│       │   ├── NotificationBell.tsx
│       │   ├── NotificationBell.test.tsx
│       │   ├── NotificationToast.tsx
│       │   └── NotificationToast.test.tsx
│       ├── hooks/
│       │   ├── useNotificationsSocket.ts
│       │   └── useNotificationsSocket.test.ts
│       ├── services/
│       │   └── stomp-client.ts
│       └── types/
│           └── notification.types.ts
├── shared/lib/query/
│   └── query-client.ts
```

### Uso del Cliente STOMP

```typescript
import { stompClient, subscribeToUserNotifications } from "@/features/notifications/services/stomp-client";

// Conectar
await stompClient.connect("jwt-token");

// Suscribirse a notificaciones de usuario
subscribeToUserNotifications("user-id", (payload) => {
  console.log("Nueva notificación:", payload);
});

// Desconectar
stompClient.disconnect();
```

### Hook useNotificationsSocket

```typescript
import { useNotificationsSocket } from "@/features/notifications/hooks/useNotificationsSocket";

function MyComponent() {
  const {
    notifications,
    isConnected,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  } = useNotificationsSocket();

  return (
    <div>
      <NotificationBell
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onRemove={removeNotification}
        onClearAll={clearAll}
      />
    </div>
  );
}
```

### Tipos de Notificación

| Tipo | Descripción |
|------|-------------|
| `TICKET_CREATED` | Nuevo ticket creado |
| `TICKET_UPDATED` | Ticket actualizado |
| `TICKET_ASSIGNED` | Ticket asignado a técnico |
| `TICKET_RESOLVED` | Ticket marcado como resuelto |
| `TICKET_CLOSED` | Ticket cerrado |
| `DIAGNOSIS_COMPLETE` | Diagnóstico IA completado |
| `SYSTEM_ALERT` | Alerta del sistema |

### Payload de Notificación

```typescript
{
  type: "TICKET_UPDATED",
  title: "Ticket Actualizado",
  message: "El ticket #123 ha sido actualizado",
  priority: "medium",
  ticketId: "123",
  metadata: { /* datos adicionales */ }
}
```

### Criterios de Aceptación

- [x] Conexión WebSocket inicia tras login
- [x] Desconexión se maneja sin romper UI
- [x] Notificación aparece al cambiar un ticket
- [x] Cache de tickets se actualiza o invalida
- [x] Logout cierra conexión

### Casos de Prueba

| ID | Tipo | Descripción |
|----|------|-------------|
| CP-FE-WS-001 | Unitario | Crear cliente STOMP |
| CP-FE-WS-002 | Componente | Mostrar notificación |
| E2E-FE-WS-001 | E2E | Actualización de ticket |

### Notas Técnicas

- El cliente STOMP usa el patrón Singleton
- Reconexión automática con máximo de 5 intentos
- Timeout de 5 segundos entre intentos
- Suscripción a `/user/{userId}/queue/notifications`
- Las notificaciones se almacenan en memoria (máximo 50)