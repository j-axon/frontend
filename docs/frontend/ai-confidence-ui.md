# FE-008 UI de Confidencial IA

## Objetivo
Mostrar el nivel de confianza del diagnóstico IA de forma visual e intuitiva para el técnico.

## Componentes
- ConfidenceIndicator - Barra de progreso con etiqueta de nivel
- AiDiagnosisCard - Tarjeta completa con diagnóstico y advertencia

## Niveles de Confianza
- **Alta (≥80%)**: Color verde (emerald), indica alta probabilidad de acierto
- **Media (60-79%)**: Color amarillo (amber), indica confianza moderada
- **Baja (<60%)**: Color rojo (rose), indica baja confianza

## Comportamiento
- Barra de progreso visual del 0-100%
- Etiqueta con nivel y porcentaje
- Colores semafóricos para identificación rápida
- Advertencia siempre visible sobre uso de IA como apoyo
- Estado vacío cuando no hay diagnóstico disponible

## UX Considerations
- El técnico debe verificar la información antes de tomar decisiones
- La IA es una herramienta de apoyo, no una fuente definitiva
- Los colores deben ser accesibles y distinguibles
- El porcentaje exacto ayuda en la toma de decisiones
