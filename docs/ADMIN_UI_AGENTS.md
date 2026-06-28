# Admin UI - Agents

Screens:
- Agents list: show uuid, hostname, mac, state, lastSeen, actions (view telemetry, create task, reprovision)
- Create Task modal: allow admin to input commands (validated client-side), TTL, submit.

API calls:
- GET /api/v1/agents
- POST /api/v1/agents/{uuid}/tasks
- POST /api/v1/agents/{uuid}/reprovision
