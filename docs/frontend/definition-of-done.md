# Definition of Done (DoD) - J-AXON Frontend

## Propósito

Establecer los criterios mínimos para considerar una tarea como completada.

## Criterios Generales

### Código

- [ ] Código sigue las convenciones establecidas
- [ ] No hay `any` sin justificación
- [ ] No hay `console.log` en código de producción
- [ ] Nombres de archivos y variables son consistentes

### Funcionalidad

- [ ] Funcionalidad implementada según requisitos
- [ ] Casos edge considerados
- [ ] Manejo de errores implementado
- [ ] Estados de carga (loading) considerados

### Testing

- [ ] Tests unitarios creados/actualizados
- [ ] Tests pasan localmente
- [ ] Cobertura adecuada (>70% en módulos nuevos)

### E2E (si aplica)

- [ ] Tests E2E actualizados
- [ ] Flujo end-to-end funciona

### Documentación

- [ ] README o docs actualizados (si es nueva feature)
- [ ] Comments en código complejo

### Quality

- [ ] `npm run lint` pasa sin errores
- [ ] `npm run build` pasa sin errores
- [ ] `npm run test` pasa sin errores

## Por Tipo de Cambio

### Feature (Nueva Funcionalidad)

- [ ] Requisitos implementados
- [ ] Componentes creados
- [ ] Servicios/API integrados
- [ ] Tests unitarios
- [ ] Tests E2E
- [ ] Documentación actualizada

### Bug Fix

- [ ] Bug reproducido
- [ ] Solución implementada
- [ ] Tests que fallan ahora pasan
- [ ] No introduce regresiones

### Refactor

- [ ] Funcionalidad sin cambios
- [ ] Tests pasan
- [ ] Código más limpio

### Documentación

- [ ] Contenido preciso
- [ ] Ejemplos claros
- [ ] Estructura consistente

## Checklist para PR

```
## Checklist DoD

- [ ] Código sigue convenciones
- [ ] Tests unitarios creados/actualizados
- [ ] Tests E2E actualizados (si aplica)
- [ ] Lint pasa
- [ ] Build pasa
- [ ] Documentación actualizada (si aplica)
```

## Flujo de Trabajo

```
1. Tomar tarea
2. Crear rama
3. Implementar
4. Tests locales
5. Self-review (checklist)
6. Commit
7. Push
8. PR
9. Review
10. Address feedback
11. Merge
```

## Definición de "Listo"

Una tarea está lista cuando:

1. Cumple todos los criterios de la checklist
2. Ha sido revisada por al menos un teammate
3. Todos los tests pasan
4. No hay warnings de lint
5. Build exitosa

## Excepciones

Algunas excepciones requieren justificación:

- Coverage < 70%: Justificar por qué no es posible
- Sin tests E2E: Justificar por qué no aplica
- Documentación mínima: Solo si es cambio trivial

## Recursos

- [Conventions](./conventions.md)
- [Testing E2E](./testing-e2e.md)