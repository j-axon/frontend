# FE-008 Panel Técnico: Gestión de Tickets y Diagnóstico IA

## Objetivo
Permitir al Técnico consultar tickets, ver datos del activo asociado, historial, diagnóstico IA con nivel de confianza visual, y cambiar estado de tickets.

## Rutas
- `/technician/tickets` - Cola de tickets
- `/technician/tickets/[ticketId]` - Detalle del ticket

## Componentes
- TechnicianTicketQueue - Lista de tickets con filtros
- TicketDetailPanel - Panel de detalle con información completa
- AssetHistoryTimeline - Historial del activo
- AiDiagnosisCard - Tarjeta de diagnóstico IA
- ConfidenceIndicator - Indicador de confianza visual

## Comportamiento
- Carga tickets desde GET /api/v1/tickets/technician
- Muestra estado, fecha, activo y solicitante
- Filtros por estado: todos, abiertos, en progreso, resueltos, cerrados
- En detalle: carga información completa del ticket
- Carga historial del activo desde GET /api/v1/assets/{assetId}/history
- Carga diagnóstico IA desde GET /api/v1/tickets/{ticketId}/diagnosis
- Indicador de confianza con semáforo (alta ≥80%, media ≥60%, baja <60%)
- Permite cambiar estado del ticket vía PATCH /api/v1/tickets/{ticketId}/status
- Advertencia visible sobre uso de IA como apoyo

## Seguridad visual
- El endpoint /tickets/technician filtra tickets asignados al técnico
- Acciones de cambio de estado protegidas por backend
- Diagnóstico IA incluye advertencia de uso como apoyo
