# FE-007 Panel Usuario Normal: Mis Tickets

## Objetivo
Permitir a Usuario Normal visualizar solo sus tickets, filtrar por estado y recibir refresco por eventos websocket.

## Ruta
- /my-tickets

## Componentes
- MyTicketsList
- TicketCard
- TicketStatusBadge
- Hook useMyTickets con TanStack Query

## Comportamiento
- Carga tickets desde GET /api/v1/tickets/me
- Muestra estado, fecha y activo asociado
- Filtros: todos, abiertos, en progreso, resueltos, cerrados
- Estado vacio cuando no hay tickets
- Ante evento websocket TICKET_UPDATED con ownerScope=ME, invalida query y refresca

## Seguridad visual
- El endpoint utilizado es /tickets/me para aislamiento por usuario.
- La UI no expone tickets fuera del resultado del endpoint del usuario autenticado.
