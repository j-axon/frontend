# FE-006 Formulario de Ticket Desde QR

## Objetivo
Permitir que Usuario Normal reporte una falla con datos del activo precargados desde el flujo QR de FE-005.

## Ruta
- URL: /tickets/scan
- Entradas por query string esperadas desde FE-005:
  - assetUuid
  - assetCode
  - assetName
  - technicalType (opcional)
  - model (opcional)
  - serialNumber (opcional)
  - location (opcional)

## Comportamiento
- Se muestran datos tecnicos del activo en modo solo lectura.
- Usuario edita:
  - descripcion (obligatoria, minimo 10)
  - categoria (obligatoria)
  - prioridad (obligatoria)
- En submit exitoso se muestra confirmacion con codigo de ticket.
- En error 403 se muestra mensaje generico y sin datos sensibles del backend.

## Dependencias
- React Hook Form
- Zod
- Endpoint de backend ISSUE-BE-TICKET-CREATE
