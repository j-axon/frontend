# Admin Agents - Component Guide

Responsabilidades de componentes:
- AgentsList: consulta GET /api/v1/agents y renderiza tabla con acciones.
- AgentDetail: muestra metadata del agente, últimos snapshots (preview) y botones de acción.
- CreateTaskModal: formulario para crear task con validación (cada comando enviado como array de args).

Ejemplo llamada para crear task:

POST /api/v1/agents/{uuid}/tasks
Body:
```
{
  "task_id": "uuid",
  "commands": [["/bin/df","-h"],["/usr/bin/uptime"]],
  "ttl_seconds": 3600
}
```
