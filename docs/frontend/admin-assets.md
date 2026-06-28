# FE-009 Panel Admin: Gestión de Activos

## Objetivo
Permitir al Admin registrar activos, descargar QR, asignar activos a usuarios, consultar hoja de vida y adoptar/rechazar activos huérfanos.

## Rutas
- `/admin/assets` - Lista de activos
- `/admin/assets/new` - Registro de nuevo activo
- `/admin/assets/orphans` - Bandeja de activos huérfanos

## Componentes
- AssetAdminTable - Tabla de activos con descarga de QR
- AssetForm - Formulario de registro de activos
- QrDownloadButton - Botón para descargar código QR
- OrphanAssetsInbox - Bandeja de activos huérfanos con acciones

## Comportamiento
- Carga activos desde GET /api/v1/assets/admin
- Muestra código, nombre, estado, asignación y botón QR
- Descarga QR desde GET /api/v1/assets/{assetId}/qr
- Crea activo vía POST /api/v1/assets
- Carga huérfanos desde GET /api/v1/assets/orphans
- Adopta huérfano vía POST /api/v1/assets/{assetId}/adopt
- Rechaza huérfano vía POST /api/v1/assets/{assetId}/reject

## Seguridad visual
- Todas las vistas están protegidas por middleware de rol
- Solo usuarios con rol Admin pueden acceder
- Acciones de adopción/rechazo protegidas por backend
- Validaciones de formulario activas en cliente y servidor
